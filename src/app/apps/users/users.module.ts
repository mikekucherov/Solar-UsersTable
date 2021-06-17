import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersRoutingModule} from './users-routing.module';
import {ComponentsModule} from '../../components/components.module';
import {UsersService} from './users.service';
import {NgxfModule} from '@ngxf/platform';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ComponentsModule,
    NgxfModule,
  ],
  providers: [UsersService]
})
export class UsersModule { }
