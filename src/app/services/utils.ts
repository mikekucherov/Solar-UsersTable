import {BehaviorSubject} from 'rxjs';

export enum LoadingEventTypes {
  UserSave = 'user-save',
  UsersLoading = 'users-loading'
}

// There's some experimental thing. The idea is create the simpliest object that holds current loading event.
// The best thing in this approach that you don't have to inject services and can use this object through the whole project.
export const loading$ = new BehaviorSubject(null);

export const updateLoadingState = (state) => {
  loading$.next(state);
};

export const isBetweenRange = (value: number, range: number[]) => {
  return range[0] <= value && value <= range[1];
};
