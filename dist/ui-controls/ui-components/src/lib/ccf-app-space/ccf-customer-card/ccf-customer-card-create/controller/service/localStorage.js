import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
/**
 * Class for the "Create Entity" local storage controller.
 */
class ControllerLocalStorage {
    constructor() {
        this.LocalStorageHelper = LocalStorageHelper;
        this.StorageKeys = StorageKeys;
        this.getListsFromLocalStorage = () => {
            var _a;
            const lists = (_a = this.LocalStorageHelper.getItem(this.StorageKeys.AGENT_WORKFLOW_EVENT_CREATE_PAYLOAD)) !== null && _a !== void 0 ? _a : {};
            let data = {};
            try {
                data = JSON.parse(lists);
                // eslint-disable-next-line no-empty
            }
            catch (_) { }
            return data;
        };
        this.setListByInteraction = (id, list = []) => {
            var _a;
            if (!id) {
                return -1;
            }
            if (!(list.length > 0)) {
                return -2;
            }
            const lists = (_a = this.getListsFromLocalStorage()) !== null && _a !== void 0 ? _a : {};
            lists[id] = list;
            this.LocalStorageHelper.setItem(this.StorageKeys.AGENT_WORKFLOW_EVENT_CREATE_PAYLOAD, lists);
            return 0;
        };
        /**
         * Function to remove digital/voice list
         * @example removeListByInteraction(id)
         * - id: pertains to "digitalContact.caseId" for a digital interaction and "cxoneContact.contactID" for a voice interaction.
        */
        this.removeListByInteraction = (id) => {
            if (!id) {
                return -1;
            }
            try {
                const lists = this.LocalStorageHelper.getItem(this.StorageKeys.AGENT_WORKFLOW_EVENT_CREATE_PAYLOAD, true) || {};
                if (!Object.keys(lists).includes(id)) {
                    return -2;
                }
                delete lists[id];
                this.LocalStorageHelper.setItem(this.StorageKeys.AGENT_WORKFLOW_EVENT_CREATE_PAYLOAD, lists);
            }
            catch (_) {
                return -3;
            }
            return 0;
        };
    }
}
export default new ControllerLocalStorage();
//# sourceMappingURL=localStorage.js.map