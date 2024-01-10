import { css } from "@/utils/css/css";
import Flex from "../Flex/Flex";
import Profile from "../Profile/Profile";

export default function VideoCommentSkeleton() {
    return(
        <Flex props={{ grow: true, column: true, align: 'start', gap: 2 }}>
            <Flex cls={css("video-tab__comment")} props={{ grow: true, align: 'start' }}>
                <div className="skeleton skeleton-profile">
                    <Profile 
                        url={""} 
                        alt={""} 
                        variant="comment" 
                    />
                </div>

                <Flex 
                    cls={css("comment__details")} 
                    props={{ grow: true, column: true, align: 'start' }}
                >
                    <div className={css(null, "skeleton skeleton-capsule width-100").class}>
                        <p className="width-100">a</p>
                    </div>
                    <div className={css(null, "skeleton skeleton-capsule width-100").class}>
                        <p className="width-100">a</p>
                    </div>
                </Flex>
            </Flex>
        </Flex>
    )
}