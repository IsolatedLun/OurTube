import { T_VideoCommentOrReply } from "@/components/Layout/VideoTab/types";
import Flex from "../Flex/Flex";
import Button from "@/components/Interactibles/Button/Button";
import { css } from "@/utils/css/css";
import Numeric from "../Numeric/Numeric";
import { T_ReactSetStateHook } from "@/hooks/types";
import { useEffect } from "react";


export function VideoCommentControls(
    { props, showReplies, replyToggleHook } 
    : 
    { props: T_VideoCommentOrReply, showReplies: boolean, replyToggleHook: T_ReactSetStateHook<boolean> }
) {

    if(props.comment_to) {
        console.log(props)
    }
    return(
        <Flex props={{ grow: true, justify: 'space-between' }}>
            <Flex>
                {
                    props.reply_to
                    ? (
                        <Button button={{
                            variant: 'primary',
                            attachments: ['small-pad', 'full'],
                            cls: css(null, 'fs-350'),
                            to: '#' + props.reply_to
                        }}>
                            @{props.expand.reply_to.expand.channel.name}
                        </Button>
                    )
                    : (
                        <Button button={{
                            variant: 'secondary',
                            attachments: ['small-pad', showReplies ? 'full' : ''],
                            cls: css(null, 'fs-350'),
                            onClick: () => replyToggleHook(prev => !prev)
                        }}>
                            {showReplies ? 'Close replies' : 'View replies'}
                        </Button>
                    )
                }
                <Button button={{
                    variant: 'secondary',
                    attachments: ['small-pad'],
                    cls: css(null, 'fs-350')
                }}>
                    Report
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