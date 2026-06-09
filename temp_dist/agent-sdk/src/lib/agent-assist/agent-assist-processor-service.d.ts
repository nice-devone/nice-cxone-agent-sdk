import { IKnowledgeAssistMessage, AgentAssistWSRequest, KnowledgeArticlesForContactId } from '@nice-devone/common-sdk';
import { IndexDBStoreNames } from '@nice-devone/core-sdk';
import { BehaviorSubject, Subject } from 'rxjs';
/**
 * Agent Assist Processor Service
 */
export declare class AgentAssistProcessorService {
    private knowledgeArticleSuggestions;
    onKnowledgeArticleSuggestionsReceived: BehaviorSubject<KnowledgeArticlesForContactId[]>;
    onKnowledgeArticleSuggestionsReceivedForContactId: Subject<KnowledgeArticlesForContactId>;
    onSmartRepliesReceivedForContactId: Subject<KnowledgeArticlesForContactId>;
    onRtigStateUpdatePayload: BehaviorSubject<any>;
    /**
     * Reduce duplication in Knowledge Article Suggestions
     * @param existingSuggestions - existing KnowledgeArticleSuggestions Array
     * @param newArticles - : new KnowledgeArticles Array
     * @example -
     * ```
     * const newArticles = this.reduceDuplicateSuggestion(existingSuggestions, newArticles);
     * ```
     */
    private reduceDuplicateSuggestion;
    /**
     * validate a knowledge article
     * @param article - KnowledgeArticle
     * @example -
     * ```
     * bool isValid = this.validateArticle(article);
     * ```
     */
    private validateArticle;
    /**
     * Pre-Process CCAI WebSocket Messages to filter before saving to state
     * @param resp - The CCAI websocket response
     * @param newMessage - The new message for web socket
     * @example -
     * ```
     * this.processCCAIWebSocketMessages(resp, newMessage);
     * ```
     */
    processCCAIWebSocketMessages(resp: any, newMessage: IKnowledgeAssistMessage): void;
    /**
     * Pre-Process RTIG WebSocket Messages to filter before saving to state
     * @param wsMsgRespBody - The RTIG websocket message response
     * @example -
     * ```
     * this.processRTIGWebSocketMessages(wsMsgRespBody);
     * ```
     */
    processRTIGWebSocketMessages(wsMsgRespBody: any): void;
    /**
     * Remove any In Memory data for a contact Id
     * @param contactId - contact Id
     * @example -
     * ```
     * this.removeInMemoryDataForContactId(contactId);
     * ```
     */
    removeInMemoryDataForContactId(contactId: string): void;
    /**
     * Used to put agent assist getnext data into indexdb for a contact Id
     * @param updatedReduxSlice - AgentAssistWSRequest with GetNext payload to store in IndexDb
     * @example -
     * ```
     * agentAssistProcessorService.setAgentAssistGetNextInIndexDb();
     * ```
     */
    setAgentAssistGetNextInIndexDb: (newGetNextData: AgentAssistWSRequest) => Promise<void>;
    /**
     * Used to get GetNext event data from indexdb
     * @example -
     * ```
     * agentAssistProcessorService.getAllAgentAssistGetNextFromIndexDb();
     * ```
     */
    getAllAgentAssistGetNextFromIndexDb: () => Promise<AgentAssistWSRequest[]>;
    /**
     * Used to get GetNext event data from indexdb for a contact Id
     * @example -
     * ```
     * agentAssistProcessorService.getAgentAssistGetNextForContactIdFromIndexDb(contactId);
     * ```
     */
    getAgentAssistGetNextForContactIdFromIndexDb: (contactId: string) => Promise<AgentAssistWSRequest[]>;
    /**
     * Used to remove getnext data from indexdb
     * @example -
     * ```
     * agentAssistProcessorService.clearAgentAssistStoreFromIndexDb();
     * ```
     */
    clearAgentAssistStoreFromIndexDb: () => Promise<void>;
    /**
     * Used to remove getnext data from indexdb for a contact Id
     * @example -
     * ```
     * agentAssistProcessorService.removeAgentAssistGetNextForContactIdFromIndexDb();
     * ```
     */
    removeAgentAssistGetNextForContactIdFromIndexDb: (contactId: string) => Promise<void>;
    /**
   * Used to get Index DB entries matching the key pattern in searchText
   * @param storeName - name of the index DB store
   * @param searchText - text pattern to search in the Keys
   * @example -
   * ```
   * const values = await this.getValuesByKeyPattern(storeName, searchText);
   * ```
   */
    getValuesByKeyPattern: (storeName: IndexDBStoreNames, searchText: string) => Promise<any[]>;
    /**
     * Used to remove Index DB entries matching the key pattern in searchText
     * @param storeName - name of the index DB store
     * @param searchText - text pattern to search in the Keys
     * @example -
     * ```
     * await this.removeEntriesByKeyPattern(storeName, searchText);
     * ```
     */
    removeEntriesByKeyPattern: (storeName: IndexDBStoreNames, searchText: string) => Promise<void>;
}
