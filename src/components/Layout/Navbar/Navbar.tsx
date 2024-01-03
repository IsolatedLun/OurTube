"use client";

import Button from "@/components/Interactibles/Button/Button";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import Flex from "@/components/Modules/Flex/Flex";
import Line from "@/components/Modules/Line";
import { pb } from "@/utils/backend";
import { css } from "@/utils/css/css";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    return(
        <Flex tag='nav' cls={css("primary-navigation")} gap={4} align="center" justify="space-between" grow={false}>
            <Flex cls={css(null, 'width-100')} gap={2}>
                <h1>
                    <a href="/">OurTube</a>
                </h1>
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
                        cls: css(null, "whitespace-nowrap"),
                        variant: 'secondary',
                        attachments: [],
                        to: '/auth/signup'
                    }}>
                        Sign up
                    </Button>
                </li>
                <li>
                    <Line />
                </li>
                <li>
                    <Button button={{
                        cls: css(null, "whitespace-nowrap"),
                        variant: 'secondary',
                        attachments: [],
                        to: '/auth/login'
                    }}>
                        Log in
                    </Button>
                </li>
            </Flex>
        </Flex>
    )
}