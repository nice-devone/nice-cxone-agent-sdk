import { HttpResponse } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
/**
 * Class to manage all common methods
 */
export declare class CommonService {
    static GET_TIMEZONES: string;
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    /**
     * get instance for initialize common service
     * @example
     * ```
     * new CommonService();
     * ```
     */
    constructor();
    /**
     * This method is to get all the timezones
     * @example
     * ```
     * getTimezones();
     * ```
     */
    getTimezones(): Promise<HttpResponse>;
}
