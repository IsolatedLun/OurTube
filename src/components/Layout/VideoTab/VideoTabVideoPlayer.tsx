import { css } from "@/utils/css/css";
import { T_VideoTab } from "./types";
import { BACKEND_FILE_URL } from "@/consts";
import Flex from "@/components/Modules/Flex/Flex";
import Numeric from "@/components/Modules/Numeric/Numeric";
import { dateToHumanReadableDate } from "@/utils/utils";

export default function VideoTabVideoPlayer({ video } : { video: T_VideoTab }) {
    return (
        <>
            <div className={css("video-tab__video-player", "margin-block-end-1 width-100").class}>
                <video 
                    src={BACKEND_FILE_URL(video.collectionId, video.id, video.video)} 
                    controls={true}
                />
            </div>
            <Flex props={{ justify: 'space-between', grow: true }}>
                <p className="margin-inline-start-1">
                    <Numeric n={video.views} /> <span>{video.views === 1 ? 'view' : 'views'}</span>
                </p>
                <p className="clr-misc-text-muted">{dateToHumanReadableDate(video.created)}</p>
            </Flex>
        </>
    )
}