import { T_User } from "@/utils/backend/types";
import { T_CollectionItem } from "@/utils/types";

export interface T_Channel extends T_CollectionItem {
    banner: string;
    profile: string;
    name: string;
    description: string;

    subscribers: number;

    selected: boolean; // If user has selected (logged in) to this channel
}
export type T_VideoPreviewChannel = Omit<T_Channel, | "description" | "banner">;