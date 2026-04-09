import Config, { RunMode } from '#src/Config.ts';
import DeptFilterDiscovery from '#src/tasks/DeptFilterDiscovery.ts';
import ScrapeJobs from '#src/tasks/ScrapeJobs.ts';
import Filter from './Filter.ts';

const argMode = process.argv[2] as RunMode;
const mode = argMode ?? Config.RUN_MODE_DEFAULT;

const handlers: Record<RunMode, () => Promise<void>> = {
  [RunMode.SCRAPE]: async () => {
    console.log('Job scraping initiated!');

    const scrapeJobTask = new ScrapeJobs();
    await scrapeJobTask.run();
    const jobs = scrapeJobTask.getJobs();
    console.log(jobs);
  },
  [RunMode.DISCOVERY]: async () => {
    console.log('Department UID discovery initiated!');
    
    const discovery = new DeptFilterDiscovery();
    await discovery.run();
    const filterData = discovery.getFilterData();
    
    console.log(filterData);
  },
  [RunMode.FILTERS]: async () => {
    console.log('Filter label scraping initiated!');

    const filters = await Filter.getFilters();
    console.log(filters);
  },
};

export default async function main() {
  const handler = handlers[mode];

  if (!handler) {
    throw new Error(`Invalid mode: ${mode}`);
  }

  await handler();
}

main();
