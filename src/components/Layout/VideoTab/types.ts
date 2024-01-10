import { T_VideoPreview } from "@/components/Modules/VideoPreview/types";
import { T_CollectionItem } from "@/utils/types";
import { T_Channel } from "../Channel/types";

export interface T_VideoTab extends T_VideoPreview {
    description: string;
    video: string;

    likes: number;
    dislikes: number;
}

export interface T_VideoCommentOrReply extends T_CollectionItem {
    text: string;
    
    video: string;
    channel: string;
    comment_to: string;
    reply_to: string;

    likes: number;
    dislikes: number;

    pinned: boolean;

    expand: {
        channel: T_Channel;
        reply_to: T_VideoCommentOrReply;
    }
}

export type T_VideoCommentOrReplyForm = Omit<T_VideoCommentOrReply, keyof T_CollectionItem | "expand">;