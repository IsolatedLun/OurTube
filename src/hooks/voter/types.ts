export enum E_VoteStatus {
    NEUTRAL,
    LIKED,
    DISLIKED
}

export type T_Votable = { likes: number, dislikes: number };