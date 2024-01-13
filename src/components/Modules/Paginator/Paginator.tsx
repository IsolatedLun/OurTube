import React, { useEffect, useState, useRef } from "react";
import { T_Paginator } from "./types";
import { DEFAULT_SKELETON_COUNT } from "@/consts";

export default function Paginator({ props } : { props: T_Paginator }) {
    const [page, setPage] = useState(1);
    const [isDone, setIsDone] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const intersectionBox = useRef(null);

    async function fetch() {
        setIsFetching(true);
        const result = await props.fetchFn(page);
        props.onFetchItems(result.items);

        if(page + 1 > result.totalPages) {
            setIsDone(true);
        }
        setIsFetching(false);
    }

    useEffect(() => {
        let options = { rootMargin: "0px", threshold: 1.0};
        const observer = new IntersectionObserver(
            (entries) => {
                    for(let i = 0; i < entries.length; i++) {
                        if(entries[i].isIntersecting && !isFetching) {
                            setPage(prev => prev + 1)
                            fetch();
                        }
                }
            }, options)

        if(intersectionBox.current)
            observer.observe(intersectionBox.current);

        return () => observer.disconnect();
    }, [intersectionBox, isFetching])

    return(
        <>
            { 
                isDone
                ? null
                : (
                    new Array(props?.skeletonCount ?? DEFAULT_SKELETON_COUNT).fill(0).map((_, i) => (
                        <div className="width-100" aria-hidden={true}>
                            {
                                i === 0
                                ? (
                                    <div 
                                        ref={intersectionBox} 
                                        aria-hidden='true' 
                                        className="intersection-observer" 
                                    />
                                ): null
                            }
                            <props.SkeletonComponent />
                        </div>
                    ))
                ) 
            }
        </>
    )
}