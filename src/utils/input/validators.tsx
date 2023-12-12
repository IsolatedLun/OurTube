import { T_InputValidator, T_InputValidatorCallback } from "@/components/Interactibles/types";



export const evalMinLength: T_InputValidatorCallback = (min: number) => (value: string) => {
    return {
        error: `Must have atleast ${min} character(s).`,
        validate: () => value.length >= min
    }
};

export const evalMaxLength: T_InputValidatorCallback = (max: number) => (value: string) => {
    return {
        error: `Must have less than ${max} character(s).`,
        validate: () => value.length <= max
    }
};

export const evalMinMaxLength: T_InputValidatorCallback = (min: number, max: number) => 
(value: string) => {
    return {
        error: `Must have between ${min} and ${max} characters.`,
        validate: () => value.length >= min && value.length <= max 
    }
}

export const evalSpecialCharacters: T_InputValidatorCallback = (chars: string[], allowed: boolean) => 
(value: string) => {
    return {
        error: `Special character(s) [${chars}] are ${allowed ? "" : "not"} allowed`,
        validate: () => chars.some((value, i) => value[i] == chars[i]) && allowed
    }
}