import { ScrapeJobs } from '#src/tasks/ScrapeJobs.ts';

const main = async () => {
  const scrapeJobTask = new ScrapeJobs();
  await scrapeJobTask.run();

  const jobs = scrapeJobTask.getJobs();
  console.log(jobs);
};

main();
