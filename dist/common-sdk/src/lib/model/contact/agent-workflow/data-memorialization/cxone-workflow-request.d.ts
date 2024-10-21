import { CXoneDigitalContactData, CXoneIntegrationEntity, CXoneVoiceContactData, RelatesToEntity } from '@nice-devone/shared-apps-lib';
/**
 * Interface used as a intermediate for creating request json for API call
 * ```
 * @example
 * Array<CXoneCRMWorkflowRequest>
 * ```
 */
export interface CXoneWorkflowRequest {
    /**
     * @remarks -Agent Integration workflow id
     * */
    workflowId?: string;
    /**
     * @remarks -Agent Integration configuration id
     * */
    configurationId?: string;
    /**
     * @remarks - type of Action
     * */
    action: string;
    /**
     * @remarks - Data Mapping Id
     * */
    dataMappingId?: string;
    /**
     * interactionID
     */
    interactionID?: string;
    /**
     * contactID
     */
    contactID?: string;
    /**
     *  paramter for workflow search
     */
    workflowInput?: {
        /**
         * @remarks - Phone Number
         */
        phoneNumber?: string;
        /**
         * @remarks - Email id
         */
        email?: string;
        /**
         * Array of CRM Entities to search comma separated string
         */
        entites?: CXoneIntegrationEntity[];
    };
    /**
     *  cxone contact information of different CRM flows
     */
    cxoneContact?: CXoneVoiceContactData | CXoneDigitalContactData;
    /**
     * @remarks - Data Memorialization Workflow Payload - changed to RelatesTo because of extending from CXoneIntegrationEntity
     * */
    integration?: RelatesToEntity[];
    /**
     * @remarks - cache key
     */
    cacheKey?: string;
    /**
    * @remarks - Dynamic Data Mapping Id
     * */
    dynamicDataMappingId?: string;
    /**
    * @remarks - custom Search Payload
     * */
    customSearch?: any;
    /**
     * @remarks - relatable entity  system name
    * */
    entity?: string;
    /**
     * @remarks - relatable entity id
    * */
    entityId?: string;
    /**
     * @remarks - related entity object payload
    * */
    relatedObject?: {
        /**
         * @remarks - related entity name
        * */
        name: string;
        /**
         * @remarks - related entity value
        * */
        value: string;
    };
}
