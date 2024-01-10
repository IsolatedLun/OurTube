import React, { useEffect, useState, FC } from "react";
import { T_FetchFn, T_PaginatedItem } from "./types";
import { T_ReactSetStateHook } from "@/hooks/types";


export default function Paginator(
    { fetchFn, skeletonCount = 8, countHook, Component, SkeletonComponent }
    :
    { fetchFn: T_FetchFn, skeletonCount?: number, countHook?: T_ReactSetStateHook<number>
        Component: FC<any>, SkeletonComponent: FC }
) {
    const [items, setItems] = useState<T_PaginatedItem[]>([]);
    const [page, setPage] = useState(0);
    const [isDone, setIsDone] = useState(false);

    async function fetch() {
        const result = await fetchFn(page);
        setItems(prev => [...prev, ...result.items]);

        if(result.totalPages >= page) {
            setIsDone(false);
        }

        if(page === 0 && countHook)
            countHook(result.totalItems);
    }

    useEffect(() => {
        if(!isDone) 
            fetch();
    }, [page]);

    return(
        <>
            { items.map(item => <Component props={item} />) }

            { 
                isDone
                ? null
                : (
                    new Array(skeletonCount).fill(0).map(() => (
                        <div className="width-100" aria-hidden={true}>
                            <SkeletonComponent />
                        </div>
                    ))
                ) 
            }
        </>
    )
}