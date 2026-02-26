import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfAppToastMessage, CcfBox, CcfDialogBox, useTranslator } from '@nice-devone/ui-controls';
import { AdaptiveCard } from 'adaptivecards-react';
import { templateJSON, relatedHeaderTemplateJSON } from './ccf-customer-card-activity-adaptive-card-template';
import { useTheme } from '@mui/material';
import * as ActivityCardTemplate from 'adaptivecards-templating';
import { useDispatch, useSelector } from 'react-redux';
import { cxoneCCActivity, cxoneCCActivitySearch, fetchActivityData, CcfCustomerCardActions, cxoneCCActivityLoadingStatus, cxoneDigitalContactDetails, cxoneCcActivityRenderStatus, cxoneVoiceContactDetails, invokeTimelineAndDataMemo, updateActivityData, getStoredCustomEventDetails, getCRMDataForTransferedContactFromPolling, activityExpanded, screenPopEpicRecord, } from '../ccf-customer-card.slice';
import customerCardActivityStyles, { activityCardCSS } from './ccf-customer-card-activity.style';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { MediaType, DigitalChannelStatus, VoiceContactStatus, WorkflowTypes, EntityType } from '@nice-devone/common-sdk';
import React, { useEffect, useRef } from 'react';
import { selectUserInCall, selectUserInConsult, voiceContactCardSelector, voiceContactSelector, allDigitalContactCard, getNonIncomingActiveContactInSelectedInteraction, getActiveContactInSelectedInteraction, } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfLogger, FeatureToggleService } from '@nice-devone/agent-sdk';
import { getDispositionOutcomeResponse, getDispositionData } from '../../../ccf-disposition/ccf-disposition-slice';
import { CXoneAgentEvents } from '@nice-devone/shared-apps-lib';
import { CXoneAgentIntegrationTransformer } from './cxone-agent-integration-transformer';
import { cxoneRoutingQueuId } from '../../ccf-agent-contact-history/ccf-agent-contact-history.slice';
import { templateRelatedJSON } from './ccf-customer-card-related-adaptive-card.template';
import * as CcfCustomerCardSlice from '../ccf-customer-card.slice';
import CcfCustomerCardCreatePopover from './ccf-customer-card-create/ccf-customer-card-create.popover';
/**
 * Enum for the workflow actions
 */
var workflowActions;
(function (workflowActions) {
    workflowActions["SEARCH"] = "Search";
    workflowActions["DATAMEMORIALIZATION"] = "DataMemorialization";
    workflowActions["TIMELINE"] = "Timeline";
})(workflowActions || (workflowActions = {}));
//time to keep alive cacheKey for CRM data
const KEEP_ALIVE_TIME = 600000;
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export function CcfCustomerCardActivity(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const logger = new CcfLogger('App.customer-card', 'App.customer-card-activity-slice');
    const { dnis, setIsActivityDisabled } = props;
    const dispatch = useDispatch();
    const referenceForCustomerCardActivity = useRef(null);
    const activityData = useSelector(cxoneCCActivity);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const selectedActivityData = activityData === null || activityData === void 0 ? void 0 : activityData.find((item) => ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL) ? item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) : item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId));
    const activitySearchData = useSelector(cxoneCCActivitySearch);
    const selectedActivityConfig = (activitySearchData === null || activitySearchData === void 0 ? void 0 : activitySearchData.find((item) => ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL) ? item.ContactID === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) : item.ContactID === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId))) || JSON.parse(localStorage.getItem(StorageKeys.CXONE_ACTIVITY_CONFIG) || '[]').find((item) => ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL) ? item.ContactID === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) : item.ContactID === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId));
    const theme = useTheme();
    const [translate] = useTranslator();
    const isLoading = useSelector(cxoneCCActivityLoadingStatus);
    const voiceContactCard = useSelector(voiceContactCardSelector);
    const voiceContact = useSelector(voiceContactSelector);
    const usersInCall = useSelector(selectUserInCall);
    const userInConsult = useSelector(selectUserInConsult);
    const currentUser = JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '{}');
    const digitalContactDetails = useSelector(cxoneDigitalContactDetails);
    const voiceContactDetails = useSelector(cxoneVoiceContactDetails);
    const digitalContact = useSelector(allDigitalContactCard);
    const isActivityRendered = useSelector(cxoneCcActivityRenderStatus);
    const dispositionOutcomeResponse = useSelector(getDispositionOutcomeResponse);
    const dispositionData = useSelector(getDispositionData);
    const getCxoneRoutingQueuId = useSelector(cxoneRoutingQueuId);
    const availableCustomEvent = useSelector(getStoredCustomEventDetails);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const isCreateEntityConfirmationOpen = useSelector(CcfCustomerCardSlice.getCreateEntityConfirmationOpen);
    const createEntityPopoverList = useSelector(CcfCustomerCardSlice.getCreateEntityPopoverList);
    const createEntityTargetDisplay = useSelector(CcfCustomerCardSlice.getCreateEntityTargetDisplay);
    const showCreateEntityButton = useSelector(CcfCustomerCardSlice.getCreateEntityShowButton);
    // Define a template payload
    const templatePayload = templateJSON();
    const relatedTemplatePayload = templateRelatedJSON(translate);
    const relatedHeaderPayload = relatedHeaderTemplateJSON(translate);
    const selectedDigitalContactDetails = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) && digitalContactDetails[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId][nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId] || {};
    // Create a Template instance from the template payload
    const template = new ActivityCardTemplate.Template(templatePayload);
    const relatedTemplate = new ActivityCardTemplate.Template(relatedTemplatePayload);
    const headerTemplate = new ActivityCardTemplate.Template(relatedHeaderPayload);
    const styles = customerCardActivityStyles(theme);
    const expandedIndex = useSelector(activityExpanded);
    // for enable or disable realtesTo in current interaction based on feature toggle - if on - then disable in related interaction else only enable in related interaction 
    const isRelatesToMSDCurrInteractionEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-RelatesTo-MSD-CRM-10029" /* FeatureToggles.RELATESTO_MSD_CURRENT_INTERACTION */);
    // logic for getting whether pinned phone call entity record available or not in current call interaction
    let pinrecordforcurrentinteraction = [];
    if (selectedActivityData &&
        (selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result[0]) &&
        ((_a = selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result[0]) === null || _a === void 0 ? void 0 : _a.pinRecords)) {
        pinrecordforcurrentinteraction = (_b = selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result[0]) === null || _b === void 0 ? void 0 : _b.pinRecords;
    }
    let isRelatestoInteractionAvailable = false;
    pinrecordforcurrentinteraction.forEach((element) => {
        if (element.type === EntityType.PHONECALL && element.relatesTo === true && isRelatesToMSDCurrInteractionEnabled === false) {
            isRelatestoInteractionAvailable = true;
        }
    });
    let isSearchConfigAvailable = false;
    if (selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.request) {
        isSearchConfigAvailable = (_c = selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.request) === null || _c === void 0 ? void 0 : _c.find((item) => { var _a, _b; return ((_a = item.workflowType) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = WorkflowTypes === null || WorkflowTypes === void 0 ? void 0 : WorkflowTypes.SEARCH) === null || _b === void 0 ? void 0 : _b.toLowerCase()); });
    }
    else if (selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.searchWorkflow) {
        isSearchConfigAvailable = !!((_d = selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.searchWorkflow[0][0]) === null || _d === void 0 ? void 0 : _d.configurationId) && !!((_e = selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.searchWorkflow[0][0]) === null || _e === void 0 ? void 0 : _e.workflowId);
    }
    const { workflowId, configurationId } = (_k = (((_g = (_f = selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.timelineWorkflow) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g[0]) || ((_j = (_h = selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.dataMemorializationWorkflow) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j[0]))) !== null && _k !== void 0 ? _k : {};
    const isLinkable = !!configurationId && !!workflowId;
    // TODO: CRM icons to be created in separate component - ccf-crm-icon - zendeskIcon,searchIcon
    // There is a limitation in adaptive card to use our theme. Hence we have used inline css to use our theme and adaptive card internal css overriding in few cases and we have used !important in those instances in this component
    const activityCardStyles = activityCardCSS(theme, selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.iconBase64string, isSearchConfigAvailable, isLinkable, isRelatestoInteractionAvailable, showCreateEntityButton);
    const hostConfig = {
        fontFamily: '',
    };
    /**
     * Used in case of refresh btn click
     * @example - onClickRefreshBtn()
     */
    const onExecuteAction = (event) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        let contactId;
        let phoneNumber;
        let searchWorkflowPayload;
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) !== undefined) {
            contactId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId;
        }
        if (event._processedData === 'searchActivity') {
            let searchConfig;
            if (selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.request) {
                searchConfig = (_a = selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.request) === null || _a === void 0 ? void 0 : _a.find((item) => { var _a, _b; return ((_a = item.workflowType) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = WorkflowTypes === null || WorkflowTypes === void 0 ? void 0 : WorkflowTypes.SEARCH) === null || _b === void 0 ? void 0 : _b.toLowerCase()); });
            }
            else if (selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.searchWorkflow) {
                searchConfig = selectedActivityConfig === null || selectedActivityConfig === void 0 ? void 0 : selectedActivityConfig.searchWorkflow[0][0];
            }
            if (searchConfig) {
                dispatch(CcfCustomerCardActions.setActivityLoading(true));
                let email;
                if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) && nonIncomingActiveContactInSelectedInteraction.contactId) {
                    if ((_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _b === void 0 ? void 0 : _b.wysiwygEnabled) {
                        email = (_e = (_d = (_c = digitalContactDetails[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId][nonIncomingActiveContactInSelectedInteraction.contactId]) === null || _c === void 0 ? void 0 : _c.case) === null || _d === void 0 ? void 0 : _d.authorEndUserIdentity) === null || _e === void 0 ? void 0 : _e.idOnExternalPlatform;
                    }
                    else {
                        phoneNumber = (_h = (_g = (_f = digitalContactDetails[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId][nonIncomingActiveContactInSelectedInteraction.contactId]) === null || _f === void 0 ? void 0 : _f.case) === null || _g === void 0 ? void 0 : _g.authorEndUserIdentity) === null || _h === void 0 ? void 0 : _h.idOnExternalPlatform.substring(2);
                    }
                }
                searchWorkflowPayload = {
                    configurationId: searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.configurationId,
                    workflowId: searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.workflowId,
                    action: workflowActions.SEARCH,
                    interactionID: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId,
                    contactID: contactId,
                    workflowInput: {
                        phoneNumber: dnis ? dnis : phoneNumber,
                        email: email,
                    },
                    cacheKey: '',
                };
                if ((_j = searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.workflowParam) === null || _j === void 0 ? void 0 : _j.dynamicDataMappingId) {
                    searchWorkflowPayload.dynamicDataMappingId = (_k = searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.workflowParam) === null || _k === void 0 ? void 0 : _k.dynamicDataMappingId;
                }
                if ((_l = searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.workflowParam) === null || _l === void 0 ? void 0 : _l.workflowInput) {
                    searchWorkflowPayload.customSearch = (_m = searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.workflowParam) === null || _m === void 0 ? void 0 : _m.workflowInput;
                }
                dispatch(fetchActivityData(searchWorkflowPayload));
            }
            /**
             * To remove the cache on manual click of refresh button.
             */
            const storedActivityConfig = LocalStorageHelper.getItem(StorageKeys.CXONE_ACTIVITY_CONFIG, true);
            storedActivityConfig === null || storedActivityConfig === void 0 ? void 0 : storedActivityConfig.forEach((element) => {
                if ((element === null || element === void 0 ? void 0 : element.ContactID) === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId)) {
                    element.searchWorkflow[0][0].cacheKey = '';
                }
            });
            LocalStorageHelper.setItem(StorageKeys.CXONE_ACTIVITY_CONFIG, storedActivityConfig);
        }
        if (((_o = event._processedData) === null || _o === void 0 ? void 0 : _o.intent) === 'openUrl') {
            // Method to open the url in new tab
            screenPopRecord(event._processedData.data);
        }
        else if (((_p = event._processedData) === null || _p === void 0 ? void 0 : _p.intent) === 'linkData') {
            const linkData = [];
            linkData.push(event._processedData.data);
            updateLinkedData(linkData, event._processedData.isLinked === 'true');
            // Method to store linked data in localstorage
            saveLinkedRecords(event._processedData.data, event._processedData.isLinked === 'true');
        }
        else if (((_q = event._processedData) === null || _q === void 0 ? void 0 : _q.intent) === 'toggleVisibility') {
            expandRecords(event._processedData.data);
        }
        else if (((_r = event._processedData) === null || _r === void 0 ? void 0 : _r.intent) === 'relatestoData') {
            const relatesToData = [];
            relatesToData.push(event._processedData.data);
            relatesToData.push(event._processedData.type);
            const relatedObject = {
                name: '',
                type: event._processedData.type || '',
                value: event._processedData.data || '',
            };
            relatedObject.name = (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.isInbound) ? 'from' : 'to';
            // method to update the activity json with relatesto data
            updateRelatestoData(relatesToData, event._processedData.isRelatesto === 'true');
            //Method to store Relates to data in localstorage
            saveRelatestoRecords(event._processedData.data, event._processedData.isRelatesto === 'true');
        }
        else if (event._processedData.intent === 'createEntity') {
            dispatch(CcfCustomerCardSlice.thunks.createEntity.onClickOfFeature({}));
        }
    };
    /**
     * helper function to initiate screen pop
     * @param event - event object containing screen pop data
     * @example - screenPopRecord(event)
     */
    const screenPopRecord = ((data) => {
        if ((data === null || data === void 0 ? void 0 : data.crm) === 'epic') {
            dispatch(screenPopEpicRecord({ id: data.id, entityType: data === null || data === void 0 ? void 0 : data.type }));
            //early return to avoid dispatching CXONE_SCREEN_POP_EVENT for epic records
            return;
        }
        const eventArgs = {};
        eventArgs.detail = { activityRecord: data, contactId: activityData.contactId };
        const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, eventArgs);
        window.dispatchEvent(customEvent);
    });
    /**
     * Used to update the activity json with relatesto data
     * @param id - array of number or string
     * @param isRelatesto - boolean
     * @example - updateRelatestoData([1,2,3], true)
     */
    const updateRelatestoData = (id, isRelatesto) => {
        var _a, _b;
        const extensibleActivityData = JSON.parse(JSON.stringify(selectedActivityData));
        (_b = (_a = extensibleActivityData === null || extensibleActivityData === void 0 ? void 0 : extensibleActivityData.result[0]) === null || _a === void 0 ? void 0 : _a.records) === null || _b === void 0 ? void 0 : _b.map((records) => {
            var _a;
            const recordId = id.find((element) => element === records.id);
            records['relatesto'] = recordId ? (!isRelatesto).toString() : 'false';
            (_a = records === null || records === void 0 ? void 0 : records.related) === null || _a === void 0 ? void 0 : _a.map((related) => {
                const relatedId = id.find((element) => element === related.id);
                related['relatesto'] = relatedId ? (!isRelatesto).toString() : 'false';
            });
        });
        dispatch(CcfCustomerCardActions.setActivityInformation(extensibleActivityData));
    };
    /**
     * Used to update LocalStorage with linked Record IDs
     * @param ID - number
     * @param isLinked - boolean
     * @example - saveRelatestoRecords(index, isLinked)
     */
    const saveRelatestoRecords = (id, isRelatesto) => {
        var _a;
        const activeContactId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId;
        if (activeContactId) {
            const storedData = LocalStorageHelper.getItem(StorageKeys.CC_RELATESTO_ACTIVITIES, true) || {};
            if (!isRelatesto) {
                //storedData[activeContactId] = [relatedObject];
                storedData[activeContactId] = [id];
            }
            else {
                (_a = storedData[activeContactId]) === null || _a === void 0 ? void 0 : _a.splice(0, 1);
            }
            LocalStorageHelper.setItem(StorageKeys.CC_RELATESTO_ACTIVITIES, storedData);
        }
    };
    /**
     * Used to update the activity json with relatesto data
     * @param id - array of number or string
     * @param isRelatesto - boolean
     * @example - updateRelatestoData([1,2,3], true)
     */
    const updateRelatesandlinkableData = (linkedandrelatesobject) => {
        const extensibleActivityData = JSON.parse(JSON.stringify(selectedActivityData));
        Object.keys(linkedandrelatesobject).map((key) => {
            if (key === 'linked' || key === 'relates') {
                linkedandrelatesobject[key] && linkedandrelatesobject[key].map((id) => {
                    var _a, _b;
                    (_b = (_a = extensibleActivityData === null || extensibleActivityData === void 0 ? void 0 : extensibleActivityData.result[0]) === null || _a === void 0 ? void 0 : _a.records) === null || _b === void 0 ? void 0 : _b.map((record) => {
                        var _a;
                        if (id === record.id) {
                            record[key === 'linked' ? 'linked' : 'relatesto'] = 'true';
                        }
                        (_a = record.related) === null || _a === void 0 ? void 0 : _a.map((related) => {
                            if (id === related.id) {
                                related[key === 'linked' ? 'linked' : 'relatesto'] = 'true';
                            }
                        });
                    });
                });
            }
        });
        dispatch(CcfCustomerCardActions.setActivityInformation(extensibleActivityData));
    };
    /**
     * Used to update LocalStorage with linked Record IDs
     * @param ID - number
     * @param isLinked - boolean
     * @example - saveLinkedRecords(index, isLinked)
     */
    const saveLinkedRecords = (id, isLinked) => {
        var _a, _b, _c;
        const activeContactId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId;
        if (activeContactId) {
            const storedData = LocalStorageHelper.getItem(StorageKeys.CC_LINKED_ACTIVITIES, true) || {};
            if (!isLinked) {
                if (((_a = storedData[activeContactId]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    storedData[activeContactId].push(id);
                }
                else {
                    storedData[activeContactId] = [id];
                }
            }
            else {
                const index = (_b = storedData[activeContactId]) === null || _b === void 0 ? void 0 : _b.findIndex((element) => element === id);
                if (index !== -1) {
                    (_c = storedData[activeContactId]) === null || _c === void 0 ? void 0 : _c.splice(index, 1);
                }
            }
            LocalStorageHelper.setItem(StorageKeys.CC_LINKED_ACTIVITIES, storedData);
        }
    };
    /**
     * Used to update the activity json with linked data
     * @param ID - number
     * @example - expandRecords(index)
     */
    const expandRecords = (index) => {
        var _a, _b;
        const extensibleActivityData = JSON.parse(JSON.stringify(selectedActivityData));
        (_b = (_a = extensibleActivityData === null || extensibleActivityData === void 0 ? void 0 : extensibleActivityData.result[0]) === null || _a === void 0 ? void 0 : _a.records) === null || _b === void 0 ? void 0 : _b.map((_data, recordIndex) => {
            // Check if this is the clicked record
            if (recordIndex === index) {
                // Toggle the expanded state
                const newExpandedState = _data['expanded'] === 'true' ? 'false' : 'true';
                _data['expanded'] = newExpandedState;
                // Set the expanded index based on the toggle state
                if (newExpandedState === 'false') {
                    dispatch(CcfCustomerCardActions.setActivityExpanded(-1)); // Collapse this toggle
                }
                else {
                    dispatch(CcfCustomerCardActions.setActivityExpanded(recordIndex)); // Expand this toggle
                }
            }
            else if (expandedIndex === recordIndex) {
                // Collapse the previously expanded toggle
                _data['expanded'] = 'false';
            }
        });
        dispatch(CcfCustomerCardActions.setActivityInformation(extensibleActivityData));
    };
    /**
     * Used to update the activity json with linked data
     * @param id - array of number or string
     * @param isLinked - boolean
     * @example - updateLinkedData([1,2,3], true)
     */
    const updateLinkedData = (id, isLinked) => {
        var _a, _b;
        const extensibleActivityData = JSON.parse(JSON.stringify(selectedActivityData));
        (_b = (_a = extensibleActivityData === null || extensibleActivityData === void 0 ? void 0 : extensibleActivityData.result[0]) === null || _a === void 0 ? void 0 : _a.records) === null || _b === void 0 ? void 0 : _b.map((records) => {
            var _a;
            const recordId = id.find((element) => element === records.id);
            if (recordId) {
                records['linked'] = (!isLinked).toString();
            }
            (_a = records === null || records === void 0 ? void 0 : records.related) === null || _a === void 0 ? void 0 : _a.map((related) => {
                const relatedId = id.find((element) => element === related.id);
                if (relatedId) {
                    related['linked'] = (!isLinked).toString();
                }
            });
        });
        dispatch(CcfCustomerCardActions.setActivityInformation(extensibleActivityData));
    };
    useEffect(() => {
        const isDataNotAvailable = ((!selectedActivityData && !selectedActivityConfig) || (selectedActivityData && !selectedActivityData.result) ||
            (selectedActivityData && selectedActivityData.result && !selectedActivityData.result[0]));
        setIsActivityDisabled && setIsActivityDisabled(!!isDataNotAvailable);
        dispatch(CcfCustomerCardSlice.thunks.createEntity.setPopoverList());
    }, [selectedActivityData, selectedActivityConfig]);
    useEffect(() => {
        if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.finalState) && voiceContactCard && (usersInCall || userInConsult)) {
            voiceContactCard.map((voiceContactData) => {
                if (voiceContactData.contactStatus === VoiceContactStatus.DISCONNECTED) {
                    const availableCustomEventData = availableCustomEvent === null || availableCustomEvent === void 0 ? void 0 : availableCustomEvent.filter((item) => {
                        return (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId);
                    });
                    /**
                     * Once timeline or DM flow is completed we no more require custom event information for case.
                     */
                    dispatch(CcfCustomerCardActions.removeStoredCustomEvent(availableCustomEventData));
                    const timelineDataMappingfromLS = CXoneAgentIntegrationTransformer.cxoneRemoveTimelineDMInfo(voiceContactData, activityData, activitySearchData, availableCustomEvent);
                    dispatch(updateActivityData(timelineDataMappingfromLS));
                    const args = CXoneAgentIntegrationTransformer.cxoneExecuteTimelineDataMapping(voiceContactData, dispositionData, selectedActivityData, selectedActivityConfig, nonIncomingActiveContactInSelectedInteraction !== null && nonIncomingActiveContactInSelectedInteraction !== void 0 ? nonIncomingActiveContactInSelectedInteraction : undefined, digitalContactDetails, getCxoneRoutingQueuId, currentUser, voiceContactDetails);
                    dispatch(invokeTimelineAndDataMemo(args));
                    /**
                    * Dev note - This code is written to remove data kept in localstorage, as we are providing backward compatability with ealstic cache and custom events.
                    * will be removed by next release.
                    */
                    const agentWorkflowEventDetails = LocalStorageHelper.getItem(StorageKeys.AGENT_WORKFLOW_EVENT, true) || [];
                    const isAgentWorkflowEventDetails = agentWorkflowEventDetails instanceof Array && (agentWorkflowEventDetails === null || agentWorkflowEventDetails === void 0 ? void 0 : agentWorkflowEventDetails.filter((item) => {
                        return (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId);
                    }));
                    LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_EVENT, isAgentWorkflowEventDetails);
                    const agentWorkflowConfigurationDetails = LocalStorageHelper.getItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, true) || [];
                    const isAgentWorkflowConfigurationEventDetails = agentWorkflowConfigurationDetails instanceof Array && (agentWorkflowConfigurationDetails === null || agentWorkflowConfigurationDetails === void 0 ? void 0 : agentWorkflowConfigurationDetails.filter((item) => {
                        return (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId);
                    }));
                    LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, isAgentWorkflowConfigurationEventDetails);
                    /**
                     * Localstorage clearing for pin Records.
                     */
                    const pinRecordsDetails = LocalStorageHelper.getItem(StorageKeys.CRM_PIN_RECORDS, true) || [];
                    const isPinRecordsDetails = pinRecordsDetails instanceof Array && (pinRecordsDetails === null || pinRecordsDetails === void 0 ? void 0 : pinRecordsDetails.filter((item) => {
                        return (item === null || item === void 0 ? void 0 : item.contactId) !== (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactId);
                    }));
                    LocalStorageHelper.setItem(StorageKeys.CRM_PIN_RECORDS, isPinRecordsDetails);
                }
            });
        }
    }, [dispositionOutcomeResponse]);
    useEffect(() => {
        if (((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) === DigitalChannelStatus.CLOSED || (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) === DigitalChannelStatus.RESOLVED) && nonIncomingActiveContactInSelectedInteraction.media === MediaType.DIGITAL && selectedActivityData) {
            if (activeContactInSelectedInteraction && Object.keys(activeContactInSelectedInteraction).length && (activeContactInSelectedInteraction.contactStatus === DigitalChannelStatus.CLOSED || (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) === DigitalChannelStatus.RESOLVED) && activeContactInSelectedInteraction.media === MediaType.DIGITAL) {
                const timelineDataMappingfromLS = CXoneAgentIntegrationTransformer.cxoneRemoveTimelineDMInfo(activeContactInSelectedInteraction, activityData, activitySearchData, availableCustomEvent);
                dispatch(updateActivityData(timelineDataMappingfromLS));
                const workflowPayload = CXoneAgentIntegrationTransformer.cxoneExecuteTimelineDataMapping(activeContactInSelectedInteraction, dispositionData, selectedActivityData, selectedActivityConfig, nonIncomingActiveContactInSelectedInteraction, digitalContactDetails, getCxoneRoutingQueuId, currentUser, voiceContactDetails);
                dispatch(invokeTimelineAndDataMemo(workflowPayload));
            }
        }
    }, [dispositionOutcomeResponse]);
    useEffect(() => {
        if (isActivityRendered) {
            dispatch(CcfCustomerCardActions.setActivityRendered(false));
            // get stored link data and update activity
            const storedLinkedData = LocalStorageHelper.getItem(StorageKeys.CC_LINKED_ACTIVITIES, true) || {};
            const storedRelatestoData = LocalStorageHelper.getItem(StorageKeys.CC_RELATESTO_ACTIVITIES, true) || {};
            if (storedLinkedData && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) && storedLinkedData[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId]) {
                selectedActivityData && updateLinkedData(storedLinkedData[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId]);
            }
            // Logic to update localStorage with available cases
            const availableContacts = [...voiceContactCard, ...digitalContact];
            const storedKeys = Object.keys(storedLinkedData);
            storedKeys === null || storedKeys === void 0 ? void 0 : storedKeys.map(storedKey => {
                if (!availableContacts.find(item => (item === null || item === void 0 ? void 0 : item.contactId) === storedKey.toString() || (item === null || item === void 0 ? void 0 : item.caseId) === storedKey.toString())) {
                    delete storedLinkedData[storedKey];
                }
            });
            LocalStorageHelper.setItem(StorageKeys.CC_LINKED_ACTIVITIES, storedLinkedData);
            const storedRelatesKeys = Object.keys(storedRelatestoData);
            storedRelatesKeys === null || storedRelatesKeys === void 0 ? void 0 : storedRelatesKeys.map((storedRelateKey) => {
                if (!availableContacts.find(item => (item === null || item === void 0 ? void 0 : item.contactId) === storedRelateKey.toString() || (item === null || item === void 0 ? void 0 : item.caseId) === storedRelateKey.toString())) {
                    delete storedRelatestoData[storedRelateKey];
                }
            });
            LocalStorageHelper.setItem(StorageKeys.CC_RELATESTO_ACTIVITIES, storedRelatestoData);
        }
    }, [isActivityRendered]);
    useEffect(() => {
        const storedLinkedData = LocalStorageHelper.getItem(StorageKeys.CC_LINKED_ACTIVITIES, true) || {};
        const storedRelatesData = LocalStorageHelper.getItem(StorageKeys.CC_RELATESTO_ACTIVITIES, true) || {};
        if (storedLinkedData && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) && storedLinkedData[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId]) {
            const linkedandrelatesobject = {
                linked: storedLinkedData[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId],
                relates: storedRelatesData[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId],
            };
            selectedActivityData && updateRelatesandlinkableData(linkedandrelatesobject);
        }
    }, [nonIncomingActiveContactInSelectedInteraction]);
    useEffect(() => {
        const selectedContact = voiceContactCard === null || voiceContactCard === void 0 ? void 0 : voiceContactCard.find(item => item.isSelected);
        let crmPollingInterval;
        if (selectedContact && (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.media) === MediaType.VOICE && (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.interactionId) && selectedActivityData) {
            crmPollingInterval = setInterval(() => {
                // for every interval, will give this API call to keep cacheKey alive for CRM data when contact is for long time in agent's inbox
                dispatch(getCRMDataForTransferedContactFromPolling(voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.interactionId));
            }, KEEP_ALIVE_TIME);
        }
        return () => clearInterval(crmPollingInterval);
    }, []);
    return (_jsx(CcfBox, Object.assign({ sx: styles.customerCardActivityContainer, ref: referenceForCustomerCardActivity }, { children: !isLoading ? (_jsxs(_Fragment, { children: [((!selectedActivityData) || (selectedActivityData && selectedActivityData.result === undefined) ||
                    (selectedActivityData && selectedActivityData.result && (((_l = selectedActivityData.result[0]) === null || _l === void 0 ? void 0 : _l.records) === undefined || ((_o = (_m = selectedActivityData.result[0]) === null || _m === void 0 ? void 0 : _m.records) === null || _o === void 0 ? void 0 : _o.length) === 0))) && (_jsx(CcfBox, Object.assign({ sx: styles.noInformation }, { children: translate('noInformationAvailable') }))), _jsxs(CcfBox, { children: [_jsx("style", { children: activityCardStyles }), _jsxs(CcfBox, { children: [_jsx(AdaptiveCard, { payload: headerTemplate.expand({ $root: { showCreateEntityButton, isSearchConfigAvailable } }), hostConfig: hostConfig, onExecuteAction: (event) => {
                                        onExecuteAction(event);
                                    }, onActionSubmit: (event) => logger.debug('onActionSubmit', `event: ${JSON.stringify(event)}`), onError: (event) => logger.error('onError', `event: ${JSON.stringify(event)}`) }), selectedActivityData && ((_p = selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result[0]) === null || _p === void 0 ? void 0 : _p.records.map((record, index) => {
                                    var _a;
                                    const card = template.expand({
                                        $root: {
                                            record,
                                            index,
                                            system: selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result[0].system,
                                        },
                                    });
                                    return (_jsxs(_Fragment, { children: [_jsx(AdaptiveCard, { payload: card, hostConfig: hostConfig, onExecuteAction: (event) => {
                                                    onExecuteAction(event);
                                                }, onActionSubmit: (event) => logger.debug('onActionSubmit', `event: ${JSON.stringify(event)}`), onError: (event) => logger.error('onError', `event: ${JSON.stringify(event)}`) }, record.id), ((_a = record === null || record === void 0 ? void 0 : record.related) === null || _a === void 0 ? void 0 : _a.length) > 0 && (record.related.map((related) => {
                                                const relatedCard = relatedTemplate.expand({
                                                    $root: {
                                                        related: related,
                                                        system: selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result[0].system,
                                                    },
                                                });
                                                return ((expandedIndex === index) && _jsx(AdaptiveCard, { payload: relatedCard, hostConfig: hostConfig, onExecuteAction: (event) => {
                                                        onExecuteAction(event);
                                                    }, onActionSubmit: (event) => logger.debug('onActionSubmit', `event: ${JSON.stringify(event)}`), onError: (event) => logger.error('onError', `event: ${JSON.stringify(event)}`) }, related.id));
                                            }))] }));
                                }))] }), _jsx(CcfBox, Object.assign({ id: "create-entity_container" }, { children: _jsx(CcfCustomerCardCreatePopover, { containerRef: referenceForCustomerCardActivity, list: createEntityPopoverList }) })), _jsx(CcfDialogBox, Object.assign({ isOpen: isCreateEntityConfirmationOpen, handleOnClickOfHeaderCloseButton: () => dispatch(CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityConfirmationIsOpen({
                                isOpen: false,
                            })), title: "Add New", primaryButtonText: translate('save'), primaryButtonProps: {
                                variant: 'contained',
                                onClick: () => dispatch(CcfCustomerCardSlice.thunks.createEntity.request({
                                    toastComponentForSuccess: (_jsx(CcfAppToastMessage, { type: "success", messageKey: 'createNewEntitySuccessful' })),
                                    toastComponentForError: (_jsx(CcfAppToastMessage, { type: "error", messageKey: 'createNewEntityUnsuccessful', descriptionMessage: translate('createNewEntityUnsuccessfulMessage') })),
                                    dnis,
                                })),
                            }, secondaryButtonText: translate('cancel'), secondaryButtonProps: {
                                variant: 'outlined',
                                onClick: () => {
                                    dispatch(CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityConfirmationIsOpen({
                                        isOpen: false,
                                    }));
                                    dispatch(CcfCustomerCardSlice.thunks.createEntity.setPopoverPosition());
                                    //Keep the Entity List PopOver open incase they made a mistake and want to reselect an entity
                                    dispatch(CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityPopoverIsOpen({
                                        isOpen: true,
                                    }));
                                },
                            }, dividers: false, showTitle: false }, { children: translate('createNewEntity').replace('{entityName}', createEntityTargetDisplay) }))] })] })) : (_jsx(CcfBox, { children: _jsx(CcfBox, Object.assign({ sx: styles.loader }, { children: " " })) })) })));
}
export default React.memo(CcfCustomerCardActivity);
//# sourceMappingURL=ccf-customer-card-activity.js.map