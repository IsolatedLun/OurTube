import { T_Channel } from "@/components/Layout/Channel/types";
import { T_User } from "@/utils/backend/types";
import { T_Collection } from "@/utils/types";

export interface T_VideoPreview extends T_Collection {
    user: Omit<T_User, "email">;

    thumbnail: string;
    title: string;
    
    duration: number;
    views: number;

    expand: {
        channel: T_Channel;
    }
}