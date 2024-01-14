import { T_Comment, T_CommentReply } from "@/components/Modules/Comment/types";

export type T_ReactSetStateHook<T> = React.Dispatch<React.SetStateAction<T>>;

export interface T_CommentSection {
    comments: (T_Comment & { replies: T_CommentReply[] })[];
}


export enum E_CommentSectionActions {
    APPEND_COMMENTS,
    APPEND_REPLIES,

    DELETE_COMMENT,
    DELETE_REPLY,

    UPDATE_COMMENT,
    UPDATE_REPLY
}
export type T_CommentSectionActions = { payload: any, type: E_CommentSectionActions };