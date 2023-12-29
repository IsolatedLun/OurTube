import Button from "@/components/Interactibles/Button/Button";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import Flex from "@/components/Modules/Flex/Flex";
import Line from "@/components/Modules/Line";
import { css } from "@/utils/css/css";

export default function Navbar() {
    return(
        <Flex tag='nav' cls={css("primary-navigation")} gap={4} align="start" justify="space-between" grow={false}>
            <Flex cls={css(null, 'width-100')} gap={2}>
                <h1>OurTube</h1>
                <TextInput 
                    input={{
                        label: 'Search videos & shorts',
                        name: 'search_query',
                        placeholder: 'Search videos & shorts',
                        validators: [],
                        inputType: 'text',
                        onInput: () => null
                    }} showLabel={false} 
                />
            </Flex>
            <Flex tag='ul' grow={false} gap={2}>
                <li>
                    <Button button={{
                        variant: 'secondary',
                        attachments: [],
                        onClick: () => null,
                    }}>
                        Sign up
                    </Button>
                </li>
                <li>
                    <Line />
                </li>
                <li>
                    <Button button={{
                        variant: 'secondary',
                        attachments: [],
                        onClick: () => null,
                    }}>
                        Log in
                    </Button>
                </li>
            </Flex>
        </Flex>
    )
}