import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from './users.service';
import {map, tap} from 'rxjs/operators';
import {User} from './interfaces/users.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {loading$, LoadingEventTypes, updateLoadingState} from '../../services/utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$ = this.usersService.users$.pipe(tap(v => console.log('USERS', v)));

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
