import type { Locator, Page } from '@playwright/test';

export default abstract class CareerPage {
  public abstract baseUrl: string;
  public abstract jobRowSelector: string;

  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getJobSearchRows(): Promise<Locator> {
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
    const oldUrl = this.page.url();
    const rows = await this.getJobSearchRows();

    try {
      await Promise.all([
        this.page.waitForURL((url) => url.toString() !== oldUrl),
        rows.first().waitFor({ state: 'visible' }),
      ]);
    } catch (err) {
      console.error(`Couldn't find filter at URL ${oldUrl}: ${err}`);
      throw err;
    }
  }

  public async goto(url: string): Promise<void> {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle' });
    } catch (err) {
      console.error(`Couldn't navigate to URL ${url}: ${err}`);
      throw err;
    }
  }
}
