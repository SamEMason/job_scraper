import { type Locator, type Page } from '@playwright/test';

export default class ToastCareerPage {
  private page: Page;
  public baseUrl = 'https://careers.toasttab.com/jobs/search';

  // Locators
  remoteCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.remoteCheckbox = this.page.locator('#remote');
  }
}
