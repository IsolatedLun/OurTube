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
                filter: `parent="${comment.id}"`,
                expand: 'channel'
            })
    )
}

export async function createComment(video: T_VideoTab, data: T_CreateCommentData) {
    const res = await pb.collection<T_Comment>('comments').create(data, { expand: 'channel' });
    await pb.collection<T_VideoTab>('videos')
        .update(video.id, { comment_count: video.comment_count + 1 });

    return res;
}

export async function createReply(comment: T_Comment, data: T_CreateCommentData) {
    const result = await pb.collection<T_CommentReply>('replies')
        .create(data, { expand: 'channel' });
    await pb.collection<T_Comment>('comments')
        .update(comment.id, { reply_count: comment.reply_count + 1 })
        
    return result;
}

export async function deleteComment(video: T_VideoTab, comment: T_Comment) {
    const res = await pb.collection<T_Comment>('comments').delete(comment.id);
    await pb.collection<T_VideoTab>('videos')
        .update(video.id, { comment_count: video.comment_count - 1 });

    return res;
}

export async function deleteReply(comment: T_Comment, reply: T_CommentReply) {
    const result = await pb.collection<T_CommentReply>('replies').delete(reply.id);
    await pb.collection<T_Comment>('comments')
        .update(comment.id, { reply_count: comment.reply_count - 1 })
        
    return result;
}