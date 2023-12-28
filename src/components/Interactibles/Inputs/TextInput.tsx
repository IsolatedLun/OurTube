"use client";

import { css } from "@/utils/css/css";
import { ChangeEvent, useEffect, useState } from "react"
import { T_TextInput } from "../../../utils/input/types";
import { runValidators } from "../utils";

export default function TextInput({ input, showLabel = true } : { input: T_TextInput, showLabel?: boolean }) {
    useEffect(() => {
        setId(crypto.randomUUID());
    }, []);

    const [id, setId] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setErrors([]);

        const target = e.target as HTMLInputElement;
        runValidators(target, input.validators, setErrors);

        input.onInput(target);
        setIsValid(errors.length === 0);
    }

    return (
        <div 
            className={css("input-container", "flex flex-direction-column gap-1").extend(input.cls).class}

            data-variant="primary"
        >
            <label 
                className={css("input-container__label", showLabel ? "" : "visually-hidden").class} 
                htmlFor={id}
            >
                {input.label}
            </label>
            <input 
                className={css("input-container__input", "width-100").class} 
                onChange={handleInput} id={id} 
                
                name={input.name}
                placeholder={input.placeholder}
                type={input.inputType} 

                data-valid={isValid}
                data-attachments={input.attachments?.join(',')}
            />
            {
                errors.length > 0
                ? 
                (
                    <ul className={css("input-container__error-list", "margin-inline-start-4").class}>
                        {
                            errors.map(err => <li className="clr-misc-text-error">{err}</li>) 
                        }
                    </ul>
                )
                : null
            }
        </div>
    )
}