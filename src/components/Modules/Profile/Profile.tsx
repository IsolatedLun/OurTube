import { css } from "@/utils/css/css";
import { T_CSS } from "@/utils/css/types";
import { T_ProfileVariant } from "./types";

export default function Profile(
    { cls, url, alt, variant } 
    : 
    { cls?: T_CSS, url: string, alt: string, variant: T_ProfileVariant }
) 
{
    return (
        <img  
            className={css("profile").extend(cls).class}
            src={url} 
            alt={alt} 

            data-variant={variant}
        />
    )
}