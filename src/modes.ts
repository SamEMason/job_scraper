import DeptFilterDiscovery from '#src/tasks/DeptFilterDiscovery.ts';
import ScrapeJobs from '#src/tasks/ScrapeJobs.ts';
import { RunMode } from '#src/Config.ts';
import Filter from '#src/Filter.ts';

const scrapeHandler = async () => {
  console.log('Job scraping initiated!');

  const scrapeJobTask = new ScrapeJobs();
  await scrapeJobTask.run();

  const jobs = scrapeJobTask.getJobs();
  console.log(jobs);
};

const discoveryHandler = async () => {
  console.log('Department UID discovery initiated!');

  const discovery = new DeptFilterDiscovery();
  await discovery.run();

  const filterData = discovery.getFilterData();
  console.log(filterData);
};

const filtersHandler = async () => {
  console.log('Filter label scraping initiated!');

  const filters = await Filter.getFilters();
  console.log(filters);
};

export const handlers: Record<RunMode, () => Promise<void>> = {
  [RunMode.SCRAPE]: scrapeHandler,
  [RunMode.DISCOVERY]: discoveryHandler,
  [RunMode.FILTERS]: filtersHandler,
};