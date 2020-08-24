export interface ITable {
  rowsPerPage: number;
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
  pretext: string;
  value: any;
  postext: string;
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
