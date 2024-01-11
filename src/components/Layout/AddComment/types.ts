export interface T_AddCommentData {
    video: string;
    channel: string;
    text: string;
}

export interface T_AddReplyData extends T_AddCommentData {
    parent: string;
    reply_to_id: string;
    reply_to_name: string;
}