"use client";

import Button from "@/components/Interactibles/Button/Button";
import Flex from "@/components/Modules/Flex/Flex";
import { css } from "@/utils/css/css";
import Icon from "@/components/Modules/Icon";
import SignUpForm from "@/components/Layout/Auth/SignUp/SignupForm";
import { pb } from "@/utils/backend";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    async function signUpWithOAuth(provider: string) {
        pb.collection('users').authWithOAuth2({ provider }).finally(() => {
            router.push('/');
        });
    }


    return (
    <>
        <h2 className={css(null, "text-align-center").class}>Sign Up</h2>
        <SignUpForm />

        <a href="/auth/login" className={css(null, "display-block margin-block-start-2").class}>
            Already have an account?
        </a>

        <Flex cls={css(null, "margin-block-start-2")}>
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