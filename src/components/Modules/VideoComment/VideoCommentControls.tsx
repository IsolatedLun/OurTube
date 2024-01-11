import Flex from "../Flex/Flex";
import Button from "@/components/Interactibles/Button/Button";
import { css } from "@/utils/css/css";
import Numeric from "../Numeric/Numeric";
import { T_ReactSetStateHook } from "@/hooks/types";
import { useEffect } from "react";
import { T_VideoComment } from "./types";
import { T_DeleteFn } from "../Paginator/types";
import { deleteComment } from "@/utils/backend/video";


export function VideoCommentControls(
    { props, showReplies, addReplyToggleHook, replyToggleHook, onDelete } 
    : 
    { props: T_VideoComment, showReplies: boolean, addReplyToggleHook: T_ReactSetStateHook<boolean>
        replyToggleHook: T_ReactSetStateHook<boolean>, onDelete: T_DeleteFn }
) {
    
    async function _deleteComment() {
        await deleteComment(props);
        onDelete(props);
    }
    
    return(
        <Flex props={{ grow: true, justify: 'space-between' }}>
            <Flex>
                {
                    props.reply_count > -1 
                    ? (
                        <Button button={{
                            variant: 'secondary',
                            attachments: ['small-pad', showReplies ? 'full' : ''],
                            cls: css(null, 'fs-350 margin-inline-end-2'),
                            onClick: () => replyToggleHook(prev => !prev)
                        }}>
                            {showReplies ? 'Close replies' : 'View replies'} {props.reply_count}
                        </Button>
                    ) : null
                }
                <Button button={{
                    variant: 'secondary',
                    attachments: ['small-pad'],
                    cls: css(null, 'fs-350'),
                    onClick: () => addReplyToggleHook(prev => !prev)
                }}>
                    Reply
                </Button>
                <Button button={{
                    variant: 'secondary',
                    attachments: ['small-pad'],
                    cls: css(null, 'fs-350')
                }}>
                    Report
                </Button>
                <Button button={{
                    variant: 'error',
                    attachments: ['small-pad'],
                    cls: css(null, 'fs-350'),
                    onClick: _deleteComment,
                }}>
                    Delete
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
    )
}