import Button from "@/components/Interactibles/Button/Button";
import TextArea from "@/components/Interactibles/Inputs/TextArea";
import Flex from "@/components/Modules/Flex/Flex";
import { useState } from "react";
import { T_ReactSetStateHook } from "@/hooks/types";
import { T_AddReplyData } from "./types";
import { createReply } from "@/utils/backend/comment";
import { T_Comment, T_CommentReply } from "@/components/Modules/Comment/types";

export function AddReply(
    { props, parentComment, onNewReply } : 
    { props: T_Comment | T_CommentReply, parentComment: T_Comment, 
        onNewReply: (newReply: T_CommentReply) => void }
) {
    const [text, setText] = useState("");

    async function addReply() {
        const data: T_AddReplyData = {
            text,
            video: parentComment.video,
            channel: '3neyn9immslajdm',
            reply_to_id: props.id,
            reply_to_name: props.expand.channel.name,
            parent: parentComment.id
        };

        const newReply = await createReply(data);
        setText('');
        onNewReply(newReply);
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
                onClick: () => addReply()
            }}>
                Reply
            </Button>
        </Flex>
    )
}