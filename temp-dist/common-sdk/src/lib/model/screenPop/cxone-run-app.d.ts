import { CXoneAgentEvent } from '../agent/cxone-agent-event';
import { RunAppActionType } from '../../enum/runApp-action-type';
/**
 * Model class for CXone run app Screen Pop
 */
export declare class CXoneRunApp extends CXoneAgentEvent {
    /**
     * @remarks - Type of screen pop
     */
    actionType: RunAppActionType;
    /**
     * @remarks - Action of screen pop
     */
    actionValue: string;
    /**
     * @remarks - Unique identifier of sender contact id
     */
    contactId: string;
    /**
     * @remarks - timeout on waiting
     */
    waitTimeout: string;
    /**
     * @remarks - Callback method for custom form
     */
    customFormCallback?: (event: any) => void;
    /**
     * The constructor will take the data object and assign the values to the cxone run app class properties
     * @param data - Data object received
     * @example -
     * ```
     * cxoneRunApp.parse(screenPop);
     * ```
     */
    parse(data: {
        [key: string]: any;
    }): void;
}
