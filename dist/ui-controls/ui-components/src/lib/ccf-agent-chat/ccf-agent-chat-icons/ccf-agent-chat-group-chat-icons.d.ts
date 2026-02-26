import { SvgIconProps } from '@mui/material';
export declare enum AGENT_GROUP_CHAT_ICON {
    PLUS_CIRCLE = "plus_circle",
    MINUS_CIRCLE = "minus_circle",
    EDIT_PENCIL = "edit_pencil",
    CIRCLE_LEFT = "circle_left",
    CHEVRON_DOWN = "chevron_down",
    CHEVRON_UP = "chevron_up"
}
interface IconListType {
    [svgName: string]: (size: string, svgProp?: SvgIconProps, viewBox?: string) => JSX.Element;
}
export declare const agentChatGroupChatList: IconListType;
export {};
