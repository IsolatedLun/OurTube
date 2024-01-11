import Flex from "../Flex/Flex";
import { css } from "@/utils/css/css";
import { REPLIES_PER_PAGE } from "@/consts";
import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { VideoCommentControls } from "./VideoCommentControls";
import Paginator from "../Paginator/Paginator";
import { T_DeleteFn, T_FetchFn } from "../Paginator/types";
import { pb } from "@/utils/backend";
import VideoCommentSkeleton from "../Skeleton/VideoCommentSkeleton";
import { AddComment } from "@/components/Layout/AddComment/AddComment";
import { VideoContext } from "@/components/Layout/VideoTab/VideoTabComments";
import VideoCommentReply from "./VideoCommentReply/VideoCommentReply";
import { VideoCommentDetails } from "./VideoCommentDetails";
import { T_VideoComment, T_VideoCommentReply } from "./types";
import { Some } from "@/utils/types";
import { AddReply } from "@/components/Layout/AddComment/AddReply";
import { T_ReactSetStateHook } from "@/hooks/types";

export const CommentContext = createContext<Some<{ 
    props: T_VideoComment, onReply: T_ReactSetStateHook<T_VideoCommentReply[]> }
>>(null);

export default function VideoComment(
    { props, onDelete } : { props: T_VideoComment, onDelete: T_DeleteFn }
) {
    const video = useContext(VideoContext);
    const [createdReplies, setCreatedReplies] = useState<T_VideoCommentReply[]>([]);
    const [showReplies, setShowReplies] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);

    function paginateReplies(): T_FetchFn {
        return (page: number) => (
            pb.collection('replies')
                .getList(page, REPLIES_PER_PAGE, {
                    expand: 'channel',
                    filter: `parent="${props.id}"`
                })
        )
    }

    useEffect(() => {
        props.reply_count += 1
    }, [createdReplies])

    return(
        <Flex 
            id={props.id}
            cls={css("video-tab__comment-or-reply")}
            props={{ grow: true, column: true, align: 'start', gap: 2 }}
        >
            <VideoCommentDetails props={props} />

            <VideoCommentControls 
                props={props} 
                showReplies={showReplies} 
                replyToggleHook={setShowReplies} 
                addReplyToggleHook={setShowAddComment}
                onDelete={onDelete}
            />

            {
                showAddComment
                ? (
                    <AddReply comment={props!} props={props} appendReplyFn={setCreatedReplies} />
                ): null
            }

            {
                showReplies
                ? (
                    <Flex 
                        cls={css(null, "padding-inline-start-3")}
                        props={{ column: true, grow: true, gap: 2 }}
                    >
                        <CommentContext.Provider value={{ props, onReply: setCreatedReplies }}>
                            <Paginator 
                                externalItems={createdReplies}
                                fetchFn={paginateReplies()}
                                Component={VideoCommentReply}
                                SkeletonComponent={VideoCommentSkeleton}
                            />
                        </CommentContext.Provider>
                    </Flex>
                )
                : null
            }
        </Flex>
    )
}