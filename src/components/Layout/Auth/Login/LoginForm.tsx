import { T_LoginForm } from "@/app/auth/types";
import Button from "@/components/Interactibles/Button/Button";
import TextInput from "@/components/Interactibles/Inputs/TextInput";
import Flex from "@/components/Modules/Flex/Flex";
import { useFormHook } from "@/hooks/formHook";
import { pb } from "@/utils/backend";
import { css } from "@/utils/css/css";
import { emailValidators, passwordValidators } from "@/utils/input/defaults";
import { FormEvent, useState } from "react";

export default function LoginForm() {
    const [form, setForm] = useState<T_LoginForm>({
        email: '',
        password: '',
    })
    const [inputSetter, isFormValid] = useFormHook(form)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await pb.collection('users').authWithPassword(form.email, form.password);
        await pb.collection('users').authRefresh();
    }

    return (
        <form onSubmit={handleSubmit} className={css(null, "margin-block-start-2").class}>
            <Flex column={true} gap={2} align="start">
                <TextInput input={{
                    name: 'email',
                    label: 'Email Address',
                    placeholder: 'Enter Email Address',
                    inputType: 'text',
                    validators: emailValidators,
                    onInput: (e) => inputSetter(e, setForm)
                }} />

                <TextInput input={{
                    name: 'password',
                    label: 'Password',
                    placeholder: 'Enter Password',
                    inputType: 'password',
                    validators: passwordValidators,
                    onInput: (e) => inputSetter(e, setForm)
                }} />

                <Flex cls={css("", "margin-block-start-2")} column={true} align="start">
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