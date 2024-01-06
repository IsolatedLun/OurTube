import { css } from "@/utils/css/css";
import { useEffect, useState } from "react";
import { T_VideoTab } from "./types";
import { pb } from "@/utils/backend";
import { BACKEND_FILE_URL } from "@/consts";
import Flex from "@/components/Modules/Flex/Flex";
import { Some } from "@/utils/types";
import Profile from "@/components/Modules/Profile/Profile";
import Button from "@/components/Interactibles/Button/Button";
import Numeric from "@/components/Modules/Numeric/Numeric";
import VideoTabControls from "./VideoTabControls";
import VideoTabVideoPlayer from "./VideoTabVideoPlayer";
import VideoTabVideoDetails from "./VideoTabVideoDetails";

export default function VideoTab({ id } : { id: string }) {
    const [video, setVideo] = useState<Some<T_VideoTab>>(null);

    useEffect(() => {
        pb.collection<T_VideoTab>('videos')
            .getOne(id, { expand: 'channel' })
            .then(d => setVideo(d));
    }, [])

    return (
        <div className={css("video-tab", "grid gap-3").class}>
            {
                video
                ? (
                    <section>
                        <Flex props={{ align: 'start', column: true }}>
                            <VideoTabVideoPlayer video={video} />
                            <div className="margin-inline-1 width-100">
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
                        </Flex>
                    </section>
                )
                : null
            }
            <section className={css("video-tab__others").class}>
                <p>SUIII</p>
            </section>
        </div>
    )
}