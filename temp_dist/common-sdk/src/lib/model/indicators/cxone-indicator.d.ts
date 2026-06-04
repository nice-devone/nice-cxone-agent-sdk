import { CXoneAgentEvent } from '../agent/cxone-agent-event';
import { IndicatorActionType } from '../../enum/indicator-action-type';
/**
 * Model class for CXone Indicators
 */
export declare class CXoneIndicator extends CXoneAgentEvent {
    /**
     * @remarks - Type of Indicator - Agent / Contact
     */
    isContactIndicator: boolean;
    /**
     * @remarks - Action of indicator
     */
    actionValue: string;
    /**
     * @remarks - Type of indicator
     */
    actionType: IndicatorActionType;
    /**
     * @remarks - path of indicator image
     */
    imageFile: string;
    /**
     * @remarks - Unique identifier of indicator
     */
    indicatorName: string;
    /**
     * @remarks - Unique identifier of sender contact id
     */
    contactId: string;
    /**
     * @remarks - Tooltip of indicator
     */
    toolTip: string;
    /**
     * @remarks -
     */
    isEnabled: boolean;
    /**
     * @remarks - Callback method for custom form
     */
    customFormCallback?: (event: any) => void;
    /**
     * The constructor will take the data object and assign the values to the cxone indicators class properties
     * @param data - Data object received
     * @example -
     * ```
     * cxoneIndicator.parse(indicator);
     * ```
     */
    parse(data: {
        [key: string]: any;
    }): void;
}
