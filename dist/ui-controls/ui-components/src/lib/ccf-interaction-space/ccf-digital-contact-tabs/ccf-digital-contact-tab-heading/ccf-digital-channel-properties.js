/**
 *
 * @param channelType - input channel type
 * @returns - object specifying channel
 * @example
 * ```
 * GetDigitalChannelProperties(channelType)
 * ```
 */
const GetDigitalChannelProperties = (channelType) => {
    switch (channelType) {
        case 'email':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'email',
            };
        case 'email_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: channelType.replace('_inbound', ''),
                icon: 'email_inbound',
            };
        case 'email_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: channelType.replace('_outbound', ''),
                icon: 'email_outbound',
            };
        case 'workitem':
            return {
                name: channelType,
                displayName: 'workItem',
                icon: 'work-item-icon',
            };
        case 'chat':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'live-chat',
            };
        case 'chat_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: channelType.replace('_inbound', ''),
                icon: 'chat_inbound',
            };
        case 'chat_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: channelType.replace('_outbound', ''),
                icon: 'chat_outbound',
            };
        case 'tw':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'tw',
            };
        case 'tw_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: channelType.replace('_inbound', ''),
                icon: 'tw_inbound',
            };
        case 'tw_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: channelType.replace('_outbound', ''),
                icon: 'tw_outbound',
            };
        case 'fb':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'fb',
            };
        case 'fb_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: channelType.replace('_inbound', ''),
                icon: 'fb_inbound',
            };
        case 'fb_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: channelType.replace('_outbound', ''),
                icon: 'fb_outbound',
            };
        case 'ig':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'ig',
            };
        case 'ig_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: channelType.replace('_inbound', ''),
                icon: 'ig_inbound',
            };
        case 'ig_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: channelType.replace('_outbound', ''),
                icon: 'ig_outbound',
            };
        case 'sms':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'sms',
            };
        case 'sms_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: channelType.replace('_inbound', ''),
                icon: 'sms_inbound',
            };
        case 'sms_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: channelType.replace('_outbound', ''),
                icon: 'sms_outbound',
            };
        case 'whatsapp':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'whatsapp',
            };
        case 'whatsapp_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: channelType.replace('_inbound', ''),
                icon: 'whatsapp_inbound',
            };
        case 'whatsapp_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: channelType.replace('_outbound', ''),
                icon: 'whatsapp_outbound',
            };
        case 'line':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'line',
            };
        case 'line_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: channelType.replace('_inbound', ''),
                icon: 'line_inbound',
            };
        case 'line_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: channelType.replace('_outbound', ''),
                icon: 'line_outbound',
            };
        case 'li':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'li',
            };
        case 'li_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: channelType.replace('_inbound', ''),
                icon: 'li_inbound',
            };
        case 'li_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: channelType.replace('_outbound', ''),
                icon: 'li_outbound',
            };
        case 'smooch-io-we-chat':
            return {
                name: channelType,
                displayName: 'wechat',
                icon: 'smooch-io-we-chat',
            };
        case 'smooch-io-we-chat_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: 'wechat',
                icon: 'smooch-io-we-chat_inbound',
            };
        case 'smooch-io-we-chat_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: 'wechat',
                icon: 'smooch-io-we-chat_outbound',
            };
        case 'viber':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'viber',
            };
        case 'telegram':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'telegram',
            };
        case 'microsoft-teams':
            return {
                name: channelType,
                displayName: 'microsoftteams',
                icon: 'microsoft-teams',
            };
        case 'slack':
            return {
                name: channelType,
                displayName: channelType,
                icon: 'slack',
            };
        case 'apple-business-chat':
            return {
                name: channelType,
                displayName: 'applebusinesschat',
                icon: 'apple-business-chat',
            };
        case 'apple-business-chat_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: 'applebusinesschat',
                icon: 'apple-business-chat_inbound',
            };
        case 'apple-business-chat_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: 'applebusinesschat',
                icon: 'apple-business-chat_outbound',
            };
        case 'google-business-messages':
            return {
                name: channelType,
                displayName: 'googleBusinessMessage',
                icon: 'google-business-messages',
            };
        case 'apple-apps-reviews':
            return {
                name: channelType,
                displayName: 'appleAppsReviews',
                icon: 'apple-apps-reviews',
            };
        case 'yt':
            return {
                name: channelType,
                displayName: 'youtube',
                icon: 'yt',
            };
        case 'google-play':
            return {
                name: channelType,
                displayName: 'googlePlay',
                icon: 'google-play',
            };
        case 'google-places':
            return {
                name: channelType,
                displayName: 'googlePlaces',
                icon: 'google-places',
            };
        case 'voice':
            return {
                name: channelType,
                displayName: 'voice',
                icon: 'voice',
            };
        case 'voice_inbound':
            return {
                name: channelType.replace('_inbound', ''),
                displayName: channelType.replace('_inbound', ''),
                icon: 'voice_inbound',
            };
        case 'voice_outbound':
            return {
                name: channelType.replace('_outbound', ''),
                displayName: channelType.replace('_outbound', ''),
                icon: 'voice_outbound',
            };
        default:
            return null;
    }
};
export default GetDigitalChannelProperties;
//# sourceMappingURL=ccf-digital-channel-properties.js.map