import Flex from "../../Flex/Flex";
import { BACKEND_FILE_URL, CHANNEL_URL } from "@/consts";
import Link from "next/link";
import Profile from "../../Profile/Profile";
import { css } from "@/utils/css/css";
import { T_Comment, T_CommentReply } from "../types";
import { dateToHumanReadableDateSpan } from "@/utils/utils";

export function CommentDetails({ props } : { props: T_Comment | T_CommentReply }) {
    return(
        <Flex props={{ grow: true, align: 'start' }}>
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
                <p className="whitespace-pre-line">{props.text}</p>
            </Flex>
        </Flex>
    )
}