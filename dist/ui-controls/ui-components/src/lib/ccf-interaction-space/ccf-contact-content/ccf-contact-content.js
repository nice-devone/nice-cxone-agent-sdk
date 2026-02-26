import { __awaiter, __rest } from "tslib";
import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { CcfAssignmentAction, getCxoneDigitalContactUserSavedProperties, getDigitalContactDetailsByCaseId, getDigitalContactMessageDraftsByCaseId, getNonIncomingActiveContactInSelectedInteraction, getParsedContactMessagesByCaseId, getTranslatedMessagesByCaseId, getTranslationSettingsByCaseId, selectInboxCollapsedState } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfContactContentBody from '../../ccf-digital/ccf-contact-content-body/ccf-contact-content-body';
import CcfContactContentHeader from '../ccf-contact-content-header/ccf-contact-content-header';
import { DigitalContactStatus, DigitalChannelType, CXoneDigitaltranslationApiResponseSchema, DigitalMessageContentTypes } from '@nice-devone/common-sdk';
import { useEffect, memo, useState } from 'react';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import ReactSplit, { SplitDirection } from '@devbookhq/splitter';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { setLocalStorageKey } from '../../ccf-app-space/ccf-app-space.slice';
import CcfContactContentStyles from './ccf-contact-content.styles';
import { useCheckTouchDevice } from '../../../hooks/useCheckTouchDevice';
import { getAllFailedMessageFromIndexDb } from '../../ccf-editor/ccf-editor-utils';
import WrapperComponent from '../../ccf-navigation/ccf-wrapper-component';
import { getIsAgentReplyReadyToSent } from '../../ccf-editor/ccf-contact-editor.slice';
import { saveContactUserSavedPropertiesFromLS } from '../../ccf-assignment-panel/ccf-assignment-utils';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { isFeatureEnabled } from '../../../util/featureToggleUtils';
import CcfDigitalEmailContactHeader from '../ccf-digital-email-v2/ccf-digital-email-contact-header/ccf-digital-email-contact-header';
import CcfDigitalEmailV2 from '../ccf-digital-email-v2/ccf-digital-email-v2';
/**
 * Component to displays Interaction space contact content
 * @returns
 * @example
 * ```
 * <CcfContactContent />
 * ```
 */
export function CcfContactContent(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
    const { caseId, interactionId } = props;
    const isTouch = useCheckTouchDevice();
    const dispatch = useDispatch();
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const isRevampEmailToggleEnabled = isFeatureEnabled("release-cx-agent-Revamped_New_Digital_Email_CMA-AW-28772" /* FeatureToggles.NEW_EMAIL_REVAMP_FEATURE_TOGGLE */);
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(caseId, interactionId));
    const getDigitalContactMessages = useSelector(getParsedContactMessagesByCaseId(caseId, interactionId));
    const translatedContactMessages = useSelector(getTranslatedMessagesByCaseId(caseId, interactionId));
    // This selector is to get all the messageDrafts from the assignment slice
    const getDigitalContactMessageDrafts = useSelector(getDigitalContactMessageDraftsByCaseId(caseId, interactionId));
    const theme = useTheme();
    const contactContentStyles = CcfContactContentStyles();
    const isBelowXL = useMediaQuery(theme.breakpoints.down('xl'));
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const [sizes, setSizes] = useState([50, 50]);
    const [minHeights, setMinHeights] = useState([]);
    const isAgentReplyReadyToSent = useSelector(getIsAgentReplyReadyToSent(caseId));
    const translationSettings = useSelector(getTranslationSettingsByCaseId(caseId, interactionId));
    const [ccfDigitalContactSLATimer, setCcfDigitalContactSLATimer] = useState(null);
    useEffect(() => {
        if (!isBelowXL) { //when the width of the screen is less than 1536px
            isInboxCollapsed ? setSizes([33, 67]) : setSizes([28, 72]); // setting the size of content body to 33% and response region to 67%
            isInboxCollapsed ? setMinHeights([64, 317]) : setMinHeights([51, 320]); // setting the minimum height of content to 60px and for response region to 320px
        }
        else { // when the width of the screen is greater than or equal to 1536px
            setSizes([18, 82]); // setting the size of content body to 18% and response region to 82%
            setMinHeights([30, 317]); // setting the minimum height of content to 30px and for response region to 317px
        }
    }, [isBelowXL, isInboxCollapsed]);
    const digitalContactUserSavedProperties = useSelector(getCxoneDigitalContactUserSavedProperties);
    const isOutbound = ((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.realExternalPlatformId) === 'email' &&
        (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound) &&
        ((_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _b === void 0 ? void 0 : _b.status) === DigitalContactStatus.DRAFT;
    const isDraftOBDigitalContact = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound) &&
        ((_c = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _c === void 0 ? void 0 : _c.status) === DigitalContactStatus.DRAFT;
    // this will be by default true, For a new Whatsapp OB contact, if there's no message from customer, all features like Editor, emoji, attatchment need to be hidden
    const [showEditor, setShowEditor] = useState(true);
    const messageRichContentTypes = [DigitalMessageContentTypes.RICH_LINK, DigitalMessageContentTypes.QUICK_REPLIES, DigitalMessageContentTypes.LIST_PICKER];
    useEffect(() => {
        var _a;
        // get all failed to send messags on page refresh/login from index db.
        getAllFailedMessageFromIndexDb().then((failedMessages) => { var _a; return dispatch(CcfAssignmentAction.copyFailedMessagesFromIndexedDB((_a = failedMessages) !== null && _a !== void 0 ? _a : {})); });
        saveContactUserSavedPropertiesFromLS(digitalContactUserSavedProperties, dispatch);
        const verticalSplitterSizes = LocalStorageHelper.getItem(StorageKeys.INTERACTION_SPACE_VERTICAL_RATIO, true);
        const lastLoggedInUserId = LocalStorageHelper.getItem(StorageKeys.LAST_LOGGED_IN_AGENT_ID);
        const currentUser = (_a = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)) !== null && _a !== void 0 ? _a : {};
        if ((verticalSplitterSizes === null || verticalSplitterSizes === void 0 ? void 0 : verticalSplitterSizes.length) && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.icAgentId) === lastLoggedInUserId)
            setSizes(verticalSplitterSizes); // If vertical splitter sizes ares present in local storage then on reload will apply that same size, we align this with horizontal splitter implementation
    }, []);
    useEffect(() => {
        // For a new Whatsapp OB contact, if there's no message from customer, all features like Editor need to be hidden
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === DigitalChannelType.WHATSAPP &&
            !(getDigitalContactMessages === null || getDigitalContactMessages === void 0 ? void 0 : getDigitalContactMessages.some(({ direction }) => direction === 'inbound'))) {
            setShowEditor(false);
        }
        else if (!showEditor) {
            setShowEditor(true);
        }
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName, getDigitalContactMessages]);
    // @TODO: will ask sandy tema to refactor below useEffect and move the api calls into the slice file
    useEffect(() => {
        if (caseId && interactionId && (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.agentLanguage) && (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage)) {
            const newMessages = getDigitalContactMessages === null || getDigitalContactMessages === void 0 ? void 0 : getDigitalContactMessages.filter(message => {
                var _a;
                const isRichText = messageRichContentTypes.includes((_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.type);
                const index = translatedContactMessages === null || translatedContactMessages === void 0 ? void 0 : translatedContactMessages.findIndex(translatedMessage => translatedMessage.id === message.id);
                if (isRichText)
                    return false;
                if (index < 0)
                    return true;
                let fromLanguage;
                let toLanguage;
                if (message.direction === 'inbound') {
                    fromLanguage = translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage;
                    toLanguage = translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.agentLanguage;
                }
                else if (message.direction === 'outbound') {
                    fromLanguage = translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.agentLanguage;
                    toLanguage = translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage;
                }
                return (fromLanguage && translatedContactMessages[index].fromLanguageKey !== Object.keys(fromLanguage)[0])
                    || (toLanguage && translatedContactMessages[index].toLanguageKey !== Object.keys(toLanguage)[0]);
            });
            if (newMessages && newMessages.length > 0) {
                const messagesApiRequest = new Array();
                newMessages.forEach((message) => {
                    var _a;
                    let fromLanguage;
                    let toLanguage;
                    if ((message.direction === 'inbound' && (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateCustomerMessages)) ||
                        (message.direction === 'outbound' && (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateAgentMessages))) {
                        fromLanguage = translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage;
                        toLanguage = translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.agentLanguage;
                    }
                    else {
                        return;
                    }
                    const apiRequest = {
                        text: (_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.text,
                        from: Object.keys(fromLanguage)[0],
                        to: Object.keys(toLanguage)[0],
                        id: message.id,
                    };
                    messagesApiRequest.push(apiRequest);
                });
                messagesApiRequest.forEach((message) => {
                    const messageWithTranslation = {
                        id: message.id,
                        translatedMessage: '',
                        translationError: false,
                        fromLanguageKey: message.from,
                        toLanguageKey: message.to,
                    };
                    dispatch(CcfAssignmentAction.setTranslatedMessages({ caseId: caseId, interactionId: interactionId, translatedMessage: messageWithTranslation }));
                    const { id } = message, restOfMessage = __rest(message, ["id"]);
                    CXoneDigitalClient.instance.digitalService.translateMessages([restOfMessage])
                        .then((messagesApiResponse) => {
                        var _a;
                        CXoneDigitaltranslationApiResponseSchema.validate(messagesApiResponse);
                        const yupMessageApiResponse = CXoneDigitaltranslationApiResponseSchema.cast(messagesApiResponse);
                        if ((yupMessageApiResponse === null || yupMessageApiResponse === void 0 ? void 0 : yupMessageApiResponse.result) && ((_a = yupMessageApiResponse === null || yupMessageApiResponse === void 0 ? void 0 : yupMessageApiResponse.result) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                            const translatedtext = (yupMessageApiResponse === null || yupMessageApiResponse === void 0 ? void 0 : yupMessageApiResponse.result[0].text) || '';
                            const contactMessageWithTranslation = {
                                id: message.id,
                                translatedMessage: translatedtext,
                                translationError: translatedtext === '',
                                fromLanguageKey: message.from,
                                toLanguageKey: message.to,
                            };
                            dispatch(CcfAssignmentAction.setTranslatedMessages({ caseId: caseId, interactionId: interactionId, translatedMessage: contactMessageWithTranslation }));
                        }
                    })
                        .catch(() => {
                        const messageWithTranslation = {
                            id: message.id,
                            translatedMessage: '',
                            translationError: true,
                            fromLanguageKey: message.from,
                            toLanguageKey: message.to,
                        };
                        dispatch(CcfAssignmentAction.setTranslatedMessages({ caseId: caseId, interactionId: interactionId, translatedMessage: messageWithTranslation }));
                    });
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        caseId,
        interactionId,
        dispatch,
        getDigitalContactMessages,
        translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.agentLanguage,
        translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage,
        translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateAgentMessages,
        translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateCustomerMessages
    ]);
    useEffect(() => {
        if (isTouch) {
            renderCcfDigitalContactSLATimer();
        }
    }, [isTouch]);
    /**
     * function that is called to render the SLA timer
     * @example renderCcfDigitalContactSLATimer()
     */
    const renderCcfDigitalContactSLATimer = () => __awaiter(this, void 0, void 0, function* () {
        setCcfDigitalContactSLATimer(null);
        const digitalContactSLATimer = yield import('../../ccf-digital-contact-sla-timer/ccf-digital-contact-sla-timer');
        const DigitalContactSLATimer = digitalContactSLATimer.CcfDigitalContactSLATimer;
        setCcfDigitalContactSLATimer(_jsx(DigitalContactSLATimer, {}));
    });
    /**
     * function that is called after resizing the 2 email content
     * @param gutterIdx - gutter Index
     * @param allSizes - array containing new sizes of the resized containers
     * @example handleResizeFinish(gutterIdx, allSizes)
     */
    const handleResizeFinish = (_gutterIdx, allSizes) => {
        // Dev Note: argument gutterIdx is not used inside the function but it's kept as it is instead of using '_'
        const sizeWithFloorValues = allSizes.map(item => Math.floor(item));
        !isBelowXL && setSizes(sizeWithFloorValues);
        dispatch(setLocalStorageKey({ key: StorageKeys.INTERACTION_SPACE_VERTICAL_RATIO, value: JSON.stringify(sizeWithFloorValues) }));
    };
    const customerLanguage = (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage) ? Object.values(translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage)[0] : '';
    const agentLanguage = (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.agentLanguage) ? Object.values(translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.agentLanguage)[0] : '';
    const contentBody = (_jsx(CcfContactContentBody, { caseId: (_d = selectedDigitalContactDetails.case) === null || _d === void 0 ? void 0 : _d.id, interactionId: (_e = selectedDigitalContactDetails.case) === null || _e === void 0 ? void 0 : _e.interactionId, digitalContactDetails: selectedDigitalContactDetails, wysiwygEnabled: !!((_f = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _f === void 0 ? void 0 : _f.wysiwygEnabled), hasVisibleTitle: !!((_g = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _g === void 0 ? void 0 : _g.hasVisibleTitle), hasVisibleRecipients: !!((_h = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _h === void 0 ? void 0 : _h.hasVisibleRecipients), messages: getDigitalContactMessages, messageDrafts: getDigitalContactMessageDrafts, sender: (_j = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _j === void 0 ? void 0 : _j.idOnExternalPlatform, isEditorVisible: showEditor, isPrivateChannel: (_k = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _k === void 0 ? void 0 : _k.isPrivate, hasTreeStructure: (_l = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _l === void 0 ? void 0 : _l.hasTreeStructure, channelDisplayName: (_m = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _m === void 0 ? void 0 : _m.name, channelType: (_o = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _o === void 0 ? void 0 : _o.realExternalPlatformId, channelId: (_p = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _p === void 0 ? void 0 : _p.id, messagesWithTranslation: translatedContactMessages, isTranslateAgentMessages: translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateAgentMessages, isTranslateCustomerMessages: translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateCustomerMessages, agentLanguage: agentLanguage, customerLanguage: customerLanguage }));
    return isOutbound && digitalContactUserSavedProperties[(_q = selectedDigitalContactDetails.case) === null || _q === void 0 ? void 0 : _q.id]
        ? _createElement(WrapperComponent, Object.assign({}, props, { closeTab: props.closeTab, component: 'ccfEditorComponent', key: caseId }))
        : _jsxs(_Fragment, { children: [caseId && interactionId && (isRevampEmailToggleEnabled && ((_r = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _r === void 0 ? void 0 : _r.wysiwygEnabled) ?
                    _jsx(CcfDigitalEmailContactHeader, { contactDetail: selectedDigitalContactDetails, activeContact: {
                            caseId: caseId,
                            interactionId: interactionId,
                            expandedViewDetails: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.expandedViewDetails,
                        }, isDraftOBDigitalContact: !!isDraftOBDigitalContact }) : _jsx(CcfContactContentHeader, { contactDetail: selectedDigitalContactDetails, activeContact: {
                        caseId: caseId,
                        interactionId: interactionId,
                        expandedViewDetails: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.expandedViewDetails,
                    }, isDraftOBDigitalContact: !!isDraftOBDigitalContact })), isTouch && ccfDigitalContactSLATimer, ((_s = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _s === void 0 ? void 0 : _s.wysiwygEnabled)
                    ? _jsxs(ReactSplit, Object.assign({ direction: SplitDirection.Vertical, initialSizes: !isAgentReplyReadyToSent && digitalContactUserSavedProperties[(_t = selectedDigitalContactDetails.case) === null || _t === void 0 ? void 0 : _t.id] ? sizes : [100, 0], minHeights: minHeights, onResizeFinished: handleResizeFinish, gutterClassName: 'customVerticalSplitter', draggerClassName: 'customDraggerSplitter' }, { children: [isRevampEmailToggleEnabled ?
                                _jsx(Box, Object.assign({ sx: contactContentStyles.containerFullHeight }, { children: _jsx(CcfDigitalEmailV2, { messages: getDigitalContactMessages, digitalContactDetails: selectedDigitalContactDetails, translationSettings: translationSettings, messageDrafts: getDigitalContactMessageDrafts, sender: (_u = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _u === void 0 ? void 0 : _u.idOnExternalPlatform, channelType: (_v = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _v === void 0 ? void 0 : _v.realExternalPlatformId, isPrivateChannel: (_w = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _w === void 0 ? void 0 : _w.isPrivate, wysiwygEnabled: !!((_x = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _x === void 0 ? void 0 : _x.wysiwygEnabled) }) })) : _jsx(Box, Object.assign({ sx: contactContentStyles.containerFullHeight }, { children: contentBody })), digitalContactUserSavedProperties[(_y = selectedDigitalContactDetails.case) === null || _y === void 0 ? void 0 : _y.id] &&
                                _jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, contactContentStyles.containerFullHeight), { overflowY: 'hidden' }) }, { children: _createElement(WrapperComponent, Object.assign({ component: 'ccfEditorComponent' }, props, { closeTab: props.closeTab, key: caseId })) }))] }))
                    : _jsxs(_Fragment, { children: [contentBody, showEditor && (_createElement(WrapperComponent, Object.assign({}, props, { closeTab: props.closeTab, component: 'ccfEditorComponent', key: caseId })))] })] });
}
export default memo(CcfContactContent);
//# sourceMappingURL=ccf-contact-content.js.map