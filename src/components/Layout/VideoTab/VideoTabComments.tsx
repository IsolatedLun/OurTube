import Flex from "@/components/Modules/Flex/Flex";
import { T_VideoTab } from "./types";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import { css } from "@/utils/css/css";
import Button from "@/components/Interactibles/Button/Button";

export default function VideoTabComments({ video } : { video: T_VideoTab }) {
    return (
        <Flex cls={css(null, "margin-block-3")} props={{ column: true, align: 'start', grow: true }}>
            <Flex tag="section" props={{ column: true,  align: 'end', grow: true }}>
                <h2 className="visually-hidden">Add a comment</h2>
                <TextInput input={{
                        name: 'comment',
                        placeholder: 'Enter a comment',
                        label: 'Comment',
                        validators: [],
                        inputType: 'text',
                        onInput: () => null
                    }} />
                <Button button={{
                    variant: 'primary'
                }}>
                    Comment
                </Button>
            </Flex>
            <section>
                <h2>3 comments</h2>
            </section>
        </Flex>
    )
}