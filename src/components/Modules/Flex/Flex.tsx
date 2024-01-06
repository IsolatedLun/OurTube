import { T_CSS } from "@/utils/css/types";
import { ReactNode } from "react";
import { T_Flex, defaultFlexProps } from "./types";
import { css } from "@/utils/css/css";




export default function Flex(
    { children, tag = 'div', cls, props = defaultFlexProps } 
    : 
    { children: ReactNode, tag?: string, cls?: T_CSS, props?: T_Flex }
) 
{
    const Tag = tag as keyof JSX.IntrinsicElements;
    const _cls = css(
        null, 
        [
            "flex", 
            `align-items-${props.align ?? defaultFlexProps.align}`, 
            `justify-content-${props.justify ?? defaultFlexProps.justify}`, 
            `gap-${props.gap ?? defaultFlexProps.gap}`,
            props.column ? 'flex-direction-column' : ""
        ].join(" ")
    )
    return(
        <Tag className={_cls.extend(cls).class} data-grow={props.grow ?? defaultFlexProps.grow}>
            {children}
        </Tag>
    )
}