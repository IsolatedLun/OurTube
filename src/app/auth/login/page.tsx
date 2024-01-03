"use client";

import Button from "@/components/Interactibles/Button/Button";
import { css } from "@/utils/css/css";
import LoginForm from "@/components/Layout/Auth/Login/LoginForm";

export default function Login() {
    return (
    <>
        <h2 className={css(null, "text-align-center").class}>Login</h2>
        <LoginForm />

        <a href="/auth/login" className={css(null, "display-block margin-block-start-2").class}>
            Don't have an account?
        </a>
    </>
    )
}