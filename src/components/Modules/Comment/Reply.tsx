import { css } from "@/utils/css/css";
import Flex from "../Flex/Flex";
import { T_Comment, T_CommentReply } from "./types";
import { CommentDetails } from "./_/CommentDetails";
import Button from "@/components/Interactibles/Button/Button";
import Numeric from "../Numeric/Numeric";
import { ICON_REPORT, ICON_TRASH } from "@/icons";
import Icon from "../Icon";
import { AddReply } from "@/components/Layout/AddComment/AddReply";
import { useContext, useState } from "react";
import { CommentContext } from "./Comment";
import { VideoContext } from "@/components/Layout/VideoTab/VideoTabComments";
import { T_VideoTab } from "@/components/Layout/VideoTab/types";
import { T_ReactSetStateHook } from "@/hooks/types";

export function Reply(
    { props, onNewReply } 
    : 
    { props: T_CommentReply, onNewReply: (newReply: T_CommentReply) => void }
) {
    const parentComment = useContext(CommentContext) as T_Comment;
    const [showAddReply, setShowAddReply] = useState(false);

    return(
        <Flex 
            id={props.id}
            cls={css("video-tab__reply")}
            props={{ grow: true, column: true, align: 'start', gap: 2 }}
        >
            <CommentDetails props={props} />

            <Flex props={{ grow: true, justify: 'space-between' }}>
                <Flex>
                    <Button button={{
                        variant: 'primary',
                        attachments: ['small-pad', 'full'],
                        cls: css(null, 'fs-350'),
                        to: '#' + props.reply_to_id
                    }}>
                        @{props.reply_to_name}
                    </Button>
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
                        cls: css(null, 'fs-350')
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
                        parentComment={parentComment} 
                        onNewReply={onNewReply}
                    />
                ): null
            }
        </Flex>
    )
}