import Card from "@/components/Modules/Card/Card";
import { css } from "@/utils/css/css";
import { ReactNode } from "react";

export default function AuthLayout({ children } : { children: ReactNode }) {
    return(
        <div className={css("auth-container", "grid place-items-center margin-block-start-1").class}>
            <Card cls={css("", "width-100")}>
                {children}
            </Card>
        </div>
    )
}