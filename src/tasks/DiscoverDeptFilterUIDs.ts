import Task from '#src/tasks/Task.ts';
import Filter from '#src/Filter.ts';

type Department = (typeof Filter.dept)[keyof typeof Filter.dept];

interface DeptFilter {
  uid: string;
  discovered_at: Date;
  history: DeptFilterHistory[];
}

interface DeptFilterHistory {
  uid: string;
  discovered_at: Date;
  replaced_at: Date;
}

export class DiscoverDeptFilterUIDs extends Task {
  private filters: Record<Department, DeptFilter> = {};

  protected async awaken(): Promise<void> {}

  protected async execute(): Promise<void> {}

  protected async sleep(): Promise<void> {}
}
