import { useTranslator } from '@nice-devone/ui-controls';
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
    const [translate] = useTranslator();
    switch (channelType) {
        case 'email':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'email',
            };
        case 'work item':
            return {
                name: channelType,
                displayName: translate('workItem'),
                icon: 'work-item-icon',
            };
        case 'chat':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'live-chat',
            };
        case 'tw':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'tw',
            };
        case 'fb':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'fb',
            };
        case 'ig':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'ig',
            };
        case 'sms':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'sms',
            };
        case 'whatsapp':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'whatsapp',
            };
        case 'line':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'line',
            };
        case 'li':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'li',
            };
        case '"smooch-io-we-chat"':
            return {
                name: channelType,
                displayName: translate('wechat'),
                icon: '"smooch-io-we-chat"',
            };
        case 'viber':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'viber',
            };
        case 'telegram':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'telegram',
            };
        case 'microsoft-teams':
            return {
                name: channelType,
                displayName: translate('microsoftteams'),
                icon: 'microsoft-teams',
            };
        case 'slack':
            return {
                name: channelType,
                displayName: translate(channelType),
                icon: 'slack',
            };
        case 'apple-business-chat':
            return {
                name: channelType,
                displayName: translate('applebusinesschat'),
                icon: 'apple-business-chat',
            };
        case 'google-business-messages':
            return {
                name: channelType,
                displayName: translate('googleBusinessMessage'),
                icon: 'google-business-messages',
            };
        case 'apple-apps-reviews':
            return {
                name: channelType,
                displayName: translate('appleAppsReviews'),
                icon: 'apple-apps-reviews',
            };
        case 'yt':
            return {
                name: channelType,
                displayName: translate('youtube'),
                icon: 'yt',
            };
        case 'google-play':
            return {
                name: channelType,
                displayName: translate('googlePlay'),
                icon: 'google-play',
            };
        case 'google-places':
            return {
                name: channelType,
                displayName: translate('googlePlaces'),
                icon: 'google-places',
            };
        case 'voice':
            return {
                name: channelType,
                displayName: translate('voice'),
                icon: 'voice',
            };
        default:
            return null;
    }
};
export default GetDigitalChannelProperties;
//# sourceMappingURL=ccf-digital-channel-properties.js.map