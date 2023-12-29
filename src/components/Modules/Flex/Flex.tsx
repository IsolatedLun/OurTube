import { T_CSS } from "@/utils/css/types";
import { ReactNode } from "react";
import { T_FlexAlignTypes, T_FlexJustifyTypes } from "./types";
import { css } from "@/utils/css/css";

export default function Flex(
    { children, tag = 'div', cls, column = false, gap = 1, grow = true, align = 'center', justify = 'start' } 
    : 
    { children: ReactNode, tag?: string, cls?: T_CSS, column?: boolean, gap?: number, grow?: boolean,
        align?: T_FlexAlignTypes, justify?: T_FlexJustifyTypes }
) 
{
    const Tag = tag as keyof JSX.IntrinsicElements;
    const _cls = css(
        null, 
        ["flex", `align-items-${align}`, `justify-content-${justify}`, 
            `gap-${gap}`, column ? 'flex-direction-column' : ""].join(" ")
    )
    return(
        <Tag className={_cls.extend(cls).class} data-grow={grow}>
            {children}
        </Tag>
    )
}