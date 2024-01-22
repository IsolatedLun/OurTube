"use client";

import { T_LoginForm, T_SignUpForm } from "@/app/auth/types";
import { pb } from "@/utils/backend";
import { authLogin, authLogout, authSignUp } from "@/utils/backend/auth";
import { T_User, T_UserContext } from "@/utils/backend/types";
import { Some } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<T_UserContext>(null as any);
export function Auth({ children } : { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<Some<T_User>>(null);

    useEffect(() => {
        _refresh();
    }, [])

    async function _refresh() {
        await pb.collection('users').authRefresh();
        if(pb.authStore.isValid)
            setUser(pb.authStore.model as T_User)
        router.push('/');
    }

    async function _signUp(data: T_SignUpForm) {
        authSignUp(data).then(async() => await _login(data));
    }

    async function _login(data: T_LoginForm) {
        await authLogin(data);
        _refresh();
    }

    function _logout() {
        authLogout();
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{
            record: user,

            login: (data: T_LoginForm) => _login(data),
            signUp: (data: T_SignUpForm) => _signUp(data),
            logout: _logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}