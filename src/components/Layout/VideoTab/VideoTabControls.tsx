import Flex from "@/components/Modules/Flex/Flex";
import { T_VideoTab } from "./types";
import { css } from "@/utils/css/css";
import Button from "@/components/Interactibles/Button/Button";
import Numeric from "@/components/Modules/Numeric/Numeric";

export default function VideoTabControls({ video } : { video: T_VideoTab }) {
    return (
        <Flex cls={css(null, "width-100")} justify="space-between">
            <Button button={{
                variant: 'primary'
            }}>
                Subscribe
            </Button>

            <Flex cls={css(null, "width-100")} justify="end">
                <Button button={{
                    variant: 'primary'
                }}>
                    <span className="margin-inline-end-1 clr-misc-text-muted">
                        Like
                    </span>
                    <Numeric n={video.likes} />
                </Button>
                <Button button={{
                    variant: 'primary'
                }}>
                    <span className="margin-inline-end-1 clr-misc-text-muted">
                        Dislike
                    </span>
                    <Numeric n={video.dislikes} />
                </Button>
                <Button button={{
                    variant: 'secondary'
                }}>
                    Share
                </Button>
                <Button button={{
                    variant: 'secondary'
                }}>
                    Download
                </Button>
                <Button button={{
                    variant: 'secondary'
                }}>
                    Report
                </Button>
            </Flex>
        </Flex>
    )
}