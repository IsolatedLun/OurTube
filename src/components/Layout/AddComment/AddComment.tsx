import Button from "@/components/Interactibles/Button/Button";
import TextArea from "@/components/Interactibles/Inputs/TextArea";
import Flex from "@/components/Modules/Flex/Flex";
import { useState } from "react";
import { T_VideoTab } from "../VideoTab/types";
import { T_CreateCommentData } from "./types";
import { createComment } from "@/utils/backend/comment";
import { T_Comment } from "@/components/Modules/Comment/types";

export function AddComment(
    { video, onNewComment } : 
    { video: T_VideoTab, onNewComment: (comment: T_Comment) => void }
) {
    const [text, setText] = useState("");

    async function addComment() {
        const data: T_CreateCommentData = {
            video: video.id,
            channel: '3neyn9immslajdm',
            text
        };

        const newComment = await createComment(video, data);
        setText('');
        onNewComment(newComment);
    }

    return(
        <Flex tag="section" props={{ column: true,  align: 'end', grow: true }}>
            <h2 className="visually-hidden">Add a comment</h2>
            <TextArea input={{
                    name: 'comment',
                    placeholder: 'Enter a comment',
                    label: 'Comment',
                    validators: [],
                    value: text,
                    onInput: (e) => setText(e.value)
                }} />
            <Button button={{
                variant: 'primary',
                onClick: () => addComment()
            }}>
                Comment
            </Button>
        </Flex>
    )
}