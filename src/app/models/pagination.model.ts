export class PaginationModel {
  page:  number;

  pageSize: number;

  pageSizeOptions = [10, 50, 100, 150];

  constructor() {
    this.page = 0;

    this.pageSize = 50;
  }

  getOffSet() {
    return this.pageSize * this.page;
  }
}
