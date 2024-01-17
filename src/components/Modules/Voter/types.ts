import { E_VoteStatus } from "@/hooks/voter/types";
import { DB_Colletions } from "@/utils/types";

export interface T_Voter {
    collectionName: DB_Colletions;
    id: string;

    status: E_VoteStatus;

    likes: number;
    dislikes: number;
}