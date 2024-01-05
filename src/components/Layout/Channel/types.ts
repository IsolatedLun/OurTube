import { T_User } from "@/utils/backend/types";
import { T_Collection } from "@/utils/types";

export interface T_Channel extends T_Collection {
    user: T_User;

    banner: string;
    profile: string;
    name: string;
    description: string;
}