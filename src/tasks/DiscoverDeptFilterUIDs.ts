import Task from '#src/tasks/Task.ts';
import Filter from '#src/Filter.ts';
import ToastCareerPage from '#src/pages/ToastCareerPage.ts';
import { launchPage } from '#src/lib/browserHelper.ts';
import type { Browser, Page } from '@playwright/test';

type Department = (typeof Filter.dept)[keyof typeof Filter.dept];

interface DeptFilter {
  uid: string;
  discovered_at: Date;
  history: DeptFilterHistory[];
}

interface DeptFilterHistory {
  uid: string;
  discovered_at: Date;
  replaced_at: Date;
}

export default class DiscoverDeptFilterUIDs extends Task {
  private browser!: Browser;
  private page!: Page;
  private toastPage!: ToastCareerPage;
  private filters: Record<Department, DeptFilter> = {};

  protected async awaken(): Promise<void> {
    const { browser, page } = await launchPage();
    this.browser = browser;
    this.page = page;
    this.toastPage = new ToastCareerPage(page);
  }

  protected async execute(): Promise<void> {}

  protected async sleep(): Promise<void> {
    await this.browser.close();
  }

  public getFilters() {
    return this.filters;
  }

  // private async getDeptFilterUrl(): Promise<string> {
  //   await this.goto(this.baseUrl);

  //   if (Config.REMOTE_ENABLED) {
  //     await this.checkRemoteJobs();
  //   }

  //   await this.checkDepartment(Filter.dept.ENGINEERING);
  //   await this.page.waitForSelector(this.jobRowSelector, { state: 'visible' });
  //   return this.page.url();
  // }
}
