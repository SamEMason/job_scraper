import { ScrapeJobs } from '#src/tasks/ScrapeJobs.ts';
import Config from '#src/Config.ts';

export default async function main() {
  if (Config.SCRAPE_JOBS_ENABLED) {
    const scrapeJobTask = new ScrapeJobs();
    await scrapeJobTask.run();
    const jobs = scrapeJobTask.getJobs();
    console.log(jobs);
  }

  if (Config.DEPT_UID_DISCOVERY_ENABLED) {
    console.log('Department UID discovery initiated!');
  }

  return 0;
}
