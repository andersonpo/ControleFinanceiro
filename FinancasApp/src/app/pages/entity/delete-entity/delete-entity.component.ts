import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-delete-entity',
  templateUrl: './delete-entity.component.html',
  styleUrls: ['./delete-entity.component.scss'],
})
export class DeleteEntityComponent implements OnInit {
  @Input() name = '';
  @Output() btnConfirmClick = new EventEmitter();
  @Output() btnCancelClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  btnCancel(): void {
    this.btnCancelClick.emit();
  }

  btnConfirm(): void {
    this.btnConfirmClick.emit();
  }
}
