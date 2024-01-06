export type Some<T> = T | null;

export interface T_CollectionItem {
    id: string;
    collectionId: string;
    created: string;
    updated: string;
};

export interface T_DateCondition {
    text: string;
    pluralText: string;
    
    right: number;
    condition: Some<number>;
};