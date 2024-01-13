import { T_Comment, T_CommentReply } from "@/components/Modules/Comment/types";
import { T_FetchFn } from "@/components/Modules/Paginator/types";
import { pb } from ".";
import { COMMENTS_PER_PAGE, REPLIES_PER_PAGE } from "@/consts";
import { T_VideoTab } from "@/components/Layout/VideoTab/types";
import { T_CreateCommentData } from "@/components/Layout/AddComment/types";

export function paginateComments(video: T_VideoTab): T_FetchFn {
    return (page: number) => (
        pb.collection<T_Comment>('comments')
            .getList(page, COMMENTS_PER_PAGE, {
                filter: `video="${video.id}"`,
                expand: 'channel'
            })
    )
}

export function paginateReplies(comment: T_Comment): T_FetchFn {
    return (page: number) => (
        pb.collection<T_CommentReply>('replies')
            .getList(page, REPLIES_PER_PAGE, {
                filter: `comment="${comment.id}"`,
                expand: 'channel'
            })
    )
}

export function createComment(data: T_CreateCommentData) {
    return pb.collection<T_Comment>('comments').create(data, { expand: 'channel' });
}