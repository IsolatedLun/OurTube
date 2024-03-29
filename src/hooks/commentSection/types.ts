import { T_Comment, T_CommentReply } from "@/components/Modules/Comment/types";

export interface T_CommentSection {
    comments: (T_Comment & { replies: T_CommentReply[] })[];
    totalReplyCount: number;
}


export enum E_CommentSectionActions {
    APPEND_COMMENTS,
    APPEND_REPLIES,

    DELETE_COMMENT,
    DELETE_REPLY,

    UPDATE_COMMENT,
    UPDATE_REPLY
}