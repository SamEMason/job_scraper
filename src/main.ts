import { type Browser, type Page, chromium } from '@playwright/test';

import Config from '#src/Config.ts';
import ToastCareerPage from '#src/pages/ToastCareerPage.ts';
import { type Job } from '#src/models/Job.ts';
import { Location } from '#src/models/Location.ts';

const main = async () => {
  let browser: Browser | undefined;

  try {
    // Launch browser and initialize page
    browser = await chromium.launch({ headless: Config.HEADLESS });
    const context = await browser.newContext();
    let page: Page = await context.newPage();

    // Instantiate ToastCareerPage object
    let toastPage: ToastCareerPage = new ToastCareerPage(page);

    // Go to Toast Careers page
    await page.goto(toastPage.baseUrl);

    // Check the Remote Jobs filter if enabled
    if (Config.REMOTE_ENABLED) {
      await toastPage.checkRemoteJobs();
    }

    // Check the engineering filter
    await toastPage.checkEngineering();

    // Grab all job search results card rows on page 1
    const searchResultsRows = await toastPage.getJobSearchRows();

    // Get title text from job search result card elements
    const jobTitles = searchResultsRows.locator(
      'h3.job-search-results-card-title'
    );
    const titles = await jobTitles.allInnerTexts();

    // Get hrefs from anchor tags
    const jobHrefs = jobTitles.locator('a');
    const hrefs = await jobHrefs.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href') || '')
    );

    // Get location string from job location element
    const locations = searchResultsRows.locator('.job-component-location span');
    const locationText = await locations.allInnerTexts();

    // Get department name from job department span elements
    const departments = searchResultsRows.locator(
      '.job-component-department span'
    );
    const deptNames = await departments.allInnerTexts();

    // Use create array of Job items using gathered job listing data
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
    // Clean up
    if (browser) {
      await browser.close();
    }
    // await page.pause();
  }
};

main();
