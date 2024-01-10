import Button from "@/components/Interactibles/Button/Button";
import TextArea from "@/components/Interactibles/Inputs/TextArea";
import Flex from "@/components/Modules/Flex/Flex";
import { pb } from "@/utils/backend";
import { useState } from "react";
import { T_VideoCommentOrReply, T_VideoCommentOrReplyForm, T_VideoTab } from "../VideoTab/types";
import { T_ReactSetStateHook } from "@/hooks/types";
import { T_CollectionItem } from "@/utils/types";

export function AddComment(
    { data, addCommentHook } : 
    { data: T_VideoTab, addCommentHook?: T_ReactSetStateHook<T_VideoCommentOrReply[]> }
) {
    const [text, setText] = useState("");

    function addComment() {
        const data: T_VideoCommentOrReplyForm = {
            video: "5j0llbd9nunlb6j",
            text: text,
            likes: 0,
            dislikes: 0,
            pinned: false,
            channel: "3neyn9immslajdm",
            reply_to: "",
            comment_to: ""
        }

        pb.collection<T_VideoCommentOrReply>('comments')
        .create(data, { expand: 'channel' })
        .then((newComment) => {
            setText('');
            if(addCommentHook)
                addCommentHook(prev => [newComment, ...prev]);
        })
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