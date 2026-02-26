export declare type displayName = 'email' | 'workItem' | 'chat' | 'tw' | 'fb' | 'ig' | 'sms' | 'whatsapp' | 'line' | 'li' | 'wechat' | 'viber' | 'telegram' | 'microsoftteams' | 'slack' | 'applebusinesschat' | 'googleBusinessMessage' | 'appleAppsReviews' | 'youtube' | 'googlePlay' | 'googlePlaces' | 'voice';
export interface DigitalChannelProperties {
    name: string;
    displayName: displayName | string;
    icon: string;
}
/**
 *
 * @param channelType - input channel type
 * @returns - object specifying channel
 * @example
 * ```
 * GetDigitalChannelProperties(channelType)
 * ```
 */
declare const GetDigitalChannelProperties: (channelType: string | undefined) => {
    name: string;
    displayName: string;
    icon: string;
} | null;
export default GetDigitalChannelProperties;
