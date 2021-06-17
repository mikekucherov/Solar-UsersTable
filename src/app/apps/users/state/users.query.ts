import { Injectable } from '@angular/core';
import {  Query } from '@datorama/akita';
import {UsersState, UsersStore} from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends Query<UsersState> {
  get users$() {
    return this.select('users');
  }

  constructor(protected store: UsersStore) {
    super(store);
  }
}
