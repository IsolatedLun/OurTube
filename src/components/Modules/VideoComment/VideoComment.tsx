import { T_VideoComment } from "@/components/Layout/VideoTab/types";
import Flex from "../Flex/Flex";
import { css } from "@/utils/css/css";
import Profile from "../Profile/Profile";
import { BACKEND_FILE_URL, CHANNEL_URL } from "@/consts";
import Button from "@/components/Interactibles/Button/Button";
import { useState } from "react";
import Numeric from "../Numeric/Numeric";
import { dateToHumanReadableDateSpan } from "@/utils/utils";
import { pb } from "@/utils/backend";
import Link from "next/link";

export default function VideoComment({ props } : { props: T_VideoComment }) {
    const [showReplies, setShowReplies] = useState(false);

    return(
        <Flex props={{ grow: true, column: true, align: 'start', gap: 2 }}>
            <Flex cls={css("video-tab__comment")} props={{ grow: true, align: 'start' }}>
                <Link href={CHANNEL_URL(props.expand.channel.id)}>
                    <Profile url={BACKEND_FILE_URL(
                        props.expand.channel.collectionId,
                        props.expand.channel.id,
                        props.expand.channel.profile
                    )} alt={"Profile of " + props.expand.channel.name} variant="comment" />
                </Link>

                <Flex cls={css("comment__details")} props={{ grow: true, column: true, align: 'start' }}>
                    <Flex 
                        cls={css(null, 'clr-misc-text-muted')} 
                        props={{ grow: true, align: 'center', justify: 'space-between' }}
                    >
                        <p>{props.expand.channel.name}</p>
                        <p className="fs-350">{dateToHumanReadableDateSpan(props.created)}</p>
                    </Flex>
                    <p>{props.text}</p>
                </Flex>
            </Flex>

            <Flex props={{ grow: true, justify: 'space-between' }}>
                <Flex>
                    <Button button={{
                        variant: 'secondary',
                        attachments: ['small-pad', showReplies ? 'full' : ''],
                        cls: css(null, 'fs-350'),
                        onClick: () => setShowReplies(prev => !prev)
                    }}>
                        {showReplies ? 'Close replies' : 'View replies'}
                    </Button>
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
        </Flex>
    )
}