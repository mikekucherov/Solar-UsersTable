import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './interfaces/users.entity';
import {UsersQuery} from './state/users.query';
import {map, take, tap} from 'rxjs/operators';
import {UsersStore} from './state/users.store';
import {RequestService} from '../../services/request.service';

@Injectable()
export class UsersService {
  get users$() {
    return this.usersQuery.users$.pipe(map(usersList => this.performUsers(usersList)));
  }

  constructor(private http: HttpClient,
              private usersQuery: UsersQuery,
              private usersStore: UsersStore,
              private requestService: RequestService
  ) {
  }

  async initUsers() {
    const users = (await this.fetchUsers()
      .pipe(
        take(1))
      .toPromise()) as any;

    this.usersStore.update({
      users
    });
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get('assets/mates.json') as Observable<User[]>;
  }

  performUsers(users: User[]) {
    return users.map(user => {
      return {
        ...user,
        avatar: 'assets/avatar.png',
        summary: `${user.name.first.substr(0, 1)}.${user.name.last.substr(0, 1)} ${user.email}`
      };
    });
  }

  createUser(body) {
    return this.requestService.createUserRequest(body);
  }

  saveUser(body) {
    return this.requestService.saveUserRequest(body);
  }

  deleteUser(userId) {
    return this.requestService.deleteUserRequest(userId);
  }
}
