import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users-table/users-table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NgxfModule} from '@ngxf/platform';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { EditButtonComponent } from './edit-button/edit-button.component';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import { TableFilterComponent } from './table-filter/table-filter.component';
import {NzSliderModule} from 'ng-zorro-antd/slider';

const COMPONENTS = [
  UsersTableComponent,
  EditButtonComponent,
  UserEditModalComponent
];



@NgModule({
  declarations: [COMPONENTS, TableFilterComponent],
  imports: [
    CommonModule,
    NzTableModule,
    NgxfModule,
    NzButtonModule,
    NzIconModule,
    NzPopoverModule,
    NzModalModule,
    NzInputModule,
    NzInputNumberModule,
    NzFormModule,
    NzAvatarModule,
    NzSliderModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [COMPONENTS, TableFilterComponent]
})
export class ComponentsModule { }
