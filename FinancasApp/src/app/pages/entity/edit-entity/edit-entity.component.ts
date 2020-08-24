import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss'],
})
export class EditEntityComponent implements OnInit {
  @Input() name: string = '';
  @Output() btnBackClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  btnBack() {
    this.btnBackClick.emit();
  }
}
