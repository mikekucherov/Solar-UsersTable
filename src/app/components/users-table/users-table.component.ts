import {Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {SortingColumnTypes, User} from '../../apps/users/interfaces/users.entity';

interface TableUser extends User {
  index: number;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements OnInit {

  sortingColumnTypes = SortingColumnTypes;

  listOfColumn = [
    {
      id: SortingColumnTypes.Order,
      title: '#',
      compare: (a: TableUser, b: TableUser) => a.index - b.index,
      priority: false
    },
    {
      id: SortingColumnTypes.FirstName,
      title: 'First Name',
      compare: (a: TableUser, b: TableUser) => a.name.first > b.name.first ? 1 : -1,
      priority: false
    },
    {
      id: SortingColumnTypes.LastName,
      title: 'Last Name',
      compare: (a: TableUser, b: TableUser) => a.name.last > b.name.last ? 1 : -1,
      priority: false
    },
    {
      id: SortingColumnTypes.Age,
      title: 'Age',
      compare: (a: TableUser, b: TableUser) => a.age - b.age,
      priority: 3
    },
    {
      id: SortingColumnTypes.Avatar,
      title: 'Avatar'
    },
    {
      id: SortingColumnTypes.Summary,
      title: 'Summary'
    },
    // Trick to add an empty column for an edit button
    {}
  ];

  @Input() usersList: User[];

  @Output() createUser = new EventEmitter();
  @Output() editUser = new EventEmitter();
  @Output() deleteUser = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  performUsers(users): TableUser[] {
    return users.map((user, i) => {
      return {
        ...user,
        index: i + 1
      };
    });
  }

}
