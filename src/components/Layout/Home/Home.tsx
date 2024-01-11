"use client";

import VideoPreview from "@/components/Modules/VideoPreview/VideoPreview";
import HomeAside from "./HomeAside";
import { css } from "@/utils/css/css";
import { useEffect, useState } from "react";
import { T_VideoPreview } from "@/components/Modules/VideoPreview/types";
import { pb } from "@/utils/backend";
import { T_FetchFn } from "@/components/Modules/Paginator/types";
import Paginator from "@/components/Modules/Paginator/Paginator";
import VideoPreviewSkeleton from "@/components/Modules/Skeleton/VideoPreviewSkeleton";

export default function Home() {
    const [videos, setVideos] = useState<T_VideoPreview[]>([]);

    function paginateVideos(): T_FetchFn {
        return (page: number) => (
            pb.collection<T_VideoPreview>('videos').getList(page, 16, { expand: "channel" })
        )
    }

    return(
        <>
            <HomeAside />
            <div className={css("video-previews-grid", "grid gap-2").class}>
                <Paginator 
                    fetchFn={paginateVideos()} 
                    Component={VideoPreview} 
                    SkeletonComponent={VideoPreviewSkeleton} 
                />
            </div>
        </>
    )
}