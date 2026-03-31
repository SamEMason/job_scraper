import { type Browser, type Page, chromium, expect } from '@playwright/test';

import Config from '#src/Config.ts';
import ToastCareerPage from '#src/pages/ToastCareerPage.ts';
import { type Job } from '#src/models/Job.ts';
import { Location } from '#src/models/Location.ts';

const main = async () => {
  let browser: Browser | undefined;

  try {
    browser = await chromium.launch({ headless: Config.HEADLESS });
    const context = await browser.newContext();
    let page: Page = await context.newPage();
    let toastPage: ToastCareerPage = new ToastCareerPage(page);

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

    const jobTitles = searchResultsRows.locator(
      'h3.job-search-results-card-title'
    );
    const titles = await jobTitles.allInnerTexts();

    const jobHrefs = jobTitles.locator('a');
    const hrefs = await jobHrefs.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href') || '')
    );

    const locations = searchResultsRows.locator('.job-component-location span');
    const locationText = await locations.allInnerTexts();

    const departments = searchResultsRows.locator(
      '.job-component-department span'
    );
    const deptNames = await departments.allInnerTexts();

    let jobListings: Job[] = titles.map((title, i) => ({
      title,
      location: new Location(locationText[i]),
      dept: deptNames[i],
      href: hrefs[i],
      reqId: undefined,
    }));

    console.log(jobListings);
  } catch (err) {
    console.error(err);
  } finally {
    if (browser) {
      await browser.close();
    }
    // await page.pause();
  }
};

main();
