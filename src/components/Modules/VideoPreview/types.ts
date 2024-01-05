import { T_VideoPreviewChannel } from "@/components/Layout/Channel/types";
import { T_CollectionItem } from "@/utils/types";

export interface T_VideoPreview extends T_CollectionItem {
    thumbnail: string;
    title: string;
    
    duration: number;
    views: number;

    expand: {
        channel: T_VideoPreviewChannel;
    }
}