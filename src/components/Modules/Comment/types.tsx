import { T_Channel } from "@/components/Layout/Channel/types";
import { E_CommentSectionActions, T_CommentSection } from "@/hooks/types";
import { T_CollectionItem } from "@/utils/types";

export interface T_Comment extends T_CollectionItem {
    text: string;
    
    video: string;
    channel: string;

    likes: number;
    dislikes: number;
    reply_count: number;

    pinned: boolean;

    expand: {
        channel: T_Channel;
    }

    replies: T_CommentReply[]; // Client side only!
}

export interface T_CommentReply extends T_Comment {
    parent: string;
    reply_to_name: string;
    reply_to_id: string;
}

export type A_AppendRepliesPayload = { comment: T_Comment, replies: T_CommentReply[] };

export type T_DispatchWithPayloadFn = (x: { type: E_CommentSectionActions, payload: any }) => void;

export type T_CommmentSectionHook = { state: T_CommentSection, dispatch: T_DispatchWithPayloadFn };