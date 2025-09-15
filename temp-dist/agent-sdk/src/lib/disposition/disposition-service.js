import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType, CXoneDisposition, CXoneTagYup, CXoneSavedDispositionResponse, } from '@nice-devone/common-sdk';
import { ACDSessionManager, ApiUriConstants, HttpClient, HttpUtilService, } from '@nice-devone/core-sdk';
import { CcfLogger } from '../logger/ccf-logger';
/**
 * Class to handle dispositions
 */
export class DispositionService {
    /**
     * Create instance of CXoneAuth and ACDSessionManager
     * ```
     * @example
     * const dispositionService = new DispositionService();
     * ```
     */
    constructor() {
        this.acdSession = {};
        this.utilService = new HttpUtilService();
        this.logger = new CcfLogger('SDK', 'DispositionService');
        this.GET_SAVED_DISPOSITION = '/InContactAPI/services/V27.0/contacts/{contactId}/disposition';
        this.SAVE_DISPOSITION_URI = '/InContactAPI/services/v27.0/agent-sessions/{sessionId}/interactions/{contactId}/disposition';
        /**
           * To save tags
           * @param contactId - contact Id
           * @param tagIDs - list of tag IDs
           * @example
           * ```
           * saveTags('124343', [tagId: '1', tagId: '2'])
           * ```
           */
        this.saveTags = (contactId, tagsPayload) => {
            return new Promise((resolve, reject) => {
                if (!contactId
                    || !tagsPayload
                    || tagsPayload.length < 1) {
                    reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'tagIDs or Contact ID is empty'));
                    return;
                }
                const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
                const authToken = this.acdSession.accessToken;
                const reqInit = this.utilService.initHeader(authToken);
                const url = baseUrl +
                    ApiUriConstants.SAVE_TAGS_URI.replace('{contactId}', contactId);
                reqInit.body = { tags: tagsPayload };
                HttpClient.post(url, reqInit).then((response) => {
                    var _a, _b;
                    if (((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.resultSet) === null || _b === void 0 ? void 0 : _b.errorCount) === '0') {
                        this.logger.info('saveTags', 'saveTags success:-' + response.toString());
                        resolve(response);
                    }
                    else {
                        reject('Could not save tags');
                    }
                }, (error) => {
                    this.logger.error('saveTags', 'saveTags failed:-' + error.toString());
                    reject(error);
                });
            });
        };
        /**
           * This API is just to notify the backend to generate the auto summary.
         * Summary will be sent in the websocket.
           * @param autoSummaryPayload - payload to generate auto summary
           * @example
           * ```
           * generateAutoSummary({
         *  triggerReason: "Resolved",
         *  appType: "CXOneAgent",
         *  direction: "Inbound",
         *  eventTime: "2024-01-14T22:49:57.057-07:00",
         *  mediaType: "Digital",
         *  masterId: "1111",
         *  agentUUId: "11eb8172-8396-43d0-b76b-0242ac110004"
         * })
           * ```
           */
        this.generateAutoSummary = (caseId, autoSummaryPayload) => {
            return new Promise((resolve, reject) => {
                const baseUrl = this.acdSession.cxOneConfig.userHubBaseUrl;
                const authToken = this.acdSession.accessToken;
                const reqInit = this.utilService.initHeader(authToken, 'application/json');
                const url = baseUrl +
                    ApiUriConstants.GENERATE_AUTO_SUMMARY_URI.replace('{caseId}', caseId);
                reqInit.body = autoSummaryPayload;
                HttpClient.post(url, reqInit).then((response) => {
                    if (response.status === 200) {
                        this.logger.info('autoSummary', 'autoSummary success:-' + response.toString());
                        resolve(response);
                    }
                    else {
                        reject('Could not generate auto summary');
                    }
                }, (error) => {
                    this.logger.error('autoSummary', 'autoSummary failed:-' + error.toString());
                    reject(error);
                });
            });
        };
        this.auth = CXoneAuth.instance;
        this.acdSession = ACDSessionManager.instance;
    }
    /**
     * Used to get the disposition based on the skill id provided
     * @param skillId - skill id to fetch the skill details
     * @param contactId - its optional we will need when we want to add contact ID to the dispositions passed
     * @param mediaType - not required but good to set.  This will prevent a race condition on contacts
     * @example -
     * ```
     * this.dispositionService.getDispositions("123456");
     * ```
     */
    getDispositions(skillId, mediaType, contactId) {
        return new Promise((resolve, reject) => {
            if (!skillId || skillId === '0') {
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'skillId is empty'));
                return;
            }
            const token = this.auth.getAuthToken();
            const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
            const cxOneConfig = this.auth.getCXoneConfig();
            const url = cxOneConfig.acdApiBaseUri +
                ApiUriConstants.GET_DISPOSITION_URI.replace('{skillId}', skillId);
            HttpClient.get(url, reqInit).then((response) => {
                var _a, _b;
                this.logger.info('getDispositions', 'dispositions using skill id' + response.toString());
                let dispositions = [];
                if (response.status !== 204 /* HttpStatusCode.NO_CONTENT */) {
                    // if we get dispositions then only we will parse not in case of 204-no content
                    dispositions =
                        (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.dispositions) === null || _b === void 0 ? void 0 : _b.map((data) => {
                            const disposition = new CXoneDisposition();
                            disposition.parse(data);
                            if (contactId)
                                disposition.contactId = contactId;
                            disposition.mediaType = mediaType;
                            return disposition;
                        });
                }
                resolve(dispositions);
            }, (error) => {
                this.logger.error('getDispositions', 'Error while getting dispositions' +
                    error.toString());
                reject(error);
            });
        });
    }
    /**
     * Used to get the Tags based on the skill id provided
     * @param skillId - skill id to fetch the skill details
     * @example -
     * ```
     * this.dispositionService.getTags("123456");
     * ```
     */
    getTags(skillId) {
        return new Promise((resolve, reject) => {
            if (!skillId || skillId === '0') {
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'skillId is empty'));
                return;
            }
            const token = this.auth.getAuthToken();
            const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
            const cxOneConfig = this.auth.getCXoneConfig();
            const url = cxOneConfig.acdApiBaseUri +
                ApiUriConstants.GET_TAGS_URI.replace('{skillId}', skillId);
            HttpClient.get(url, reqInit).then((response) => {
                var _a;
                this.logger.info('getTags', 'tags using skill id' + response.toString());
                if (response.status !== 204 /* HttpStatusCode.NO_CONTENT */) {
                    // if we get tags then only we will parse not in case of 204-no content
                    let tags = { skillId: 0, contactId: '', tags: [] };
                    tags = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.resultSet;
                    const newTags = tags === null || tags === void 0 ? void 0 : tags.tags.map(tag => CXoneTagYup.cast(tag));
                    tags === null || tags === void 0 ? void 0 : tags.tags.splice(0, tags.tags.length, ...newTags);
                    resolve(tags);
                }
            }, (error) => {
                this.logger.error('getTags', 'Error while getting dispositions' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * To save disposition and commitment data
     * @param contactId - contact Id
     * @param dispositionPayload -
     * @example
     * ```
     * saveDisposition();
     * ```
     */
    saveDisposition(contactId, dispositionPayload) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl + this.SAVE_DISPOSITION_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        const requestParams = dispositionPayload;
        reqInit.body = requestParams;
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('saveDisposition', 'saveDisposition success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('saveDisposition', 'saveDisposition failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * To  get saved disposition
     * @param contactId - contact Id
     * @example
     * ```
     * getSavedDisposition('2123');
     * ```
     */
    getSavedDisposition(contactId) {
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl +
            this.GET_SAVED_DISPOSITION.replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getSavedDisposition', 'getSavedDisposition success:-' + response.toString());
                const parsedResult = CXoneSavedDispositionResponse.cast(response === null || response === void 0 ? void 0 : response.data);
                resolve(parsedResult);
            }, (error) => {
                this.logger.error('getSavedDisposition', 'getSavedDisposition failed:-' + error.toString());
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=disposition-service.js.map