import Button from "@/components/Interactibles/Button/Button";
import Flex from "../Flex/Flex";
import { T_Voter } from "./types";
import { css } from "@/utils/css/css";
import Numeric from "../Numeric/Numeric";
import { useVoter } from "@/hooks/voter/voterHook";
import { E_VoteStatus } from "@/hooks/voter/types";

export function Voter({ props } : { props: T_Voter }) {
    const [state, dispatch] = useVoter(props);


    return(
        <Flex props={{ grow: true, justify: 'end' }}>
            <Button button={{
                variant: 'primary',
                attachments: ['small-pad', state.status === E_VoteStatus.LIKED ? 'full' : ''],
                cls: css(null, 'fs-350'),
                onClick: () => dispatch({ type: E_VoteStatus.LIKED, payload: null })
            }}>
                <span className="margin-inline-end-1 clr-misc-text-muted">
                    Like
                </span>
                <Numeric n={state.likes} />
            </Button>
            <Button button={{
                variant: 'primary',
                attachments: ['small-pad', state.status === E_VoteStatus.DISLIKED ? 'full' : ''],
                cls: css(null, 'fs-350'),
                onClick: () => dispatch({ type: E_VoteStatus.DISLIKED, payload: null })
            }}>
                <span className="margin-inline-end-1 clr-misc-text-muted">
                    Dislike
                </span>
                <Numeric n={state.dislikes} />
            </Button>
        </Flex>
    )
}