"use client";

import Button from "@/components/Interactibles/Button/Button";
import Flex from "@/components/Modules/Flex/Flex";
import { css } from "@/utils/css/css";
import Icon from "@/components/Modules/Icon";
import SignUpForm from "@/components/Layout/Auth/SignUp/SignupForm";
import { pb } from "@/utils/backend";
import { useRouter } from "next/navigation";
import { AUTH_LOGIN_URL } from "@/consts";
import Link from "next/link";

export default function SignUp() {
    const router = useRouter();
    async function signUpWithOAuth(provider: string) {
        const authData = await pb.collection('users').authWithOAuth2({ provider });
    }


    return (
    <>
        <h2 className={css(null, "text-align-center").class}>Sign Up</h2>
        <SignUpForm />

        <Link 
            href={AUTH_LOGIN_URL} 
            className={css(null, "display-block margin-block-start-2").class}
        >
            Already have an account?
        </Link>

        <Flex cls={css(null, "margin-block-start-3")}>
            <p>Continue with: </p>
            <Button button={{
                variant: 'secondary',
                attachments: ['small-pad', 'block']
            }}>
                <Icon cls={css("fa-brands fa-google")} children={null} />
            </Button>
            <Button button={{
                variant: 'secondary',
                attachments: ['small-pad', 'block']
            }}>
                <Icon cls={css("fa-brands fa-youtube")} children={null} />
            </Button>
            <Button button={{
                variant: 'secondary',
                attachments: ['small-pad', 'block'],
                onClick: () => signUpWithOAuth('github')
            }}>
                <Icon cls={css("fa-brands fa-github")} children={null} />
            </Button>
        </Flex>
    </>
    )
}