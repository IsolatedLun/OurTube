import { css } from "@/utils/css/css";
import { T_CSS } from "@/utils/css/types";
import { ReactNode }  from "react";

export default function Card({ children, cls } : { children: ReactNode, cls?: T_CSS }) {
    return (
        <div className={css("card").extend(cls).class}>
            {children}
        </div>
    )
} 