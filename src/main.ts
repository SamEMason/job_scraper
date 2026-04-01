import JobScraper from '#src/services/JobScraper.ts';

const main = async () => {
  let scraper: JobScraper | undefined;

  try {
    scraper = await JobScraper.create();

    await scraper.run();

    const jobListings = scraper.getJobs();

    console.log(jobListings);
  } catch (err) {
    console.error(err);
  } finally {
    // Clean up
    if (scraper) await scraper.close();
  }
};

main();
