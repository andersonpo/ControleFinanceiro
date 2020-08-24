import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITable } from '../../../interfaces/itable';

@Component({
  selector: 'app-list-entity',
  templateUrl: './list-entity.component.html',
  styleUrls: ['./list-entity.component.scss'],
})
export class ListEntityComponent implements OnInit {
  @Input() name: string = 'Entidade';
  @Input() table: ITable = null;
  @Output() btnCreateClick = new EventEmitter();
  @Output() actionClick = new EventEmitter();

  page: number = 1;
  pageSize: number = 10;
  colspanPaginated: number = 0;
  totalPages: number = 0;

  getRowsPaginated() {
    if (!this.table || !this.table?.rows || this.table?.rows?.length <= 0) {
      console.log('getRowsPaginated NO ROWS');
      return null;
    }

    this.totalPages = Math.ceil(this.table.rows.length / this.pageSize);
    this.pageSize = this.table.rowsPerPage || 10;
    this.colspanPaginated = 0;
    this.table.columns.forEach((col) => {
      if (col.visible) {
        this.colspanPaginated += 1;
      }
    });

    if (this.table.showLineNumber) {
      this.colspanPaginated += 1;
    }

    if (this.table.actions.buttons.length > 0) {
      this.colspanPaginated += 1;
    }

    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    if (this.table.rows.length >= start) {
      return this.table.rows.slice(start, end);
    } else {
      console.log(
        'getRowsPaginated NOK - start > rows',
        start,
        this.table.rows.length
      );
      return null;
    }
  }

  constructor() {}

  ngOnInit(): void {}

  btnCreate() {
    this.btnCreateClick.emit();
  }

  actClick(action, data?) {
    this.actionClick.emit({ action: action, value: data });
  }

  btnLast() {
    this.page = this.totalPages;
  }

  btnNext() {
    this.page = this.page + 1;
  }

  btnPrevious() {
    this.page = this.page - 1;
  }

  btnFirst() {
    this.page = 1;
  }
}
