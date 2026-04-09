import Config from '#src/Config.ts';
import DeptFilterDiscovery from '#src/tasks/DeptFilterDiscovery.ts';
import ScrapeJobs from '#src/tasks/ScrapeJobs.ts';
import Filter from './Filter.ts';

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

    const discovery = new DeptFilterDiscovery();
    await discovery.run();
    const filterData = discovery.getFilterData();

    discovery.store.save(filterData);

    console.log(filterData);
  }

  if (Config.GET_FILTER_NAMES_ENABLED) {
    const filters = await Filter.getFilters();
    console.log(filters);
  }

  return 0;
}

main();
