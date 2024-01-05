"use client";

import Button from "@/components/Interactibles/Button/Button";
import { css } from "@/utils/css/css";
import LoginForm from "@/components/Layout/Auth/Login/LoginForm";
import { AUTH_SIGNUP_URL } from "@/consts";
import Link from "next/link";

export default function Login() {
    return (
    <>
        <h2 className={css(null, "text-align-center").class}>Login</h2>
        <LoginForm />

        <Link 
            href={AUTH_SIGNUP_URL} 
            className={css(null, "display-block margin-block-start-2").class}
        >
            Don't have an account?
        </Link>
    </>
    )
}