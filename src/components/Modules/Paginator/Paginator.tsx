import React, { useEffect, useState, FC } from "react";
import { T_FetchFn, T_PaginatedItem } from "./types";
import { T_ReactSetStateHook } from "@/hooks/types";
import { Some, T_CollectionItem } from "@/utils/types";


export default function Paginator(
    { fetchFn, skeletonCount = 8, externalItems = null, countHook, Component, SkeletonComponent }
    :
    { fetchFn: T_FetchFn, skeletonCount?: number, externalItems?: Some<any[]>,
        countHook?: T_ReactSetStateHook<number>, Component: FC<any>, SkeletonComponent: FC }
) {
    const [items, setItems] = useState<T_CollectionItem[]>([]);
    const [page, setPage] = useState(0);
    const [isDone, setIsDone] = useState(false);

    async function fetch() {
        const result = await fetchFn(page);
        setItems(prev => [...prev, ...result.items]);

        if(result.totalPages >= page) {
            setIsDone(true);
        }

        if(page === 0 && countHook)
            countHook(result.totalItems);
    }

    function removeItem(props: T_CollectionItem) {
        setItems(prev => prev.filter(x => x.id !== props.id))
    }

    useEffect(() => {
        if(!isDone) 
            fetch();
    }, [page]);

    useEffect(() => {
        if(externalItems)
            setItems([...externalItems, ...items]);
    }, [externalItems])

    return(
        <>
            { items.map(item => <Component props={item} onDelete={removeItem} />) }

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