import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text = '';
  @Input() type = 'button';
  @Input() name = '';
  @Input() disabled = false;
  @Input() color = '';
  @Input() icon = '';
  @Input() iconColor = '';
  @Input() showIconRight = false;
  @Input() removePadding = false;
  @Output() actionClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getClass(): object {
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

  buttonClick(): void {
    this.actionClick.emit();
  }
}
