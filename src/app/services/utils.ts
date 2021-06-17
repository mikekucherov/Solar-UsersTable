import {BehaviorSubject} from 'rxjs';

export enum LoadingEventTypes {
  UserSave = 'user-save',
  UsersLoading = 'users-loading'
}

export let loading$ = new BehaviorSubject(null);

export const updateLoadingState = (state) => {
  loading$.next(state);
};
