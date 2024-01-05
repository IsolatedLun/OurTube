import { css } from "@/utils/css/css";
import { T_VideoTab } from "./types";
import { BACKEND_FILE_URL } from "@/consts";
import Flex from "@/components/Modules/Flex/Flex";

export default function VideoTabVideoPlayer({ video } : { video: T_VideoTab }) {
    return (
        <>
            <div className={css("video-tab__video-player", "margin-block-end-1 width-100").class}>
                <video 
                    src={BACKEND_FILE_URL(video.collectionId, video.id, video.video)} 
                    controls={true}
                />
            </div>
            <Flex>
                <p>{video.views} views</p>
                <p>{video.created}</p>
            </Flex>
        </>
    )
}