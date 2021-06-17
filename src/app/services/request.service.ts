import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {UsersStore} from '../apps/users/state/users.store';
import {User} from '../apps/users/interfaces/users.entity';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private usersStore: UsersStore) { }

  createUserRequest(body) {
    const currentStore = this.usersStore.getValue();

    return of('CREATE').pipe(delay(1500), tap(() => {
      this.usersStore.update({
        users: currentStore.users.concat({
          ...body,
          guid: currentStore.users.length + 1
        })
      });
    }));
  }

  saveUserRequest(body: User) {
    const currentStore = this.usersStore.getValue();

    return of('SAVE').pipe(delay(1500), tap(() => {
      this.usersStore.update({
        users: currentStore.users.map(user => user.guid === body.guid ? body : user)
      });
    }));
  }

  deleteUserRequest(userId) {
    const currentStore = this.usersStore.getValue();

    return of('DELETE').pipe(delay(1500), tap(() => {
      this.usersStore.update({
        users: currentStore.users.filter(user => user.guid !== userId)
      });
    }));
  }
}
