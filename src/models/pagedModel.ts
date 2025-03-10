

export interface IPagedResponse<T> {
    items: Array<T>;
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}
  