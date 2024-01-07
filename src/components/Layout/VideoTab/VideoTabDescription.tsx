import Card from "@/components/Modules/Card/Card";
import { T_VideoTab } from "./types";
import { css } from "@/utils/css/css";
import { useEffect, useRef, useState } from "react";
import { calculateLineCount, truncateToLineCount } from "@/utils/utils";
import Button from "@/components/Interactibles/Button/Button";

export default function VideoTabDescription({ video } : { video: T_VideoTab }) {
    if(!video.description) {
        return "";
    }

    const [doExpand, setDoExpand] = useState(false) // enables the ability to expand;
    const [expand, setExpand] = useState(false);
    const descriptionRef = useRef(null);

    useEffect(() => {
        window.addEventListener('resize', checkLineCount);
        checkLineCount();
        
        () => {
            window.removeEventListener('resize', checkLineCount);
        }
    }, [])

    function checkLineCount() {
        const articleTag = descriptionRef.current! as HTMLElement;
        setDoExpand(calculateLineCount(articleTag, 16) > 3);
    }

    return (
        <Card cls={css("video-tab__description", "padding-block-1 padding-inline-2 fs-350 width-100")}>
            <article ref={descriptionRef}>
                {
                    doExpand
                    ? (
                        <>
                            <div className={expand ? "" : "text-ellipsis-3"}>
                                {video.description}
                            </div>
                            <Button button={{
                                cls: css(null, "margin-block-start-1"),
                                variant: 'secondary',
                                attachments: ['block', 'small-pad'],
                                onClick: () => setExpand(prev => !prev)
                            }}>{expand ? "Close" : "Expand"}</Button>
                        </>
                    )
                    : video.description
                }
            </article>
        </Card>
    )
}