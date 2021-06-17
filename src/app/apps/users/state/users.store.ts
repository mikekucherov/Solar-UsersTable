import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {User} from '../interfaces/users.entity';

export interface UsersState {
  users: User[];
}

export function createInitialState(): UsersState {
  return {
    users: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users', resettable: true })
export class UsersStore extends Store<UsersState> {
  constructor() {
    super(createInitialState());
  }
}
