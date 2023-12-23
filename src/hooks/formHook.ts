import { Dispatch, SetStateAction, useEffect, useState } from "react"

type T_FormHookUpdateFn = (e: HTMLInputElement, setter: Dispatch<SetStateAction<any>>) => void;
export function useFormHook(form: Record<string, any>): [T_FormHookUpdateFn, boolean] {
    const [inputs, setInputs] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Register form
    useEffect(() => {
        setInputs(Object.fromEntries(Object.keys(form).map(key => [key, false])));
    }, []);
    console.log(inputs)

    const updateInput = (e: HTMLInputElement, setter: Dispatch<SetStateAction<any>>) => {
        setter((prev: Record<any, any>) => {
            if(e.type === "file")
                return {...prev, [e.name]: e.files ? e.files[0] : null}
            else
                return {...prev, [e.name]: e.value};
        });

        setInputs(prev => {
            return {...prev, [e.name]: e.getAttribute("data-valid") === "true"}
        })
        setIsFormValid(Object.values(inputs).every(x => x));
    }

    return [updateInput, isFormValid]
}