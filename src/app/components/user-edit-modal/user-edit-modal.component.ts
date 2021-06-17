import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {User} from '../../apps/users/interfaces/users.entity';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingEventTypes, updateLoadingState} from '../../services/utils';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditModalComponent implements OnInit {
  @Input() set editableUser(value: User) {
    this.createForm(value);
    this._editableUser = value;
  }

  _editableUser: User;

  userForm: FormGroup;

  @Input() isVisible: boolean;
  @Input() isLoading: boolean;

  @Output() closeModal = new EventEmitter();
  @Output() saveUser = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(user?: User): void {
    this.userForm = this.fb.group({
      firstName: [user?.name.first || '', [Validators.required]],
      lastName: [user?.name.last || '', [Validators.required]],
      email: [user?.email || '', [Validators.required, Validators.email]],
      age: [user?.age || 0, [Validators.required, Validators.min(1)]]
    });
  }

  onFormSubmit(form: FormGroup): void {
    this.saveUser.emit(form.value);
  }
}
