import { T_LoginForm } from "@/app/auth/types";
import { AuthContext } from "@/components/Auth";
import Button from "@/components/Interactibles/Button/Button";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import Flex from "@/components/Modules/Flex/Flex";
import { useFormHook } from "@/hooks/formHook";
import { css } from "@/utils/css/css";
import { emailValidators, passwordValidators } from "@/utils/input/defaults";
import { FormEvent, useContext, useState } from "react";

export default function LoginForm() {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState<T_LoginForm>({
        email: '',
        password: '',
    })
    const [inputSetter, isFormValid] = useFormHook(form)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        login(form);
    }

    return (
        <form onSubmit={handleSubmit} className={css(null, "margin-block-start-2").class}>
            <Flex props={{ column: true, align: 'start', gap: 2 }}>
                <TextInput input={{
                    name: 'email',
                    label: 'Email Address',
                    placeholder: 'Enter Email Address',
                    inputType: 'text',
                    value: form.email, 
                    validators: emailValidators,
                    onInput: (e) => inputSetter(e, setForm)
                }} />

                <TextInput input={{
                    name: 'password',
                    label: 'Password',
                    placeholder: 'Enter Password',
                    inputType: 'password',
                    value: form.password,
                    validators: passwordValidators,
                    onInput: (e) => inputSetter(e, setForm)
                }} />

                <Flex cls={css("", "margin-block-start-2")} props={{ column: true, align: 'start', grow: true }}>
                    <Button button={{
                        variant: 'secondary',
                        attachments: ['big-pad'],
                        cls: css(null, 'width-100'),
                        type: 'submit'
                    }}>
                        Login
                    </Button>
                </Flex>
            </Flex>
        </form>
    )
}