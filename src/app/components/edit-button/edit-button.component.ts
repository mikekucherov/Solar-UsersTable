import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

interface ConfirmationInfo {
  title: string;
  description: string;
}

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditButtonComponent implements OnInit {

  @Input() isDeleteConfirmation;
  @Input() confirmationInfo: ConfirmationInfo;

  @Output() deleteClick = new EventEmitter();
  @Output() editClick = new EventEmitter();

  popoverState$ = new BehaviorSubject('default');

  isPopupVisible = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  changePopoverState(state): void {
    this.popoverState$.next(state);
    this.cdr.detectChanges();
  }

  closePopover(): void {
    this.isPopupVisible = false;
  }

  changePopoverVisibility(): void {
    this.popoverState$.next('default');
  }

}
