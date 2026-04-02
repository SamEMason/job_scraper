import { type Page } from '@playwright/test';

import CareerPage from '#src/pages/CareerPage.ts';
import Config from '#src/Config.ts';

export default class ToastCareerPage extends CareerPage {
  public baseUrl = 'https://careers.toasttab.com/jobs/search';
  public filterUrl: string | undefined;
  public jobRowSelector: string = '.job-search-results-card-body';

  constructor(page: Page) {
    super(page);
  }

  public async init() {
    this.filterUrl = await this.getDeptFilterUrl();
  }

  async checkRemoteJobs(): Promise<void> {
    await this.checkFilter('#remote');
  }

  async checkEngineering(): Promise<void> {
    const checkbox = this.page
      .locator('li', {
        hasText: 'Engineering',
      })
      .locator('input');

    await this.checkFilter(checkbox);
  }

  async getDeptFilterUrl(): Promise<string> {
    await this.goto(this.baseUrl);

    if (Config.REMOTE_ENABLED) {
      await this.checkRemoteJobs();
    }

    await this.checkEngineering();

    await this.page.waitForSelector(this.jobRowSelector, { state: 'visible' });

    return this.page.url();
  }
}
