import { css } from "@/utils/css/css";
import { T_VideoPreview } from "./types";
import { BACKEND_FILE_URL, MAX_VIDEO_TITLE_LINES, CHANNEL_URL, VIDEO_URL } from "@/consts";
import Flex from "../Flex/Flex";
import Numeric from "../Numeric/Numeric";
import Link from "next/link";
import Profile from "../Profile/Profile";
import { dateToHumanReadableDateSpan } from "@/utils/utils";

export default function VideoPreview({ props } : { props: T_VideoPreview }) {
    console.log(props)
    return (
        <Flex cls={css("video-preview")} props={{ column: true, align: 'start' }}>
            <Link href={VIDEO_URL(props.id)}>
                <img 
                    className={css(null, "video-preview__thumbnail").class}

                    src={BACKEND_FILE_URL(props.collectionId, props.id, props.thumbnail)} 
                    alt={"Thumbnail of " + props.title} 
                />
            </Link>
            <Flex cls={css("video-preview__details")} props={{ align: 'start', gap: 1, grow: true }}>
                <Link href={CHANNEL_URL(props.expand.channel.id)}>
                    <Profile 
                        url={BACKEND_FILE_URL(
                            props.expand.channel.collectionId, 
                            props.expand.channel.id, 
                            props.expand.channel.profile
                        )} 
                        alt={"Profile of" + props.expand.channel.name}
                        variant="video-preview"
                    />
                </Link>
                
                <div className={css("video-preview__items", "width-100").class}>
                    <p 
                        className={css(null, "margin-block-end-1 text-ellipsis-" + MAX_VIDEO_TITLE_LINES).class}>
                        {props.title}
                    </p>

                    <Flex 
                        cls={css(null, "width-100 fs-350 clr-misc-text-muted")} 
                        props={{ justify: 'space-between' }}
                    >
                        <p><Numeric n={props.views} /> views</p>
                        <p>{dateToHumanReadableDateSpan(props.created)}</p>
                    </Flex>
                </div>
            </Flex>
        </Flex>
    )
}