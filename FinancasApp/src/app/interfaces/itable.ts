export interface ITable {
  pageIndex: number;
  pageSize: number;
  pageTotal: number;
  rowsTotal: number;
  showLineNumber: boolean;
  columns: Array<ITableColumn>;
  rows: Array<ITableRow>;
  footer: Array<ITableFooter>;
  actions: ITableAction;
}

export interface ITableRow {
  values: Array<{ value: any; visible: boolean }>;
}

export interface ITableColumn {
  name: string;
  visible: boolean;
  size: number;
}

export interface ITableFooter {
  colspan: number;
  value: any;
}

export interface ITableAction {
  size: number;
  buttons: Array<{
    text: string;
    color: string;
    icon: string;
    iconColor: string;
  }>;
}
