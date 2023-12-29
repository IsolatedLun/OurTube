"use client";
import React, { useEffect, useState, ReactNode } from "react"
import { T_Button } from "./types";
import { css } from "@/utils/css/css";

export default function Button({ children, button } : { children: ReactNode, button: T_Button }) {
    useEffect(() => {
        setId(crypto.randomUUID());
    }, []);

    const [id, setId] = useState('');

    const Tag = button.to ? 'a' : 'button' as keyof JSX.IntrinsicElements;
    const buttonProps = button.to ? {"href": button.to} : {};

    return (
        <Tag 
            id={id} 
            className={css("button").extend(button.cls).class}

            data-variant={button.variant}
            data-attachments={button.attachments?.join(',')}

            onClick={(e) => button.onClick ? button.onClick(e as any) : null}

            {...buttonProps}
        >
            {children}
        </Tag>
    )
}
