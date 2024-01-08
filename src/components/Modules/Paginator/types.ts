import { ListResult } from "pocketbase";

export type T_PaginatedItem = Record<string, any[]>;
export type T_FetchFn = (page: number) => Promise<ListResult<T_PaginatedItem>>;