/**
 * interface type for CXoneCRMNavigationChangeData
 */
export interface CXoneCRMNavigationChangeData {
    /**
    * @remarks CRM Entity/Record Type (ex. Case, Incident, Ticket)
    */
    entity: string;
    /**
     * @remarks CRM Entity/Record Identifier (ex. case-12345, abc-1234-2134, 12345)
     */
    entityId: string;
    /**
     * @remarks Field name to link with some other entity like task in salesforce and phone call in dynamics
     */
    mappingFieldName: string;
    /**
     * @remarks CRM Entity/Record Name
     */
    entityName: string;
}
