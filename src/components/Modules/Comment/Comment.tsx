import { css } from "@/utils/css/css";
import Flex from "../Flex/Flex";
import { T_Comment, T_CommentReply } from "./types";
import { CommentDetails } from "./_/CommentDetails";
import { createContext, useContext, useEffect, useState } from "react";
import Button from "@/components/Interactibles/Button/Button";
import Numeric from "../Numeric/Numeric";
import { ICON_REPORT, ICON_TRASH } from "@/icons";
import Icon from "../Icon";
import Paginator from "../Paginator/Paginator";
import VideoCommentSkeleton from "../Skeleton/VideoCommentSkeleton";
import { paginateReplies } from "@/utils/backend/comment";
import { Reply } from "./Reply";
import { Some } from "@/utils/types";
import { AddReply } from "@/components/Layout/AddComment/AddReply";
import { CommentSectionContext } from "@/components/Layout/VideoTab/VideoTabComments";
import { E_CommentSectionActions } from "@/hooks/types";

export const CommentContext = createContext<Some<T_Comment>>(null);
export function Comment({ props } : { props: T_Comment }) {
    const { state, dispatch } = useContext(CommentSectionContext)!;
    const [showReplies, setShowReplies] = useState(false);
    const [showAddReply, setShowAddReply] = useState(false);

    function appendReply(newReply: T_CommentReply) {
        dispatch({
            type: E_CommentSectionActions.APPEND_REPLIES,
            payload: { comment: props, replies: [newReply] }
        });
    }

    return(
        <Flex 
            id={props.id}
            cls={css("video-tab__comment")}
            props={{ grow: true, column: true, align: 'start', gap: 2 }}
        >
            <CommentDetails props={props} />

            <Flex props={{ grow: true, justify: 'space-between' }}>
                <Flex>
                    {
                        props.reply_count > 0
                        ? (
                            <Button button={{
                                variant: 'secondary',
                                attachments: ['small-pad', showReplies ? 'full' : ''],
                                cls: css(null, 'fs-350 margin-inline-end-2'),
                                onClick: () => setShowReplies(!showReplies)
                            }}>
                                {showReplies ? 'Close replies' : 'View replies'} {props.reply_count}
                            </Button>
                        ) : null
                    }
                    <Button button={{
                        variant: 'secondary',
                        attachments: ['small-pad'],
                        cls: css(null, 'fs-350'),
                        onClick: () => setShowAddReply(prev => !prev)
                    }}>
                        Reply
                    </Button>
                    <Button button={{
                        variant: 'secondary',
                        attachments: ['small-pad'],
                        cls: css(null, 'fs-350')
                    }}>
                        <Icon>{ICON_REPORT}</Icon>
                    </Button>
                    <Button button={{
                        variant: 'error',
                        attachments: ['small-pad'],
                        cls: css(null, 'fs-350'),
                        onClick: () => dispatch({ 
                            type: E_CommentSectionActions.DELETE_COMMENT, 
                            payload: props
                        })
                    }}>
                        <Icon>{ICON_TRASH}</Icon>
                    </Button>
                </Flex>
                <Flex props={{ grow: true, justify: 'end' }}>
                    <Button button={{
                        variant: 'primary',
                        attachments: ['small-pad'],
                        cls: css(null, 'fs-350')
                    }}>
                        <span className="margin-inline-end-1 clr-misc-text-muted">
                            Like
                        </span>
                        <Numeric n={props.likes} />
                    </Button>
                    <Button button={{
                        variant: 'primary',
                        attachments: ['small-pad'],
                        cls: css(null, 'fs-350')
                    }}>
                        <span className="margin-inline-end-1 clr-misc-text-muted">
                            Dislike
                        </span>
                        <Numeric n={props.dislikes} />
                    </Button>
                </Flex>
            </Flex>

            {
                showAddReply
                ? (
                    <AddReply 
                        props={props} 
                        parentComment={props} 
                        onNewReply={appendReply}
                    />
                ): null
            }

            <div className="width-100" hidden={!showReplies}>
                <Flex 
                    cls={css("comment__comments", "padding-inline-start-5")} 
                    props={{ grow: true, column: true, gap: 3 }}
                >
                    <CommentContext.Provider value={props}>
                        { props.replies.map(reply => 
                                <Reply 
                                    key={props.id} 
                                    props={reply} 
                                    onNewReply={appendReply}
                                />
                            ) 
                        }
                    </CommentContext.Provider>
                    
                    <Paginator props={{
                        Component: Reply,
                        SkeletonComponent: VideoCommentSkeleton,
                        fetchFn: paginateReplies(props),
                        onFetchItems: (items) => dispatch({
                            type: E_CommentSectionActions.APPEND_REPLIES,
                            payload: { comment: props, replies: items }
                        }),
                    }} />
                </Flex>
            </div>
        </Flex>
    )
}