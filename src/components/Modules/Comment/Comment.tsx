import { css } from "@/utils/css/css";
import Flex from "../Flex/Flex";
import { T_Comment } from "./types";
import { CommentDetails } from "./_/CommentDetails";
import { useState } from "react";
import Button from "@/components/Interactibles/Button/Button";
import Numeric from "../Numeric/Numeric";
import { ICON_REPORT, ICON_TRASH } from "@/icons";
import Icon from "../Icon";

export function Comment({ props } : { props: T_Comment }) {
    const [showReplies, setShowReplies] = useState(false);

    return(
        <Flex 
            id={props.id}
            cls={css("video-tab__comment-or-reply")}
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
                        onClick: () => null
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
        </Flex>
    )
}