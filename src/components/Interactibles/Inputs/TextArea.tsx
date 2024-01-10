"use client";

import { css } from "@/utils/css/css";
import { FormEvent, useEffect, useState } from "react"
import { T_TextAreaInput, T_TextInput } from "../../../utils/input/types";
import { runValidators } from "../utils";

export default function TextArea(
    { input, showLabel = true } : { input: T_TextAreaInput, showLabel?: boolean }
) {
    useEffect(() => {
        setId(crypto.randomUUID());
    }, []);

    const [id, setId] = useState(input.name);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    function handleInput(e: FormEvent<HTMLTextAreaElement>) {
        setErrors([]);

        const target = e.target as HTMLInputElement;
        runValidators(target, input.validators, setErrors);

        input.onInput(target);
        setIsValid(errors.length === 0);
    }

    return (
        <div 
            className={css("input-container", "flex flex-direction-column gap-1 width-100").extend(input.cls).class}

            data-variant="primary"
        >
            <label 
                className={css("input-container__label", showLabel ? "" : "visually-hidden").class} 
                htmlFor={id}
            >
                {input.label}
            </label>
            <textarea 
                className={css("input-container__input", "width-100").class} 
                onInput={handleInput} id={id} 
                
                name={input.name}
                placeholder={input.placeholder}
                value={input.value}

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