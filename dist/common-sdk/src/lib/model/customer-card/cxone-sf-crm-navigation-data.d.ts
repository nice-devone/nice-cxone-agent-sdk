/**
 * Model for the Sf CRM Navigation Data Response Event
 */
export interface SfCrmNavigationDataResponseEvent {
    /**
       * contactId
       */
    contactId: string;
    /**
       * navigation entity id
       */
    entityId?: string;
    /**
       * navigation entity name
       */
    entityName?: string;
    /**
       * navigation entity name
       */
    mappingFieldName: string;
}
/**
 * Model for the CCF Name Relates Response Event
 */
export interface CcfNameRelatesResponseEvent {
    /**
        * contactId
        */
    contactId: string;
    /**
        * navigation entity value
        */
    value?: string;
}
/**
 * Model for SF CRM Navigation Entity
 */
export interface SfCrmNavigationEntity {
    entityValue: string;
    entityName: string;
}
/**
 * Model for Navigation Data
 */
interface NavigationData {
    whoid?: SfCrmNavigationEntity[];
    whatid?: SfCrmNavigationEntity[];
}
/**
 * Model for the Sf Crm Navigation Bulk Data Response Event
 */
export interface SfCrmNavigationBulkDataResponseEvent {
    /**
       * navigationData
       */
    navigationData?: NavigationData;
    /**
       * contactId
       */
    contactId: string;
}
export interface SfCrmNavigationDataState {
    [key: string]: NavigationData;
}
export interface NameRelatesToState {
    [key: string]: string;
}
export {};
