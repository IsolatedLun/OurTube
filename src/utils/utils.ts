import { T_VideoTab } from "@/components/Layout/VideoTab/types";
import { DATE_CONDITIONS } from "@/consts";

export function todefault<X, Y>(x: X, def: Y) {
    return !x ? def : x;
}

export function calculateLikeToDislikeRatio(video: T_VideoTab) {
    if(video.likes === 0)
        return 0
    else if(video.dislikes === 0)
        return 1
    return video.likes / (video.likes + video.dislikes);
}

export function dateToHumanReadableDateSpan(dateString: string) {
    let timeDifference = Date.now() - Date.parse(dateString);
    
    for(let i = 0; i < DATE_CONDITIONS.length; i++) {
        timeDifference = timeDifference / DATE_CONDITIONS[i].right;

        if(DATE_CONDITIONS[i].condition === null || timeDifference < DATE_CONDITIONS[i].condition!) {
            timeDifference = Math.floor(timeDifference);
            
            const text = timeDifference === 1 ? DATE_CONDITIONS[i].text : DATE_CONDITIONS[i].pluralText;
            return timeDifference + text;
        }
    }
}

export function dateToHumanReadableDate(dateString: string) {
    return new Date(dateString).toDateString();
}