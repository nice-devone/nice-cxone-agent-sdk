import { CXoneScreenPopEntity } from './cxone-integration-entity';
/**
 * An object holding basic properties of CXone ScreenPopData
 */
export interface CXoneScreenPopData {
    /**
     * Type of the screenpop to do
     */
    type: 'PopEntity' | 'PopUrl';
    /**
     * An object holding argument depending on the type value
     */
    params: CXoneScreenPopEntity;
    /**
     * @remarks ContactId 64bit number
     */
    contactId?: string;
    /**
     * @remarks actionType to identify screen pop event is triggered for contact switch
     */
    actionType?: string;
}
export interface CXoneScreenPopEntityData extends CXoneScreenPopData {
    /**
     * @remarks actionType to identify screen pop event is triggered for and entity
     */
    screenPop?: boolean;
}
