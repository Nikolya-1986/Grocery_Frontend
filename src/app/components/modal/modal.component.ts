import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Grocery } from '../../modules/home/model/grocery.model';
import { modalWindowEffect } from './animations/modal-animation';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    modalWindowEffect.animations
  ]
})
export class ModalComponent {

  @Input() public modalTitle: string = '';
  @Input() public modalBody: string = '';
  @Input() public item!: Grocery;
  @Output() public cancelActionEvent = new EventEmitter<Function>();
  @Output() public confirmActionEvent = new EventEmitter<Function>();

  constructor() { }

  cancelAction(): void {
    this.cancelActionEvent.emit()
  }

  confirmAction(): void {
    this.confirmActionEvent.emit();
  }

}
