"use client";

import Button from "@/components/Interactibles/Button/Button";
import Flex from "@/components/Modules/Flex/Flex";
import { css } from "@/utils/css/css";
import { useRouter } from "next/navigation";

export default function DefaultErrorPage() {
    const router = useRouter();

    return(
        <div className="error-page">
            <h2 className={css(null, "text-align-center margin-block-end-2").class}>
                <p className="clr-misc-error">404</p>
                <span>This page does not exist!</span>
            </h2>
            <Flex props={{ gap: 2, justify: 'center', grow: true }}>
                <Button button={{
                    variant: 'primary',
                    onClick: () => router.push('/')
                }}>
                    Go Home
                </Button>
            </Flex>
        </div>
    )
}