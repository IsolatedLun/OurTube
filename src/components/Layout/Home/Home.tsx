"use client";

import VideoPreview from "@/components/Modules/VideoPreview/VideoPreview";
import HomeAside from "./HomeAside";
import { css } from "@/utils/css/css";
import { useEffect, useState } from "react";
import { T_VideoPreview } from "@/components/Modules/VideoPreview/types";
import { pb } from "@/utils/backend";

export default function Home() {
    const [videos, setVideos] = useState<T_VideoPreview[]>([]);

    useEffect(() => {
        pb.collection<T_VideoPreview>('videos').getList(1, 16, { expand: "channel" })
            .then(d => setVideos(d.items))
    }, [])

    return(
        <>
            <HomeAside />
            <div className={css("video-previews-grid", "grid").class}>
                {
                    videos.map(video => <VideoPreview props={video} />)
                }
            </div>
        </>
    )
}