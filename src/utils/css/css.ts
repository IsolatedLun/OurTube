import { Some } from "../types";
import { T_CSS } from "./types";

export function css(block?: Some<string>, utility?: Some<string>): T_CSS {
    const cls = block + " | " + utility;
    return {
            class: cls,
            extend: (other: T_CSS) => {
                let otherCls = other.class.split('|');
                return css(`[ ${block} ${otherCls[0]} ]`, `[ ${utility} ${otherCls[1]} ]`)
            }
        };
}