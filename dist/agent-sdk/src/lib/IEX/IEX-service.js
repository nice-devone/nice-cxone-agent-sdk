import { CXoneAuth } from '@nice-devone/auth-sdk';
import { ACDSessionManager, ApiUriConstants, HttpClient, HttpUtilService, Logger } from '@nice-devone/core-sdk';
/**
 * Class to manage all commitments related methods
 */
export class IEXService {
    /**
     * get instance for initialize commitments
     * @example
     * ```
     * new CommitmentService();
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK', 'CommitmentService');
        this.utilService = new HttpUtilService();
        this.acdSession = {};
        this.auth = CXoneAuth.instance;
        this.acdSession = ACDSessionManager.instance;
    }
    /**
     * This method is to get all the IEXSchedules
     * @param agentId -  unique id of agent
     * @example
     * ```
     * getIEXSchedule(1464319);
     * ```
     */
    getIEXSchedule(agentId, startDate, endDate) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.GET_IEXSCHEDULE.replace('{agentId}', agentId.toString())
            .replace('{startDate}', startDate.toISOString())
            .replace('{endDate}', endDate.toISOString());
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                var _a, _b, _c;
                this.logger.debug('getIEXSchedule', 'Get IEXSchedule success:- ' + ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.resultSet));
                const IEXSchedules = (response === null || response === void 0 ? void 0 : response.data) && ((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.resultSet) ? (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.resultSet[0].scheduleResults : [];
                resolve(IEXSchedules);
            }, (error) => {
                this.logger.error('getIEXSchedule', 'Get IEXSchedule failed:- ' + error.toString());
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=IEX-service.js.map