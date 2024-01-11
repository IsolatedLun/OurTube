import { T_Channel } from "@/components/Layout/Channel/types";
import { T_CollectionItem } from "@/utils/types";

export interface T_VideoComment extends T_CollectionItem {
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
}

export interface T_VideoCommentReply extends T_VideoComment {
    parent: string;
    reply_to_name: string;
    reply_to_id: string;
}

export type T_VideoCommentOrReplyForm = Omit<T_VideoCommentReply, keyof T_CollectionItem | "expand">;