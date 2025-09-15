import { CXoneAuth } from '@nice-devone/auth-sdk';
import { HttpClient, HttpUtilService, Logger } from '@nice-devone/core-sdk';
/**
 * Class to manage all common methods
 */
export class CommonService {
    /**
     * get instance for initialize common service
     * @example
     * ```
     * new CommonService();
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK', 'CommonService');
        this.utilService = new HttpUtilService();
        this.auth = CXoneAuth.instance;
    }
    /**
     * This method is to get all the timezones
     * @example
     * ```
     * getTimezones();
     * ```
     */
    getTimezones() {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + CommonService.GET_TIMEZONES;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                var _a, _b, _c;
                this.logger.debug('getTimezones', 'Retrived total ' + ((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.timeZones) === null || _b === void 0 ? void 0 : _b.length) + ' timezones successfully');
                resolve((_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.timeZones);
            }, (error) => {
                this.logger.error('getTimezones', 'Get Timezones failed:- ' + error.toString());
                reject(error);
            });
        });
    }
}
//Api uri for get timezones
CommonService.GET_TIMEZONES = '/incontactapi/services/v25.0/timezones';
//# sourceMappingURL=common-services.js.map