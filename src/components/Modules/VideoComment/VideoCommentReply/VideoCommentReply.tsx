import Flex from "../../Flex/Flex";
import { css } from "@/utils/css/css";
import { useContext, useState } from "react";
import { VideoCommentReplyControls } from "./VideoCommentReplyControls";
import { VideoCommentDetails } from "../VideoCommentDetails";
import { T_VideoCommentReply } from "../types";
import { AddReply } from "@/components/Layout/AddComment/AddReply";
import { CommentContext } from "../VideoComment";
import { T_DeleteFn } from "../../Paginator/types";

export default function VideoCommentReply(
    { props, onDelete } : { props: T_VideoCommentReply, onDelete: T_DeleteFn }
) {
    const comment = useContext(CommentContext);
    const [showAddReply, setShowAddReply] = useState(false);

    return(
        <Flex 
            id={props.id}
            cls={css("video-tab__comment-or-reply")}
            props={{ grow: true, column: true, align: 'start', gap: 2 }}
        >
            <VideoCommentDetails props={props} />

            <VideoCommentReplyControls
                props={props}
                addReplyToggleHook={setShowAddReply}
                onDelete={onDelete}
            />

            {
                showAddReply
                ? (
                    <AddReply 
                        comment={comment!.props} 
                        appendReplyFn={comment!.onReply}
                        props={props} 
                    />
                ): null
            }
        </Flex>
    )
}