import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
/**
 * Class for the "Relates To" local storage controller.
 */
class ControllerLocalStorage {
    constructor() {
        this.LocalStorageHelper = LocalStorageHelper;
        this.StorageKeys = StorageKeys;
        this.setRelationshipInLocalStorage = (pinnedRecordEntityId, entityId, entityType, contactId) => {
            const relationships = this.LocalStorageHelper.getItem(this.StorageKeys.CC_RELATESTO_ACTIVITIES_V2, true) || {};
            relationships[contactId] = Object.assign(Object.assign({}, relationships[contactId]), { [pinnedRecordEntityId]: {
                    entityId,
                    entityType,
                } });
            this.LocalStorageHelper.setItem(this.StorageKeys.CC_RELATESTO_ACTIVITIES_V2, relationships);
        };
        this.removeRelationshipInLocalStorage = (pinnedRecordEntityId, contactId) => {
            const relationships = this.LocalStorageHelper.getItem(this.StorageKeys.CC_RELATESTO_ACTIVITIES_V2, true) || {};
            if (!Object.keys(relationships).includes(contactId)) {
                return -1;
            }
            if (!Object.keys(relationships[contactId]).includes(pinnedRecordEntityId)) {
                return -2;
            }
            try {
                delete relationships[contactId][pinnedRecordEntityId];
                this.LocalStorageHelper.setItem(this.StorageKeys.CC_RELATESTO_ACTIVITIES_V2, relationships);
                // eslint-disable-next-line
            }
            catch (error) {
                return -3;
            }
            return 0;
        };
        this.getRelationshipFromLocalStorage = (selectedContactId, pinnedRecordEntityId) => {
            var _a, _b, _c;
            if (!selectedContactId || !pinnedRecordEntityId) {
                return {
                    entityId: undefined,
                    entityType: undefined,
                };
            }
            const localStorageRelationshipsBySelectedContactID = (_b = ((_a = this.LocalStorageHelper.getItem(StorageKeys.CC_RELATESTO_ACTIVITIES_V2, true)) !== null && _a !== void 0 ? _a : {})[selectedContactId]) !== null && _b !== void 0 ? _b : {};
            const { entityId, entityType } = (_c = localStorageRelationshipsBySelectedContactID[pinnedRecordEntityId]) !== null && _c !== void 0 ? _c : {};
            return {
                entityId,
                entityType,
            };
        };
    }
}
export default new ControllerLocalStorage();
//# sourceMappingURL=localStorage.js.map