"use client";

import { css } from "@/utils/css/css";
import { ChangeEvent, useEffect, useState } from "react"
import { T_Input, T_TextInput } from "./types";

export default function Input({ input } : { input: T_TextInput }) {
    const [id, setId] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    useEffect(() => {
        setId(crypto.randomUUID());
    }, []);

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setErrors([]);

        const target = e.target as HTMLInputElement;
        for(let i = 0; i < input.validators.length; i++) {
            const validator = input.validators[i](target.value);
            if(!validator.validate()) {
                setErrors(errors => [...errors, validator.error]);
            }
        }

        input.onInput(target);
    }

    return (
        <div className={css("input-container").class}>
            <label htmlFor={id}>{input.label}</label>
            <input 
                className={css("input-container__input").class} 
                onChange={handleInput} id={id} 
                type={input.inputType} 
            />
            <ul className={css("input-container__error-list").class}>
                {(errors.length > 0) 
                    ? errors.map(err => <li>{err}</li>) 
                    : ""
                }
            </ul>
        </div>
    )
}