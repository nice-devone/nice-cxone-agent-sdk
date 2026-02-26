import { SvgIconProps } from '@mui/material';
export declare enum AGENT_CHAT_STATUS {
    ONLINE = "online",
    OFFLINE = "offline",
    STATUS_UNKNOWN = "status_unknown"
}
export declare enum AGENT_CHAT_ICON {
    CHANNEL = "channel_group",
    NEW_CHAT = "new_chat",
    DOWN_ARROW = "down_arrow",
    UP_ARROW = "up_arrow",
    LEFT_ARROW = "left_arrow",
    NO_MESSAGE = "no_message",
    PLUS = "plus",
    PLUS_BLACK = "plus_black",
    SEARCH = "search",
    LEAVE_ARROW = "leave_arrow",
    SEND_WHITE = "send_white",
    SEND_GREY = "send_grey",
    CHANNEL_WHITE = "channel_group_white",
    CHANNEL_GREY = "channel_group_grey",
    WHITE_STAR = "white_star",
    WHITE_STAR_OUTLINE = "white_star_outline",
    YELLOW_STAR = "yellow_star",
    CROSS_ICON = "cross_icon",
    EDIT = "edit"
}
interface IconListType {
    [svgName: string]: (size: string, svgProp?: SvgIconProps, viewBox?: string) => JSX.Element;
}
export declare const agentChatIconList: IconListType;
export {};
