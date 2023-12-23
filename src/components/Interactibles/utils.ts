import { T_InputValidator } from "@/utils/input/types";
import { Dispatch, SetStateAction } from "react";

export function runValidators(
    input: HTMLInputElement, 
    validators: T_InputValidator[], 
    errorSetter: Dispatch<SetStateAction<string[]>>
) 
{
    for(let i = 0; i < validators.length; i++) {
        const validator = input.type === "file" 
            ? validators[i](input.files ? input.files[0] : null)
            : validators[i](input.value);
        if(!validator.validate()) {
            errorSetter(errors => [...errors, validator.error]);
        }
    }
}