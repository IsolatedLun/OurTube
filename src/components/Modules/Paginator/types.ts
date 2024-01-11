import { T_CollectionItem } from "@/utils/types";
import { ListResult } from "pocketbase";

export type T_PaginatedItem = Record<string, any[]>;
export type T_FetchFn = (page: number) => Promise<ListResult<T_CollectionItem>>;
export type T_DeleteFn = (props: T_CollectionItem) => void;