import Button from "@/components/Interactibles/Button/Button";
import TextArea from "@/components/Interactibles/Inputs/TextArea";
import Flex from "@/components/Modules/Flex/Flex";
import { pb } from "@/utils/backend";
import { useContext, useState } from "react";
import { T_ReactSetStateHook } from "@/hooks/types";
import { T_AddReplyData } from "./types";
import { T_VideoComment, T_VideoCommentReply } from "@/components/Modules/VideoComment/types";
import { VideoContext } from "../VideoTab/VideoTabComments";
import { CommentContext } from "@/components/Modules/VideoComment/VideoComment";
import { createReply } from "@/utils/backend/video";

export function AddReply(
    { props, comment, appendReplyFn } : 
    { props: T_VideoCommentReply | T_VideoComment, comment: T_VideoComment, 
        appendReplyFn: T_ReactSetStateHook<T_VideoCommentReply[]> }
) {
    const video = useContext(VideoContext);
    const parentComment = useContext(CommentContext);
    const [text, setText] = useState("");

    async function _createReply() {
        const data: T_AddReplyData = {
            text,
            video: video!.id,
            channel: '3neyn9immslajdm',
            reply_to_id: comment.id,
            reply_to_name: comment.expand.channel.name,
            parent: parentComment?.props.id ?? comment.id
        };

        const newReply = await createReply(data);
        setText('');
        appendReplyFn!(prev => [newReply, ...prev]);
    }

    return(
        <Flex tag="section" props={{ column: true,  align: 'end', grow: true }}>
            <h2 className="visually-hidden">Add a reply</h2>
            <TextArea input={{
                    name: 'comment',
                    placeholder: 'Reply to @' + props.expand.channel.name,
                    label: 'Reply',
                    validators: [],
                    value: text,
                    onInput: (e) => setText(e.value)
                }} />
            <Button button={{
                variant: 'primary',
                onClick: () => _createReply()
            }}>
                Reply
            </Button>
        </Flex>
    )
}