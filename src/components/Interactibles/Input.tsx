"use client";

import { css } from "@/utils/css/css";
import { useEffect, useState } from "react"
import { T_Input, T_TextInput } from "./types";

export default function Input({ input } : { input: T_TextInput }) {
    const [id, setId] = useState('');
    useEffect(() => {
        setId(crypto.randomUUID());
    }, []);

    return (
        <div className={css("input-container").class}>
            <label htmlFor={id}>{input.label}</label>
            <input id={id} type="text" />
        </div>
    )
}