import { CXoneAudioVisualNotificationSettings } from './cxone-audio-visual-notification-settings';
/**
 * Model class for Interaction Events
 */
export interface InteractionDetails {
    id: string;
    status: string;
    skillName: string;
}
/**
 * Model class for visual Notification Details
 */
export interface VisualNotificationDetails {
    title: string;
    from?: string;
    customerName?: string;
    message?: string;
    contactId?: string;
    skillName?: string;
    display?: boolean;
}
/**
 * Model class for Headset Device
 */
export interface HeadsetDevice {
    name: string;
    id: string;
}
/**
 * Model class for Agent Settings
 */
export interface CXoneAgentSettings {
    avNotifications: CXoneAudioVisualNotificationSettings;
    notifiedEvents: InteractionDetails[];
    visualNotificationDetails: VisualNotificationDetails;
    currentHeadsetDevice: HeadsetDevice;
    headsetDeviceList: HeadsetDevice[];
}
