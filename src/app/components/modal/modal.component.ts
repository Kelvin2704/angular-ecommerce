import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() title?: string = '';
  @Input() message: string = '';
  @Input() cancelText:string = 'Cancel'
  @Input() confirmText:string = 'Confirm'
  @Input() showModal: boolean = false;
  @Input() showActions:boolean = true;
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();

  closeModal():void{
    this.onCancel.emit()
    this.cancelText
  };
  stopPropagation(event:Event){
    event.stopPropagation()
  };
  confirmAction():void{
    this.onConfirm.emit();
    this.confirmText;
  }
  
}
