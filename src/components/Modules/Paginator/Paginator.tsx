import React, { useEffect, useState, useRef } from "react";
import { T_Paginator } from "./types";
import { DEFAULT_SKELETON_COUNT } from "@/consts";

export default function Paginator({ props } : { props: T_Paginator }) {
    const [page, setPage] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);

    const intersectionBox = useRef(null);

    async function fetch() {
        const result = await props.fetchFn(page);
        props.onFetchItems(result.items);

        if(page >= result.totalPages) {
            setIsDone(true);
        }
    }


    useEffect(() => {
        if(!isDone && page > 0) 
            fetch();

        let options = { rootMargin: "0px", threshold: 1.0};
        const observer = new IntersectionObserver(
            (entries) => {
                if(!hasIntersected) {
                    entries.forEach(entry => entry.isIntersecting ? setPage(page + 1) : null);
                    setHasIntersected(true);
                }
            }, options)

        observer.observe(intersectionBox.current!);
    }, [page]);

    useEffect(() => {
        setHasIntersected(false)
    }, [page])

    return(
        <>
            <div ref={intersectionBox} aria-hidden='true' className="intersection-observer" />
            { 
                isDone
                ? null
                : (
                    new Array(props?.skeletonCount ?? DEFAULT_SKELETON_COUNT).fill(0).map(() => (
                        <div className="width-100" aria-hidden={true}>
                            <props.SkeletonComponent />
                        </div>
                    ))
                ) 
            }
        </>
    )
}