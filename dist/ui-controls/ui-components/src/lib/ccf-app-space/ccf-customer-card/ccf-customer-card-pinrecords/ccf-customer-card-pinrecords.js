import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { AdaptiveCard } from 'adaptivecards-react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import * as ActivityCardTemplate from 'adaptivecards-templating';
import { CcfBox, useTranslator } from '@nice-devone/ui-controls';
import { StorageKeys, LocalStorageHelper } from '@nice-devone/core-sdk';
import { CXoneAgentEvents } from '@nice-devone/shared-apps-lib';
import { Crm, MediaType } from '@nice-devone/common-sdk';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { cxoneCCActivity, cxoneCCActivitySearch, CcfCustomerCardActions, getAgentWorkflowConfigurationReceived, } from '../ccf-customer-card.slice';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { templateJSON } from './ccf-customer-card-pinrecords-template';
import * as CcfCustomerCardRelatesTo from './ccf-customer-card-relates-to';
import CcfCustomerCardRelatesToPopover from './ccf-customer-card-relates-to/popover';
import 'react-toastify/dist/ReactToastify.css';
import customerCardPinRecordsStyles, { customerCardPinRecordsCSS } from './ccf-customer-card-pinrecords.style';
/**
 * Enum to hold the values used for screenpop.
 */
export var crmScreenPop;
(function (crmScreenPop) {
    crmScreenPop["OPEN_URL"] = "openUrl";
    crmScreenPop["PEGA"] = "pega";
    crmScreenPop["CONT_3"] = "CONT-3";
    crmScreenPop["CONT_6"] = "CONT-6";
    crmScreenPop["CONT_15"] = "CONT-15";
    crmScreenPop["BLANK"] = "_blank";
})(crmScreenPop || (crmScreenPop = {}));
/**
 * CcfCustomerCardPinRecords - used to display pinned records
 * @example <CcfCustomerCardPinRecords />
 */
export function CcfCustomerCardPinRecords({ setIsCurrentInteractionDisabled }) {
    var _a;
    const dispatch = useDispatch();
    const theme = useTheme();
    const [translate] = useTranslator();
    const logger = new CcfLogger('App.customer-card', 'App.customer-card-pinrecords');
    const activityData = useSelector(cxoneCCActivity);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const relatesToPinnedRecords = useSelector(CcfCustomerCardRelatesTo.controller.slice.selectors.getPinnedRecords);
    const relatesToEnableRowOpenURL = useSelector(CcfCustomerCardRelatesTo.controller.slice.selectors.getEnableRowOpenURL);
    const agentWorkflowConfigReceived = useSelector(getAgentWorkflowConfigurationReceived);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const referenceForContainer = useRef(null);
    const selectedActivityData = activityData === null || activityData === void 0 ? void 0 : activityData.find((item) => (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL
        ? item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId)
        : item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId));
    const crm = (selectedActivityData && ((_a = selectedActivityData.result) === null || _a === void 0 ? void 0 : _a.length) >= 1) ? selectedActivityData.result[0].system.type : '';
    //#region Adaptive Card
    const templatePayload = templateJSON(translate);
    const activityCardStyles = customerCardPinRecordsCSS(theme, selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.iconBase64string);
    const activitySearchData = useSelector(cxoneCCActivitySearch);
    const selectedActivityConfig = (activitySearchData === null || activitySearchData === void 0 ? void 0 : activitySearchData.find((item) => item.ContactID === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId))) ||
        JSON.parse(LocalStorageHelper.getItem(StorageKeys.CXONE_ACTIVITY_CONFIG) || '[]').find((item) => item.ContactID === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId));
    const template = new ActivityCardTemplate.Template(templatePayload);
    const styles = customerCardPinRecordsStyles(theme);
    const hostConfig = {
        fontFamily: '',
    };
    const context = {
        $root: {
            selectedActivityData: selectedActivityData !== null && selectedActivityData !== void 0 ? selectedActivityData : [],
            relatesToPinnedRecords,
            relatesToEnableRowOpenURL,
        },
    };
    const activityCard = selectedActivityData && template.expand(context);
    //#endregion
    /**
     * Used for capturing events from adaptive cards.
     * @param event - any , event object capture from adaptive card
     * @example - onExecuteAction(event)
     */
    const onExecuteAction = (event) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (event._processedData.intent === crmScreenPop.OPEN_URL) {
            if (((_b = (_a = event._processedData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.crm) === crmScreenPop.PEGA) {
                if (((_d = (_c = event._processedData) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.id) === crmScreenPop.CONT_3) {
                    window.open('https://nicecx.pegatsdemo.com/prweb/app/CSCore_/ShJhCXIheklWdcf_5HHsuw*/!PS1__TABTHREAD4?pyActivity=@baseclass.doUIAction&action=createNewWork&className=PegaCA-Work-Interaction-Research-Contact&flowName=CPMInteraction&CPMDataSource=contact&Parameter1=CONT-3&flowParamNames=CPMDataSource&Parameter1&dynamicContainerID=c66230a4-dae4-4346-afb0-c6c544079c8e&contentID=9b4d8fbd-b026-6539-7c68-c44c35bcdad5&tabIndex=5&prevContentID=07b0a226-d908-9864-0a9c-ee9ddebf147f&prevRecordkey=PEGACA-WORK SEARCHTEMP&portalThreadName=OpenPortal_InnerLive&portalName=CPMInteractionPortal&pzHarnessID=HIDF4E398102CA1BA6F3FB44C6919528899', '_blank');
                }
                else if (((_f = (_e = event._processedData) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.id) === crmScreenPop.CONT_6) {
                    window.open('https://nicecx.pegatsdemo.com/prweb/app/CSCore_/ShJhCXIheklWdcf_5HHsuw*/!PS1__TABTHREAD1?pyActivity=@baseclass.doUIAction&action=createNewWork&className=PegaCA-Work-Interaction-Research-Contact&flowName=CPMInteraction&CPMDataSource=contact&Parameter1=CONT-6&flowParamNames=CPMDataSource&Parameter1&dynamicContainerID=c66230a4-dae4-4346-afb0-c6c544079c8e&contentID=f67dde34-5832-ed46-57bc-df7cc7560e38&tabIndex=4&prevContentID=07b0a226-d908-9864-0a9c-ee9ddebf147f&prevRecordkey=PEGACA-WORK SEARCHTEMP&portalThreadName=OpenPortal_InnerLive&portalName=CPMInteractionPortal&pzHarnessID=HIDF4E398102CA1BA6F3FB44C6919528899', '_blank');
                }
                else if (((_h = (_g = event._processedData) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.id) === crmScreenPop.CONT_15) {
                    window.open('https://nicecx.pegatsdemo.com/prweb/app/CSCore_/ShJhCXIheklWdcf_5HHsuw*/!PS1__TABTHREAD2?pyActivity=@baseclass.doUIAction&action=createNewWork&className=PegaCA-Work-Interaction-Research-Contact&flowName=CPMInteraction&CPMDataSource=contact&Parameter1=CONT-15&flowParamNames=CPMDataSource&Parameter1&dynamicContainerID=c66230a4-dae4-4346-afb0-c6c544079c8e&contentID=4efddc83-f95e-f340-0c0b-a5fcf814b2c1&tabIndex=3&prevContentID=a8b77a45-3468-a8c7-381d-694e62a5115f&prevRecordkey=PEGACA-WORK SEARCHTEMP&portalThreadName=OpenPortal_InnerLive&portalName=CPMInteractionPortal&pzHarnessID=HIDF4E398102CA1BA6F3FB44C6919528899', '_blank');
                }
                else {
                    window.open('https://nicecx.pegatsdemo.com/', crmScreenPop.BLANK);
                }
            }
            else {
                const eventArgs = {};
                eventArgs.detail = { activityRecord: event._processedData.data };
                const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, eventArgs);
                window.dispatchEvent(customEvent);
            }
        }
        else if (event._processedData.intent === 'linkData') {
            const linkData = [];
            linkData.push(event._processedData.data);
            updateLinkedData(linkData, event._processedData.isLinked === 'true');
            // Method to store linked data in localstorage
            saveLinkedRecords(event._processedData.data, event._processedData.isLinked === 'true');
        }
        else if (event._processedData.intent === 'toggleVisibility') {
            expandRecords(event._processedData.data);
        }
        else if (event._processedData.intent === 'relatesTo') {
            dispatch(CcfCustomerCardRelatesTo.controller.thunks.onClickOfRelatesToButton({
                isRelatesToEnabled: event._processedData.isRelatesToEnabled,
                pinnedRecordEntityId: event._processedData.id,
                pinnedRecordEntityType: event._processedData.type,
                crm: event._processedData.crm,
                configurationId: event._processedData.configurationId,
                workflowId: event._processedData.workflowId,
            }));
        }
    };
    /**
     * Used to update LocalStorage with linked Record IDs
     * @param ID - number , id of the entity of CRM record.
     * @param isLinked - boolean , flag to maintian linked or not linked
     * @example - saveLinkedRecords(1, false)
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
     * @param ID - number , index for stored of object
     * @example - expandRecords(index)
     */
    const expandRecords = (index) => {
        var _a, _b;
        const extensibleActivityData = JSON.parse(JSON.stringify(selectedActivityData));
        (_b = (_a = extensibleActivityData === null || extensibleActivityData === void 0 ? void 0 : extensibleActivityData.result[0]) === null || _a === void 0 ? void 0 : _a.records) === null || _b === void 0 ? void 0 : _b.map((_data, recordIndex) => {
            if (recordIndex === index) {
                _data['expanded'] = _data['expanded'] === 'true' ? 'false' : 'true';
            }
        });
        dispatch(CcfCustomerCardActions.setActivityInformation(extensibleActivityData));
    };
    /**
     * Used to update the activity json with linked data
     * @param ID - array of number or string , id of the entities of CRM record.
     * @param isLinked - boolean , flag to maintian linked or not linked
     * @example - updateLinkedData([1,2,3], true)
     */
    const updateLinkedData = (id, isLinked) => {
        var _a, _b;
        const extensibleActivityData = JSON.parse(JSON.stringify(selectedActivityData));
        // eslint-disable-next-line array-callback-return
        (_b = (_a = extensibleActivityData === null || extensibleActivityData === void 0 ? void 0 : extensibleActivityData.result[0]) === null || _a === void 0 ? void 0 : _a.pinRecords) === null || _b === void 0 ? void 0 : _b.map(
        // eslint-disable-next-line array-callback-return
        (records) => {
            var _a;
            const recordId = id === null || id === void 0 ? void 0 : id.find((element) => element === (records === null || records === void 0 ? void 0 : records.id));
            if (recordId) {
                records['linked'] = (!isLinked).toString();
            }
            // eslint-disable-next-line array-callback-return
            (_a = records === null || records === void 0 ? void 0 : records.related) === null || _a === void 0 ? void 0 : _a.map((related) => {
                const relatedId = id === null || id === void 0 ? void 0 : id.find((element) => element === (related === null || related === void 0 ? void 0 : related.id));
                if (relatedId) {
                    related['linked'] = (!isLinked).toString();
                }
            });
        });
        dispatch(CcfCustomerCardActions.setActivityInformation(extensibleActivityData));
    };
    useEffect(() => {
        dispatch(CcfCustomerCardRelatesTo.controller.thunks.initializeRelatesTo({
            searches: selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result,
            translate,
        }));
        if (referenceForContainer === null || referenceForContainer === void 0 ? void 0 : referenceForContainer.current) {
            const element = referenceForContainer.current;
            dispatch(CcfCustomerCardRelatesTo.controller.slice.actions.setPopoverContainerElement({
                element,
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedActivityData, agentWorkflowConfigReceived]);
    useEffect(() => {
        const isDataNotAvailable = (!selectedActivityData && !selectedActivityConfig) ||
            (selectedActivityData && !selectedActivityData.result) ||
            (selectedActivityData && selectedActivityData.result && !selectedActivityData.result[0]);
        setIsCurrentInteractionDisabled && setIsCurrentInteractionDisabled(!!isDataNotAvailable);
    }, [selectedActivityData, selectedActivityConfig]);
    return (_jsxs(CcfBox, Object.assign({ ref: referenceForContainer, sx: styles.customerCardPinInteractionContainer }, { children: [!selectedActivityData || (selectedActivityData && selectedActivityData.result === undefined) ? (_jsx(CcfBox, Object.assign({ sx: styles.noInformation }, { children: translate('noInformationAvailable') }))) : (activityCard && (_jsxs(CcfBox, { children: [_jsx("style", { children: activityCardStyles }), _jsx(AdaptiveCard, { payload: activityCard, hostConfig: hostConfig, onExecuteAction: (event) => {
                            onExecuteAction(event);
                        }, onActionSubmit: (event) => logger.debug('onActionSubmit', `event: ${JSON.stringify(event)}`), onError: (event) => logger.debug('onError', `event: ${JSON.stringify(event)}`) })] }))), (crm.toLowerCase() === Crm.SALESFORCE || crm.toLowerCase() === Crm.SERVICENOW || crm.toLowerCase() === Crm.MSD) && (_jsx(CcfBox, Object.assign({ id: "relates-to_container" }, { children: _jsx(CcfCustomerCardRelatesToPopover, { iconString: selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.iconBase64string, crm: crm, contactId: selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.contactId }) })))] })));
}
export default React.memo(CcfCustomerCardPinRecords);
//# sourceMappingURL=ccf-customer-card-pinrecords.js.map