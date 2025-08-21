import { CXoneSearchAppTabs } from '../digital/cxone-search-app-settings';
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
     *  @remarks - Search app settings
     */
    cxaSearchAppSettings?: CXoneSearchAppTabs;
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
       * @remarks - Indicates whether to enable PAGE action popout
       */
    pageActionPopout?: boolean;
    /**
       * @remarks - Indicates whether to send message on enter key press
       */
    sendOnEnter?: string;
    /**
       * @remarks - Logging level for the application
       */
    loggingLevel?: number;
    /**
       * @remarks - Expand the agent softphone when receives new interaction
       */
    expandSoftphone?: boolean;
    /**
     * @remarks - Favorite quick replies for inbound
     */
    cxaFavInQuickRep?: number[];
    /**
     * @remarks - Favorite quick replies for outbound
     */
    cxaFavOutQuickRep?: number[];
    /**
       * @remarks - Favorite agents
       */
    cxaFavAgents?: number[];
    /**
     * @remarks - Favorite Skill Activity
     **/
    cxaFavSkills?: number[];
    /**
       * @remarks - Favorite State Selector
       */
    cxaFavStates?: number[];
    /**
   * @remarks - Favorite teams
   **/
    cxaFavTeams?: number[];
    /**
     * @remarks - Favorite external directory entries
     */
    cxaFavExtDirectory?: string[];
    /**
     * @remarks - Email message sort order
     */
    emailMessageSortOrder?: string;
    /**
     * @remarks - Favorite Address Book
     */
    cxaFavStandAddBook?: number[];
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
     * Sets the search data for the CXone application settings.
     *
     * @param searchAppSettings - The search application settings to be parsed and set.
     * @example clientData.setSearchData(appSettings)
     */
    setSearchData(searchAppSettings: CXoneSearchAppTabs): void;
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
        CXASecondaryDevice: any; /**
         * @remarks - Favorite Skill Activity
         **/
        CXASecondaryDeviceName: any;
        CXARingtone: any;
        SecondaryDeviceDelay: any;
        AudioAgentMessage: any;
        AudioEndContact: any;
        AudioNewChat: any;
        AudioNewContact: any;
        VisualAgentMessage: any;
        VisualEndContact: any;
        VisualNewChat: any;
        VisualNewContact: any;
        AudioAgentMessageTone: any;
        AudioEndContactTone: any;
        AudioNewContactReplyTone: any;
        AudioNewContactTone: any;
        AutoAccept: any;
        Use24HourTime: any;
        Panels: any;
        PageActionPopout: any;
        SendOnEnter: any;
        LoggingLevel: any;
        ExpandSoftphone: any;
        CXAFavStates: any;
        CXAFavAgents: any;
        CXAFavInQuickRep: any;
        CXAFavOutQuickRep: any;
        emailMessageSortOrder: any;
        CXAFavTeams: any;
        CXAFavStandAddBook: any;
        CXAFavExtDirectory: any;
        CXAFavSkills: any;
    };
    /**
     * Maps the provided `CXoneClientData` to the current client data object, including search app settings.
     *
     * @param currentClientDataObj - The current client data object to be updated.
     * @param data - The new `CXoneClientData` containing updated settings.
     * @returns An object containing the merged settings from the current client data object and the new data.
     * @example clientData.mapperIncludingSearchAppSettings(clientDataObj, data)
     */
    mapperIncludingSearchAppSettings(currentClientDataObj: Record<string, unknown>, data: CXoneClientData): {
        CxaSearchAppSettings: unknown;
        softPhoneVolume: any;
        CXASecondaryDevice: any; /**
         * @remarks - Favorite Skill Activity
         **/
        CXASecondaryDeviceName: any;
        CXARingtone: any;
        SecondaryDeviceDelay: any;
        AudioAgentMessage: any;
        AudioEndContact: any;
        AudioNewChat: any;
        AudioNewContact: any;
        VisualAgentMessage: any;
        VisualEndContact: any;
        VisualNewChat: any;
        VisualNewContact: any;
        AudioAgentMessageTone: any;
        AudioEndContactTone: any;
        AudioNewContactReplyTone: any;
        AudioNewContactTone: any;
        AutoAccept: any;
        Use24HourTime: any;
        Panels: any;
        PageActionPopout: any;
        SendOnEnter: any;
        LoggingLevel: any;
        ExpandSoftphone: any;
        CXAFavStates: any;
        CXAFavAgents: any;
        CXAFavInQuickRep: any;
        CXAFavOutQuickRep: any;
        emailMessageSortOrder: any;
        CXAFavTeams: any;
        CXAFavStandAddBook: any;
        CXAFavExtDirectory: any;
        CXAFavSkills: any;
    };
}
