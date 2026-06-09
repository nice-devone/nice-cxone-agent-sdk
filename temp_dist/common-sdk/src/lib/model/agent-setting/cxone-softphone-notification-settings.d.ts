import { CXoneClientData } from './cxone-client-data';
/**
 * Model class for IntegratedSoftphone
 */
export declare class CXoneSoftphoneNotificationSettings {
    /**
     * @remarks  Enables the agent to define the volume of his/her speakers (output device)
     */
    softPhoneVolume?: number;
    /**
     * @remarks  type of secondary device
     */
    secondaryDevice?: number;
    /**
     * @remarks  ringtone options which will play to the agent as a "ringer".
     */
    ringtone?: number;
    /**
     * @remarks  secondary device delay
     */
    secondaryDeviceDelay?: number;
    /**
     * @remarks  secondary device name
     */
    secondaryDeviceName?: number;
    /**
     * This method to parse softphone settings from client data
     * @param data -
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: {
        [key: string]: any;
    }): void;
    /**
     * This method is to map CXoneSoftphoneNotificationSettings to client Data that is sent in payload
     * @param clientData - clientData object with all properties
     * @param data - client data with av-notification and softphone setting properties
     * @example -
     * ```
     * mapper(data);
     * ```
     */
    mapper(clientData: {
        [key: string]: any;
    }, data: Partial<CXoneClientData>): {
        softPhoneVolume: any;
        CXASecondaryDevice: any;
        CXASecondaryDeviceName: any;
        CXARingtone: any;
        SecondaryDeviceDelay: any;
    };
}
