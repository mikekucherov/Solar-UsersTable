export interface User {
  age: number;
  email: string;
  guid: string;
  name: {
    first: string;
    last: string;
  };
  avatar?: string;
  summary?: string;
}

export enum SortingColumnTypes {
  Order = 'order',
  FirstName = 'first-name',
  LastName = 'last-name',
  Age = 'age',
  Avatar = 'avatar',
  Summary = 'summary'
}

export interface TableFilters {
  search: string;
  ageRange: number[];
}
