import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { CcfBox, CcfButton, CcfTimer, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import AddIcon from '@mui/icons-material/Add';
import CcfDigitalContactSLATimerStyles from './ccf-digital-contact-sla-timer.style';
import { getContactDetailsById, getDigitalContactMessagesByCaseId, CcfAssignmentAction, getSkillDetailsByCaseId, selectInboxCollapsedState, getDigitalContactDetailsByCaseId, getNonIncomingActiveContactInSelectedInteraction, getSlaIndicator, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { SLAIndicatorType, UIStorageKeys } from '@nice-devone/common-sdk';
import { LocalStorageHelper } from '@nice-devone/core-sdk';
import { TimerTitle, calculateSLATime, getResetCRTFromLocalStorage, getSLADetailsFromLocalStorage } from '../ccf-assignment-panel/ccf-assignment-utils';
import GetDigitalChannelProperties from '../ccf-interaction-space/ccf-digital-channel-properties';
import { useCheckTouchDevice } from '../../hooks/useCheckTouchDevice';
/**
 * Component to display SLA timer for the selected contact
 * ```
 * @example-
 * <CcfDigitalContactSLATimer />
 * ```
 */
export const CcfDigitalContactSLATimer = React.memo(() => {
    var _a, _b;
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfDigitalContactSLATimerStyles(theme);
    const [timerTitle, setTimerTitle] = useState(translate(TimerTitle.AGENT_TIMER).toUpperCase());
    const dispatch = useDispatch();
    const timerRef = useRef(null);
    const time = new Date();
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const caseId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId;
    const interactionId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId;
    const messages = useSelector(getDigitalContactMessagesByCaseId(caseId, interactionId));
    const caseDetails = useSelector(getContactDetailsById(caseId, interactionId));
    const skillDetails = useSelector(getSkillDetailsByCaseId(caseId, interactionId));
    const inboxPanelCollapsed = useSelector(selectInboxCollapsedState);
    const caseAssignedAt = caseDetails === null || caseDetails === void 0 ? void 0 : caseDetails.inboxAssigneeLastAssignedAt;
    const resetCRTValue = getResetCRTFromLocalStorage(caseId);
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(caseId, interactionId));
    const slaIndicator = useSelector(getSlaIndicator((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) || ''));
    const isTouch = useCheckTouchDevice();
    const [restCRT, updateResetCRT] = useState(0);
    useEffect(() => {
        var _a;
        if ((skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.agentResponseEnabled) || (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.customerResponseEnabled)) {
            const timerDetails = calculateSLATime(messages, caseAssignedAt, skillDetails, resetCRTValue);
            if (timerDetails) {
                const { title, messageTime } = timerDetails;
                setTimerTitle(translate(title));
                if ((title === TimerTitle.AGENT_TIMER && (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.agentResponseEnabled)) ||
                    (title === TimerTitle.CUSTOMER_TIMER && (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.customerResponseEnabled)) ||
                    ((skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.agentResponseEnabled) && (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.customerResponseEnabled))) {
                    (_a = timerRef.current) === null || _a === void 0 ? void 0 : _a.restart(new Date(messageTime));
                }
            }
        }
    }, [messages, restCRT]);
    const showTimer = (timerTitle === translate(TimerTitle.AGENT_TIMER) && (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.agentResponseEnabled)) ||
        (timerTitle === translate(TimerTitle.CUSTOMER_TIMER) && (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.customerResponseEnabled)) ||
        ((skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.agentResponseEnabled) && (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.customerResponseEnabled));
    const timerShowHideStyle = {
        display: showTimer ? 'block' : 'none',
        height: showTimer ? 'auto' : 0,
    };
    //When the current remaining time is <= 50% (SLAIndicatorType.WARNING) of the CRT.CIT value, and if timeExtensionEnabled flag true in skills settings then only we enable the CRT time extension button
    const timeExtensionEnabled = (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.timeExtensionEnabled) && timerTitle === translate(TimerTitle.CUSTOMER_TIMER) && slaIndicator && slaIndicator === SLAIndicatorType.WARNING;
    const timerTitleInCollapsedView = timerTitle === translate(TimerTitle.AGENT_TIMER) ? translate(TimerTitle.AGENT) : translate(TimerTitle.CUSTOMER);
    const channelType = (_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.realExternalPlatformId;
    const digitalChannelProperties = channelType ? GetDigitalChannelProperties(channelType) : null;
    const channelTypeTab = (_b = digitalChannelProperties === null || digitalChannelProperties === void 0 ? void 0 : digitalChannelProperties.displayName) !== null && _b !== void 0 ? _b : '';
    let warningStyle = {};
    if (slaIndicator === SLAIndicatorType.WARNING) {
        warningStyle = styles.yellowWarning;
    }
    else if (slaIndicator === SLAIndicatorType.CRITICAL) {
        warningStyle = styles.redWarning;
    }
    /**
   * This method used to reset customer response time
   * ```
   * @example-
   * resetCRT()
   * ```
   */
    const resetCRT = () => {
        const resetCRT = Date.now();
        //Reset the SLA indicator to normal 
        dispatch(CcfAssignmentAction.updateSlaIndicator({ [interactionId]: SLAIndicatorType.NORMAL }));
        updateResetCRT(resetCRT);
        const slaDetailsFromLocalStorage = getSLADetailsFromLocalStorage();
        const updatedSLADetails = {
            slaContactDetails: Object.assign(Object.assign({}, slaDetailsFromLocalStorage.slaContactDetails), { [caseId]: Object.assign(Object.assign({}, slaDetailsFromLocalStorage.slaContactDetails[caseId]), { resetCRT }) }),
        };
        //To persist customer response time on reload storing in local storage
        LocalStorageHelper.setItem(UIStorageKeys.SLA_CONTACT_DETAILS, updatedSLADetails);
    };
    return (_jsxs(CcfBox, { children: [(inboxPanelCollapsed && !isTouch) &&
                _jsxs(CcfTypography, Object.assign({ sx: styles.channelTypeTimer }, { children: [channelTypeTab, " ", translate('timer')] })), _jsxs(CcfBox, Object.assign({ sx: styles.timerBox }, { children: [_jsx(CcfBox, Object.assign({ sx: inboxPanelCollapsed ? styles.collapsedTimerTitle : styles.timerTitle }, { children: _jsxs(CcfTypography, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, styles.timer), timerShowHideStyle), warningStyle) }, { children: [isTouch ? translate('timer').toUpperCase().concat(' - ') : '', " ", inboxPanelCollapsed ? timerTitleInCollapsedView === null || timerTitleInCollapsedView === void 0 ? void 0 : timerTitleInCollapsedView.toUpperCase() : timerTitle === null || timerTitle === void 0 ? void 0 : timerTitle.toUpperCase(), isTouch ? '' : ':', " ", _jsx(CcfTimer, { ref: timerRef, expiryTimestamp: time })] })) })), timeExtensionEnabled &&
                        _jsx(CcfBox, Object.assign({ sx: styles.restTimer }, { children: _jsxs(CcfButton, Object.assign({ size: "small", onClick: () => resetCRT() }, { children: [_jsx(AddIcon, { sx: styles.addIcon }), _jsx(CcfTypography, Object.assign({ variant: "inherit", sx: styles.timeText }, { children: `${translate('time')}` }))] })) }))] }))] }));
});
//# sourceMappingURL=ccf-digital-contact-sla-timer.js.map