export type Some<T> = T | null;

export interface T_CollectionItem {
    id: string;
    collectionId: string;
    collectionName: DB_Colletions;
    created: string;
    updated: string;
};

export interface T_DateCondition {
    text: string;
    pluralText: string;
    
    right: number;
    condition: Some<number>;
};

export type DB_Colletions = "" |"videos" | "channels" | "replies" | "users";