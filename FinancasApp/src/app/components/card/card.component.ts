import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() name = '';
  @Input() width: number = null;
  @Input() height: number = null;

  constructor() {}

  ngOnInit(): void {}

  getSizeCard(): object {
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
