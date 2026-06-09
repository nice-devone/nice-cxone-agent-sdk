import { __awaiter } from "tslib";
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { Logger, HttpUtilService, HttpClient, UrlUtilsService, ApiUriConstants } from '@nice-devone/core-sdk';
/**
 * Class to perform get Attendant Agent List
 */
export class AttendantAgentListService {
    /**
     * Create instance of AttendantAgentListService
     * ```
     * @example
     * const attendantAgentListService = new AttendantAgentListService();
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK', 'AttendantAgentListService');
        this.utilService = new HttpUtilService();
        this.urlUtilsService = new UrlUtilsService();
        this.auth = CXoneAuth.instance;
    }
    /**
     * Used to get the agent list with attendant user status
     * @param attendantAgentListUrl - optional parameter to get all paginated agents as next url
     * @example -
     * ```
     * this.agentListService.getAttendantAgentList("someNextPagintatedUrl");
     * ```
     */
    getAttendantAgentList(attendantAgentListUrl) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.auth.getAuthToken();
            const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
            const cxOneConfig = this.auth.getCXoneConfig();
            let nextUrl = attendantAgentListUrl ||
                cxOneConfig.acdApiBaseUri + ApiUriConstants.AGENT_ATTENDANT_ACD_LIST_V34;
            // Only the first call build query params
            if (!attendantAgentListUrl) {
                const requestParams = {
                    skip: String(0),
                    top: String(5000),
                };
                nextUrl = this.urlUtilsService.appendQueryString(nextUrl, requestParams);
            }
            const allAgents = [];
            let lastResponse;
            let page = 1;
            try {
                while (nextUrl) {
                    this.logger.info('getAttendantAgentList', `Fetching page ${page}: ${nextUrl}`);
                    const response = yield HttpClient.get(nextUrl, reqInit);
                    const data = response.data;
                    if ((_a = data === null || data === void 0 ? void 0 : data.agents) === null || _a === void 0 ? void 0 : _a.length) {
                        allAgents.push(...data.agents);
                    }
                    lastResponse = data;
                    nextUrl = (_c = (_b = data === null || data === void 0 ? void 0 : data._links) === null || _b === void 0 ? void 0 : _b.next) !== null && _c !== void 0 ? _c : null;
                    page++;
                }
                // returning Agents data unified
                this.logger.info('getAttendantAgentList', `Successfully fetched complete agent list with ${allAgents.length} agents`);
                return Object.assign(Object.assign({}, lastResponse), { agents: allAgents });
            }
            catch (error) {
                const message = error instanceof Error
                    ? error.message
                    : 'Error while fetching paginated agent list';
                this.logger.error('getAttendantAgentList', message, error);
                throw error;
            }
        });
    }
}
//# sourceMappingURL=attendant-agent-list-service.js.map