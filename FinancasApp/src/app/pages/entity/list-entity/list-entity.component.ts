import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ITable, ITableRow } from '../../../interfaces/itable';

@Component({
  selector: 'app-list-entity',
  templateUrl: './list-entity.component.html',
  styleUrls: ['./list-entity.component.scss'],
})
export class ListEntityComponent implements OnInit, OnChanges {
  @Input() name = 'Entidade';
  @Input() table: ITable = null;
  @Output() btnCreateClick = new EventEmitter();
  @Output() actionClick = new EventEmitter();
  @Output() btnPageClick = new EventEmitter();

  page = 1;
  pageSize = 10;
  totalPages = 0;

  getColSpanPaginated(): number {
    let colspanPaginated = 0;
    this.table.columns.forEach((col) => {
      if (col.visible) {
        colspanPaginated += 1;
      }
    });

    if (this.table.showLineNumber) {
      colspanPaginated += 1;
    }

    if (this.table.actions.buttons.length > 0) {
      colspanPaginated += 1;
    }

    return colspanPaginated;
  }

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.table) {
      this.page = this.table.pageIndex;
      this.pageSize = this.table.pageSize;
      this.totalPages = this.table.pageTotal;
    }
  }

  ngOnInit(): void {}

  btnCreate(): void {
    this.btnCreateClick.emit();
  }

  actClick(action, data?): void {
    this.actionClick.emit({ action, value: data });
  }

  btnLast(): void {
    this.page = this.totalPages;
    this.changePage();
  }

  btnNext(): void {
    this.page = this.page + 1;
    this.changePage();
  }

  btnPrevious(): void {
    this.page = this.page - 1;
    this.changePage();
  }

  btnFirst(): void {
    this.page = 1;
    this.changePage();
  }

  changePage() {
    this.btnPageClick.emit(this.page)
  }
}
