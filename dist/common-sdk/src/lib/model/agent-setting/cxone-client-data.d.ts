import { CXoneAudioVisualNotificationSettings } from './cxone-audio-visual-notification-settings';
import { CXoneSoftphoneNotificationSettings } from './cxone-softphone-notification-settings';
/**
 * Model class for Client Data
 */
export declare class CXoneClientData {
    /**
     * @remarks - Audio-visual notification settings
     */
    avNotification?: CXoneAudioVisualNotificationSettings;
    /**
     * @remarks - Integrated softphone notification settings
     */
    integratedSoftphone?: CXoneSoftphoneNotificationSettings;
    /**
         * @remarks - Indicates whether calls should be auto accepted
         */
    autoAccept?: boolean;
    /**
       * @remarks - Indicates whether to use 24-hour time format
       */
    twentyFourHourTime?: boolean;
    /**
       * @remarks - Indicates whether to enable panel popout
       */
    panelPopout?: boolean;
    /**
       * @remarks - Indicates whether to send message on enter key press
       */
    sendOnEnter?: string;
    /**
       * @remarks - Logging level for the application
       */
    loggingLevel?: number;
    /**
     * The parse method will take the data object and assign the values to the CXoneClientData class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: {
        [key: string]: any;
    }): void;
    /**
     * This method is to map CXoneClientData to client Data that is sent in payload
     * @param clientData - clientData object with all properties
     * @param data - client data
     * @example -
     * ```
     * mapper(clientData, consumerUpdatedData);
     * ```
     */
    mapper(currentClientDataObj: any, data: CXoneClientData): {
        softPhoneVolume: any;
        CXASecondaryDevice: any;
        CXARingtone: any;
        SecondaryDeviceDelay: any;
        AudioAgentMessage: any;
        AudioEndContact: any;
        AudioNewContactReply: any;
        AudioNewContact: any;
        VisualAgentMessage: any;
        VisualEndContact: any;
        VisualNewContactReply: any;
        VisualNewContact: any;
        VisualNewChat: any;
        AudioAgentMessageTone: any;
        AudioEndContactTone: any;
        AudioNewContactReplyTone: any;
        AudioNewContactTone: any;
        AutoAccept: any;
        Use24HourTime: any;
        Panels: any;
        SendOnEnter: any;
        LoggingLevel: any;
    };
}
