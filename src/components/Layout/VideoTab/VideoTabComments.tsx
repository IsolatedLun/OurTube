import Flex from "@/components/Modules/Flex/Flex";
import { T_VideoTab } from "./types";
import { css } from "@/utils/css/css";
import { useState } from "react";
import Paginator from "@/components/Modules/Paginator/Paginator";
import VideoCommentSkeleton from "@/components/Modules/Skeleton/VideoCommentSkeleton";
import { AddComment } from "../AddComment/AddComment";
import { T_Comment } from "@/components/Modules/Comment/types";
import { paginateComments } from "@/utils/backend/comment";
import { Comment } from "@/components/Modules/Comment/Comment";

export default function VideoTabComments({ video } : { video: T_VideoTab }) {    
    const [comments, setComments] = useState<T_Comment[]>([]);

    return (
        <Flex cls={css(null, "margin-block-3")} props={{ column: true, align: 'start', grow: true }}>
            <AddComment 
                video={video} 
                onNewComment={(comment) => setComments(prev => [comment, ...prev])} 
            />
            <section className="width-100">
                <h2 className="margin-block-end-2">
                    <span>{comments.length}</span> 
                    &nbsp;
                    <span>
                        {comments.length === 1 ? 'comment' : 'comments'}
                    </span>
                </h2>
                <Flex 
                    cls={css("video-tab__comments")} 
                    props={{ grow: true, column: true, align: 'start', gap: 4 }}
                >
                        {comments.map(comment => <Comment key={comment.id} props={comment} />)}

                        <Paginator props={{
                            fetchFn: paginateComments(video),
                            Component: Comment,
                            SkeletonComponent: VideoCommentSkeleton,
                            onFetchItems: (items) => setComments((prev) => [...prev, ...items])
                        }} />
                </Flex>
            </section>
        </Flex>
    )
}