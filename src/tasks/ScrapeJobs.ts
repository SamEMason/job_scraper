import type { Job } from '#src/models/Job.ts';
import JobScraper from '#src/services/JobScraper.ts';

export class ScrapeJobs {
  private scraper!: JobScraper;

  public async run(): Promise<void> {
    try {
      await this.awaken();
      await this.scraper.run();
    } catch (err) {
      console.error(err);
    } finally {
      await this.sleep();
    }
  }

  public getJobs(): Job[] {
    return this.scraper.getJobs();
  }

  private async awaken(): Promise<void> {
    this.scraper = await JobScraper.create();
  }

  private async sleep(): Promise<void> {
    if (this.scraper) await this.scraper.close();
  }
}
