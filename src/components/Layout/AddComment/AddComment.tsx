import Button from "@/components/Interactibles/Button/Button";
import TextArea from "@/components/Interactibles/Inputs/TextArea";
import Flex from "@/components/Modules/Flex/Flex";
import { pb } from "@/utils/backend";
import { useState } from "react";
import { T_VideoTab } from "../VideoTab/types";
import { T_ReactSetStateHook } from "@/hooks/types";
import { T_VideoComment } from "@/components/Modules/VideoComment/types";
import { T_AddCommentData } from "./types";
import { createComment } from "@/utils/backend/video";

export function AddComment(
    { video, appendCommentFn } : 
    { video: T_VideoTab, appendCommentFn?: T_ReactSetStateHook<T_VideoComment[]> }
) {
    const [text, setText] = useState("");

    async function _addComment() {
        const data: T_AddCommentData = {
            video: video.id,
            channel: '3neyn9immslajdm',
            text
        };

        const newComment = await createComment(data);
        setText('');
        appendCommentFn!(prev => [newComment, ...prev]);
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
                onClick: () => _addComment()
            }}>
                Comment
            </Button>
        </Flex>
    )
}