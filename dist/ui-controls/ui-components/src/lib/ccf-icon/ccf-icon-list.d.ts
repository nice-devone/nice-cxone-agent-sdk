import { SvgIconProps } from '@mui/material';
export declare const revamped_icons: string[];
export declare enum CHANNEL_ICON_NAME {
    WHATSAPP = "whatsapp",
    WHATSAPP_IB = "whatsapp_inbound",
    WHATSAPP_OB = "whatsapp_outbound",
    FB = "fb",
    FB_IB = "fb_inbound",
    FB_OB = "fb_outbound",
    EMAIL = "email",
    EMAIL_IB = "email_inbound",
    EMAIL_OB = "email_outbound",
    LIVECHAT = "live-chat",
    FB_MESSENGER = "facebook-messenger",
    FB_MESSENGER_IB = "facebook-messenger_inbound",
    FB_MESSENGER_OB = "facebook-messenger_outbound",
    INSTAGRAM = "instagram-dm",
    TWITTER = "twitter-dm",
    SMS = "sms",
    SMS_IB = "sms_inbound",
    SMS_OB = "sms_outbound",
    IBCALL = "ib-call",
    CHAT = "chat",
    CHAT_IB = "chat_inbound",
    CHAT_OB = "chat_outbound",
    VOICE = "voice",
    VOICE_IB = "voice_inbound",
    VOICE_OB = "voice_outbound",
    OBCALL = "ob-call",
    TW = "tw",
    TW_IB = "tw_inbound",
    TW_OB = "tw_outbound",
    IG = "ig",
    IG_IB = "ig_inbound",
    IG_OB = "ig_outbound",
    LINE = "line",
    LINE_IB = "line_inbound",
    LINE_OB = "line_outbound",
    LI = "li",
    LI_IB = "li_inbound",
    LI_OB = "li_outbound",
    TELEGRAM = "telegram",
    VIBER = "viber",
    SMOOCH_IO_WE_CHAT = "smooch-io-we-chat",
    SMOOCH_IO_WE_CHAT_IB = "smooch-io-we-chat_inbound",
    SMOOCH_IO_WE_CHAT_OB = "smooch-io-we-chat_outbound",
    SLACK = "slack",
    MS_TEAMS = "microsoft-teams",
    APPLE_BUSINESS_CHAT = "apple-business-chat",
    APPLE_BUSINESS_CHAT_IB = "apple-business-chat_inbound",
    APPLE_BUSINESS_CHAT_OB = "apple-business-chat_outbound",
    GOOGLE_BUSINESS_MESSAGE = "google-business-messages",
    WORK_ITEM = "work-item-icon",
    WORK_ITEM_TRANSPARENT = "work-item",
    APPLE_REVIEWS = "apple-apps-reviews",
    GOOGLE_PLAY = "google-play",
    GOOGLE_PLACES = "google-places",
    YOUTUBE = "yt",
    VOICEMAIL = "voice-mail",
    DIGITAL = "digital",
    VOICE_OLD = "Voice_old"
}
export declare enum CHANNEL_DIRECTION {
    INBOUND = "inbound",
    OUTBOUND = "outbound"
}
/**
 * Enum of Options for Channel Type
 */
export declare enum CHANNEL_TYPE {
    /**
    * @remarks - Option for Public Icon
    */
    PUBLIC = "public"
}
export declare enum ATTACHMENT_ICON_NAME {
    IMAGE = "image",
    PDF = "pdf",
    PREVIEW = "preview",
    DOWNLOAD = "download",
    DOWNLOADALL = "downloadall",
    DOCUMENT = "document",
    CLOSE = "close",
    RECORDING_STARTED = "recording-started",
    RECORDING_STOPPED = "recording-stopped",
    RECORDING_IN_PROGRESS = "recording-in-progress",
    REOCORDING_DISABLED = "recording-disabled"
}
export declare enum REACTION_ICONS {
    LIKE_FILLED = "like-filled",
    LIKE = "like",
    SHARE = "share"
}
export declare enum APPROVAL_BANNER_ICONS {
    APPROVAL_DENY = "approval-deny"
}
export declare enum LINK_ICONS {
    RICH_MESSAGE_LINK = "rich-message-link"
}
/**
 * Enum for representing message kebab menu options.
 */
export declare enum MESSAGE_ACTION_ICONS {
    REPLY = "reply",
    DELETE_CONTENT = "delete-content",
    DELETE_AUTHOR_NAME = "delete-author-name"
}
/**
 * Enum for representing digital search icons.
 */
export declare enum DIGITAL_SEARCH_ICONS {
    /**
     * Columns icon.
     */
    COLUMNS = "columns",
    /**
     * Permission denied icon.
     */
    PERMISSION_DENIED = "permission-denied"
}
/**
 * Enum for representing email action icons.
 */
export declare enum EMAIL_ACTIONS {
    /**
     * reply icon.
     */
    REPLY = "reply",
    /**
     * reply all icon.
     */
    REPLY_ALL = "reply-all",
    /**
     * forward icon
     */
    FORWARD = "forward"
}
interface IconListType {
    [svgName: string]: (size: string, svgProp?: SvgIconProps, viewBox?: string) => JSX.Element;
}
export declare const iconList: IconListType;
export {};
