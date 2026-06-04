import { CXoneMessage } from '../lib/model/digital/schema/events/cxone-message';
/**
 * Interface for UI specific properties extending the CXoneMessage interface
 */
export interface CXonePublicMessage extends CXoneMessage {
    /**
     * boolean value used to determine toggling the children
     */
    toggle?: boolean;
    /**
     * replies for the current messages
     */
    children?: Array<CXonePublicMessage>;
}
