import { css } from "@/utils/css/css";
import { T_CSS } from "@/utils/css/types";
import { ReactNode } from "react";

export default function Icon({ children, cls } : { children: ReactNode, cls?: T_CSS }) {
    return (
        <div className={css(null, "icon").extend(cls).class} aria-hidden='true'>
            {children}
        </div>
    )
}