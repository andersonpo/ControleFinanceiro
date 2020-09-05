export default interface IResponse {
  statusCode?: number;
  message?: string;
  token?: string;
  result?: any;
  pageIndex?: number;
  pageSize?: number;
  pageTotal?: number;
  rowsTotal?: number;
}
