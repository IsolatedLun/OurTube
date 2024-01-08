import Flex from "@/components/Modules/Flex/Flex";
import { T_VideoComment, T_VideoTab } from "./types";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import { css } from "@/utils/css/css";
import Button from "@/components/Interactibles/Button/Button";
import { pb } from "@/utils/backend";
import { useEffect, useState } from "react";
import VideoComment from "@/components/Modules/VideoComment/VideoComment";

export default function VideoTabComments({ video } : { video: T_VideoTab }) {
    const [comments, setComments] = useState<T_VideoComment[]>([]);
    async function fetchComments() {
        const data = await pb.collection<T_VideoComment>('comments')
            .getList(1, 16, { 
                expand: 'channel',
                filter: `video="${video.id}"`
            });
        setComments(data.items);
    }

    useEffect(() => {
        fetchComments();
    }, [])


    return (
        <Flex cls={css(null, "margin-block-3")} props={{ column: true, align: 'start', grow: true }}>
            <Flex tag="section" props={{ column: true,  align: 'end', grow: true }}>
                <h2 className="visually-hidden">Add a comment</h2>
                <TextInput input={{
                        name: 'comment',
                        placeholder: 'Enter a comment',
                        label: 'Comment',
                        validators: [],
                        inputType: 'text',
                        onInput: () => null
                    }} />
                <Button button={{
                    variant: 'primary'
                }}>
                    Comment
                </Button>
            </Flex>
            <section className="width-100">
                <h2 className="margin-block-end-2">
                    {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                </h2>
                <Flex cls={css("video-tab__comments")} props={{ grow: true }}>
                    {comments.map(comment => <VideoComment props={comment} />)}
                </Flex>
            </section>
        </Flex>
    )
}