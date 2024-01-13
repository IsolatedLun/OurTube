import { T_ReactSetStateHook } from "@/hooks/types";
import { T_CollectionItem } from "@/utils/types";
import { ListResult } from "pocketbase";
import React from "react";


export type T_FetchFn = (page: number) => Promise<ListResult<T_CollectionItem>>;
export interface T_Paginator {
    Component: React.FC<any & { props: any }>;
    SkeletonComponent: React.FC;

    fetchFn: T_FetchFn;
    onFetchItems: (items: any[]) => void;

    skeletonCount?: number;
}
