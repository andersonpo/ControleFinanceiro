import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-entity',
  templateUrl: './detail-entity.component.html',
  styleUrls: ['./detail-entity.component.scss'],
})
export class DetailEntityComponent implements OnInit {
  @Input() name: string = '';
  @Output() btnBackClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  btnBack() {
    this.btnBackClick.emit();
  }
}
