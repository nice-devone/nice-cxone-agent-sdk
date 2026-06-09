import { CXoneAgentEvent } from './cxone-agent-event';
/**
 * Model class for agent unavailable code event
 */
export declare class UpdateUnavailableCodeEvent extends CXoneAgentEvent {
    /**
     * The parse method will take the data object and assign the values to the updateUnavailableCodeEvent class properties
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
