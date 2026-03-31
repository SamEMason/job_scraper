import { Browser, chromium, expect, Page, test } from '@playwright/test';

import Config from '#src/Config.ts';
import ToastCareerPage from '#src/pages/ToastCareerPage.ts';

let toastPage: ToastCareerPage;
let browser: Browser;
let page: Page;

test.beforeAll(async () => {
  browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
  toastPage = new ToastCareerPage(page);
});

test.afterAll(async () => {
  await browser.close();
});

test('Gets job data from Toast Careers page', async () => {
  // Go to Toast Careers page
  await page.goto(toastPage.baseUrl);

  // Expect a title to contain "Current Openings".
  await expect(page).toHaveTitle(/Current Openings/);

  // Check the Remote Jobs filter
  if (Config.REMOTE_ENABLED) {
    await toastPage.checkRemoteJobs();
  }

  // KEEPING SECTION SPECIFICALLY TAILORED TO ENGINEERING FOR NOW
  // AVOIDING EARLY ABSTRACTION

  // Check the engineering filter
  await toastPage.checkEngineering();

  // Grab all job search results card rows on page 1
  const searchResultsRows = await toastPage.getJobSearchCardRows();

  const rowText = await searchResultsRows.allInnerTexts();

  rowText.forEach((text) => console.log(text));

  await page.pause();
});
