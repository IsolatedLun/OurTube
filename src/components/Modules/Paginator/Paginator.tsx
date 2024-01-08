import React, { useEffect, useState, FC } from "react";
import { T_FetchFn, T_PaginatedItem } from "./types";


export default function Paginator(
    { fetchFn, Component, SkeletonComponent }
    :
    { fetchFn: T_FetchFn, Component: FC<{ props: T_PaginatedItem }>, SkeletonComponent: FC }
) {
    const [items, setItems] = useState<T_PaginatedItem[]>([]);
    const [page, setPage] = useState(0);
    const [isDone, setIsDone] = useState(false);

    async function fetch() {
        const result = await fetchFn(page);
        setItems(prev => [...prev, ...result.items]);

        if(result.totalPages >= page) {
            setIsDone(true);
        }
    }

    useEffect(() => {
        if(isDone) 
            fetch();
    }, [page]);

    return(
        <>
            { items.map(item => <Component props={item} />) }

            { 
                isDone
                ? null
                : (
                    [0, 0, 0, 0].map(() => <SkeletonComponent />)
                ) 
            }
        </>
    )
}