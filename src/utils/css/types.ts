import { Some } from "../types";

export interface T_CSS {
    class: string;
    extend: (other?: Some<T_CSS>) => T_CSS;
}