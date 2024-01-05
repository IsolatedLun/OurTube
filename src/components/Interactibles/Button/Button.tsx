"use client";
import React, { useEffect, useState, ReactNode } from "react"
import { T_Button } from "./types";
import { css } from "@/utils/css/css";
import Link from "next/link";

export default function Button({ children, button } : { children: ReactNode, button: T_Button }) {
    function _Button() {
        return (
            <button 
                id={id} 
                className={css("button").extend(button.cls).class}
    
                data-variant={button.variant}
                data-attachments={button.attachments?.join(',')}
    
                onClick={(e) => button.onClick ? button.onClick(e as any) : null}
            >
                {children}
            </button>
        )
    }

    useEffect(() => {
        setId(crypto.randomUUID());
    }, []);

    const [id, setId] = useState('');

    if(button.to) {
        return (
            <Link className={css(null, "display-block width-100").class} href={button.to}>
                <_Button />
            </Link>
        )
    }

    return <_Button />
}
