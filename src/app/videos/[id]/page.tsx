"use client";

import VideoTab from "@/components/Layout/VideoTab/VideoTab";
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function VideoPage() {
    const id = usePathname().split('/').pop() as string;

    return <VideoTab id={id} />
}