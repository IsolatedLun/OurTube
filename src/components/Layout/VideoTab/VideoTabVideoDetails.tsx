import Flex from "@/components/Modules/Flex/Flex";
import { T_VideoTab } from "./types";
import { css } from "@/utils/css/css";
import React from "react";
import { calculateLikeToDislikeRatio } from "@/utils/utils";
import Numeric from "@/components/Modules/Numeric/Numeric";

export default function VideoTabVideoDetails({ video } : { video: T_VideoTab }) {
    let ratio = calculateLikeToDislikeRatio(video);
    let ratioBarProperties = {"--ratio": ratio} as React.CSSProperties;

    return (
        <Flex 
            cls={css(null, "margin-block-start-1 margin-block-end-2 width-100")} 
            props={{
                align: 'start',
                justify: 'space-between'
            }}
        >
            <Flex>
                <h3>{video.expand.channel.name}</h3>
                <p className={css(null, "clr-misc-text-muted fw-bold").class}>
                    <Numeric n={video.expand.channel.subscribers} />
                </p>
            </Flex>

            <Flex props={{ align: 'center', justify: 'end', gap: 2 }}>
                <p className={css(null, "clr-misc-text-muted fw-bold whitespace-nowrap").class}>
                    <span className="clr-primary-400">{(ratio * 100).toFixed(2)}%</span> liked this
                </p>
                <div 
                    className={css("video-tab__ratio-bar", "position-relative overflow-hidden").class} 
                    aria-hidden={true}

                    style={ratioBarProperties}
                />
            </Flex>
        </Flex>
    )
}