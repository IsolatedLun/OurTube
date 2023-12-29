import { css } from "@/utils/css/css";
import { T_CSS } from "@/utils/css/types";

export default function Line({ cls } : { cls?: T_CSS }) {
    return(
        <div className={css('line').extend(cls).class} aria-hidden='true' />
    )
}