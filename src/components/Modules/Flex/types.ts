import { T_CSS } from "@/utils/css/types";

export type T_FlexAlignTypes = "start" | "center" | "end";
export type T_FlexJustifyTypes = "start" | "center" | "space-between" | "end";
interface _T_Flex {
    gap: number;

    align: T_FlexAlignTypes;
    justify: T_FlexJustifyTypes;

    collapseOnMobile: boolean;
    centerOnMobile: boolean;
    column: boolean;
    grow: boolean;
}
export type T_Flex = Partial<_T_Flex>;

export const defaultFlexProps: Required<T_Flex> = {
    align: "center",
    justify: "start",
    gap: 1,
    grow: false,
    column: false,
    collapseOnMobile: false,
    centerOnMobile: false
}