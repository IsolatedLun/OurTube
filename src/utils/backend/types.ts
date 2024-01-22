import { T_LoginForm, T_SignUpForm } from "@/app/auth/types";
import { Some } from "../types";
import { RecordModel } from "pocketbase";
import { T_Channel } from "@/components/Layout/Channel/types";

export interface T_User {
    id: string;
    
    username: string;
    email: string;
    avatar: string;
    
    verified: boolean;

    channel: Some<T_Channel>;
}

export interface T_UserContext {
    record: Some<T_User>;

    login: (data: T_LoginForm) => any;
    logout: () => void;
    signUp: (data: T_SignUpForm & { passwordConfirm: string }) => any;
}