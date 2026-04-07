import type { Job } from '#src/models/Job.ts';
import JobScraper from '#src/services/JobScraper.ts';
import Task from '#src/tasks/Task.ts';

export default class ScrapeJobs extends Task {
  private scraper!: JobScraper;

  public getJobs(): Job[] {
    return this.scraper.getJobs();
  }

  protected async awaken(): Promise<void> {
    this.scraper = await JobScraper.create();
  }

  protected async execute(): Promise<void> {
    await this.scraper.run();
  }

  protected async sleep(): Promise<void> {
    if (this.scraper) await this.scraper.close();
  }
}
