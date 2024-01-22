import { T_SignUpForm } from "@/app/auth/types";
import { AuthContext } from "@/components/Auth";
import Button from "@/components/Interactibles/Button/Button";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import Flex from "@/components/Modules/Flex/Flex";
import { useFormHook } from "@/hooks/formHook";
import { css } from "@/utils/css/css";
import { emailValidators, passwordValidators, usernameValidators } from "@/utils/input/defaults";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";

export default function SignUpForm() {
    const router = useRouter()
    const { signUp } = useContext(AuthContext);
    const [form, setForm] = useState<T_SignUpForm>({
        username: '',
        password: '',
        avatar: '',
        email: ''
    })
    const [inputSetter, isFormValid] = useFormHook(form)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        signUp({ ...form, passwordConfirm: form.password });
    }

    return (
        <form onSubmit={handleSubmit} className={css(null, "margin-block-start-2").class}>
            <Flex props={{ column: true, align: 'start', gap: 2 }}>
                <TextInput input={{
                    name: 'email',
                    label: 'Email Address',
                    placeholder: 'Enter Email Address',
                    value: form.email,
                    inputType: 'text',
                    validators: emailValidators,
                    onInput: (e) => inputSetter(e, setForm)
                }} />
                <TextInput input={{
                    name: 'username',
                    label: 'Username',
                    placeholder: 'Enter Username',
                    value: form.username,
                    inputType: 'text',
                    validators: usernameValidators,
                    onInput: (e) => inputSetter(e, setForm)
                }} />
                <TextInput input={{
                    name: 'password',
                    label: 'Password',
                    placeholder: 'Enter Password',
                    value: form.password,
                    inputType: 'password',
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
                        Proceed
                    </Button>
                </Flex>
            </Flex>
        </form>
    )
}