import { CXoneSdkError, HttpResponse, CXoneDisposition, CXoneDispositionDetails, CXoneTag, TagsResponse, CXoneSavedDisposition, CXoneAutoSummaryPayload, MediaType } from '@nice-devone/common-sdk';
import { HttpUtilService } from '@nice-devone/core-sdk';
import { CcfLogger } from '../logger/ccf-logger';
/**
 * Class to handle dispositions
 */
export declare class DispositionService {
    private auth;
    private acdSession;
    protected utilService: HttpUtilService;
    protected logger: CcfLogger;
    private GET_SAVED_DISPOSITION;
    private SAVE_DISPOSITION_URI;
    /**
     * Create instance of CXoneAuth and ACDSessionManager
     * ```
     * @example
     * const dispositionService = new DispositionService();
     * ```
     */
    constructor();
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
    getDispositions(skillId: string, mediaType: MediaType, contactId?: string): Promise<CXoneDisposition[]>;
    /**
     * Used to get the Tags based on the skill id provided
     * @param skillId - skill id to fetch the skill details
     * @example -
     * ```
     * this.dispositionService.getTags("123456");
     * ```
     */
    getTags(skillId: string): Promise<TagsResponse | CXoneSdkError>;
    /**
     * To save disposition and commitment data
     * @param contactId - contact Id
     * @param dispositionPayload -
     * @example
     * ```
     * saveDisposition();
     * ```
     */
    saveDisposition(contactId: string, dispositionPayload: CXoneDispositionDetails): Promise<HttpResponse>;
    /**
       * To save tags
       * @param contactId - contact Id
       * @param tagIDs - list of tag IDs
       * @example
       * ```
       * saveTags('124343', [tagId: '1', tagId: '2'])
       * ```
       */
    saveTags: (contactId: string, tagsPayload: CXoneTag[]) => Promise<HttpResponse | CXoneSdkError>;
    /**
     * To  get saved disposition
     * @param contactId - contact Id
     * @example
     * ```
     * getSavedDisposition('2123');
     * ```
     */
    getSavedDisposition(contactId: string): Promise<CXoneSavedDisposition>;
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
    generateAutoSummary: (caseId: string, autoSummaryPayload: CXoneAutoSummaryPayload) => Promise<HttpResponse | CXoneSdkError>;
}
