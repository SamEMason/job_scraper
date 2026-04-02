import { chromium, type Browser, type Page } from '@playwright/test';

import type { Job } from '#src/models/Job.ts';
import ToastCareerPage from '#src/pages/ToastCareerPage.ts';
import Config from '#src/Config.ts';
import { Location } from '#src/models/Location.ts';

export default class JobScraper {
  private browser: Browser;
  private page: Page;
  private toastPage: ToastCareerPage;
  private batchSize: number = 10;

  public jobListings: Job[] = [];

  constructor(browser: Browser, page: Page) {
    this.browser = browser;
    this.page = page;
    this.toastPage = new ToastCareerPage(page);
  }

  public static async create(): Promise<JobScraper> {
    // Launch browser and initialize page
    const browser: Browser = await chromium.launch({
      headless: Config.HEADLESS,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    return new JobScraper(browser, page);
  }

  public async close(): Promise<void> {
    await this.browser.close();
  }

  public async run(): Promise<void> {
    // Go to Toast Careers page
    await this.toastPage.goto(this.toastPage.baseUrl);

    // Check the Remote Jobs filter if enabled
    if (Config.REMOTE_ENABLED) {
      await this.toastPage.checkRemoteJobs();
    }

    // Check the engineering filter
    await this.toastPage.checkEngineering();

    await this.collectJobs();
  }

  public getJobs(): Job[] {
    return this.jobListings;
  }

  private async collectJobs(): Promise<void> {
    // Grab all job search results card rows on page 1
    const searchResultsRows = await this.toastPage.getJobSearchRows();
    const searchResultsCount = await searchResultsRows.count();

    for (let i = 0; i < searchResultsCount; i++) {
      const row = searchResultsRows.nth(i);

      // Get title text from job search result card elements
      const title = await row
        .locator('h3.job-search-results-card-title')
        .innerText();

      // Get hrefs from anchor tags
      const href = (await row.locator('a').getAttribute('href')) || '';

      const remoteElement = row.locator('li.job-component-remote');
      const isRemote = (await remoteElement.count()) > 0;

      // Get location string from job location element
      const location = await row
        .locator('.job-component-location span')
        .innerText();

      // Get department name from job department span elements
      const dept = await row
        .locator('.job-component-department span')
        .innerText();

      // Use create array of Job items using gathered job listing data
      this.jobListings.push({
        title,
        location: new Location(location, isRemote),
        dept,
        href,
        reqId: undefined,
      });
    }

    await this.resolveReqIds();
    await this.page.pause();
  }

  private async resolveReqIds() {
    for (let i = 0; i < this.jobListings.length; i += this.batchSize) {
      await Promise.all(
        this.jobListings.slice(i, i + this.batchSize).map(async (job) => {
          let page: Page | undefined;

          try {
            page = await this.browser.newPage();
            await page.goto(job.href);

            const reqId = await page
              .locator('li.job-component-requisition-identifier > span')
              .innerText();

            job.reqId = reqId.trim();
          } catch (err) {
            if (err instanceof Error) {
              console.error(
                `Failed to scrape reqId for ${job.title}: ${err.message}`
              );
            } else {
              console.error(`Failed to scrape reqId for ${job.title}: ${err}`);
            }
          } finally {
            if (page) {
              await page.close();
            }
          }
        })
      );
    }
  }
}
