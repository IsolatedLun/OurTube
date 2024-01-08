import { T_CSS } from "@/utils/css/types";

export type T_ButtonVariant = "primary" | "secondary" | "error";
export type T_ButtonAttachment = 
    ""
    | "capsule" 
    | "full"
    | "block" 
    | "tiny-pad" 
    | "small-pad" 
    | "big-pad" 
    | "huge-pad";
    
export interface T_Button {
    cls?: T_CSS;
    variant: T_ButtonVariant;
    attachments?: T_ButtonAttachment[];
    to?: string;
    type?: "button" | "reset" | "submit";
    
    
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}