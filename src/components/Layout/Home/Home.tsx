"use client";

import VideoPreview from "@/components/Modules/VideoPreview/VideoPreview";
import HomeAside from "./HomeAside";
import { css } from "@/utils/css/css";
import { useState } from "react";
import { T_VideoPreview } from "@/components/Modules/VideoPreview/types";
import Paginator from "@/components/Modules/Paginator/Paginator";
import VideoPreviewSkeleton from "@/components/Modules/Skeleton/VideoPreviewSkeleton";
import { paginateVideos } from "@/utils/backend/video";

export default function Home() {
    const [videos, setVideos] = useState<T_VideoPreview[]>([]);

    return(
        <>
            <HomeAside />
            <div className={css("video-previews-grid", "grid gap-2").class}>
                {videos.map(video => <VideoPreview key={video.id} props={video} />)}

                <Paginator props={{
                    fetchFn: paginateVideos(),
                    Component: VideoPreview,
                    SkeletonComponent: VideoPreviewSkeleton,
                    onFetchItems: (items) => setVideos((prev) => [...prev, ...items]) 
                }} />
            </div>
        </>
    )
}