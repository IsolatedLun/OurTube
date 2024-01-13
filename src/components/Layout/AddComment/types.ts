export interface T_CreateCommentData {
    video: string;
    channel: string;
    text: string;
}

export interface T_AddReplyData extends T_CreateCommentData {
    parent: string;
    reply_to_id: string;
    reply_to_name: string;
}