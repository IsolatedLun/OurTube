import Flex from "@/components/Modules/Flex/Flex";
import { T_VideoTab } from "./types";
import { css } from "@/utils/css/css";
import Button from "@/components/Interactibles/Button/Button";
import Numeric from "@/components/Modules/Numeric/Numeric";
import Icon from "@/components/Modules/Icon";
import { ICON_DOWNLOAD, ICON_REPORT, ICON_SHARE } from "@/icons";
import { Voter } from "@/components/Modules/Voter/Voter";
import { E_VoteStatus } from "@/hooks/voter/types";

export default function VideoTabControls({ video } : { video: T_VideoTab }) {
    return (
        <Flex cls={css(null, "width-100")} props={{ justify: 'space-between' }}>
            <Button button={{
                variant: 'primary'
            }}>
                Subscribe
            </Button>

            <Flex cls={css(null, "width-100")} props={{ justify: 'end' }}>
                <Voter props={{ ...video, status: E_VoteStatus.NEUTRAL }} />
                <Button button={{
                    variant: 'secondary'
                }}>
                    <Icon>{ICON_SHARE}</Icon>
                </Button>
                <Button button={{
                    variant: 'secondary'
                }}>
                    <Icon>{ICON_DOWNLOAD}</Icon>
                </Button>
                <Button button={{
                    variant: 'secondary'
                }}>
                    <Icon>{ICON_REPORT}</Icon>
                </Button>
            </Flex>
        </Flex>
    )
}