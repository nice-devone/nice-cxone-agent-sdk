import { CXoneAgentEvents } from '@nice-devone/shared-apps-lib';
import { isFeatureEnabled } from '../../../../../../../util/featureToggleUtils';
import localStorage from './localStorage';
import { Crm } from '@nice-devone/common-sdk';
/**
 * Class for the "Relates To" service.
 */
class Service {
    constructor() {
        this.localStorage = localStorage;
        this.isRelatesToFeatureEnabledforMSD = isFeatureEnabled("release-cxa-RelatesTo-MSD-CRM-10029" /* FeatureToggles.RELATESTO_MSD_CURRENT_INTERACTION */);
        this.CXoneAgentEvents = CXoneAgentEvents;
        this.window = window;
        this.getAgentWorkflowConfigurationDataMemorializationDetails = (selectedContactId) => {
            var _a, _b;
            const agentWorkflowData = this.localStorage.LocalStorageHelper.getItem(this.localStorage.StorageKeys.CXONE_ACTIVITY_CONFIG, true);
            const { dataMemorializationWorkflow = [] } = (_b = (_a = (agentWorkflowData !== null && agentWorkflowData !== void 0 ? agentWorkflowData : [])) === null || _a === void 0 ? void 0 : _a.find((item) => item.ContactID === selectedContactId)) !== null && _b !== void 0 ? _b : {};
            let configurationId, workflowId;
            try {
                configurationId = dataMemorializationWorkflow[0][0].configurationId;
                workflowId = dataMemorializationWorkflow[0][0].workflowId;
                // eslint-disable-next-line
            }
            catch (error) { }
            return {
                configurationId,
                workflowId,
            };
        };
        this.generatePinnedRecordsConfiguration = (searches = [], relationships, selectedContactId, 
        // eslint-disable-next-line
        translate = () => { }) => {
            var _a;
            let enableRowOpenURL = true;
            const pinnedRecords = {};
            const agentWorkflowConfigurationDataMemorializationDetails = (_a = this.getAgentWorkflowConfigurationDataMemorializationDetails(selectedContactId)) !== null && _a !== void 0 ? _a : {};
            const isAgentWorkflowConfigurationDataMemorializationConfigured = (agentWorkflowConfigurationDataMemorializationDetails === null || agentWorkflowConfigurationDataMemorializationDetails === void 0 ? void 0 : agentWorkflowConfigurationDataMemorializationDetails.configurationId) && (agentWorkflowConfigurationDataMemorializationDetails === null || agentWorkflowConfigurationDataMemorializationDetails === void 0 ? void 0 : agentWorkflowConfigurationDataMemorializationDetails.workflowId);
            // NOTE : ITERATE THROUGH CRM SEARCHES
            searches.forEach((search = {}) => {
                var _a;
                const { pinRecords: recordsForCurrentInteractions = [], records: recordsForRelatedInteractions = [], system = {}, } = search;
                const crm = ((_a = system === null || system === void 0 ? void 0 : system.type) !== null && _a !== void 0 ? _a : '').toLowerCase();
                const isCRMTypeOfServiceNow = crm === 'servicenow';
                const isCRMTypeOfSalesforce = crm === 'salesforce';
                const isCRMTypeOfMSD = crm.toLowerCase() === Crm.MSD;
                const records = [...recordsForCurrentInteractions, ...recordsForRelatedInteractions];
                // NOTE : ITERATE THROUGH PINNED RECORDS
                recordsForCurrentInteractions.forEach((record) => {
                    var _a, _b, _c, _d, _e, _f;
                    const relationshipsForCRM = (_a = relationships[crm]) !== null && _a !== void 0 ? _a : {};
                    const isRelatesToSupported = isCRMTypeOfServiceNow;
                    const isRelatesToEnabledForRecord = (_b = record === null || record === void 0 ? void 0 : record.relatesTo) !== null && _b !== void 0 ? _b : false;
                    // NOTE : THE CURRENT INTERACTION PINNED RECORD IS OF AN UNSUPPORTED ENTITY TYPE
                    const isRecordTypeSupported = Object.keys(relationshipsForCRM).includes(record.type);
                    let isRelatesToAvailableForRecord = false;
                    if (crm.toLowerCase() === Crm.MSD) {
                        const isrelatesToMSDfeatureEnabled = typeof isFeatureEnabled === 'function' ? isFeatureEnabled("release-cxa-RelatesTo-MSD-CRM-10029" /* FeatureToggles.RELATESTO_MSD_CURRENT_INTERACTION */) : false;
                        isRelatesToAvailableForRecord =
                            (isRelatesToEnabledForRecord && isRecordTypeSupported && isrelatesToMSDfeatureEnabled) || isCRMTypeOfMSD;
                    }
                    else {
                        isRelatesToAvailableForRecord =
                            (isRelatesToSupported && isRelatesToEnabledForRecord && isRecordTypeSupported) || isCRMTypeOfSalesforce;
                    }
                    if (!isRelatesToAvailableForRecord) {
                        pinnedRecords[record.id] = {
                            isVisible: false,
                            tooltipMessage: '',
                        };
                    }
                    else {
                        if (record === null || record === void 0 ? void 0 : record.relatesTo)
                            enableRowOpenURL = false;
                        const { elementAttributeOfID, isRelatesToEnabled, tooltipMessage } = (_d = this.getConfigurationForDefaultState(record.id, records, (_c = relationshipsForCRM[record.type]) === null || _c === void 0 ? void 0 : _c.relatableEntities, isAgentWorkflowConfigurationDataMemorializationConfigured, selectedContactId, translate, crm)) !== null && _d !== void 0 ? _d : {};
                        pinnedRecords[record.id] = {
                            isVisible: true,
                            elementAttributeOfID,
                            crm: (_e = search === null || search === void 0 ? void 0 : search.system) === null || _e === void 0 ? void 0 : _e.type,
                            baseUrl: (_f = search === null || search === void 0 ? void 0 : search.system) === null || _f === void 0 ? void 0 : _f.baseUrl,
                            isRelatesToEnabled,
                            tooltipMessage,
                            configurationId: agentWorkflowConfigurationDataMemorializationDetails === null || agentWorkflowConfigurationDataMemorializationDetails === void 0 ? void 0 : agentWorkflowConfigurationDataMemorializationDetails.configurationId,
                            workflowId: agentWorkflowConfigurationDataMemorializationDetails === null || agentWorkflowConfigurationDataMemorializationDetails === void 0 ? void 0 : agentWorkflowConfigurationDataMemorializationDetails.workflowId,
                        };
                    }
                });
            });
            return { pinnedRecords, enableRowOpenURL };
        };
        this.screenPop = (data) => {
            if (!data) {
                return -1;
            }
            const eventArgs = {};
            eventArgs.detail = { activityRecord: data };
            const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, eventArgs);
            this.window.dispatchEvent(customEvent);
            return 0;
        };
        // eslint-disable-next-line max-params
        this.getConfigurationForDefaultState = (pinnedRecordEntityId, records = [], relatableEntities = [], isAgentWorkflowConfigurationDataMemorializationConfigured = false, selectedContactId, 
        // eslint-disable-next-line
        translate = () => { }, crm = '') => {
            var _a;
            const selectorForDisabled = `relatesToPinnedRecords_disabled-${pinnedRecordEntityId}`;
            const selectorForUnticked = `relatesToPinnedRecords_unticked-${pinnedRecordEntityId}`;
            if (!isAgentWorkflowConfigurationDataMemorializationConfigured) {
                return {
                    elementAttributeOfID: selectorForDisabled,
                    isRelatesToEnabled: false,
                    tooltipMessage: translate('relatesToNotConfiguredWithDataMemorialization'),
                };
            }
            if (crm === 'salesforce') {
                return {
                    elementAttributeOfID: selectorForUnticked,
                    isRelatesToEnabled: true,
                    tooltipMessage: '',
                };
            }
            else {
                const hasRelatableEntities = this.determineIfRecordHasRelatableEntities(records, relatableEntities);
                if (!hasRelatableEntities) {
                    return {
                        elementAttributeOfID: selectorForDisabled,
                        isRelatesToEnabled: false,
                        tooltipMessage: translate('relatesToNoRelatableEntitiesSearch'),
                    };
                }
                const relationshipFromLocalStorage = (_a = this.localStorage.getRelationshipFromLocalStorage(selectedContactId, pinnedRecordEntityId)) !== null && _a !== void 0 ? _a : {};
                // NOTE : CHECK IF A RELATIONSHIP EXISTS IN LOCAL STORAGE FOR A SPECIFIC PINNED RECORD
                if (relationshipFromLocalStorage === null || relationshipFromLocalStorage === void 0 ? void 0 : relationshipFromLocalStorage.entityId) {
                    return {
                        elementAttributeOfID: `relatesToPinnedRecords_ticked-${pinnedRecordEntityId}`,
                        isRelatesToEnabled: true,
                        tooltipMessage: '',
                    };
                }
                return {
                    elementAttributeOfID: selectorForUnticked,
                    isRelatesToEnabled: true,
                    tooltipMessage: '',
                };
            }
        };
        this.determineIfRecordHasRelatableEntities = (records = [], relatableEntities = []) => records.some((record) => relatableEntities.includes(record === null || record === void 0 ? void 0 : record.type));
        this.checkIfListItemTextIsOverflowing = (scrollWidth, clientWidth) => (scrollWidth !== null && scrollWidth !== void 0 ? scrollWidth : 0) > (clientWidth !== null && clientWidth !== void 0 ? clientWidth : 0);
    }
}
export default new Service();
//# sourceMappingURL=index.js.map