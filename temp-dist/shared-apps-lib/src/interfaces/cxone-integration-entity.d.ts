/**
 * Type for Integration Entity
 */
export interface CXoneIntegrationEntity {
    /**
     * CRM Entity/Record Type (ex. Case, Incident, Ticket)
     */
    entity: string;
    /**
     * CRM Entity/Record Identifier (ex. case-12345, abc-1234-2134, 12345)
     */
    entityId: string;
    /**
     * CRM Entity/Record Label (ex. Contact)
     */
    entityLabel?: string;
}
/**
 * interface for Relates to Entity extends CXoneIntegrationEntity
 */
export interface RelatesToEntity extends CXoneIntegrationEntity {
    /**
     * CRM RelatedObject for bindable fields in MSD
     */
    relatedObject?: object;
}
/**
 * Type for Integration Entity to do the screenpop
 */
export interface CXoneScreenPopEntity extends CXoneIntegrationEntity {
    /**
     * CRM Entity/Record url
     */
    url?: string;
    /**
     * Custom CRM data for screenpop
     */
    data?: string;
}
