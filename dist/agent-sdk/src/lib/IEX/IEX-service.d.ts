import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
import { IEXResponse } from './model/IEXModel';
/**
 * Class to manage all commitments related methods
 */
export declare class IEXService {
    private auth;
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private acdSession;
    /**
     * get instance for initialize commitments
     * @example
     * ```
     * new CommitmentService();
     * ```
     */
    constructor();
    /**
     * This method is to get all the IEXSchedules
     * @param agentId -  unique id of agent
     * @example
     * ```
     * getIEXSchedule(1464319);
     * ```
     */
    getIEXSchedule(agentId: number, startDate: Date, endDate: Date): Promise<IEXResponse[]>;
}
