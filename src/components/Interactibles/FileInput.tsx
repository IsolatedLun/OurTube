"use client";

import { css } from "@/utils/css/css";
import { ChangeEvent, useEffect, useState } from "react"
import { T_FileInput } from "../../utils/input/types";
import { runValidators } from "./utils";

export default function Input({ input } : { input: T_FileInput }) {
    useEffect(() => {
        setId(crypto.randomUUID());
    }, []);

    const [id, setId] = useState('');
    const [isValid, setIsValid] = useState(input.validators.length === 0);
    const [errors, setErrors] = useState<string[]>([]);

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setErrors([]);

        const target = e.target as HTMLInputElement;
        runValidators(target, input.validators, setErrors);

        input.onInput(target);
        setIsValid(errors.length === 0);
    }

    return (
        <div className={css("input-container file-input-container").extend(input.cls).class}>
            <label className={css("input-container__label").class} htmlFor={id}>{input.label}: </label>
            <input 
                className={css("input-container__input").class} 
                onChange={handleInput} id={id} 
                
                name={input.name}
                type="file"

                data-valid={isValid}
                data-attachments={input.attachments?.join(',')}
            />
            <ul className={css("input-container__error-list").class}>
                {
                    (errors.length > 0) 
                    ? errors.map(err => <li>{err}</li>) 
                    : ""
                }
            </ul>
        </div>
    )
}