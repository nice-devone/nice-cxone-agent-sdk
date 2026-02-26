import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CXoneClient, CcfLogger } from '@nice-devone/agent-sdk';
const CXONEPLAYER_URI = '/player/#/cxone-player/acd-contacts/';
/**
 * Utility class to transform type for CRM workflow executions
 * */
export class CXoneAgentIntegrationTransformer {
    /**
       * Calculates the duration in seconds between two date/time values.
       * @param startTime - The start time (string, number, or Date)
       * @param endTime - The end time (string, number, or Date)
       * @returns The duration in seconds, or undefined if invalid input.
       * @example - NA
       */
    static getDurationInSeconds(startTime, endTime) {
        if (!startTime || !endTime) {
            return '';
        }
        const start = new Date(startTime.toString());
        const end = new Date(endTime.toString());
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return '';
        }
        const durationInSeconds = Math.round((end.getTime() - start.getTime()) / 1000);
        if (durationInSeconds < 0) {
            return '';
        }
        return durationInSeconds;
    }
    /**
      * Transforms object to CXoneDigitalContactData that can be used by any Create TimeLine & Data Memorialization.
      * @param contact - information about contact dispositionValue - Information about dispostion selected by Agent
      * VoiceContactDetails - state of voice contact details , CurrentUser - Localstorage object having info about current user
      * @example - NA
      */
    static toCXoneVoiceContactData(contact, dispositionValue, voiceContactDetails, currentUser) {
        const target = {
            contactId: contact.contactId.toString(),
            interactionId: voiceContactDetails.interactionId,
            mediaType: contact.media,
            direction: contact.isOutbound ? 'outbound' : 'inbound',
            skillName: contact.skillOrQueueName,
            skillId: contact.skillOrQueueId,
            status: contact.contactStatus,
            finalState: voiceContactDetails.finalState,
            dispositionName: dispositionValue.dispositionName,
            dispositionNotes: dispositionValue.dispositionNotes,
            tags: dispositionValue.tags,
            ani: voiceContactDetails.ani,
            dnis: voiceContactDetails.dnis,
            masterContactId: voiceContactDetails.masterID.toString(),
            contactType: voiceContactDetails.callType,
            recordingUrl: (contact.contactId && LocalStorageHelper.getItem(StorageKeys.IS_RECORDING_ENABLED)) ? CXoneClient.instance.auth.getCXoneConfig().userHubBaseUrl + CXONEPLAYER_URI + contact.contactId : '',
            agentId: currentUser.icAgentId,
            agentName: currentUser.firstName + ' ' + currentUser.lastName,
            type: voiceContactDetails.callType,
            startTime: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.startTime,
            endTime: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.lastStateChangeTime,
            scriptVariables: CXoneAgentIntegrationTransformer.screenPopUrlVariablesToScriptVariables(voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.screenPopUrlVariables),
            callDurationInSeconds: CXoneAgentIntegrationTransformer.getDurationInSeconds(voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.startTime, voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.lastStateChangeTime),
        };
        CXoneAgentIntegrationTransformer.updateCRMNavigationDataintoScriptVariables(target);
        return target;
    }
    /**
     * * update CRM Navigation Data from storage into ScriptVariables for Dama Memoralization
     * @param target  - CXoneVoiceContactData | CXoneDigitalContactData
     * @example NA
     */
    static updateCRMNavigationDataintoScriptVariables(cxOneContactData) {
        try {
            const crmNavigationData = LocalStorageHelper.getItem(StorageKeys.CRM_NAVIGATION_DATA, true) || {};
            const contactId = `${cxOneContactData.contactId}`;
            if (crmNavigationData[contactId]) {
                cxOneContactData.scriptVariables = cxOneContactData.scriptVariables || {};
                const contactCrmNavigationData = crmNavigationData[contactId];
                const keys = Object.keys(contactCrmNavigationData);
                for (const key of keys) {
                    cxOneContactData.scriptVariables[key] = contactCrmNavigationData[key];
                }
                // remove the data from storage
                delete crmNavigationData[contactId];
                LocalStorageHelper.setItem(StorageKeys.CRM_NAVIGATION_DATA, crmNavigationData);
            }
            // add crmuserid for the data memorialization
            const userId = LocalStorageHelper.getItem(StorageKeys.CRM_USER_ID);
            if (userId) {
                cxOneContactData.scriptVariables = cxOneContactData.scriptVariables || {};
                cxOneContactData.scriptVariables['crmuserid'] = userId;
            }
        }
        catch (error) {
            CXoneAgentIntegrationTransformer.logger.error('updateCRMNavigationDataintoScriptVariables', `error while updating navigation data ${JSON.stringify(error)}`);
        }
    }
    /**
      * Transforms object to CXoneDigitalContactData that can be used by any Create TimeLine & Data Memorialization.
      * @example - NA -
      * @param contact - information about contact , dispositionValue - Information about dispostion selected by Agent
      * CurrentUser - Localstorage object having info about current user
      */
    static toCXoneDigitalContactData(contact, dispositionValue, currentUser, timeDuration, caseId) {
        const target = {
            contactId: caseId,
            interactionId: contact.interactionId,
            mediaType: contact.media,
            agentId: currentUser.icAgentId,
            direction: contact.isOutbound ? 'outbound' : 'inbound',
            agentName: currentUser.firstName + ' ' + currentUser.lastName,
            skillName: contact.skillOrQueueName ? contact.skillOrQueueName : '',
            skillId: contact.skillOrQueueId,
            status: contact.contactStatus,
            dispositionName: dispositionValue.dispositionName,
            dispositionNotes: dispositionValue.dispositionNotes,
            startTime: timeDuration.startTime,
            endTime: timeDuration.endTime,
            channelType: contact.channelType,
            channelName: contact.channelName,
            recordingUrl: (caseId && LocalStorageHelper.getItem(StorageKeys.IS_RECORDING_ENABLED)) ? CXoneClient.instance.auth.getCXoneConfig().userHubBaseUrl + CXONEPLAYER_URI + caseId : '',
            callDurationInSeconds: CXoneAgentIntegrationTransformer.getDurationInSeconds(timeDuration === null || timeDuration === void 0 ? void 0 : timeDuration.startTime, timeDuration === null || timeDuration === void 0 ? void 0 : timeDuration.endTime),
        };
        CXoneAgentIntegrationTransformer.updateCRMNavigationDataintoScriptVariables(target);
        return target;
    }
    /**
      * Transforms object to CXoneDigitalContactData that can be used by any Create TimeLine & Data Memorialization.
      * @example - NA -
      * @param entityInformation - id  & type of entity
      */
    static toCXoneIntegrationEntity(entityInformation) {
        var _a;
        const target = {
            entity: (_a = entityInformation === null || entityInformation === void 0 ? void 0 : entityInformation.type) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
            entityId: entityInformation === null || entityInformation === void 0 ? void 0 : entityInformation.id,
        };
        return target;
    }
    /**
      * Transforms object to CXoneDigitalContactData that can be used by any Create TimeLine & Data Memorialization.
      * @example - NA -
      * @param entityInformation - id  & type of entity
      * @param relatedobject - object related to entity for call from and call to fields based on type of call related to entity
      */
    static toCXoneIntegrationEntityRelatesto(entityInformation, relatedobject) {
        var _a;
        const target = {
            entity: (_a = entityInformation === null || entityInformation === void 0 ? void 0 : entityInformation.type) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
            entityId: entityInformation === null || entityInformation === void 0 ? void 0 : entityInformation.id,
            relatedObject: relatedobject,
        };
        return target;
    }
    /**
     * Transform the data as payload to dispatch method
     *  @example NA
     */
    static cxoneExecuteTimelineDataMapping(contact, dispositionData, selectedActivityData, selectedActivityConfig, activeContact, digitalContactDetails, getCxoneRoutingQueuId, currentUser, voiceContactDetails) {
        const target = {
            contact: contact,
            dispositionData: dispositionData,
            selectedActivityData: selectedActivityData,
            selectedActivityConfig: selectedActivityConfig,
            activeContact: activeContact,
            digitalContactDetails: digitalContactDetails,
            getCxoneRoutingQueuId: getCxoneRoutingQueuId,
            currentUser: currentUser,
            voiceContactDetails: voiceContactDetails,
        };
        return target;
    }
    /**
     * Transform the to object which is used to clear the local storage
     *  @example NA
     */
    static cxoneRemoveTimelineDMInfo(digitalContact, activityData, activitySearchData, availableCustomEvent) {
        const target = {
            contacts: digitalContact,
            activityData: activityData,
            cxoneCcActivitySearch: activitySearchData,
            customEventDetails: availableCustomEvent,
        };
        return target;
    }
}
CXoneAgentIntegrationTransformer.logger = new CcfLogger('CXAI Transformers', 'CXoneAgentIntegrationTransformer');
/**
 * Transforms variables made available in screenpop to a script variables object that is provided to the Data Memorialization request payload.
 * @example - NA -
 * @param screenPopUrlVariables - array of objects
 */
CXoneAgentIntegrationTransformer.screenPopUrlVariablesToScriptVariables = (screenPopUrlVariables = []) => screenPopUrlVariables.reduce((result, screenPopUrlVariable = {}) => {
    let object = screenPopUrlVariable;
    for (const [key, value] of Object.entries(screenPopUrlVariable)) {
        let normalized = `${value}`.replace(/\+/g, ' ');
        try {
            normalized = decodeURIComponent(normalized);
        }
        catch (error) {
            CXoneAgentIntegrationTransformer.logger.error('screenPopUrlVariablesToScriptVariables', `error while transforming screen pop variable to script variable ${JSON.stringify(error)}`);
        }
        object = { [key]: normalized };
    }
    return Object.assign(Object.assign({}, result), object);
}, {});
//# sourceMappingURL=cxone-agent-integration-transformer.js.map