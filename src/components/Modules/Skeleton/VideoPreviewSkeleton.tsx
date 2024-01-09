import { css } from "@/utils/css/css";
import Flex from "../Flex/Flex";
import Profile from "../Profile/Profile";

export default function VideoPreviewSkeleton() {
    return(
        <Flex cls={css("video-preview")} props={{ column: true, align: 'start', gap: 2 }}>
            <div className={css(null, "skeleton width-100 skeleton-bevel").class}>
                <img 
                    className={css(null, "video-preview__thumbnail").class}

                    src={""} 
                    alt={""} 
                />
            </div>
            <Flex cls={css("video-preview__details")} props={{ align: 'start', gap: 1, grow: true }}>
                <div className="skeleton skeleton-profile">
                    <Profile 
                        url={""} 
                        alt={""}
                        variant="video-preview"
                    />
                </div>
                
                <Flex 
                    cls={css("video-preview__items", "width-100")} 
                    props={{ column: true, gap: 2, align: 'start', grow: true }}
                >
                    <div className={css(null, "skeleton skeleton-capsule width-100").class}>
                        <p>a</p>
                    </div>
                    

                    <div className={css(null, "skeleton skeleton-capsule width-100").class}>
                        <p>a</p>
                    </div>
                </Flex>
            </Flex>
        </Flex>
    )
}