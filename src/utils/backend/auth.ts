import { T_LoginForm, T_SignUpForm } from "@/app/auth/types";
import { pb } from ".";

export async function authSignUp(data: T_SignUpForm) {
    return pb.collection('users').create(data);
}

export async function authLogin(data: T_LoginForm) {
    return await pb.collection('users').authWithPassword(data.email, data.password);
}

export function authLogout() {
    pb.authStore.clear();
}