import Flex from "@/components/Modules/Flex/Flex";
import { T_VideoCommentOrReply, T_VideoTab } from "./types";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import { css } from "@/utils/css/css";
import Button from "@/components/Interactibles/Button/Button";
import { pb } from "@/utils/backend";
import { useEffect, useState } from "react";
import { T_FetchFn } from "@/components/Modules/Paginator/types";
import Paginator from "@/components/Modules/Paginator/Paginator";
import VideoCommentSkeleton from "@/components/Modules/Skeleton/VideoCommentSkeleton";
import VideoCommentOrReply from "@/components/Modules/VideoComment/VideoCommentOrReply";
import { AddComment } from "../AddComment/AddComment";

export default function VideoTabComments({ video } : { video: T_VideoTab }) {    
    const [createdComments, setCreatedComments] = useState<T_VideoCommentOrReply[]>([]);
    const [commentCount, setCommentCount] = useState(0);

    function paginateComments(): T_FetchFn {
        return (page: number) => pb.collection<T_VideoCommentOrReply>('comments')
            .getList(page, 16, { 
                expand: 'channel',
                filter: `video="${video.id}" && comment_to=""`,
                sort: 'likes'
            });
    }

    return (
        <Flex cls={css(null, "margin-block-3")} props={{ column: true, align: 'start', grow: true }}>
            <AddComment data={video} addCommentHook={setCreatedComments} />
            <section className="width-100">
                <h2 className="margin-block-end-2">
                    <span>{commentCount + createdComments.length}</span> 
                    &nbsp;
                    <span>{commentCount + createdComments.length === 1 ? 'comment' : 'comments'}</span>
                </h2>
                <Flex 
                    cls={css("video-tab__comments")} 
                    props={{ grow: true, column: true, align: 'start', gap: 4 }}
                >
                    <Paginator 
                        externalItems={createdComments}
                        fetchFn={paginateComments()}
                        countHook={setCommentCount}
                        Component={VideoCommentOrReply}
                        SkeletonComponent={VideoCommentSkeleton} 
                    />
                </Flex>
            </section>
        </Flex>
    )
}