export default abstract class Task {
  public async run(): Promise<void> {
    try {
      await this.awaken();
      await this.execute();
    } catch (err) {
      console.error(err);
    } finally {
      await this.sleep();
    }
  }

  protected async awaken(): Promise<void> {};

  protected abstract execute(): Promise<void>;

  protected async sleep(): Promise<void> {};
}
