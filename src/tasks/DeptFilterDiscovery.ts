import plimit from 'p-limit';

import Task from '#src/tasks/Task.ts';
import Filter from '#src/Filter.ts';
import ToastCareerPage from '#src/pages/ToastCareerPage.ts';
import { launchPage } from '#src/lib/browserHelper.ts';
import type { Browser } from '@playwright/test';
import Config, { DiscoveryMode } from '#src/Config.ts';
import type { DeptFiltersData } from '#src/types.ts';
import { DeptFilterStore } from '#src/services/DeptFilterStore.ts';

export default class DeptFilterDiscovery extends Task {
  public store = new DeptFilterStore();

  private browser!: Browser;
  private filterData: DeptFiltersData = {
    paramKey: '',
    filters: {} as DeptFiltersData['filters'],
  };

  protected async awaken(): Promise<void> {
    const { browser } = await launchPage();
    this.browser = browser;
    this.filterData = await this.store.load();
  }

  protected async execute(): Promise<void> {
    if (Config.DEPT_UID_DISCOVERY_MODE === DiscoveryMode.sequential) {
      for (const [key, dept] of Object.entries(Filter.dept)) {
        await this.discoverFilterData(key, dept);
      }
    } else if (Config.DEPT_UID_DISCOVERY_MODE === DiscoveryMode.concurrent) {
      const limit = plimit(Config.CONCURRENCY_LIMIT);

      await Promise.all(
        Object.entries(Filter.dept).map(async ([key, dept]) =>
          limit(async () => {
            await this.discoverFilterData(key, dept);
          })
        )
      );
    } else {
      throw new Error(
        `Invalid Department UID Discovery Mode: ${Config.DEPT_UID_DISCOVERY_MODE}`
      );
    }
  }

  private async discoverFilterData(key: string, dept: string): Promise<void> {
    const url = await this.getDeptFilterUrl(dept);
    const [paramKey, uid] = this.extractUID(url);

    if (!this.filterData.paramKey) this.filterData.paramKey = paramKey;

    const now = Date.now();

    this.filterData.filters[key as keyof typeof Filter.dept] = {
      uid,
      discoveredAt: now,
      seenUnchangedAt: now,
    };
  }

  protected async sleep(): Promise<void> {
    await this.browser.close();
  }

  public getFilterData() {
    return this.filterData;
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
