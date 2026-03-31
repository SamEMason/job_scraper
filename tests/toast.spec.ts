import { test, expect } from '@playwright/test';

import Config from '#src/Config.ts';
import ToastCareerPage from '#src/pages/ToastCareerPage.ts';

test('Gets job data from Toast Careers page', async ({ page }) => {
  const toastPage = new ToastCareerPage(page);

  // Go to Toast Careers page
  await page.goto(toastPage.baseUrl);

  // Expect a title to contain "Current Openings".
  await expect(page).toHaveTitle(/Current Openings/);

  // Check the Remote Jobs filter
  if (Config.REMOTE_ENABLED) {
    const remoteJobsCheckbox = toastPage.remoteCheckbox;
    await remoteJobsCheckbox.check();
  }

  // KEEPING SECTION SPECIFICALLY TAILORED TO ENGINEERING FOR NOW
  // AVOIDING EARLY ABSTRACTION

  // Check the engineering filter
  const engineeringListItem = page.locator('li', { hasText: 'Engineering' });
  const engineeringCheckbox = engineeringListItem.locator('input');
  await engineeringCheckbox.check();

  // Grab all job search results card rows on page 1
  const searchResultsRows = page.locator('.job-search-results-card-row');
  await searchResultsRows.waitFor({ state: 'visible' });

  await searchResultsRows.highlight();

  await page.pause();
});
