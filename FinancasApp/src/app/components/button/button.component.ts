import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() type: string = 'button';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() color: string = '';
  @Input() icon: string = '';
  @Input() iconColor: string = '';
  @Input() showIconRight: boolean = false;
  @Input() removePadding: boolean = false;
  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getClass() {
    const colorLower = this.color ? this.color.toLocaleLowerCase() : '';
    const result = {
      'button-preto': colorLower === 'preto',
      'button-cinza': colorLower === 'cinza',
      'button-azul': colorLower === 'azul',
      'button-vermelho': colorLower === 'vermelho',
      'button-amarelo': colorLower === 'amarelo',
      'button-verde': colorLower === 'verde',
      'button-component-padding': this.removePadding === false,
    };

    return result;
  }

  buttonClick() {
    this.onClick.emit();
  }
}
