import { DBSchema, IDBPDatabase } from 'idb';
import { AddressBooks, AgentMessageNotification, AgentStateResponse, CXoneAudioVisualNotificationSettings, CXoneDigitalChannel, DirectoryEntities, DirectoryResponse, FavQuickReply, NotificationEntities, SkillEvent, Team, CXoneRoutingQueue, WemNotificationDisplayData, Skills, CopilotMessageData, InteractionFailedMessages, AgentAssistWSRequest, agentCompletedContactsResponse, AddressBooksEntries, DirectoryAdditionalAtrributes, ConversationsGroupDetails } from '@nice-devone/common-sdk';
import { IndexDBStoreNames } from './enum/indexDB-store-names';
import { IndexDBKeyNames } from './enum/indexDB-key-names';
import { SkillActivityEvent } from './models/skill-activity-event';
declare type CcfCopilotData = {
    [caseId: string]: CopilotMessageData;
};
export interface storeSchema extends DBSchema {
    Directory: {
        key: DirectoryEntities | IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE | IndexDBKeyNames.ALL_SKILLS | IndexDBKeyNames.FAVORITE_AGENTS | IndexDBKeyNames.FAVORITE_TEAMS | IndexDBKeyNames.FAVORITE_STANDARD_ADDRESS_BOOK | IndexDBKeyNames.FAVORITE_SKILLS | IndexDBKeyNames.FAVORITE_DIGITAL_SKILLS | IndexDBKeyNames.FAVORITE_EXT_DIR_ENTRIES | IndexDBKeyNames.WEM_NOTIFICATIONS;
        value: Array<AgentStateResponse | SkillEvent | AddressBooks | Team | SkillActivityEvent | DirectoryAdditionalAtrributes> | DirectoryResponse | Array<AddressBooksEntries> | Array<Skills>;
    };
    Digital: {
        key: IndexDBKeyNames.OB_CHANNEL_LIST | IndexDBKeyNames.ROUTING_QUEUE | IndexDBKeyNames.ALL_CHANNELS | IndexDBKeyNames.INTERACTION_FAILED_MESSAGES;
        value: Array<CXoneDigitalChannel | CXoneRoutingQueue> | Map<string, CXoneDigitalChannel> | InteractionFailedMessages;
    };
    Notifications: {
        key: NotificationEntities;
        value: Array<AgentMessageNotification> | Array<WemNotificationDisplayData>;
    };
    QuickReplies: {
        key: IndexDBKeyNames.FAV_QUICK_REPLIES;
        value: Array<FavQuickReply>;
    };
    QuickRepliesOutbound: {
        key: IndexDBKeyNames.FAV_QUICK_REPLIES_OUTBOUND;
        value: Array<FavQuickReply>;
    };
    AgentSettings: {
        key: IndexDBKeyNames.AGENT_SETTINGS;
        value: CXoneAudioVisualNotificationSettings;
    };
    Copilot: {
        key: string | IndexDBKeyNames.COPILOT;
        value: CcfCopilotData;
    };
    AgentAssist: {
        key: string;
        value: AgentAssistWSRequest;
    };
    ContactHistory: {
        key: IndexDBKeyNames.ACD_CONTACT_HISTORY;
        value: {
            [contactId: string]: agentCompletedContactsResponse;
        };
    };
    Conversations: {
        key: IndexDBKeyNames.CONVERSATIONS_GROUPS;
        value: Array<ConversationsGroupDetails>;
    };
}
/**
 * Used to get the indexDB instance.
 * When we create new instance of 'dbInstance', the "upgrade" callback is only called when DB_VERSION is higher than the previous one.
 * @example -
 * ```
 * const db = dbInstance();
 * ```
 */
export declare const dbInstance: () => Promise<IDBPDatabase<storeSchema>>;
/**
 * Used to delete the index db instance
 * @example
 * ```
 * deleteDbInstance();
 * ```
 */
export declare const deleteDbInstance: () => Promise<void>;
/**
 * Used to clear the particular store from the indexDB
 * @param indexDBstoreName - store name which needs to be cleared out
 * @example -
 * ```
 * await clearIndexDbStore("Directory");
 * ```
 */
export declare const clearIndexDbStore: (indexDBstoreName: IndexDBStoreNames) => Promise<void>;
/**
 * Used to clear the particular key from the indexDB store
 * @param indexDBstoreName - store name
 * @param key - key name which needs to be cleared out
 * @example -
 * ```
 * await clearIndexDbKey("Directory", "allSkills");
 * ```
 */
export declare const clearIndexDbKey: (indexDBstoreName: IndexDBStoreNames, key: IndexDBKeyNames) => Promise<void>;
export {};
