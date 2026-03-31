import { type Locator, type Page } from '@playwright/test';

export default class ToastCareerPage {
  public baseUrl = 'https://careers.toasttab.com/jobs/search';

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkRemoteJobs(): Promise<void> {
    const checkbox = this.page.locator('#remote');
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
    await this.waitForFilter();
  }

  async checkEngineering(): Promise<void> {
    const checkbox = this.page
      .locator('li', {
        hasText: 'Engineering',
      })
      .locator('input');

    await checkbox.waitFor({ state: 'visible' });
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
    await this.waitForFilter();
  }

  async getJobSearchCardRows(): Promise<Locator> {
    const rows = this.page.locator('.job-search-results-card-row');
    await rows.first().waitFor({ state: 'visible' });
    return rows;
  }

  private async waitForFilter() {
    const rows = await this.getJobSearchCardRows();
    const firstRow = rows.first();
    const oldText = await firstRow.innerText();

    await this.page.waitForFunction(
      ({ selector, oldText }) => {
        const el = document.querySelector(selector) as HTMLElement | null;
        return el?.innerText !== oldText;
      },
      { selector: '.job-search-results-card-row:first-child', oldText }
    );
  }
}
