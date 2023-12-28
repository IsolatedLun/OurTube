"use client";
import React, { useEffect, useState, ReactNode } from "react"
import { T_Button } from "./types";
import { css } from "@/utils/css/css";

export default function Button({ children, button } : { children: ReactNode, button: T_Button }) {
    useEffect(() => {
        setId(crypto.randomUUID());
    }, []);

    const [id, setId] = useState('');

    return (
        <button 
            id={id} 
            className={css("button").extend(button.class).class}

            data-variant={button.variant}
            data-attachments={button.attachments?.join(',')}

            onClick={(e) => button.onClick(e)}
        >
            {children}
        </button>
    )
}
