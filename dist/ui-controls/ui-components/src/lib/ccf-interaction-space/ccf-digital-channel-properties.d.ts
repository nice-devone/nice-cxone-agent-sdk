export interface DigitalChannelProperties {
    name: string;
    displayName: string;
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
declare const GetDigitalChannelProperties: (channelType: string) => {
    name: "email";
    displayName: string;
    icon: string;
} | {
    name: "work item";
    displayName: string;
    icon: string;
} | {
    name: "chat";
    displayName: string;
    icon: string;
} | {
    name: "tw";
    displayName: string;
    icon: string;
} | {
    name: "fb";
    displayName: string;
    icon: string;
} | {
    name: "ig";
    displayName: string;
    icon: string;
} | {
    name: "sms";
    displayName: string;
    icon: string;
} | {
    name: "whatsapp";
    displayName: string;
    icon: string;
} | {
    name: "line";
    displayName: string;
    icon: string;
} | {
    name: "li";
    displayName: string;
    icon: string;
} | {
    name: "\"smooch-io-we-chat\"";
    displayName: string;
    icon: string;
} | {
    name: "viber";
    displayName: string;
    icon: string;
} | {
    name: "telegram";
    displayName: string;
    icon: string;
} | {
    name: "microsoft-teams";
    displayName: string;
    icon: string;
} | {
    name: "slack";
    displayName: string;
    icon: string;
} | {
    name: "apple-business-chat";
    displayName: string;
    icon: string;
} | {
    name: "google-business-messages";
    displayName: string;
    icon: string;
} | {
    name: "apple-apps-reviews";
    displayName: string;
    icon: string;
} | {
    name: "yt";
    displayName: string;
    icon: string;
} | {
    name: "google-play";
    displayName: string;
    icon: string;
} | {
    name: "google-places";
    displayName: string;
    icon: string;
} | {
    name: "voice";
    displayName: string;
    icon: string;
} | null;
export default GetDigitalChannelProperties;
