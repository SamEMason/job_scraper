import { type Page } from '@playwright/test';

import CareerPage from '#src/pages/CareerPage.ts';

export default class ToastCareerPage extends CareerPage {
  public baseUrl = 'https://careers.toasttab.com/jobs/search';
  public jobRowSelector: string = '.job-search-results-card-body';

  constructor(page: Page) {
    super(page);
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
}
