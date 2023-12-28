import { T_CSS } from "@/utils/css/types";

export type T_ButtonVariant = "primary" | "secondary";
export type T_ButtonAttachment = "capsule";
export interface T_Button {
    class?: T_CSS;
    variant: T_ButtonVariant;
    attachments?: T_ButtonAttachment[];
    
    
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}