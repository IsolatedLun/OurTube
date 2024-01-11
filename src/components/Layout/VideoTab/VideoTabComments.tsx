import Flex from "@/components/Modules/Flex/Flex";
import { T_VideoTab } from "./types";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import { css } from "@/utils/css/css";
import Button from "@/components/Interactibles/Button/Button";
import { pb } from "@/utils/backend";
import { useEffect, useState } from "react";
import { T_FetchFn } from "@/components/Modules/Paginator/types";
import Paginator from "@/components/Modules/Paginator/Paginator";
import VideoCommentSkeleton from "@/components/Modules/Skeleton/VideoCommentSkeleton";
import VideComment from "@/components/Modules/VideoComment/VideoComment";
import { AddComment } from "../AddComment/AddComment";
import { createContext } from "react";
import { Some } from "@/utils/types";
import { T_VideoComment } from "@/components/Modules/VideoComment/types";

export const VideoContext = createContext<Some<T_VideoTab>>(null);
export default function VideoTabComments({ video } : { video: T_VideoTab }) {    
    const [createdComments, setCreatedComments] = useState<T_VideoComment[]>([]);

    function paginateComments(): T_FetchFn {
        return (page: number) => pb.collection<T_VideoComment>('comments')
            .getList(page, 16, { 
                expand: 'channel',
                filter: `video="${video.id}"`,
                sort: 'likes'
            });
    }

    return (
        <Flex cls={css(null, "margin-block-3")} props={{ column: true, align: 'start', grow: true }}>
            <AddComment video={video} appendCommentFn={setCreatedComments} />
            <section className="width-100">
                <h2 className="margin-block-end-2">
                    <span>{video.comment_count + createdComments.length}</span> 
                    &nbsp;
                    <span>
                        {video.comment_count + createdComments.length === 1 ? 'comment' : 'comments'}
                    </span>
                </h2>
                <Flex 
                    cls={css("video-tab__comments")} 
                    props={{ grow: true, column: true, align: 'start', gap: 4 }}
                >
                    <VideoContext.Provider value={video}>
                        <Paginator 
                            externalItems={createdComments}
                            fetchFn={paginateComments()}
                            Component={VideComment}
                            SkeletonComponent={VideoCommentSkeleton} 
                        />
                    </VideoContext.Provider>
                </Flex>
            </section>
        </Flex>
    )
}