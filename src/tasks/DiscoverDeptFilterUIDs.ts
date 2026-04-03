import Task from '#src/tasks/Task.ts';
import Filter from '#src/Filter.ts';
import ToastCareerPage from '#src/pages/ToastCareerPage.ts';
import { launchPage } from '#src/lib/browserHelper.ts';
import type { Browser } from '@playwright/test';

type Department = (typeof Filter.dept)[keyof typeof Filter.dept];

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

  protected async awaken(): Promise<void> {
    const { browser } = await launchPage();
    this.browser = browser;
  }

  protected async execute(): Promise<void> {
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
}
