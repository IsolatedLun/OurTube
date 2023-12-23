import { T_InputValidatorCallback } from "@/utils/input/types";
import { Some } from "../types";



export const evalMinLength: T_InputValidatorCallback<[number]> = 
(min: number) => 
(value: string) => {
    return {
        error: `Must have atleast ${min} character(s).`,
        validate: () => value.length >= min
    };
};

export const evalMaxLength: T_InputValidatorCallback<[number]> = 
(max: number) => 
(value: string) => {
    return {
        error: `Must be less than ${max} character(s).`,
        validate: () => value.length <= max
    };
};

export const evalMinMaxLength: T_InputValidatorCallback<[number, number]> = 
(min: number, max: number) => 
(value: string) => {
    return {
        error: `Must be between ${min} - ${max} characters.`,
        validate: () => value.length >= min && value.length <= max 
    };
}

export const evalSpecialCharacters: T_InputValidatorCallback<[string[], boolean]> = 
(chars: string[], allowed: boolean) => 
(value: string) => {
    return {
        error: `Special character(s) [${chars}] are ${allowed ? "" : "not"} allowed.`,
        validate: () => Array.from(value).some(ch => chars.includes(ch)) && allowed
    };
}

export const evalFileType: T_InputValidatorCallback<[string]> = 
(type: string) => 
(file: Some<File>) => {
    return {
        error: `File must be of type "${type}".`,
        validate: () => file !== null && file.type === type
    };
}

export const evalFileSize: T_InputValidatorCallback<[number]> = 
(size: number) => 
(file: Some<File>) => {
    return {
        error: `File size must be less than ${size} MB.`,
        validate: () => file !== null && file.size >= size
    };
}