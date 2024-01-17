import Flex from "@/components/Modules/Flex/Flex";
import { T_VideoTab } from "./types";
import { css } from "@/utils/css/css";
import { createContext} from "react";
import Paginator from "@/components/Modules/Paginator/Paginator";
import VideoCommentSkeleton from "@/components/Modules/Skeleton/VideoCommentSkeleton";
import { AddComment } from "../AddComment/AddComment";
import { T_CommmentSectionHook } from "@/components/Modules/Comment/types";
import { paginateComments } from "@/utils/backend/comment";
import { Comment } from "@/components/Modules/Comment/Comment";
import { Some } from "@/utils/types";
import { useCommentSection } from "@/hooks/commentSection/commentSectionHook";
import { E_CommentSectionActions } from "@/hooks/types";

export const VideoContext = createContext<Some<T_VideoTab>>(null);
export const CommentSectionContext = createContext<Some<T_CommmentSectionHook>>(null);
export default function VideoTabComments({ video } : { video: T_VideoTab }) {    
    const [state, dispatch] = useCommentSection();

    return (
        <Flex cls={css(null, "margin-block-3")} props={{ column: true, align: 'start', grow: true }}>
            <AddComment 
                video={video} 
                onNewComment={(comment) => dispatch({ 
                    type: E_CommentSectionActions.APPEND_COMMENTS,
                    payload: [comment]
                })} 
            />
            <section className="width-100">
                <h2 className="margin-block-end-2">
                    <span>{state.comments.length + state.totalReplyCount}</span> 
                    &nbsp;
                    <span>
                        {(state.comments.length + state.totalReplyCount) === 1 ? 'comment' : 'comments'}
                    </span>
                </h2>
                <Flex 
                    cls={css("video-tab__comments")} 
                    props={{ grow: true, column: true, align: 'start', gap: 4 }}
                >
                        <CommentSectionContext.Provider value={{ state, dispatch }}>
                            <VideoContext.Provider value={video}>
                                { 
                                    state.comments.map(comment => 
                                        <Comment 
                                            key={comment.id} 
                                            props={comment} 
                                            video={video}
                                        />
                                    ) 
                                }
                            </VideoContext.Provider>
                        </CommentSectionContext.Provider>

                        <Paginator props={{
                            fetchFn: paginateComments(video),
                            Component: Comment,
                            SkeletonComponent: VideoCommentSkeleton,
                            onFetchItems: (items) => dispatch({ 
                                type: E_CommentSectionActions.APPEND_COMMENTS,
                                payload: items.map(x => { x.replies = []; return x })
                            })
                        }} />
                </Flex>
            </section>
        </Flex>
    )
}