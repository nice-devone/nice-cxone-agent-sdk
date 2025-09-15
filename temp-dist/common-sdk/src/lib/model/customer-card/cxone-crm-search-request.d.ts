/**
 * Interface used as a Model for Request JSON
 * @returns returns - CRM search with configuration id , workflow id, phone number
 * ```
 * @example
 * Array<CXoneCRMSearchRequest>
 * ```
 */
export interface CXoneworkflowSearchRequest {
    searchParam?: {
        /**
         * action type of crm request
         */
        action: string;
        /**
         *  interaction Id
         */
        interactionID?: string;
        /**
         * cotact Id
         */
        contactID?: number;
        /**
         *  search workflow payload
         */
        searchWorkflowInput: {
            /**
             * @remarks - Phone Number
             */
            phoneNumber?: string;
            /**
             * @remarks - Email id
             */
            email?: string;
        };
    };
    workflowInput?: {
        action: string;
        cxone?: {
            /**
             * @remarks - Contact Id of Customer
             */
            contactId?: string;
            /**
             * @remarks - Master Contact Id Number
             */
            masterContactId?: number;
            /**
             * @remarks - Interaction Id Number
             */
            interactionId?: string;
            /**
             * @remarks - Media Type
             */
            mediaType?: string;
            /**
             * @remarks - Direction of contact
             */
            direction?: string;
            /**
             * @remarks - Agent Name
             */
            agentName?: string;
            /**
             * @remarks - Skill Name
             */
            skillName?: string;
            /**
             * @remarks - contact Started Date and Time
             */
            contactStartedAt?: Date;
            /**
             * @remarks - contact Assigned Date and Time
             */
            contactAssignedAt?: Date;
            /**
             * @remarks - contact Resolved Date and Time
             */
            contactResolvedAt?: Date;
        };
        integration?: {
            /**
             * @remarks - Object type of CRM record
             */
            relatedObjectType?: string;
            /**
             * @remarks - Object Id of CRM record
             */
            relatedObjectId?: string;
            /**
             * @remarks - Makeprivate flag
             */
            makePrivate?: boolean;
        };
    };
    /**
     * @remarks - Configuration Id
     */
    configurationId: string;
    /**
     * @remarks - Workflow Id
     */
    workflowId: string;
}
