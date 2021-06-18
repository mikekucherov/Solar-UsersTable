import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from './users.service';
import {map, tap} from 'rxjs/operators';
import {TableFilters, User} from './interfaces/users.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {isBetweenRange, loading$, LoadingEventTypes, updateLoadingState} from '../../services/utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  tableFilters$: BehaviorSubject<TableFilters> = new BehaviorSubject({
    search: '',
    ageRange: []
  });

  users$: Observable<User[]> = combineLatest([this.usersService.users$, this.tableFilters$]).pipe(map(([users, filters]) => {
    let performedUsers = users;

    if (filters.search) {
      performedUsers = performedUsers.filter(user => {
        const fullName = `${user.name.first} ${user.name.last}`.toLocaleLowerCase();
        return fullName.match(filters.search.toLocaleLowerCase());
      });
    }

    if (filters.ageRange.length) {
      performedUsers = performedUsers.filter(user => isBetweenRange(user.age, filters.ageRange));
    }

    return performedUsers;
  }));

  loading$ = loading$;

  loadingEventTypes = LoadingEventTypes;

  editableUser$ = combineLatest([this.users$, this.activatedRoute.queryParamMap]).pipe(
    map(([users, paramMap]) => {
      // convert new user's guid to string because generated id's are numbers
      return users.find(u => u.guid.toString() === paramMap.get('user'));
    })
  );

  isCreateUserModal = false;

  constructor(private usersService: UsersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.usersService.initUsers();
  }

  createUser() {
    this.isCreateUserModal = true;
  }

  // Using user's guid as a query parameter let us remember editable user after page reload
  editUserHandler(user: User): void {
    this.router.navigate([], {
      queryParams: {
        user: user.guid
      },
      queryParamsHandling: 'merge'
    });
  }

  closeEditModal(): void {
    this.router.navigate([], {
      queryParams: {
        user: null
      },
      queryParamsHandling: 'merge'
    });

    this.isCreateUserModal = false;
  }

  saveUser(formValue: {
          firstName: string;
          lastName: string;
          age: number;
          email: string;
        }, editableUser?: User): void {

    let body;

    if (!editableUser) {
      body = {
        email: formValue.email,
        name: {
          first: formValue.firstName,
          last: formValue.lastName
        },
        age: formValue.age
      };

      // Here's preloader state update - no service, just a global callback
      updateLoadingState(LoadingEventTypes.UserSave);

      this.usersService.createUser(body).subscribe(() => {
        updateLoadingState(null);
        this.closeEditModal();
      });
    } else {
      body = {
        ...editableUser,
        name: {
          first: formValue.firstName,
          last: formValue.lastName
        },
        age: formValue.age
      };

      updateLoadingState(LoadingEventTypes.UserSave);

      this.usersService.saveUser(body).subscribe(() => {
        updateLoadingState(null);
        this.closeEditModal();
      });
    }
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user.guid).subscribe();
  }
}
