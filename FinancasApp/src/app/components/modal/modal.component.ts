import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() name = '';
  @Input() open = false;
  @Input() width: number = null;
  @Input() height: number = null;
  @Output() actionClose = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  closeModal(): void {
    this.open = false;
    this.actionClose.emit();
  }

  getSizeModal(): object {
    const resultDefault = { 'width.%': 100, 'height.%': 100 };

    if (this.width > 0 && this.height > 0) {
      return { 'width.px': this.width, 'height.px': this.height };
    } else if (this.width > 0 && !this.height) {
      return { 'width.px': this.width, 'height.%': 100 };
    } else if (!this.width && this.height > 0) {
      return { 'width.%': 100, 'height.px': this.height };
    }

    return resultDefault;
  }
}
