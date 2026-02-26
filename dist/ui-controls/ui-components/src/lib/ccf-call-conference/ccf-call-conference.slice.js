import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { VoiceControlService, } from '@nice-devone/agent-sdk';
import { VoiceContactStatus } from '@nice-devone/common-sdk';
import { CallContactEventStatus, LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { globalActions } from '../global.app.slice';
import { CcfAppToastMessage } from '@nice-devone/ui-controls';
import { toast } from 'react-toastify';
import { dispositionInteractionActions } from '../ccf-disposition/ccf-disposition-slice';
import { CcfAssignmentAction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { CXoneAgentIntegrationTransformer } from '../ccf-app-space/ccf-customer-card/ccf-customer-card-activity/cxone-agent-integration-transformer';
import { invokeTimelineAndDataMemo, updateActivityData } from '../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { getAgentWorkflowDetailsFromLS } from '../ccf-app-space/ccf-customer-card/ccf-customer-card-utility';
import { CXoneUser } from '@nice-devone/auth-sdk';
import { handleGlobalToast } from '../../util/toastMessageHelper';
import { CcfContactEditorAction } from '../ccf-editor/ccf-contact-editor.slice';
export const CCF_CALL_CONFERENCE_FEATURE_KEY = 'callConference';
const ADD_CONSULT_AGENT = 'callConference/addConsultAgent';
const DIAL_SKILL = 'callConference/dialSkill';
const COLD_TRANSFER = 'callConference/dialCallAndColdTransfer';
const HOLD_CALL = 'callConference/holdCall';
/**
 *  State of Call Conference slice
 */
export const CallConferenceState = {
    isColdTransferClicked: false,
    initiateColdTransfer: false,
    isConsultCallByAgentIdClicked: false,
    isConsultCallBySkillIdClicked: false,
    externalNumberAttributes: {
        voiceContact: {},
        isExternalNumberDialed: false,
        skillId: 0,
        phoneNumber: '',
        triggerType: '',
    },
    agent: {},
    errorState: {
        hasErrorForConsultCall: false,
        hasErrorForDialSkill: false,
        hasErrorForHold: false,
    },
};
/**
 * addConsultAgentByAgentId asyncthunk used to add agent through agent id
 * @example - dispatch(addConsultAgentByAgentId())
 */
export const addConsultAgentByAgentId = createAsyncThunk(ADD_CONSULT_AGENT, (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneAcdClient.instance.contactManager.voiceService
        .consultAgent(data.agent.agentId)
        .then((success) => {
        logger.debug('[CcfCallConferenceSlice][addConsultAgentByAgentId]', `status: ${JSON.stringify(success.status)}`);
    })
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][addConsultAgentByAgentId]', `payload: ${JSON.stringify(error)}`);
        throw rejectWithValue(error);
    });
}));
/**
 * transferDigitalSkill used to transfer digital skill
 * @example - dispatch(transferDigitalSkill())
 */
export const transferDigitalSkill = createAsyncThunk('transferDigitalSkill', (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneDigitalClient.instance.digitalContactManager.digitalContactService
        .changeRoutingQueue(data.contactId, data.cxoneSkillId).then(() => {
        thunkAPI.dispatch(globalActions.setToastMsg({ msg: 'transferDigitalSkill' }));
        toast.success(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'transferDigitalSkill' }), {
            autoClose: 2000,
            containerId: 'AppToastContainer',
        });
        thunkAPI.dispatch(globalActions.setToastMsg({ msg: '' }));
    }).catch((error) => {
        thunkAPI.dispatch(globalActions.setToastMsg({ msg: 'unableToTransferDigitalSkill' }));
        logger.debug('[CcfCallConferenceSlice][transferDigitalSkill]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * addConsultAgentBySkillId asyncthunk used to add agent through skill id
 * @example - dispatch(addConsultAgentBySkillId())
 */
export const addConsultAgentBySkillId = createAsyncThunk(DIAL_SKILL, (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneAcdClient.instance.contactManager.voiceService
        .dialSkill(data.agent.skillId)
        .then((success) => {
        logger.debug('[CcfCallConferenceSlice][addConsultAgentBySkillId]', `status: ${JSON.stringify(success.status)}`);
    })
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][addConsultAgentBySkillId]', `payload: ${JSON.stringify(error)}`);
        throw rejectWithValue(error);
    });
}));
/**
 * dialExternalNumber async thunk used to dial an external number
 * @example - dispatch(externalConsult())
 */
export const dialExternalNumber = createAsyncThunk('callConference/dialExternalNumber', (data, { dispatch, rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    if (data.triggerType === 'transfer')
        dispatch(CcfAssignmentAction.toggleColdTransferFlag(true));
    else
        dispatch(CcfAssignmentAction.toggleColdTransferFlag(false));
    yield CXoneAcdClient.instance.contactManager.voiceService
        .dialPhone({
        skillId: data.skillId,
        phoneNumber: data.phoneNumber,
    })
        .then(() => {
        if (data.triggerType === 'transfer') {
            dispatch(callConferenceActions.initiateColdTransfer({ initiateColdTransfer: true }));
        }
    })
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][dialExternalNumber]', `payload: ${JSON.stringify(error)}`);
        throw rejectWithValue(error);
    });
}));
/**
 * holdCall async thunk used to dial a call to an agent and cold transfer
 * @example - dispatch(holdCall())
 */
export const holdCall = createAsyncThunk(HOLD_CALL, (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const logger = new Logger();
    const callStatus = (_a = data.voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (callStatus === VoiceContactStatus.ACTIVE) {
        yield data.voiceContact
            .hold().catch((error) => {
            logger.debug('[CcfCallConferenceSlice][holdCall]', `payload: ${JSON.stringify(error)}`);
            throw rejectWithValue(error);
        });
    }
}));
/**
 * dialCallAndColdTransfer async thunk used to dial a call to an agent and cold transfer
 * @example - dispatch(dialCallToAnAgent())
 */
export const dialCallAndColdTransfer = createAsyncThunk(COLD_TRANSFER, (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    CXoneAcdClient.instance.contactManager.voiceService
        .dialAgent(data.agent.agentId.toString(), data.voiceContact.contactID)
        .then(() => {
        thunkAPI.dispatch(callConferenceActions.initiateColdTransfer({ initiateColdTransfer: true, agent: data.agent }));
    })
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][dialCallAndColdTransfer]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * transferDigitalContact used to transfer digital contact
 * @example - dispatch(transferDigitalContact())
 */
export const transferDigitalContact = createAsyncThunk('transferDigitalContact', (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const logger = new Logger();
    const state = thunkAPI.getState();
    const assignmentMetadata = (_b = state === null || state === void 0 ? void 0 : state.inbox) === null || _b === void 0 ? void 0 : _b.assignmentPanelMetadata;
    const digitalContactCard = (_d = (_c = state === null || state === void 0 ? void 0 : state.inbox) === null || _c === void 0 ? void 0 : _c.cxoneInteractions[assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.selectedInteractionId]) === null || _d === void 0 ? void 0 : _d.digitalContacts;
    const dispositionData = state === null || state === void 0 ? void 0 : state.disposition;
    const activityData = (_e = state === null || state === void 0 ? void 0 : state.CcfCustomerCard) === null || _e === void 0 ? void 0 : _e.activity;
    const activitySearchData = (_f = state === null || state === void 0 ? void 0 : state.CcfCustomerCard) === null || _f === void 0 ? void 0 : _f.activitySearch;
    const availableCustomEvents = (_g = state === null || state === void 0 ? void 0 : state.CcfCustomerCard) === null || _g === void 0 ? void 0 : _g.customEventData;
    const selectedActivityData = activityData === null || activityData === void 0 ? void 0 : activityData.find((item) => (item === null || item === void 0 ? void 0 : item.contactId) === (data === null || data === void 0 ? void 0 : data.contactId));
    const selectedActivityConfig = (activitySearchData === null || activitySearchData === void 0 ? void 0 : activitySearchData.find((item) => (item === null || item === void 0 ? void 0 : item.ContactID) === (data === null || data === void 0 ? void 0 : data.contactId))) || JSON.parse(LocalStorageHelper.getItem(StorageKeys.CXONE_ACTIVITY_CONFIG) || '[]').find((item) => (item === null || item === void 0 ? void 0 : item.ContactID) === (data === null || data === void 0 ? void 0 : data.contactId));
    const cxoneRoutingQueueId = (_h = state === null || state === void 0 ? void 0 : state.ccfAgentContactHistory) === null || _h === void 0 ? void 0 : _h.routingQueueIds;
    const currentUser = CXoneUser.instance.getUserInfo();
    const voiceContactDetails = (_j = state === null || state === void 0 ? void 0 : state.inbox) === null || _j === void 0 ? void 0 : _j.cxoneVoiceContactDetails;
    const digitalContactDetails = (_k = state === null || state === void 0 ? void 0 : state.inbox) === null || _k === void 0 ? void 0 : _k.cxoneDigitalContactDetails;
    const selectedContactId = (_m = (_l = state === null || state === void 0 ? void 0 : state.inbox) === null || _l === void 0 ? void 0 : _l.cxoneInteractions[assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.selectedInteractionId]) === null || _m === void 0 ? void 0 : _m.selectedContactId;
    const activeContact = (_p = (_o = state === null || state === void 0 ? void 0 : state.inbox) === null || _o === void 0 ? void 0 : _o.cxoneInteractions[assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.selectedInteractionId]) === null || _p === void 0 ? void 0 : _p.digitalContacts[selectedContactId];
    yield CXoneDigitalClient.instance.digitalContactManager.digitalContactService
        .changeAssignedUser(data.contactId, data.cxoneUserId).then(() => {
        handleGlobalToast('transferDigitalContact');
        thunkAPI.dispatch(dispositionInteractionActions.clearDispositionById(data.contactId)); // when case is transferred then clear out the disposition for the transferred case
        // clear the contact editor details of related transferred case
        thunkAPI.dispatch(CcfContactEditorAction.clearContactEditorDetails({ caseId: data === null || data === void 0 ? void 0 : data.contactId }));
        if (selectedContactId && selectedActivityData) {
            const agentWorkflowDetailsFromLS = getAgentWorkflowDetailsFromLS([StorageKeys.CUSTOMEVENT_DATA, StorageKeys.CXONE_ACTIVITY_CONFIG, StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, StorageKeys.CRM_PIN_RECORDS, StorageKeys.AGENT_WORKFLOW_EVENT]);
            const availableCustomEventsData = availableCustomEvents.filter((item) => {
                return (item === null || item === void 0 ? void 0 : item.contactId) !== (data === null || data === void 0 ? void 0 : data.contactId);
            });
            const timelineDataMappingfromLS = CXoneAgentIntegrationTransformer.cxoneRemoveTimelineDMInfo(digitalContactCard[selectedContactId], activityData, activitySearchData, availableCustomEventsData);
            thunkAPI.dispatch(updateActivityData(timelineDataMappingfromLS));
            /**
               * To store the available agent workflow configuration event data in LS
               */
            const agentWorkflowEventDetails = agentWorkflowDetailsFromLS.agentWorkflowEvent;
            const isAgentWorkflowEventDetails = agentWorkflowEventDetails instanceof Array && (agentWorkflowEventDetails === null || agentWorkflowEventDetails === void 0 ? void 0 : agentWorkflowEventDetails.filter((item) => {
                var _a, _b, _c;
                return ((_a = digitalContactCard[selectedContactId]) === null || _a === void 0 ? void 0 : _a.contactId) ? item.contactId !== ((_b = digitalContactCard[selectedContactId]) === null || _b === void 0 ? void 0 : _b.contactId) : item.contactId !== ((_c = digitalContactCard[selectedContactId]) === null || _c === void 0 ? void 0 : _c.caseId);
            }));
            LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_EVENT, isAgentWorkflowEventDetails);
            const agentWorkflowConfigurationDetails = agentWorkflowDetailsFromLS.agentWorkflowConfigurationEvent;
            const isAgentWorkflowConfigurationEventDetails = agentWorkflowConfigurationDetails instanceof Array && (agentWorkflowConfigurationDetails === null || agentWorkflowConfigurationDetails === void 0 ? void 0 : agentWorkflowConfigurationDetails.filter((item) => {
                var _a, _b, _c;
                return ((_a = digitalContactCard[selectedContactId]) === null || _a === void 0 ? void 0 : _a.contactId) ? item.contactId !== ((_b = digitalContactCard[selectedContactId]) === null || _b === void 0 ? void 0 : _b.contactId) : item.contactId !== ((_c = digitalContactCard[selectedContactId]) === null || _c === void 0 ? void 0 : _c.caseId);
            }));
            LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, isAgentWorkflowConfigurationEventDetails);
            /**
               * To store the available pin records data in LS
               */
            const pinRecordsDetails = agentWorkflowDetailsFromLS.crmPinRecords;
            const isPinRecordsDetails = pinRecordsDetails instanceof Array && (pinRecordsDetails === null || pinRecordsDetails === void 0 ? void 0 : pinRecordsDetails.filter((item) => {
                var _a, _b, _c;
                return ((_a = digitalContactCard[selectedContactId]) === null || _a === void 0 ? void 0 : _a.contactId) ? (item === null || item === void 0 ? void 0 : item.contactId) !== ((_b = digitalContactCard[selectedContactId]) === null || _b === void 0 ? void 0 : _b.contactId) : (item === null || item === void 0 ? void 0 : item.contactId) !== ((_c = digitalContactCard[selectedContactId]) === null || _c === void 0 ? void 0 : _c.caseId);
            }));
            LocalStorageHelper.setItem(StorageKeys.CRM_PIN_RECORDS, isPinRecordsDetails);
            const args = CXoneAgentIntegrationTransformer.cxoneExecuteTimelineDataMapping(digitalContactCard[selectedContactId], dispositionData, selectedActivityData, selectedActivityConfig, activeContact, digitalContactDetails, cxoneRoutingQueueId, currentUser, voiceContactDetails);
            thunkAPI.dispatch(invokeTimelineAndDataMemo(args));
        }
    })
        .catch((error) => {
        handleGlobalToast('unableToTransferDigitalContact');
        logger.debug('[CcfCallConferenceSlice][transferDigitalContact]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * transferCall asyncthunk used to transfer call
 * @example - dispatch(transferCall())
 */
export const transferCall = createAsyncThunk('transferCall', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    const logger = new Logger();
    const state = thunkAPI.getState();
    const assignmentMetadata = (_q = state === null || state === void 0 ? void 0 : state.inbox) === null || _q === void 0 ? void 0 : _q.assignmentPanelMetadata;
    const selectedContactId = (_s = (_r = state === null || state === void 0 ? void 0 : state.inbox) === null || _r === void 0 ? void 0 : _r.cxoneInteractions[assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.voiceInteractionId]) === null || _s === void 0 ? void 0 : _s.selectedContactId;
    const activeContact = (_u = (_t = state === null || state === void 0 ? void 0 : state.inbox) === null || _t === void 0 ? void 0 : _t.cxoneInteractions[assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.voiceInteractionId]) === null || _u === void 0 ? void 0 : _u.acdContacts[selectedContactId];
    const dispositionData = state === null || state === void 0 ? void 0 : state.disposition;
    const activityData = (_v = state === null || state === void 0 ? void 0 : state.CcfCustomerCard) === null || _v === void 0 ? void 0 : _v.activity;
    const activitySearchData = (_w = state === null || state === void 0 ? void 0 : state.CcfCustomerCard) === null || _w === void 0 ? void 0 : _w.activitySearch;
    const availableCustomEvents = (_x = state === null || state === void 0 ? void 0 : state.CcfCustomerCard) === null || _x === void 0 ? void 0 : _x.customEventData;
    const selectedActivityData = activityData === null || activityData === void 0 ? void 0 : activityData.find((item) => (item === null || item === void 0 ? void 0 : item.contactId) === (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId));
    const cxoneActivityConfigLocalStorage = LocalStorageHelper.getItem(StorageKeys.CXONE_ACTIVITY_CONFIG, true);
    const selectedActivityConfig = (activitySearchData === null || activitySearchData === void 0 ? void 0 : activitySearchData.find((item) => (item === null || item === void 0 ? void 0 : item.ContactID) === (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId))) || (cxoneActivityConfigLocalStorage ? cxoneActivityConfigLocalStorage.find((item) => (item === null || item === void 0 ? void 0 : item.ContactID) === (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId)) : {});
    //TODO - routingQueueId to be replaced with SkillId
    const cxoneRoutingQueueId = (_y = state === null || state === void 0 ? void 0 : state.ccfAgentContactHistory) === null || _y === void 0 ? void 0 : _y.routingQueueIds;
    const currentUser = CXoneUser.instance.getUserInfo();
    const voiceContactDetails = (_z = state === null || state === void 0 ? void 0 : state.inbox) === null || _z === void 0 ? void 0 : _z.cxoneVoiceContactDetails;
    const digitalContactDetails = (_0 = state === null || state === void 0 ? void 0 : state.inbox) === null || _0 === void 0 ? void 0 : _0.cxoneDigitalContactDetails;
    const voiceContactData = ((_2 = (_1 = state === null || state === void 0 ? void 0 : state.inbox) === null || _1 === void 0 ? void 0 : _1.cxoneInteractions[assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.voiceInteractionId]) === null || _2 === void 0 ? void 0 : _2.acdContacts) && Object.keys((_4 = (_3 = state === null || state === void 0 ? void 0 : state.inbox) === null || _3 === void 0 ? void 0 : _3.cxoneInteractions[assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.voiceInteractionId]) === null || _4 === void 0 ? void 0 : _4.acdContacts).length && Object.values((_6 = (_5 = state === null || state === void 0 ? void 0 : state.inbox) === null || _5 === void 0 ? void 0 : _5.cxoneInteractions[assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.voiceInteractionId]) === null || _6 === void 0 ? void 0 : _6.acdContacts)[0];
    const copilotEnabled = (_7 = state === null || state === void 0 ? void 0 : state.ccfCopilotData) === null || _7 === void 0 ? void 0 : _7.isCopilotAvailable;
    yield CXoneAcdClient.instance.contactManager.voiceService
        .transferContact()
        .then(() => {
        // We are transfering all calls, so we need to clear all the conference consult variables.
        ClearAllConferenceConsultVars(thunkAPI.dispatch);
        if (selectedContactId && selectedActivityData && !copilotEnabled) {
            const agentWorkflowDetailsFromLS = getAgentWorkflowDetailsFromLS([StorageKeys.CUSTOMEVENT_DATA, StorageKeys.CXONE_ACTIVITY_CONFIG, StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, StorageKeys.CRM_PIN_RECORDS, StorageKeys.AGENT_WORKFLOW_EVENT]);
            const availableCustomEventsData = availableCustomEvents.filter((item) => {
                return (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId);
            });
            const timelineDataMappingfromLS = CXoneAgentIntegrationTransformer.cxoneRemoveTimelineDMInfo(voiceContactData, activityData, activitySearchData, availableCustomEventsData);
            thunkAPI.dispatch(updateActivityData(timelineDataMappingfromLS));
            /**
            * To store the available agent workflow configuration event data in LS
            */
            const agentWorkflowEventDetails = agentWorkflowDetailsFromLS.agentWorkflowEvent;
            const isAgentWorkflowEventDetails = agentWorkflowEventDetails instanceof Array && (agentWorkflowEventDetails === null || agentWorkflowEventDetails === void 0 ? void 0 : agentWorkflowEventDetails.filter((item) => {
                return (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId) ? item.contactId !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId) : item.contactId !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.caseId);
            }));
            LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_EVENT, isAgentWorkflowEventDetails);
            const agentWorkflowConfigurationDetails = agentWorkflowDetailsFromLS.agentWorkflowConfigurationEvent;
            const isAgentWorkflowConfigurationEventDetails = agentWorkflowConfigurationDetails instanceof Array && (agentWorkflowConfigurationDetails === null || agentWorkflowConfigurationDetails === void 0 ? void 0 : agentWorkflowConfigurationDetails.filter((item) => {
                return (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId) ? item.contactId !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId) : item.contactId !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.caseId);
            }));
            LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, isAgentWorkflowConfigurationEventDetails);
            /**
                 * To store the available pin records data in LS
                 */
            const pinRecordsDetails = agentWorkflowDetailsFromLS.crmPinRecords;
            const isPinRecordsDetails = pinRecordsDetails instanceof Array && (pinRecordsDetails === null || pinRecordsDetails === void 0 ? void 0 : pinRecordsDetails.filter((item) => {
                return (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId) ? (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId) : (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.caseId);
            }));
            LocalStorageHelper.setItem(StorageKeys.CRM_PIN_RECORDS, isPinRecordsDetails);
            const args = CXoneAgentIntegrationTransformer.cxoneExecuteTimelineDataMapping(voiceContactData, dispositionData, selectedActivityData, selectedActivityConfig, activeContact, digitalContactDetails, cxoneRoutingQueueId, currentUser, voiceContactDetails);
            thunkAPI.dispatch(invokeTimelineAndDataMemo(args));
        }
    })
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][transferCall]', `payload: ${JSON.stringify(error)}`);
        throw thunkAPI.rejectWithValue(error);
    });
}));
/**
 * ClearAllConferenceConsultVars clears all the conference consult variables
 * @param dispatch - async thunk dispatch
 * @example - ClearAllConferenceConsultVars(thunkAPI.dispatch);
 */
function ClearAllConferenceConsultVars(dispatch) {
    dispatch(callConferenceActions.coldTransferredBtnClicked({ isColdTransferClicked: false }));
    dispatch(callConferenceActions.initiateColdTransfer({ initiateColdTransfer: false }));
    dispatch(callConferenceActions.consultCallByAgentBtnClicked({ isConsultCallByAgentIdClicked: false }));
    dispatch(callConferenceActions.consultCallBySkillBtnClicked({ isConsultCallBySkillIdClicked: false }));
}
;
/**
 * transferVoicemail asyncthunk used to transfer voicemail
 * @param data - object that holds the contactId and agentId
 * @example - dispatch(transferVoicemail(\{voicemailContact, agent\}))
 */
export const transferVoicemail = createAsyncThunk('transferVoicemail', (data) => __awaiter(void 0, void 0, void 0, function* () {
    const agentId = data.agent.agentId.toString();
    const logger = new Logger();
    yield data.voiceMailContact.transfer(agentId).catch((error) => {
        logger.debug('[CcfCallConferenceSlice][transferCall]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * transferWorkItem asyncthunk used to transfer work item
 * @param data - object that holds the contactId and agentName
 * @example - dispatch(transferWorkItem(\{workItemContact, agent\}))
 */
export const transferWorkItem = createAsyncThunk('transferWorkItem', (data) => __awaiter(void 0, void 0, void 0, function* () {
    const agentName = data.agent.userName.toString();
    const logger = new Logger();
    yield data.workItemContact.transfer(agentName).catch((error) => {
        logger.debug('[CcfCallConferenceSlice][transferWorkItem]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
   * Conference call with consulted agents and primary contact
   * @example - dispatch(conferenceCall())
   *
  */
export const conferenceCall = createAsyncThunk('conferenceCall', () => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneAcdClient.instance.contactManager.voiceService
        .conferenceCall()
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][conferenceCall]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * calls a method to transfer a workitem to skill
 * @param contactId -contactId
 * @param skillName -skillName
 * @returns - State
 * @example
 * ```
 * transferWorkItemSkill(contactId,skillName)
 * ```
 */
export const transferWorkItemSkill = createAsyncThunk('CcfCallConferenceSlice/transferWorkItemSkill', (contactDetail, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneAcdClient.instance.contactManager.contactService.transferWorkItemSkill(contactDetail.contactId, contactDetail.skillName)
        .then(() => {
        dispatch(globalActions.setToastMsg({ msg: 'transferWorkItemSkill' }));
    })
        .catch((error) => {
        dispatch(globalActions.setToastMsg({ msg: 'unableToTransferWorkItemSkill' }));
        logger.debug('[CcfCallConferenceSlice][transferWorkItemSkill]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * calls a method to transfer a voice mail to skill
 * @param contactId -contactId
 * @param skillId -skillId
 * @returns - State
 * @example
 * ```
 * transferVoiceMailSkill(contactId,skillId)
 * ```
 */
export const transferVoiceMailSkill = createAsyncThunk('CcfCallConferenceSlice/transferVoiceMailSkill', (contactDetail, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneAcdClient.instance.contactManager.voiceService.transferVoicemailSkill(contactDetail.contactId, contactDetail.skillId)
        .then(() => {
        dispatch(globalActions.setToastMsg({ msg: 'transferVoicemailSkill' }));
    })
        .catch((error) => {
        dispatch(globalActions.setToastMsg({ msg: 'unableToTransferVoicemailSkill' }));
        logger.debug('[CcfCallConferenceSlice][transferVoiceMailSkill]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * to hold the conference call
 * @param conferenceNo - conference number
 * @example - dispatch(conferenceHold(conferenceNo))
 *
*/
export const conferenceHold = createAsyncThunk('conferenceHold', (conferenceNo) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneAcdClient.instance.contactManager.voiceService
        .conferenceHold(conferenceNo)
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][conferenceHold]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * to resume the conference call
 * @param conferenceNo - conference number
 * @example - dispatch(conferenceResume(conferenceNo))
 *
*/
export const conferenceResume = createAsyncThunk('conferenceResume', (conferenceNo) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneAcdClient.instance.contactManager.voiceService
        .conferenceResume(conferenceNo)
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][conferenceResume]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * to hold the consult and resume the conference call
 * @param payload - conference number and consult contact
 * @example - dispatch(holdAndResumeConference(payload))
 *
*/
export const holdAndResumeConference = createAsyncThunk('holdAndResumeConference', (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield payload.consultContact.hold().then(() => {
        CXoneAcdClient.instance.contactManager.voiceService
            .conferenceResume(payload.conferenceNo)
            .catch((error) => {
            logger.debug('[CcfCallConferenceSlice][holdAndResumeConference]', `payload: ${JSON.stringify(error)}`);
        });
    })
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][holdAndResumeConference]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * to hold the consult and resume the conference call
 * @param payload - conference number and consult contact
 * @example - dispatch(holdAndResumeConference(payload))
 *
*/
export const holdAndResumeConsult = createAsyncThunk('holdAndResumeConsult', (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    const voiceControlService = new VoiceControlService();
    if (payload.consultContact.status === CallContactEventStatus.ACTIVE) {
        voiceControlService.holdContact(payload.consultContact.contactID).catch((error) => {
            logger.debug('[CcfCallConferenceSlice][holdAndResumeConsult]', `payload: ${JSON.stringify(error)}`);
        });
    }
    else if (payload.consultContact.status === CallContactEventStatus.JOINED) {
        yield CXoneAcdClient.instance.contactManager.voiceService
            .conferenceHold(payload.conferenceNo)
            .catch((error) => {
            logger.debug('[CcfCallConferenceSlice][conferenceHold]', `payload: ${JSON.stringify(error)}`);
        });
    }
    else if (payload.consultContact.status === CallContactEventStatus.HOLDING) {
        voiceControlService.resumeContact(payload.consultContact.contactID).catch((error) => {
            logger.debug('[CcfCallConferenceSlice][holdAndResumeConsult]', `payload: ${JSON.stringify(error)}`);
        });
    }
}));
/**
 * to resume the consult and hold the conference call
 * @param payload - conference number and consult contact
 * @example - dispatch(resumeAndHoldConference(payload))
 *
*/
export const resumeAndHoldConference = createAsyncThunk('resumeAndHoldConference', (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneAcdClient.instance.contactManager.voiceService
        .conferenceHold(payload.conferenceNo).then(() => {
        payload.consultContact.resume().catch((error) => {
            logger.debug('[CcfCallConferenceSlice][resumeAndHoldConference]', `payload: ${JSON.stringify(error)}`);
        });
    })
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][resumeAndHoldConference]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * to join the conference call
 * @param contactId - contact id
 * @example - dispatch(conferenceJoin(contactId))
 *
*/
export const conferenceJoin = createAsyncThunk('conferenceJoin', (conferenceInfo, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneAcdClient.instance.contactManager.voiceService
        .conferenceJoin(conferenceInfo.contactId, conferenceInfo.conferenceNo).then(() => {
        thunkAPI.dispatch(globalActions.setToastMsg({ msg: 'partiesMerged' }));
        toast.success(_jsx(CcfAppToastMessage, { type: "success", messageKey: 'partiesMerged' }), {
            autoClose: 2000,
            containerId: 'AppToastContainer',
        });
    })
        .catch((error) => {
        logger.debug('[CcfCallConferenceSlice][conferenceJoin]', `payload: ${JSON.stringify(error)}`);
    });
}));
export const callConferenceSlice = createSlice({
    name: CCF_CALL_CONFERENCE_FEATURE_KEY,
    initialState: CallConferenceState,
    reducers: {
        /**
           * Function to set if cold transferred btn clicked
           * @param state - CallConferenceState
           * @param action  - PayloadAction<boolean>
           * @returns It returns if cold transfer btn is pressed
           * @example -coldTransferredBtnClicked(true)
           */
        coldTransferredBtnClicked(state, action) {
            var _a, _b;
            state.isColdTransferClicked = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.isColdTransferClicked;
            state.agent = (_b = action.payload) === null || _b === void 0 ? void 0 : _b.agent;
        },
        /**
         * Function to set if cold transferred btn clicked
         * @param state - CallConferenceState
         * @param action  - PayloadAction<boolean>
         * @returns It returns if cold transfer btn is pressed
         * @example - initiateColdTransfer(true)
         */
        initiateColdTransfer(state, action) {
            var _a, _b;
            state.initiateColdTransfer = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.initiateColdTransfer;
            state.agent = (_b = action.payload) === null || _b === void 0 ? void 0 : _b.agent;
        },
        /**
         * Function to set if consult call by agent id clicked
         * @param state - CallConferenceState
         * @param action  - PayloadAction<boolean>
         * @returns It returns if cold transfer btn is pressed
         * @example -consultCallByAgentBtnClicked(true)
         */
        consultCallByAgentBtnClicked(state, action) {
            var _a;
            state.isConsultCallByAgentIdClicked = action === null || action === void 0 ? void 0 : action.payload.isConsultCallByAgentIdClicked;
            state.agent = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.agent;
        },
        /**
         * Function to set if consult call by skill id clicked
         * @param state - CallConferenceState
         * @param action  - PayloadAction<CallConferenceProps>
         * @returns It returns if cold transfer btn is pressed
         * @example -consultCallBySkillBtnClicked(true)
         */
        consultCallBySkillBtnClicked(state, action) {
            var _a;
            state.isConsultCallBySkillIdClicked = action === null || action === void 0 ? void 0 : action.payload.isConsultCallBySkillIdClicked;
            state.agent = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.agent;
        },
        /**
         * Function to set if external number attributes
         * @param state - CallConferenceState
         * @param action  - PayloadAction<CallConferenceProps>
         * @returns It returns if cold transfer btn is pressed
         * @example -consultCallBySkillBtnClicked(true)
         */
        dialExternalContact(state, action) {
            state.externalNumberAttributes = {
                voiceContact: action.payload.voiceContact,
                isExternalNumberDialed: action.payload.isExternalNumberDialed,
                skillId: action.payload.skillId,
                phoneNumber: action.payload.phoneNumber,
                triggerType: action.payload.triggerType,
            };
        },
        /**
         * Function to reset error state to false
         * @param state - CallConferenceState
         * @returns state
         * @example -resetContactErrorState()
         */
        resetContactErrorState(state) {
            state.errorState = {
                hasErrorForConsultCall: false,
                hasErrorForDialSkill: false,
                hasErrorForHold: false,
                hasErrorForDialPhone: false,
                hasErrorForTransferCall: false,
            };
        },
        /**
         * Function to set conference status
         * @param state - CallConferenceState
         * @param action  - PayloadAction<ConferenceStatus>
         * @returns state
         * @example -setConferenceStatus(ConferenceStatus.HOLD)
         */
        setConferenceStatus(state, action) {
            return Object.assign(Object.assign({}, state), { conferenceStatus: action === null || action === void 0 ? void 0 : action.payload });
        },
        /**
         * Function to set conference No
         * @param state - CallConferenceState
         * @param action  - PayloadAction<number>
         * @returns state
         * @example -setConferenceNo(45454596)
         */
        setConferenceNo(state, action) {
            return Object.assign(Object.assign({}, state), { conferenceNo: action === null || action === void 0 ? void 0 : action.payload });
        },
        /**
         * Function to set conference No
         * @param state - CallConferenceState
         * @param action  - PayloadAction<boolean>
         * @returns state
         * @example -setIsMergeContact(true)
         */
        setIsMergeContact(state, action) {
            return Object.assign(Object.assign({}, state), { isMergeContactClicked: action === null || action === void 0 ? void 0 : action.payload });
        },
        /**
         * Function to set consult status
         * @param state - CallConferenceState
         * @param action  - PayloadAction<boolean>
         * @returns state
         * @example -isConsult(false)
         */
        isConsult(state, action) {
            return Object.assign(Object.assign({}, state), { isConsult: action === null || action === void 0 ? void 0 : action.payload });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addConsultAgentByAgentId.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { errorState: state.errorState && Object.assign(Object.assign({}, state.errorState), { hasErrorForConsultCall: false }) });
        });
        builder.addCase(addConsultAgentByAgentId.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { errorState: state.errorState && Object.assign(Object.assign({}, state.errorState), { hasErrorForConsultCall: true }) });
        });
        builder.addCase(addConsultAgentBySkillId.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { errorState: state.errorState && Object.assign(Object.assign({}, state.errorState), { hasErrorForDialSkill: false }) });
        });
        builder.addCase(addConsultAgentBySkillId.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { errorState: state.errorState && Object.assign(Object.assign({}, state.errorState), { hasErrorForDialSkill: true }) });
        });
        builder.addCase(holdCall.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { errorState: state.errorState && Object.assign(Object.assign({}, state.errorState), { hasErrorForHold: false }) });
        });
        builder.addCase(holdCall.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { errorState: state.errorState && Object.assign(Object.assign({}, state.errorState), { hasErrorForHold: true }) });
        });
        builder.addCase(dialExternalNumber.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { errorState: state.errorState && Object.assign(Object.assign({}, state.errorState), { hasErrorForDialPhone: false }) });
        });
        builder.addCase(dialExternalNumber.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { errorState: state.errorState && Object.assign(Object.assign({}, state.errorState), { hasErrorForDialPhone: true }) });
        });
        builder.addCase(transferCall.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { errorState: state.errorState && Object.assign(Object.assign({}, state.errorState), { hasErrorForTransferCall: false }) });
        });
        builder.addCase(transferCall.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { errorState: state.errorState && Object.assign(Object.assign({}, state.errorState), { hasErrorForTransferCall: true }) });
        });
    },
});
export const callConferenceReducer = callConferenceSlice.reducer;
export const callConferenceActions = callConferenceSlice.actions;
/**
 * Function to get status of Call conference
 * @param rootState - callConferenceState
 * @returns It returns conference state
 * @example - const callConferenceState = getCallConferenceState(rootState)
 */
const getCallConferenceState = (rootState) => {
    return rootState[CCF_CALL_CONFERENCE_FEATURE_KEY];
};
export const isColdBtnTransferClicked = createSelector(getCallConferenceState, (state) => state === null || state === void 0 ? void 0 : state.isColdTransferClicked);
export const hasErrorState = createSelector(getCallConferenceState, (state) => state === null || state === void 0 ? void 0 : state.errorState);
export const conferenceStatus = createSelector(getCallConferenceState, (state) => state === null || state === void 0 ? void 0 : state.conferenceStatus);
export const isConsult = createSelector(getCallConferenceState, (state) => state === null || state === void 0 ? void 0 : state.isConsult);
export const conferenceNo = createSelector(getCallConferenceState, (state) => state === null || state === void 0 ? void 0 : state.conferenceNo);
//# sourceMappingURL=ccf-call-conference.slice.js.map