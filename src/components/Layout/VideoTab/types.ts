import { T_VideoPreview } from "@/components/Modules/VideoPreview/types";

export interface T_VideoTab extends T_VideoPreview {
    description: string;
    video: string;

    likes: number;
    dislikes: number;
}