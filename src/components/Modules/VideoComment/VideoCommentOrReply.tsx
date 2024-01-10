import { T_VideoCommentOrReply } from "@/components/Layout/VideoTab/types";
import Flex from "../Flex/Flex";
import { css } from "@/utils/css/css";
import Profile from "../Profile/Profile";
import { BACKEND_FILE_URL, CHANNEL_URL, REPLIES_PER_PAGE } from "@/consts";
import { useState } from "react";
import { dateToHumanReadableDateSpan } from "@/utils/utils";
import Link from "next/link";
import { VideoCommentControls } from "./VideoCommentControls";
import Paginator from "../Paginator/Paginator";
import { T_FetchFn } from "../Paginator/types";
import { pb } from "@/utils/backend";
import VideoCommentSkeleton from "../Skeleton/VideoCommentSkeleton";

export default function VideoCommentOrReply({ props } : { props: T_VideoCommentOrReply }) {
    const [showReplies, setShowReplies] = useState(false);

    function paginateReplies(): T_FetchFn {
        return (page: number) => (
            pb.collection('comments')
                .getList(page, REPLIES_PER_PAGE, {
                    expand: 'channel, reply_to.channel',
                    filter: `comment_to="${props.id}"`
                })
        )
    }

    return(
        <Flex 
            id={props.id}
            props={{ grow: true, column: true, align: 'start', gap: 2 }}
        >
            <Flex cls={css("video-tab__comment")} props={{ grow: true, align: 'start' }}>
                <Link href={CHANNEL_URL(props.expand.channel.id)}>
                    <Profile url={BACKEND_FILE_URL(
                        props.expand.channel.collectionId,
                        props.expand.channel.id,
                        props.expand.channel.profile
                    )} alt={"Profile of " + props.expand.channel.name} variant="comment" />
                </Link>

                <Flex cls={css("comment__details")} props={{ grow: true, column: true, align: 'start' }}>
                    <Flex 
                        cls={css(null, 'clr-misc-text-muted')} 
                        props={{ grow: true, align: 'center', justify: 'space-between' }}
                    >
                        <p>{props.expand.channel.name}</p>
                        <p className="fs-350">{dateToHumanReadableDateSpan(props.created)}</p>
                    </Flex>
                    <p>{props.text}</p>
                </Flex>
            </Flex>

            <VideoCommentControls 
                props={props} 
                showReplies={showReplies} 
                replyToggleHook={setShowReplies} 
            />

            {
                (props.comment_to === "" && showReplies)
                ? (
                    <Flex 
                        cls={css(null, "padding-inline-start-3")}
                        props={{ column: true, grow: true, gap: 2 }}
                    >
                        <Paginator 
                            fetchFn={paginateReplies()}
                            Component={VideoCommentOrReply}
                            SkeletonComponent={VideoCommentSkeleton}
                        />
                    </Flex>
                )
                : null
            }
        </Flex>
    )
}