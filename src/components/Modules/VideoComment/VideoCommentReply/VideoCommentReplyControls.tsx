import Flex from "../../Flex/Flex";
import Button from "@/components/Interactibles/Button/Button";
import { css } from "@/utils/css/css";
import Numeric from "../../Numeric/Numeric";
import { T_ReactSetStateHook } from "@/hooks/types";
import { useEffect } from "react";
import { T_VideoCommentReply } from "../types";
import { T_DeleteFn } from "../../Paginator/types";
import { deleteReply } from "@/utils/backend/video";


export function VideoCommentReplyControls(
    { props, addReplyToggleHook, onDelete } 
    : 
    { props: T_VideoCommentReply, onDelete: T_DeleteFn,
        addReplyToggleHook: T_ReactSetStateHook<boolean> }
) {

    async function _deleteReply() {
        await deleteReply(props);
        onDelete(props);
    }

    return(
        <Flex props={{ grow: true, justify: 'space-between' }}>
            <Flex>
                <Button button={{
                    variant: 'primary',
                    attachments: ['small-pad', 'full'],
                    cls: css(null, 'fs-350 margin-inline-end-2'),
                    to: '#' + props.reply_to_id
                }}>
                    @{props.reply_to_name}
                </Button>
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
                    onClick: _deleteReply
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