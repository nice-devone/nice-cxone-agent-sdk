import { __awaiter } from "tslib";
import { KnowledgeArticle, KnowledgeArticleSuggestion, RtigMessageType, KnowledgeArticleTypeEnum, AgentAssistSettings, } from '@nice-devone/common-sdk';
import { Logger, dbInstance, IndexDBStoreNames, clearIndexDbStore, } from '@nice-devone/core-sdk';
import { BehaviorSubject, Subject } from 'rxjs';
const logger = new Logger('agent-assist', 'agent-assist-processor-service');
/**
 * Agent Assist Processor Service
 */
export class AgentAssistProcessorService {
    constructor() {
        this.knowledgeArticleSuggestions = [];
        this.onKnowledgeArticleSuggestionsReceived = new BehaviorSubject([]);
        this.onKnowledgeArticleSuggestionsReceivedForContactId = new Subject();
        this.onSmartRepliesReceivedForContactId = new Subject();
        this.onRtigStateUpdatePayload = new BehaviorSubject({});
        /**
         * Used to put agent assist getnext data into indexdb for a contact Id
         * @param updatedReduxSlice - AgentAssistWSRequest with GetNext payload to store in IndexDb
         * @example -
         * ```
         * agentAssistProcessorService.setAgentAssistGetNextInIndexDb();
         * ```
         */
        this.setAgentAssistGetNextInIndexDb = (newGetNextData) => __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const newKey = (newGetNextData === null || newGetNextData === void 0 ? void 0 : newGetNextData.contactId) + '_' + (newGetNextData === null || newGetNextData === void 0 ? void 0 : newGetNextData.providerId);
            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.AGENT_ASSIST, newGetNextData, newKey));
        });
        /**
         * Used to get GetNext event data from indexdb
         * @example -
         * ```
         * agentAssistProcessorService.getAllAgentAssistGetNextFromIndexDb();
         * ```
         */
        this.getAllAgentAssistGetNextFromIndexDb = () => __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const getnextDbDataList = yield (db === null || db === void 0 ? void 0 : db.getAll(IndexDBStoreNames.AGENT_ASSIST));
            return getnextDbDataList;
        });
        /**
         * Used to get GetNext event data from indexdb for a contact Id
         * @example -
         * ```
         * agentAssistProcessorService.getAgentAssistGetNextForContactIdFromIndexDb(contactId);
         * ```
         */
        this.getAgentAssistGetNextForContactIdFromIndexDb = (contactId) => __awaiter(this, void 0, void 0, function* () {
            const getnextDbDataList = yield this.getValuesByKeyPattern(IndexDBStoreNames.AGENT_ASSIST, contactId + '_');
            return getnextDbDataList;
        });
        /**
         * Used to remove getnext data from indexdb
         * @example -
         * ```
         * agentAssistProcessorService.clearAgentAssistStoreFromIndexDb();
         * ```
         */
        this.clearAgentAssistStoreFromIndexDb = () => __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const allGetNextData = yield (db === null || db === void 0 ? void 0 : db.getAll(IndexDBStoreNames.AGENT_ASSIST));
            if ((allGetNextData === null || allGetNextData === void 0 ? void 0 : allGetNextData.length) > 0) {
                yield clearIndexDbStore(IndexDBStoreNames.AGENT_ASSIST);
            }
        });
        /**
         * Used to remove getnext data from indexdb for a contact Id
         * @example -
         * ```
         * agentAssistProcessorService.removeAgentAssistGetNextForContactIdFromIndexDb();
         * ```
         */
        this.removeAgentAssistGetNextForContactIdFromIndexDb = (contactId) => __awaiter(this, void 0, void 0, function* () {
            yield this.removeEntriesByKeyPattern(IndexDBStoreNames.AGENT_ASSIST, contactId + '_');
        });
        /**
       * Used to get Index DB entries matching the key pattern in searchText
       * @param storeName - name of the index DB store
       * @param searchText - text pattern to search in the Keys
       * @example -
       * ```
       * const values = await this.getValuesByKeyPattern(storeName, searchText);
       * ```
       */
        this.getValuesByKeyPattern = (storeName, searchText) => __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const result = [];
            // Open a cursor to iterate over all entries
            let cursor = yield store.openCursor();
            while (cursor) {
                const key = cursor.key;
                // Check if the key contains the search text
                if (key.toString().includes(searchText)) {
                    result.push(cursor.value); // Collect the matching value
                }
                cursor = yield cursor.continue(); // Move to the next entry
            }
            yield tx.done;
            return result; // Return the array of matching values
        });
        /**
         * Used to remove Index DB entries matching the key pattern in searchText
         * @param storeName - name of the index DB store
         * @param searchText - text pattern to search in the Keys
         * @example -
         * ```
         * await this.removeEntriesByKeyPattern(storeName, searchText);
         * ```
         */
        this.removeEntriesByKeyPattern = (storeName, searchText) => __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            // Open a cursor to iterate over all entries
            let cursor = yield store.openCursor();
            while (cursor) {
                const key = cursor.key;
                // Convert the key to a string and check if it contains the search text
                if (key.toString().includes(searchText)) {
                    // Delete the entry if the key matches the pattern
                    yield cursor.delete();
                }
                cursor = yield cursor.continue(); // Move to the next entry
            }
            yield tx.done;
            logger.info('removeEntriesByKeyPattern', `Entries with keys containing "${searchText}" have been removed.`);
        });
    }
    /**
     * Reduce duplication in Knowledge Article Suggestions
     * @param existingSuggestions - existing KnowledgeArticleSuggestions Array
     * @param newArticles - : new KnowledgeArticles Array
     * @example -
     * ```
     * const newArticles = this.reduceDuplicateSuggestion(existingSuggestions, newArticles);
     * ```
     */
    reduceDuplicateSuggestion(existingSuggestions, newArticles) {
        var _a, _b, _c;
        const newArticleSuggestion = new KnowledgeArticleSuggestion();
        newArticleSuggestion.articles = [];
        // TODO: Smart Replies are restricted for release 24.4, uncomment when Smart Replies have responsiveness and are expected as deliverables 
        //const latestExistingTranscript = existingSuggestions[existingSuggestions.length - 1]?.transcript || '';
        for (let newArticleIndex = 0; newArticleIndex < (newArticles === null || newArticles === void 0 ? void 0 : newArticles.length); newArticleIndex++) {
            const newArticle = newArticles[newArticleIndex];
            let hasDuplicate = false;
            existingSuggestionsLoop: for (let existingSuggestionIndex = 0; existingSuggestionIndex < (existingSuggestions === null || existingSuggestions === void 0 ? void 0 : existingSuggestions.length); existingSuggestionIndex++) {
                const articles = (_a = existingSuggestions[existingSuggestionIndex]) === null || _a === void 0 ? void 0 : _a.articles;
                for (let existingArticleIndex = 0; existingArticleIndex < (articles === null || articles === void 0 ? void 0 : articles.length); existingArticleIndex++) {
                    const existingArticle = articles[existingArticleIndex];
                    hasDuplicate = this.validateArticle(newArticle) &&
                        this.validateArticle(existingArticle) &&
                        (existingArticle === null || existingArticle === void 0 ? void 0 : existingArticle.title) === (newArticle === null || newArticle === void 0 ? void 0 : newArticle.title) &&
                        ((_b = existingArticle === null || existingArticle === void 0 ? void 0 : existingArticle.descriptions) === null || _b === void 0 ? void 0 : _b.length) > 0 &&
                        ((_c = newArticle === null || newArticle === void 0 ? void 0 : newArticle.descriptions) === null || _c === void 0 ? void 0 : _c.length) > 0 &&
                        (existingArticle === null || existingArticle === void 0 ? void 0 : existingArticle.descriptions[0]) === (newArticle === null || newArticle === void 0 ? void 0 : newArticle.descriptions[0]);
                    if (hasDuplicate) {
                        break existingSuggestionsLoop;
                    }
                }
            }
            if (!hasDuplicate) {
                newArticleSuggestion.articles.push(newArticle);
            }
        }
        return newArticleSuggestion;
    }
    /**
     * validate a knowledge article
     * @param article - KnowledgeArticle
     * @example -
     * ```
     * bool isValid = this.validateArticle(article);
     * ```
     */
    validateArticle(article) {
        return article ? !!(article.uri || article.title || (Array.isArray(article.descriptions) && article.descriptions.length > 0)) : false;
    }
    /**
     * Pre-Process CCAI WebSocket Messages to filter before saving to state
     * @param resp - The CCAI websocket response
     * @param newMessage - The new message for web socket
     * @example -
     * ```
     * this.processCCAIWebSocketMessages(resp, newMessage);
     * ```
     */
    processCCAIWebSocketMessages(resp, newMessage) {
        var _a, _b, _c;
        // TODO: Smart Replies are restricted for release 24.4, uncomment when Smart Replies have responsiveness and are expected as deliverables
        //let suggestionCount = 0;
        let latestTranscriptMessage = '';
        const articles = [];
        const respContactId = (_b = (_a = resp === null || resp === void 0 ? void 0 : resp.body) === null || _a === void 0 ? void 0 : _a.topic) === null || _b === void 0 ? void 0 : _b.split('_')[0];
        this.knowledgeArticleSuggestions = this.onKnowledgeArticleSuggestionsReceived.getValue();
        let knowledgeArticleSuggestionsForContactId = ((_c = this.knowledgeArticleSuggestions.find(item => item.contactId == respContactId)) === null || _c === void 0 ? void 0 : _c.knowledgeArticleSuggestions) || [];
        // TODO: Smart Replies are restricted for release 24.4, uncomment when Smart Replies have responsiveness and are expected as deliverables
        //const existingSmartReplies = this.onSmartRepliesReceived.getValue();
        latestTranscriptMessage = newMessage.transcript || '';
        newMessage.suggestionResults.forEach((item) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (item.suggestFaqAnswersResponse &&
                Array.isArray((_a = item.suggestFaqAnswersResponse) === null || _a === void 0 ? void 0 : _a.faqAnswers) &&
                ((_c = (_b = item.suggestFaqAnswersResponse) === null || _b === void 0 ? void 0 : _b.faqAnswers) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                (_d = item.suggestFaqAnswersResponse) === null || _d === void 0 ? void 0 : _d.faqAnswers.forEach((faq) => {
                    var _a;
                    articles.push(new KnowledgeArticle({
                        id: (_a = resp === null || resp === void 0 ? void 0 : resp.body) === null || _a === void 0 ? void 0 : _a.id,
                        type: KnowledgeArticleTypeEnum.FAQ,
                        title: faq.question,
                        descriptions: [faq.answer],
                        confidence: faq.confidence || 0,
                    }));
                });
            }
            if (item.suggestArticlesResponse &&
                Array.isArray((_e = item.suggestArticlesResponse) === null || _e === void 0 ? void 0 : _e.articleAnswers) &&
                ((_g = (_f = item.suggestArticlesResponse) === null || _f === void 0 ? void 0 : _f.articleAnswers) === null || _g === void 0 ? void 0 : _g.length) > 0) {
                (_h = item.suggestArticlesResponse) === null || _h === void 0 ? void 0 : _h.articleAnswers.forEach((article) => {
                    var _a, _b, _c;
                    if ((_a = article.uri) === null || _a === void 0 ? void 0 : _a.startsWith('gs://')) {
                        const [bucket, ...path] = article.uri.slice(5).split('/');
                        article.uri = `https://storage.cloud.google.com/${bucket}/${path.join('/')}`;
                    }
                    articles.push(new KnowledgeArticle({
                        id: (_b = resp === null || resp === void 0 ? void 0 : resp.body) === null || _b === void 0 ? void 0 : _b.id,
                        type: KnowledgeArticleTypeEnum.ARTICLE,
                        title: article.title,
                        descriptions: article.snippets,
                        confidence: article.confidence,
                        timestamp: (_c = resp === null || resp === void 0 ? void 0 : resp.body) === null || _c === void 0 ? void 0 : _c.timestamp,
                        uri: article.uri,
                    }));
                });
            }
            // TODO: Smart Replies are restricted for release 24.4, uncomment when Smart Replies have responsiveness and are expected as deliverables
            //if (item.suggestSmartRepliesResponse) {
            //const lastSmartReply =
            //  Array.isArray(existingSmartReplies) && existingSmartReplies?.length > 0
            //    ? existingSmartReplies[existingSmartReplies.length - 1]
            //    : null;
            //if (
            //  Array.isArray(item.suggestSmartRepliesResponse?.smartReplyAnswers) &&
            //  item.suggestSmartRepliesResponse?.smartReplyAnswers?.length > 0
            //) {
            //  const smartReplySuggestion = new KnowledgeArticleSuggestion();
            //  smartReplySuggestion.messageId = item.suggestSmartRepliesResponse?.latestMessage;
            //  item.suggestSmartRepliesResponse?.smartReplyAnswers.forEach((sr) => {
            //    smartReplySuggestion.articles.push(
            //      new KnowledgeArticle({
            //        type: KnowledgeArticleTypeEnum.SMART_REPLY,
            //        title: sr.reply,
            //        confidence: sr.confidence,
            //      } as IKnowledgeArticle)
            //    );
            //    suggestionCount++;
            //  });
            //  this.onSmartRepliesReceivedForContactId.next({ contactId: respContactId, knowledgeArticleSuggestions: [smartReplySuggestion] });
            //}
            //else if (lastSmartReply && lastSmartReply.messageId != item.suggestSmartRepliesResponse.latestMessage) {
            //  this.onSmartRepliesReceived.next([]);
            //}
            //}
        });
        if (articles.length > 0) {
            const newArticleSuggestion = this.reduceDuplicateSuggestion(knowledgeArticleSuggestionsForContactId, articles);
            if (newArticleSuggestion.articles.length > 0) {
                newArticleSuggestion.timestamp = new Date();
                newArticleSuggestion.transcript = latestTranscriptMessage;
                if (knowledgeArticleSuggestionsForContactId && knowledgeArticleSuggestionsForContactId.length > 0) {
                    knowledgeArticleSuggestionsForContactId = [...knowledgeArticleSuggestionsForContactId, newArticleSuggestion];
                    if (knowledgeArticleSuggestionsForContactId.length > AgentAssistSettings.CCAI_MAX_ARTICLES_LIMIT) {
                        knowledgeArticleSuggestionsForContactId.shift();
                    }
                    const updatedEntry = {
                        contactId: respContactId,
                        knowledgeArticleSuggestions: knowledgeArticleSuggestionsForContactId,
                    };
                    this.knowledgeArticleSuggestions = this.knowledgeArticleSuggestions.filter(item => item.contactId != respContactId);
                    this.knowledgeArticleSuggestions = [...this.knowledgeArticleSuggestions, updatedEntry];
                }
                else {
                    const newEntry = {
                        contactId: respContactId,
                        knowledgeArticleSuggestions: [newArticleSuggestion],
                    };
                    this.knowledgeArticleSuggestions = [...this.knowledgeArticleSuggestions, newEntry];
                }
                // TODO: Smart Replies are restricted for release 24.4, uncomment when Smart Replies have responsiveness and are expected as deliverables
                //suggestionCount += newArticleSuggestion.articles.length;
                latestTranscriptMessage = '';
            }
            this.onKnowledgeArticleSuggestionsReceived.next(this.knowledgeArticleSuggestions);
            const knowledgeArticleSuggestionsForContactIdUpdated = this.knowledgeArticleSuggestions.find(item => item.contactId == respContactId);
            knowledgeArticleSuggestionsForContactIdUpdated && this.onKnowledgeArticleSuggestionsReceivedForContactId.next(knowledgeArticleSuggestionsForContactIdUpdated);
        }
    }
    /**
     * Pre-Process RTIG WebSocket Messages to filter before saving to state
     * @param wsMsgRespBody - The RTIG websocket message response
     * @example -
     * ```
     * this.processRTIGWebSocketMessages(wsMsgRespBody);
     * ```
     */
    processRTIGWebSocketMessages(wsMsgRespBody) {
        if ('messageType' in wsMsgRespBody) {
            switch (wsMsgRespBody.messageType) {
                case RtigMessageType.RTG_SUPERVISOR:
                    break;
                case RtigMessageType.RTG_ENLIGHTEN: {
                    this.onRtigStateUpdatePayload.next({
                        contactId: wsMsgRespBody.callId,
                        metricScores: wsMsgRespBody.enlightenResults,
                    });
                    break;
                }
                case RtigMessageType.RTG_EVENT_NOTIFICATION: {
                    this.onRtigStateUpdatePayload.next({
                        contactId: wsMsgRespBody.callId,
                        notificationResults: wsMsgRespBody,
                    });
                    break;
                }
                default:
                    break;
            }
        }
    }
    /**
     * Remove any In Memory data for a contact Id
     * @param contactId - contact Id
     * @example -
     * ```
     * this.removeInMemoryDataForContactId(contactId);
     * ```
     */
    removeInMemoryDataForContactId(contactId) {
        const filteredKbSuggestionsList = this.knowledgeArticleSuggestions.filter(item => item.contactId !== contactId);
        this.onKnowledgeArticleSuggestionsReceived.next(filteredKbSuggestionsList);
    }
}
//# sourceMappingURL=agent-assist-processor-service.js.map