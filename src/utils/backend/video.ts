import { T_VideoTab } from "@/components/Layout/VideoTab/types";
import { pb } from ".";
import { T_VideoComment, T_VideoCommentReply } from "@/components/Modules/VideoComment/types";
import { T_AddCommentData, T_AddReplyData } from "@/components/Layout/AddComment/types";

function _updateVideoCommentCount(video: T_VideoTab, n: number) {
    pb.collection<T_VideoTab>('videos').update(video.id, {
        comment_count: video.comment_count + n
    });
}

export const incrementVideoCommentCount = (video: T_VideoTab) => (
    _updateVideoCommentCount(video, 1)
);
export const decrementVideoCommentCount = (video: T_VideoTab) => (
    _updateVideoCommentCount(video, -1)
);

// ====

function _updateVideoCommentReplyCount(comment: T_VideoComment, n: number) {
    pb.collection<T_VideoTab>('comments').update(comment.id, {
        reply_count: comment.reply_count + n
    });
}

export const incrementVideoCommentReplyCount = (comment: T_VideoComment) => (
    _updateVideoCommentReplyCount(comment, 1)
);
export const decrementVideoCommentReplyCount = (comment: T_VideoComment) => (
    _updateVideoCommentReplyCount(comment, -1)
);

// ====
export async function createComment(data: T_AddCommentData) {
    return pb.collection<T_VideoComment>('comments')
        .create(data, { expand: 'channel' })
}

export function deleteComment(comment: T_VideoComment) {
    return pb.collection<T_VideoComment>('comments').delete(comment.id)
}

export function createReply(data: T_AddReplyData) {
    return pb.collection<T_VideoCommentReply>('replies')
        .create(data, { expand: 'channel' })
}

export function deleteReply(reply: T_VideoCommentReply) {
    return pb.collection<T_VideoCommentReply>('replies').delete(reply.id)
}