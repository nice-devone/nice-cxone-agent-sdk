import { __awaiter } from "tslib";
import { ACDSessionManager, AdminService, clearIndexDbStore, dbInstance, IndexDBKeyNames, IndexDBStoreNames, LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { CXoneClientData, CXoneSdkError, CXoneSdkErrorType } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
/**
 * Class to manage agent setting
 */
export class CXoneAgentSetting {
    /**
     * get instance for CXoneAgentSetting and adminService
     * @example
     * ```
     * const cxoneAgentSetting = new CXoneAgentSetting();
     * ```
     */
    constructor() {
        this.logger = new Logger('agentSetting', 'CXoneAgentSetting');
        this.acdSessionManager = {};
        this.mchAgentSettingsChangeEvent = new Subject();
        this.adminService = AdminService.instance;
        this.acdSessionManager = ACDSessionManager.instance;
        this.onMCHAgentSettingsChange();
    }
    /**
     * Method to return agent settings
     * @returns - return the agent settings
     * ```
     * @example
     * getAgentSettings()
     * ```
     */
    getAgentSettings() {
        return this.adminService.getAgentSettings();
    }
    /**
     * To get client data and extract AVNotifications and soft phone settings
     * @param name - name of consumer for which client-data needs to be fetched
     * @param version - version
     * @example
     * ```
     * getAgentClientDataSettings();
     * ```
     */
    getAgentClientDataSettings() {
        return new Promise((resolve, reject) => {
            const responseData = new CXoneClientData();
            this.adminService
                .getClientData()
                .then((resp) => {
                responseData.parse(resp);
                resolve(responseData);
            })
                .catch((error) => {
                var _a;
                this.logger.error('getAgentClientDataSettings', 'getAgentClientDataSettings failed:-' + error);
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * To update AVNotifications and softphone settings
     * @param updatedData - updated data received from consumer
     * @example
     * ```
     * updateAgentClientDataSettings();
     * ```
     */
    updateAgentClientDataSettings(updatedData) {
        var _a;
        const currentClientDataObj = (_a = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true)) !== null && _a !== void 0 ? _a : {};
        const newClientDatObj = new CXoneClientData().mapperIncludingSearchAppSettings(currentClientDataObj, updatedData);
        const updatedClientDataObj = Object.assign(Object.assign({}, currentClientDataObj), newClientDatObj);
        this.logger.info('updateAgentClientDataSettings', 'Updated client data:-' + updatedClientDataObj);
        return this.adminService.putClientData(updatedClientDataObj);
    }
    /**
     * Method to subscribe multi-channel agent settings
     */
    onMCHAgentSettingsChange() {
        this.acdSessionManager.mchAgentSettingsChangeEvent.subscribe((mchAgentSettingsChangeEvent) => {
            this.mchAgentSettingsChangeEvent.next(mchAgentSettingsChangeEvent);
        });
    }
    /**
     * Method to get fav quick Replies
     * @returns
     * @example - getNotificationSettings()
     *
     */
    getNotificationSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const notificationSettingsfromIndexDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.AGENT_SETTINGS, IndexDBKeyNames.AGENT_SETTINGS)));
            return notificationSettingsfromIndexDB;
        });
    }
    /**
     * Method to set notification settings
     * @returns
     * @example -
     *
     */
    setNotificationSettings(clientData) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.AGENT_SETTINGS, clientData, IndexDBKeyNames.AGENT_SETTINGS));
        });
    }
    /**
     * Method to clear Notification Settings
     * @example
     * ```
     * clearNotificationSettings()
     * ```
     */
    clearNotificationSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield clearIndexDbStore(IndexDBStoreNames.AGENT_SETTINGS);
        });
    }
}
//# sourceMappingURL=cxone-agent-setting.js.map