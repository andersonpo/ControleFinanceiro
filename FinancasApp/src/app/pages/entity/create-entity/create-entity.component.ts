import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss'],
})
export class CreateEntityComponent implements OnInit {
  @Input() name: string = 'Entidade';
  @Output() btnBackClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  btnBack() {
    this.btnBackClick.emit();
  }
}
