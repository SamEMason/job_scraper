import ScrapeJobs from '#src/tasks/ScrapeJobs.ts';
import Config from '#src/Config.ts';
import DiscoverDeptFilterUIDs from '#src/tasks/DiscoverDeptFilterUIDs.ts';

export default async function main() {
  if (Config.SCRAPE_JOBS_ENABLED) {
    console.log('Job scraping initiated!');

    const scrapeJobTask = new ScrapeJobs();
    await scrapeJobTask.run();
    const jobs = scrapeJobTask.getJobs();
    console.log(jobs);
  }

  if (Config.DEPT_UID_DISCOVERY_ENABLED) {
    console.log('Department UID discovery initiated!');

    const discovery = new DiscoverDeptFilterUIDs();
    await discovery.run();
    const deptFilters = discovery.getFilters();
    console.log(deptFilters);
  }

  return 0;
}
