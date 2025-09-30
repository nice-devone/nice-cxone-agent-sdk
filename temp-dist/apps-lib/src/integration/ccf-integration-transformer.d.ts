import { CXoneAgentStateData } from '../interfaces/cxone-agent-state-data';
import { CXoneAuthRequestData } from '../interfaces/cxone-auth-request-data';
import { CXoneContactData } from '../interfaces/cxone-contact-data';
import { CXoneDigitalContactData } from '../interfaces/cxone-digital-contact-data';
import { CXoneScreenPopData } from '../interfaces/cxone-screen-pop-data';
import { CXoneVoiceContactData } from '../interfaces/cxone-voice-contact-data';
/**
 * Utility class to transform type from SDK to Integration schema.
 * This is to be used by this library, not needed to export from index
 */
export declare class CcfIntegrationTransformer {
    /**
     * Transforms object to CXoneScreenPopData that can be used by any integration apps.
     * @param source - Source object from CCF SDK that has the CRM Search Result
     * @returns Object for Integration Apps
     * @example - NA -
     */
    static toScreenPopEntityData(source: any): CXoneScreenPopData;
    /**
     * Transforms object to CXoneVoiceContactData that can be used by any integration apps.
     * @param source - Source object from CCF SDK that has Voice Contact Details
     * @returns Object for Integration Apps
     * @example - NA -
     */
    static toVoiceContactData(source: any): CXoneVoiceContactData;
    /**
     * Transforms object to CXoneDigitalContactData that can be used by any integration apps.
     * @param source - Source object from CCF SDK that has Digital Contact Details
     * @returns Object for Integration Apps
     * @example - NA -
     */
    static toDigitalContactData(source: any): CXoneDigitalContactData;
    /**
     * Transforms object to CXoneAgentStateData that can be used by any integration apps.
     * @param source - Source object from CCF SDK that has agent state Details
     * @returns Object for Integration Apps
     * @example - NA -
     */
    static toAgentCurrentStateData(source: any): CXoneAgentStateData;
    /**
     * Transforms object to CXoneAuthRequestData that can be used by any integration apps.
     * @param source - Source object from CXone Agent that has Auth Request information
     * @returns Object for Integration Apps
     * @example - NA -
     */
    static toCXoneAuthRequestData(source: any): CXoneAuthRequestData;
    /**
    * Transforms object to CXoneVoiceMailContactData that can be used by any integration apps.
    * @param source - Source object from CCF SDK that has VoiceMail Contact Details
    * @returns Object for Integration Apps
    * @example - NA -
    */
    static toVoiceMailContactData(source: any): CXoneContactData;
    /**
     * Transforms object to CXoneWorkItemContactData that can be used by any integration apps.
     * @param source - Source object from CCF SDK that has WorkItem Contact Details
     * @returns Object for Integration Apps
     * @example - NA -
     */
    static toWorkItemContactData(source: any): CXoneContactData;
}
