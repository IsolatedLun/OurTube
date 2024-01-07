import { css } from "@/utils/css/css";
import { useEffect, useState } from "react";
import { T_VideoTab } from "./types";
import { pb } from "@/utils/backend";
import { BACKEND_FILE_URL } from "@/consts";
import Flex from "@/components/Modules/Flex/Flex";
import { Some } from "@/utils/types";
import Profile from "@/components/Modules/Profile/Profile";
import VideoTabControls from "./VideoTabControls";
import VideoTabVideoPlayer from "./VideoTabVideoPlayer";
import VideoTabVideoDetails from "./VideoTabVideoDetails";
import VideoPreview from "@/components/Modules/VideoPreview/VideoPreview";
import { T_VideoPreview } from "@/components/Modules/VideoPreview/types";
import VideoTabComments from "./VideoTabComments";
import VideoTabDescription from "./VideoTabDescription";

export default function VideoTab({ id } : { id: string }) {
    const [video, setVideo] = useState<Some<T_VideoTab>>(null);
    const [videos, setVideos] = useState<T_VideoPreview[]>([]);

    useEffect(() => {
        pb.collection<T_VideoTab>('videos')
            .getOne(id, { expand: 'channel' })
            .then(d => {
                setVideo(d);
                pb.collection('videos').update(id, { views: d.views + 1 });
            });

        pb.collection<T_VideoPreview>('videos').getList(1, 16, { expand: "channel" })
            .then(d => setVideos(d.items.filter(x => x.id !== id)));
    }, [])

    return (
        <div className={css("video-tab", "grid gap-3").class}>
            {
                video
                ? (
                    <section>
                        <Flex props={{ align: 'start', column: true }}>
                            <VideoTabVideoPlayer video={video} />
                            <div 
                                className={css(null, "margin-inline-1 margin-block-end-1 width-100").class}
                            >
                                <Flex 
                                    cls={css(null, "margin-block-start-1")} 
                                    props={{ align: 'start', gap: 2 }}
                                >
                                    <Profile 
                                        alt={"Profile of " + video.expand.channel.name}
                                        url={BACKEND_FILE_URL(
                                            video.expand.channel.collectionId,
                                            video.expand.channel.id,
                                            video.expand.channel.profile
                                        )} 
                                        variant="video-tab"
                                    />
                                    <h2>{video.title}</h2>
                                </Flex>
                                <VideoTabVideoDetails video={video} />
                                <VideoTabControls video={video} />
                            </div>
                            
                            <VideoTabDescription video={video} />
                            <VideoTabComments video={video} />
                        </Flex>
                    </section>
                )
                : null
            }
            <section className={css("video-tab__others").class}>
                <div className={css("video-previews-grid", "grid").class}>
                    {
                        videos.map(video => <VideoPreview props={video} />)
                    }
                </div>
            </section>
        </div>
    )
}