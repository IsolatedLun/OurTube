import { T_CSS } from "@/utils/css/types";
import { ChangeEvent, ChangeEventHandler } from "react";


export type T_InputValidator = (value: any) => {
    validate: () => boolean;
    error: string;
};
export type T_InputValidatorCallback<T extends any[]> = (...args: T) => T_InputValidator;

export interface T_Input<T, V> {
    cls?: T_CSS;
    label: string;
    name: string;
    
    inputType: T;
    validators: T_InputValidator[];

    onInput: (input: HTMLInputElement) => void;
}

export type T_FileInput = T_Input<'file', File>;
export type T_TextInput = T_Input<'text' | 'password', string>;