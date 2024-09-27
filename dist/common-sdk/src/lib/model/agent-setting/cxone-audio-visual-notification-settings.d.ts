import { CXoneClientData } from './cxone-client-data';
/**
 * Model class for AVNotifications
 */
export declare class CXoneAudioVisualNotificationSettings {
    /**
     * @remarks indicates a message is sent to the agent.
     */
    audioAgentMessage: boolean;
    /**
     * @remarks tone value for indicating new message is sent to the agent
     */
    audioAgentMessageTone: string;
    /**
     * @remarks indicates the realtime audio contact (chat and phone) has ended.
     */
    audioEndContact: boolean;
    /**
     * @remarks tone value when realtime audio contact (chat and phone) has ended.
     */
    audioEndContactTone: string;
    /**
     * @remarks  indicates a current chat or SMS has received a new response from the customer.
     */
    audioNewContactReply: boolean;
    /**
     * @remarks tone value for when the current chat or SMS has received a new response from the customer .
     */
    audioNewContactReplyTone: string;
    /**
     * @remarks  indicates a new contact is offered to the agent.
     */
    audioNewContact: boolean;
    /**
     * @remarks tone value for indicating a new contact is offered to the agent
     */
    audioNewContactTone: string;
    /**
     * @remarks  indicates a message is sent to the agent.
     */
    visualAgentMessage: boolean;
    /**
     * @remarks  new video chat
     */
    visualNewChat: boolean;
    /**
     * @remarks  indicates the realtime contact (chat and phone) has ended.
     */
    visualEndContact: boolean;
    /**
     * @remarks indicates a current chat or SMS has received a new response from the customer.
     */
    visualNewContactReply: boolean;
    /**
     * @remarks  indicates a new contact is offered to the agent.
     */
    visualNewContact: boolean;
    /**
     * This method to parse AV notification details from client data
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
     * This method is to map CXoneAgentNotificationSettings to client Data that is sent in payload
     * @param clientData - clientData object with all properties
     * @param data - client data with av-notification and softphone setting properties
     * @example -
     * ```
     * mapper(data);
     * ```
     */
    mapper(clientData: {
        [key: string]: any;
    }, data: CXoneClientData): {
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
    };
}
