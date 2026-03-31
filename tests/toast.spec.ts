import { test, expect } from '@playwright/test';

test('Gets job data from Toast Careers page', async ({ page }) => {
  // Go to Toast Careers page
  await page.goto('https://careers.toasttab.com/jobs/search');

  // Expect a title to contain "Current Openings".
  await expect(page).toHaveTitle(/Current Openings/);

  // Check the Remote Jobs filter
  const remoteJobsCheckbox = page.locator('#remote');
  await remoteJobsCheckbox.check();

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
