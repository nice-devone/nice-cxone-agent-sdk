import { ContactData } from '../../../../model/contact-data';
/**
 * Interface to tranform the payload of Create timeline & DM
 */
export interface CXoneExecuteTimelineDataMapping {
    /**
     * Contact Object conatinaing data for voice/digital
     */
    contact?: ContactData;
    /**
     * Dispositon infromation used for DM & timeline creation
     */
    dispositionData?: any;
    /**
     * linked activity data used for DM & timeline creation
     */
    selectedActivityData?: any;
    /**
     * Config object of CRM configuration used for DM & timeline creation
     */
    selectedActivityConfig?: any;
    /**
     * Information about active contact
     */
    activeContact?: any;
    /**
     * Store object of digital contact
     */
    digitalContactDetails: any;
    /**
     * Store object of Routing queues
     */
    getCxoneRoutingQueuId: any;
    /**
     * Current user information
     */
    currentUser: any;
    /**
     * Store object of voice contact
     */
    voiceContactDetails?: any;
    /**
     *  list of pinned interactions
     */
    pinnedInteractions?: any;
}
/**
 * Interface to handle local storage object
 */
export interface CXoneStoredCRMConfig {
    /**
     * Contact object for voice/digital
     */
    contacts: any;
    /**
     * Activity Data
     */
    activityData: any;
    /**
     * CRM search object stored in LS
     */
    cxoneCcActivitySearch: any;
    /**
     * CustomEvent details received in get next event
     */
    customEventDetails: any;
}
