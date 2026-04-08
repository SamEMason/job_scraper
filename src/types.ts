import Filter from '#src/Filter.ts';

export type Department = (typeof Filter.dept)[keyof typeof Filter.dept];

type UID = string;
type ParamKey = string;
type Timestamp = number;

interface DeptFilter {
  uid: UID;
  discoveredAt: Timestamp;
  seenUnchangedAt: Timestamp;
  history: DeptFilterHistory[];
}

interface DeptFilterHistory {
  uid: string;
  discoveredAt: Timestamp;
  replacedAt: Timestamp;
}

export type DeptFiltersStore = Record<Department, DeptFilter>;

export type DeptFiltersData = {
  paramKey: ParamKey;
  filters: DeptFiltersStore;
};
