import { AgentSettings } from '@nice-devone/core-sdk';
import { CXoneAudioVisualNotificationSettings, CXoneClientData, CXoneSdkError, MCHSetting } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
/**
 * Class to manage agent setting
 */
export declare class CXoneAgentSetting {
    private logger;
    private adminService;
    private acdSessionManager;
    mchAgentSettingsChangeEvent: Subject<MCHSetting>;
    /**
     * get instance for CXoneAgentSetting and adminService
     * @example
     * ```
     * const cxoneAgentSetting = new CXoneAgentSetting();
     * ```
     */
    constructor();
    /**
     * Method to return agent settings
     * @returns - return the agent settings
     * ```
     * @example
     * getAgentSettings()
     * ```
     */
    getAgentSettings(): Promise<AgentSettings | CXoneSdkError>;
    /**
     * To get client data and extract AVNotifications and soft phone settings
     * @param name - name of consumer for which client-data needs to be fetched
     * @param version - version
     * @example
     * ```
     * getAgentClientDataSettings();
     * ```
     */
    getAgentClientDataSettings(): Promise<CXoneClientData | CXoneSdkError>;
    /**
     * To update AVNotifications and softphone settings
     * @param updatedData - updated data received from consumer
     * @example
     * ```
     * updateAgentClientDataSettings();
     * ```
     */
    updateAgentClientDataSettings(updatedData: CXoneClientData): Promise<string | CXoneSdkError>;
    /**
     * Method to subscribe multi-channel agent settings
     */
    private onMCHAgentSettingsChange;
    /**
     * Method to get fav quick Replies
     * @returns
     * @example - getNotificationSettings()
     *
     */
    getNotificationSettings(): Promise<CXoneAudioVisualNotificationSettings>;
    /**
     * Method to set notification settings
     * @returns
     * @example -
     *
     */
    setNotificationSettings(clientData: CXoneAudioVisualNotificationSettings): Promise<void>;
    /**
     * Method to clear Notification Settings
     * @example
     * ```
     * clearNotificationSettings()
     * ```
     */
    clearNotificationSettings(): Promise<void>;
}
