export interface IControllerLocalStorage {
    LocalStorageHelper: any;
    StorageKeys: any;
    setRelationshipInLocalStorage(pinnedRecordEntityId: string, entityId: string, entityType: string, contactId: string): void;
    removeRelationshipInLocalStorage(pinnedRecordEntityId: string, contactId: string): -3 | -2 | -1 | 0;
    getRelationshipFromLocalStorage(selectedContactId: string, pinnedRecordEntityId: string): {
        entityId: undefined | string;
        entityType: undefined | string;
    };
}
