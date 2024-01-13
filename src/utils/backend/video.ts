import { T_VideoTab } from "@/components/Layout/VideoTab/types";
import { pb } from ".";
import { T_FetchFn } from "@/components/Modules/Paginator/types";
import { T_VideoPreview } from "@/components/Modules/VideoPreview/types";
import { VIDEOS_PER_PAGE } from "@/consts";

export async function fetchVideo(id: string): Promise<T_VideoTab> {
    const data = await pb.collection<T_VideoTab>('videos').getOne(id, { expand: 'channel' })
    await pb.collection('videos').update(id, { views: data.views + 1 });

    return data;
}

export function paginateVideos(): T_FetchFn {
    return (page: number) => (
        pb.collection<T_VideoPreview>('videos')
            .getList(page, VIDEOS_PER_PAGE, { expand: "channel" })
    )
}