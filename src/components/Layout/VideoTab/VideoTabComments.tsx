import Flex from "@/components/Modules/Flex/Flex";
import { T_VideoComment, T_VideoTab } from "./types";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import { css } from "@/utils/css/css";
import Button from "@/components/Interactibles/Button/Button";
import { pb } from "@/utils/backend";
import { useEffect, useState } from "react";
import VideoComment from "@/components/Modules/VideoComment/VideoComment";
import { T_FetchFn } from "@/components/Modules/Paginator/types";
import Paginator from "@/components/Modules/Paginator/Paginator";
import VideoCommentSkeleton from "@/components/Modules/Skeleton/VideoCommentSkeleton";

export default function VideoTabComments({ video } : { video: T_VideoTab }) {    
    const [commentCount, setCommentCount] = useState(0);

    function paginateComments(): T_FetchFn {
        return (page: number) => pb.collection<T_VideoComment>('comments')
            .getList(page, 16, { 
                expand: 'channel',
                filter: `video="${video.id}"`
            });
    }


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
                    {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                </h2>
                <Flex 
                    cls={css("video-tab__comments")} 
                    props={{ grow: true, column: true, align: 'start', gap: 4 }}
                >
                    <Paginator 
                        fetchFn={paginateComments()}
                        countHook={setCommentCount}
                        Component={VideoComment}
                        SkeletonComponent={VideoCommentSkeleton} 
                    />
                </Flex>
            </section>
        </Flex>
    )
}