"use client";

import { AuthContext } from "@/components/Auth";
import Button from "@/components/Interactibles/Button/Button";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import Flex from "@/components/Modules/Flex/Flex";
import Line from "@/components/Modules/Line";
import { pb } from "@/utils/backend";
import { css } from "@/utils/css/css";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { AuthNavbarSection } from "./AuthNavbar";

export default function Navbar() {
    const { record } = useContext(AuthContext);

    return(
        <Flex 
            tag='nav' 
            props={{ align: 'center', justify: 'space-between', gap: 4 }}
            cls={css("primary-navigation")} 
        >
            <Flex cls={css(null, 'width-100')} props={{ gap: 2 }}>
                <h1>
                    <a href="/">OurTube</a>
                </h1>
                <TextInput 
                    input={{
                        label: 'Search videos & shorts',
                        name: 'search_query',
                        placeholder: 'Search videos & shorts',
                        validators: [],
                        value: '',
                        inputType: 'text',
                        onInput: () => null
                    }} showLabel={false} 
                />
            </Flex>
            {
                !record
                ? (
                    <Flex tag='ul' props={{ grow: false, gap: 2 }}>
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
                ) : <AuthNavbarSection user={record} />
            }
            
        </Flex>
    )
}