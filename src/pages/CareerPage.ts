import type { Locator, Page } from '@playwright/test';

export default abstract class CareerPage {
  public abstract baseUrl: string;
  public abstract jobRowSelector: string;

  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getJobSearchCardRows(): Promise<Locator> {
    const rows = this.page.locator(this.jobRowSelector);
    await rows.first().waitFor({ state: 'visible' });
    return rows;
  }

  protected async checkFilter(selector: string | Locator) {
    let checkbox: Locator;

    if (typeof selector === 'string') {
      checkbox = this.page.locator('#remote');
    } else {
      checkbox = selector;
    }

    await checkbox.waitFor({ state: 'visible' });
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
    await this.waitForFilter();
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
      { selector: `${this.jobRowSelector}:first-child`, oldText }
    );
  }
}
