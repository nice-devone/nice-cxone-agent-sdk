import { CXoneAgentEvent } from '../agent/cxone-agent-event';
/**
 * Model class for Update permissions event
 */
export declare class UpdatePermissionsEvent extends CXoneAgentEvent {
    /**
     * The parse will take the data object and assign the values to the UpdatePermissions class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
