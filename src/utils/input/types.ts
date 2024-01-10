import { T_CSS } from "@/utils/css/types";
import { ChangeEvent, ChangeEventHandler } from "react";


export type T_InputValidator = (value: any) => {
    validate: () => boolean;
    error: string;
};
export type T_InputValidatorCallback<T extends any[]> = (...args: T) => T_InputValidator;

export type T_InputAttachments = ""
export interface T_Input {
    cls?: T_CSS;
    label: string;
    placeholder: string;
    name: string;
    value: string;
    
    validators: T_InputValidator[];
    attachments?: T_InputAttachments[];

    onInput: (input: HTMLInputElement) => void;
}

export type T_FileInput = T_Input;
export type T_TextInput = T_Input & {inputType: "text" | "password"};
export type T_TextAreaInput = T_Input;