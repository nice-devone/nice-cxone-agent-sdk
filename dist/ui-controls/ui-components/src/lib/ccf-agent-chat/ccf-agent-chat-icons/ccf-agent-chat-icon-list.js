import { jsx as _jsx } from "react/jsx-runtime";
import { CcfAgentChatIcon } from './ccf-agent-chat-icons';
export var AGENT_CHAT_STATUS;
(function (AGENT_CHAT_STATUS) {
    AGENT_CHAT_STATUS["ONLINE"] = "online";
    AGENT_CHAT_STATUS["OFFLINE"] = "offline";
    AGENT_CHAT_STATUS["STATUS_UNKNOWN"] = "status_unknown";
})(AGENT_CHAT_STATUS || (AGENT_CHAT_STATUS = {}));
export var AGENT_CHAT_ICON;
(function (AGENT_CHAT_ICON) {
    AGENT_CHAT_ICON["CHANNEL"] = "channel_group";
    AGENT_CHAT_ICON["NEW_CHAT"] = "new_chat";
    AGENT_CHAT_ICON["DOWN_ARROW"] = "down_arrow";
    AGENT_CHAT_ICON["UP_ARROW"] = "up_arrow";
    AGENT_CHAT_ICON["LEFT_ARROW"] = "left_arrow";
    AGENT_CHAT_ICON["NO_MESSAGE"] = "no_message";
    AGENT_CHAT_ICON["PLUS"] = "plus";
    AGENT_CHAT_ICON["PLUS_BLACK"] = "plus_black";
    AGENT_CHAT_ICON["SEARCH"] = "search";
    AGENT_CHAT_ICON["LEAVE_ARROW"] = "leave_arrow";
    AGENT_CHAT_ICON["SEND_WHITE"] = "send_white";
    AGENT_CHAT_ICON["SEND_GREY"] = "send_grey";
    AGENT_CHAT_ICON["CHANNEL_WHITE"] = "channel_group_white";
    AGENT_CHAT_ICON["CHANNEL_GREY"] = "channel_group_grey";
    AGENT_CHAT_ICON["WHITE_STAR"] = "white_star";
    AGENT_CHAT_ICON["WHITE_STAR_OUTLINE"] = "white_star_outline";
    AGENT_CHAT_ICON["YELLOW_STAR"] = "yellow_star";
    AGENT_CHAT_ICON["CROSS_ICON"] = "cross_icon";
    AGENT_CHAT_ICON["EDIT"] = "edit";
})(AGENT_CHAT_ICON || (AGENT_CHAT_ICON = {}));
export const agentChatIconList = {
    [AGENT_CHAT_STATUS.ONLINE]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_STATUS.ONLINE })),
    [AGENT_CHAT_STATUS.OFFLINE]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_STATUS.OFFLINE })),
    [AGENT_CHAT_STATUS.STATUS_UNKNOWN]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_STATUS.STATUS_UNKNOWN })),
    [AGENT_CHAT_ICON.CHANNEL]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.CHANNEL })),
    [AGENT_CHAT_ICON.NEW_CHAT]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.NEW_CHAT })),
    [AGENT_CHAT_ICON.DOWN_ARROW]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.DOWN_ARROW })),
    [AGENT_CHAT_ICON.UP_ARROW]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.UP_ARROW })),
    [AGENT_CHAT_ICON.LEFT_ARROW]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.LEFT_ARROW })),
    [AGENT_CHAT_ICON.NO_MESSAGE]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.NO_MESSAGE })),
    [AGENT_CHAT_ICON.PLUS]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.PLUS })),
    [AGENT_CHAT_ICON.PLUS_BLACK]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.PLUS_BLACK })),
    [AGENT_CHAT_ICON.SEARCH]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.SEARCH })),
    [AGENT_CHAT_ICON.LEAVE_ARROW]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.LEAVE_ARROW })),
    [AGENT_CHAT_ICON.SEND_WHITE]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.SEND_WHITE })),
    [AGENT_CHAT_ICON.SEND_GREY]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.SEND_GREY })),
    [AGENT_CHAT_ICON.CHANNEL_WHITE]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.CHANNEL_WHITE })),
    [AGENT_CHAT_ICON.CHANNEL_GREY]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.CHANNEL_GREY })),
    [AGENT_CHAT_ICON.WHITE_STAR]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.WHITE_STAR })),
    [AGENT_CHAT_ICON.WHITE_STAR_OUTLINE]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.WHITE_STAR_OUTLINE })),
    [AGENT_CHAT_ICON.YELLOW_STAR]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.YELLOW_STAR })),
    [AGENT_CHAT_ICON.CROSS_ICON]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.CROSS_ICON })),
    [AGENT_CHAT_ICON.EDIT]: () => (_jsx(CcfAgentChatIcon, { iconName: AGENT_CHAT_ICON.EDIT })),
};
//# sourceMappingURL=ccf-agent-chat-icon-list.js.map