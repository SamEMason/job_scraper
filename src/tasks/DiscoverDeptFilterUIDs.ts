import plimit from 'p-limit';

import Task from '#src/tasks/Task.ts';
import Filter from '#src/Filter.ts';
import ToastCareerPage from '#src/pages/ToastCareerPage.ts';
import { launchPage } from '#src/lib/browserHelper.ts';
import type { Browser } from '@playwright/test';
import Config, { DiscoveryMode } from '#src/Config.ts';

type Department = (typeof Filter.dept)[keyof typeof Filter.dept];

interface DeptFilterData {
  meta: DeptMetaData;
  deptFilters: DeptFilter;
}

interface DeptMetaData {
  deptParam: string;
}

interface DeptFilter {
  uid: string;
  discoveredAt: number;
  seenUnchangedAt: number;
  history: DeptFilterHistory[];
}

interface DeptFilterHistory {
  uid: string;
  discoveredAt: number;
  replacedAt: number;
}

export default class DiscoverDeptFilterUIDs extends Task {
  private browser!: Browser;
  private filters: Record<Department, DeptFilter> = {};
  private paramKey!: string;

  protected async awaken(): Promise<void> {
    const { browser } = await launchPage();
    this.browser = browser;
  }

  protected async execute(): Promise<void> {
    if (Config.DEPT_UID_DISCOVERY_MODE === DiscoveryMode.sequential) {
      for (const [key, dept] of Object.entries(Filter.dept)) {
        const url = await this.getDeptFilterUrl(dept);

        const now = Date.now();

        this.filters[key as keyof typeof Filter.dept] = {
          uid: url,
          discoveredAt: now,
          seenUnchangedAt: now,
          history: [],
        };
      }
    } else if (Config.DEPT_UID_DISCOVERY_MODE === DiscoveryMode.concurrent) {
      const limit = plimit(Config.CONCURRENCY_LIMIT);

      await Promise.all(
        Object.entries(Filter.dept).map(async ([key, dept]) =>
          limit(async () => {
            const url = await this.getDeptFilterUrl(dept);
            const [paramKey, uid] = this.extractUID(url);

            if (!this.paramKey) this.paramKey = paramKey;

            const now = Date.now();

            this.filters[key as keyof typeof Filter.dept] = {
              uid,
              discoveredAt: now,
              seenUnchangedAt: now,
              history: [],
            };
          })
        )
      );
    } else {
      throw new Error(
        `Invalid Department UID Discovery Mode: ${Config.DEPT_UID_DISCOVERY_MODE}`
      );
    }
  }

  protected async sleep(): Promise<void> {
    await this.browser.close();
  }

  public getFilters() {
    return this.filters;
  }

  private async getDeptFilterUrl(dept: string): Promise<string> {
    const page = await this.browser.newPage();
    const toastPage = new ToastCareerPage(page);

    await toastPage.goto(toastPage.baseUrl);

    await toastPage.checkDepartment(dept);

    await page.waitForSelector(toastPage.jobRowSelector, {
      state: 'visible',
    });

    const url = page.url();

    await page.close();

    return url;
  }

  private extractUID(url: string): string[] {
    const urlParts = url.split('&');

    const [deptParam] = urlParts.filter((part) =>
      part.includes('department_uids')
    );

    const uid = deptParam.split('=');

    return uid;
  }
}
