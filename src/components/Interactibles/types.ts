import { T_CSS } from "@/utils/css/types";


export type T_InputValidator = (value: any) => {
    validate: () => boolean;
    error: string;
};
export type T_InputValidatorCallback = (...Args: any) => T_InputValidator;

export interface T_Input<T> {
    cls?: T_CSS;
    label: string;
    name: string;
    
    inputType: T;
    validators: T_InputValidator[];
}

export type T_FileInput = T_Input<'file'>;
export type T_TextInput = T_Input<'text' | 'password'>;