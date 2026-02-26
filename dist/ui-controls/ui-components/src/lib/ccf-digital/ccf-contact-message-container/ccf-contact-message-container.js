import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CcfContactMessage from './ccf-contact-message';
import { DigitalContactStatus, EventKeys } from '@nice-devone/common-sdk';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState, memo } from 'react';
import { userInfoSelector, } from '../../ccf-agent-state/ccf-agent-state.slice';
import { Box, useTheme, Divider } from '@mui/material';
import CcfContactMessageContainerStyles from './ccf-contact-message-container-styles';
import { getNonIncomingActiveContactInSelectedInteraction, getPreviousCaseIdForSelectedCase, loadPreviousCaseConversations, getPreviousConversationMessagesByCaseId, getInteractionFailedMessagesForCase, getDraftMessageNoteForSelectedCase, getTranslationSettingsByCaseId, getInteractionDraftMessagesForCase, getNextCaseIdForSelectedCase, getNextConversationMessagesByCaseId, loadNextCaseConversations, getContactDetailsForSelectedContact } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfBanner } from '../../ccf-banner/ccf-banner';
import { CcfAppToastMessage, useTranslator, CcfTypography, CcfScrollToBottomIcon, CcfBox, CcfTooltip, CcfSingleArrowIcon } from '@nice-devone/ui-controls';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { CcfContactMessageNote } from '../../ccf-interaction-space/ccf-contact-message-note/ccf-contact-message-note';
import { toast } from 'react-toastify';
import { CcfFailedMessageDeliveryBanner } from '../../ccf-failed-message-delivery-banner/ccf-failed-message-delivery-banner';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import { ccfDigitalSearchActions, getSelectedMessage, getAllChannelList, getAllChannelsData } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { LoadMessagesType } from '../../../enums/load-message-type';
/**
 * renders the message container
 * @param props - CcfContactMessageContainerProps
 * @example <CcfContactMessageContainer />
 * @returns
 */
const CcfContactMessageContainer = (props) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const { messages, contactDetails, messageDrafts, channelType, previewOnlyChannels, isEditorVisible, channelName, lastInboundMessage, channelId } = props;
    const userInfo = useSelector(userInfoSelector);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const conversationNote = useSelector(getDraftMessageNoteForSelectedCase(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId, contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.interactionId));
    const hasErrorInMessageNote = conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.hasError;
    const theme = useTheme();
    const styles = CcfContactMessageContainerStyles(theme);
    const dummyBottomDivScroll = useRef(null);
    const scrollableMessageContentRef = useRef(null);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isLoadPreviousMessagesClickable, setIsLoadPreviousMessagesClickable] = useState(true);
    const [isLoadNextMessagesClickable, setIsLoadNextMessagesClickable] = useState(true);
    const [showViewRecentMessages, setShowViewRecentMessages] = useState(false);
    const translationSettings = useSelector(getTranslationSettingsByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const customerLanguage = (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage) ? Object.values(translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage)[0] : '';
    const selectedMessageId = useSelector(getSelectedMessage);
    const scrollMessageRef = useRef(null);
    const allChannelList = useSelector(getAllChannelsData);
    const draftInteractionMessages = useSelector(getInteractionDraftMessagesForCase(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
    const isTrackingMessageDeliveryStatus = (_a = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _a === void 0 ? void 0 : _a.isTrackingMessageDeliveryStatus;
    const nextCaseRef = useRef(null);
    /**
     * function to return the value for condition of scroll height
     * @example - shouldScrollToBottom()
    */
    const shouldScrollToBottom = () => {
        var _a, _b, _c;
        const isScrolledToBottom = (scrollableMessageContentRef === null || scrollableMessageContentRef === void 0 ? void 0 : scrollableMessageContentRef.current) && Math.abs(((_a = scrollableMessageContentRef === null || scrollableMessageContentRef === void 0 ? void 0 : scrollableMessageContentRef.current) === null || _a === void 0 ? void 0 : _a.scrollTop) +
            ((_b = scrollableMessageContentRef === null || scrollableMessageContentRef === void 0 ? void 0 : scrollableMessageContentRef.current) === null || _b === void 0 ? void 0 : _b.clientHeight) - ((_c = scrollableMessageContentRef === null || scrollableMessageContentRef === void 0 ? void 0 : scrollableMessageContentRef.current) === null || _c === void 0 ? void 0 : _c.scrollHeight)) <= 6;
        return isScrolledToBottom;
    };
    const isScrolledToBottom = shouldScrollToBottom();
    const previousCaseId = useSelector(getPreviousCaseIdForSelectedCase(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const nextCaseId = useSelector(getNextCaseIdForSelectedCase(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const previousConversationMessages = useSelector(getPreviousConversationMessagesByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const nextConversationMessages = useSelector(getNextConversationMessagesByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    // this will return if any failed to send message for specific case.
    const failedInteractionMessages = useSelector(getInteractionFailedMessagesForCase(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const messageCountRef = useRef(0);
    const draftMessageCountRef = useRef(0);
    const deliveredMessage = messages && (messages === null || messages === void 0 ? void 0 : messages.length) > 0 && ((_b = messages[0]) === null || _b === void 0 ? void 0 : _b.delivered) && ((_c = messages[0]) === null || _c === void 0 ? void 0 : _c.delivered[0]);
    const nextMessages = nextConversationMessages && (nextConversationMessages === null || nextConversationMessages === void 0 ? void 0 : nextConversationMessages.length) > 0;
    const hasNextCaseId = Boolean(nextCaseId);
    /**
     * Function to call on click of Preview button
     * @param contactId - contact ID to preview
     * @example -
     * ```
     * handlePreviewClick('21358990')
     * ```
     */
    const handlePreviewClick = (contactId) => {
        dispatch(getContactDetailsForSelectedContact({ contactId: contactId, isAssignedToAgentInbox: false }));
    };
    /**
     * Function to get the status color based on the contact status
     * @param status - string representing the contact status
     * @returns - color code for the status
     * @example -
     * ```
     * getStatusColor('CLOSED')
     * ```
     */
    const getStatusColor = (status) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        switch (status) {
            case DigitalContactStatus.CLOSED:
                return (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.red;
            case DigitalContactStatus.ESCALATED:
                return (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.digitalStatus) === null || _d === void 0 ? void 0 : _d.escalatedDark;
            case DigitalContactStatus.NEW:
                return (_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.digitalStatus) === null || _f === void 0 ? void 0 : _f.newDark;
            case DigitalContactStatus.RESOLVED:
                return (_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.digitalStatus) === null || _h === void 0 ? void 0 : _h.resolvedDark;
            case DigitalContactStatus.OPEN:
                return (_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.digitalStatus) === null || _k === void 0 ? void 0 : _k.openDark;
            case DigitalContactStatus.PENDING:
                return (_m = (_l = theme.palette) === null || _l === void 0 ? void 0 : _l.digitalStatus) === null || _m === void 0 ? void 0 : _m.pendingDark;
            default:
                return '';
        }
    };
    useEffect(() => {
        /**
       * Function that scrolls to bottom of the message content when case switches
       * @example -  scrollToBottom()
       */
        const scrollToBottom = () => {
            if (scrollableMessageContentRef === null || scrollableMessageContentRef === void 0 ? void 0 : scrollableMessageContentRef.current) {
                // DEV NOTE - scroll to the bottom when switching to a new case
                scrollableMessageContentRef.current.scrollTop = scrollableMessageContentRef.current.scrollHeight;
            }
        };
        const timeout = setTimeout(() => {
            scrollToBottom();
        }, 100); // kept a timeout of 100ms so that it will scroll to bottom after the messages are loaded on case switch
        return () => {
            clearTimeout(timeout);
        };
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId]);
    useEffect(() => {
        var _a, _b;
        //Dev Note: - messageCountRef and draftMessageCountRef are used to check if new messages are added to the message array or draft array then only we are moving the scroll to bottom.
        if (messages && ((messages === null || messages === void 0 ? void 0 : messages.length) > messageCountRef.current)) {
            (_a = dummyBottomDivScroll === null || dummyBottomDivScroll === void 0 ? void 0 : dummyBottomDivScroll.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView(false);
            messageCountRef.current = messages === null || messages === void 0 ? void 0 : messages.length;
        }
        else if (draftInteractionMessages && ((draftInteractionMessages === null || draftInteractionMessages === void 0 ? void 0 : draftInteractionMessages.length) > draftMessageCountRef.current)) {
            (_b = dummyBottomDivScroll === null || dummyBottomDivScroll === void 0 ? void 0 : dummyBottomDivScroll.current) === null || _b === void 0 ? void 0 : _b.scrollIntoView(false);
            draftMessageCountRef.current = draftInteractionMessages === null || draftInteractionMessages === void 0 ? void 0 : draftInteractionMessages.length;
        }
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, messages, draftInteractionMessages]);
    useEffect(() => {
        if (hasErrorInMessageNote) {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: 'genericError' }), {
                autoClose: false,
                containerId: 'ComponentToastContainer',
            });
        }
    }, [hasErrorInMessageNote]);
    useEffect(() => {
        const isScrolledToBottom = shouldScrollToBottom();
        if (((previousConversationMessages && (previousConversationMessages === null || previousConversationMessages === void 0 ? void 0 : previousConversationMessages.length) > 0) || (nextConversationMessages && (nextConversationMessages === null || nextConversationMessages === void 0 ? void 0 : nextConversationMessages.length) > 0)) && !isFirstRender && !isScrolledToBottom) {
            setShowViewRecentMessages(true);
        }
        else {
            setShowViewRecentMessages(false);
        }
        setIsFirstRender(false);
    }, [previousConversationMessages, nextConversationMessages]);
    useEffect(() => {
        if (previousCaseId && !isLoadPreviousMessagesClickable) {
            setIsLoadPreviousMessagesClickable(true);
        }
    }, [previousCaseId]);
    useEffect(() => {
        if (nextCaseId && !isLoadNextMessagesClickable) {
            setIsLoadNextMessagesClickable(true);
        }
    }, [nextCaseId]);
    useEffect(() => {
        if ((allChannelList === null || allChannelList === void 0 ? void 0 : allChannelList.length) === 0)
            dispatch(getAllChannelList());
    }, []);
    useEffect(() => {
        if (nextMessages && nextCaseRef.current) {
            nextCaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [nextConversationMessages === null || nextConversationMessages === void 0 ? void 0 : nextConversationMessages.length]);
    /**
     * Function that loads previous case /recent messages
     * @param  text - determines the type of messages to be loaded
     * @example -  loadMessages('previous' || 'next')
     */
    const loadMessages = (text) => {
        var _a;
        if (text === LoadMessagesType.PREVIOUS && isLoadPreviousMessagesClickable) {
            //need to make load previous message button not clickable else on double clicking the button same case details(previous) wll be loaded twice
            setIsLoadPreviousMessagesClickable(false);
            dispatch(loadPreviousCaseConversations({
                contactId: previousCaseId,
                interactionId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId,
                selectedCaseId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
            }));
        }
        else if (text === LoadMessagesType.NEXT && isLoadNextMessagesClickable) {
            setIsLoadNextMessagesClickable(false);
            dispatch(loadNextCaseConversations({
                contactId: nextCaseId,
                interactionId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId,
                selectedCaseId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
            }));
        }
        else if (text === LoadMessagesType.RECENT) {
            (_a = dummyBottomDivScroll === null || dummyBottomDivScroll === void 0 ? void 0 : dummyBottomDivScroll.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView(false);
        }
    };
    /**
     * Function that returns component to display button for load previous and recent messages
     * @param text - string to determine the text of button
     * @example loadMessagesContainer('previous' || 'next')
     */
    const loadMessagesContainer = (text) => {
        let buttonText = '';
        if (text === LoadMessagesType.PREVIOUS) {
            buttonText = translate('loadPreviousMessages');
        }
        else if (text === LoadMessagesType.NEXT) {
            buttonText = translate('nextContact');
        }
        return _jsxs(Box, Object.assign({ tabIndex: 0, sx: text === LoadMessagesType.RECENT ? Object.assign(Object.assign({}, styles.loadMessagesContainerForViewRecent), { marginLeft: hasNextCaseId ? '3.75rem' : '0.125rem' }) : Object.assign({}, styles.loadMessagesContainer), onClick: () => loadMessages(text), "aria-label": `Load ${text} messages`, onKeyDown: (event) => {
                if (event.key === EventKeys.ENTER || event.key === EventKeys.SPACE) {
                    event.preventDefault();
                    loadMessages(text);
                }
            } }, { children: [text !== LoadMessagesType.RECENT && _jsx(CcfSingleArrowIcon, { sx: Object.assign(Object.assign({}, styles.doubleArrowIcon), { transform: text === LoadMessagesType.PREVIOUS ? 'rotate(180deg)' : '' }) }), _jsx(CcfTypography, Object.assign({ variant: "button", sx: styles.loadMessagesButton }, { children: text === LoadMessagesType.RECENT ? _jsx(CcfTooltip, Object.assign({ title: translate('viewRecentMessages') }, { children: _jsx(CcfBox, Object.assign({ sx: styles.scrollToBottomStyles }, { children: _jsx(CcfScrollToBottomIcon, { sx: styles.scrollToBottomIcon }) })) })) : buttonText }))] }));
    };
    let scrollTimeout;
    /**
     * Function that is called on scrolling the content body
     * @param event - React.UIEvent<HTMLElement>
     * @example -
     * ```
     * handleScroll(event)
     * ```
     */
    const handleScroll = () => {
        const isScrolledToBottom = shouldScrollToBottom();
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            setShowViewRecentMessages(!isScrolledToBottom);
        }, 100);
        //kept a timeout of 100ms so that dispatch is not called a number of times on scrolling.Now dispatch is only after 100ms user stops scrolling
    };
    // Scroll upto the selected message
    useEffect(() => {
        if (selectedMessageId && messages) {
            // Find the message object from the messages array using the message ID
            const message = messages.find(message => message.id === selectedMessageId);
            if (message && scrollMessageRef.current) {
                // If the message is found and the scroll reference is available, scroll to the message
                scrollMessageRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            dispatch(ccfDigitalSearchActions.updateSelectedMessageId(''));
        }
    }, [selectedMessageId, scrollMessageRef.current]);
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: styles.messageContentWrapper, ref: scrollableMessageContentRef, onScroll: handleScroll, "aria-live": "polite" }, { children: [!isEditorVisible &&
                        (deliveredMessage && !deliveredMessage.isSuccess ? (_jsx(CcfBanner, { undeliveredErrorMessage: translate('whatsAppMessageUndelivered'), bannerMessage: translate('whatsAppMessageDeliveryFailedBanner'), bannerIcon: _jsx(WarningAmberRoundedIcon, { sx: { color: (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.red } }) })) : (_jsx(CcfBanner, { bannerMessage: translate('whatsAppOutboundAgentNotification'), bannerIcon: _jsx(WarningAmberRoundedIcon, { sx: { color: (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.warning) === null || _g === void 0 ? void 0 : _g.dark } }) }))), isEditorVisible && previousCaseId && loadMessagesContainer(LoadMessagesType.PREVIOUS), previousConversationMessages && (previousConversationMessages === null || previousConversationMessages === void 0 ? void 0 : previousConversationMessages.length) > 0 && (_jsxs(_Fragment, { children: [previousConversationMessages.map((conversation) => {
                                var _a, _b;
                                return (_jsxs(Box, Object.assign({ sx: styles.previousMessagesContainer }, { children: [_jsx(Divider, Object.assign({ sx: styles.previousCaseStatusDivider }, { children: _jsxs(CcfTypography, Object.assign({ sx: styles.caseStatus }, { children: [`#${conversation.case.id} ${conversation.case.status.toUpperCase()}`, " ", _jsx(Box, Object.assign({ sx: styles.previewStyles, component: 'span', onClick: () => { var _a; return handlePreviewClick((_a = conversation === null || conversation === void 0 ? void 0 : conversation.case) === null || _a === void 0 ? void 0 : _a.id); }, onKeyDown: (e) => { var _a; return e.key === EventKeys.ENTER && handlePreviewClick((_a = conversation === null || conversation === void 0 ? void 0 : conversation.case) === null || _a === void 0 ? void 0 : _a.id); }, "aria-label": translate('preview'), tabIndex: 0 }, { children: translate('preview') }))] })) })), (_a = conversation.messages) === null || _a === void 0 ? void 0 : _a.map((message) => {
                                            var _a, _b, _c;
                                            return (_jsx(CcfContactMessage, { message: message, channelType: channelType, direction: message.direction, fullName: ((_a = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.fullName) || '', firstName: ((_b = message === null || message === void 0 ? void 0 : message.authorUser) === null || _b === void 0 ? void 0 : _b.firstName) || '', surName: ((_c = message === null || message === void 0 ? void 0 : message.authorUser) === null || _c === void 0 ? void 0 : _c.surname) || '', attachments: message.attachments, isMessageDraft: false, previewOnlyChannels: previewOnlyChannels, channelName: channelName, isPreviousCaseMessage: true, isTranslateAgentMessages: translationSettings.isTranslateAgentMessages, isTranslateCustomerMessages: translationSettings.isTranslateCustomerMessages, channelId: channelId, isAuthorNameRemoved: (message === null || message === void 0 ? void 0 : message.authorNameRemoved) !== null, isContentRemoved: (message === null || message === void 0 ? void 0 : message.contentRemoved) !== null, isTrackingMessageDeliveryStatus: isTrackingMessageDeliveryStatus || false }, message.id));
                                        }), (_b = conversation === null || conversation === void 0 ? void 0 : conversation.messageNotes) === null || _b === void 0 ? void 0 : _b.map((message) => {
                                            return (_jsx(CcfContactMessageNote, { messageId: message === null || message === void 0 ? void 0 : message.id, userDetails: message === null || message === void 0 ? void 0 : message.user, isReadOnly: false, noteContent: message.content || '', updatedAt: message.updatedAt, isPreviousConversationNote: true }, message === null || message === void 0 ? void 0 : message.id));
                                        })] }), conversation.case.id));
                            }), _jsx(Box, Object.assign({ sx: styles.currentCaseStatusDivider }, { children: _jsx(Divider, Object.assign({ sx: styles.previousCaseStatusDivider }, { children: _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.caseStatus), { color: getStatusColor(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) }) }, { children: `#${nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId} ${nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus.toUpperCase()}` })) })) }))] })), messages === null || messages === void 0 ? void 0 : messages.map((message) => {
                        var _a, _b, _c;
                        return (_jsx(Box, Object.assign({ ref: selectedMessageId === message.id ? scrollMessageRef : null }, { children: _jsx(CcfContactMessage, { message: message, channelType: channelType, direction: message.direction, fullName: ((_a = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.fullName) || '', firstName: ((_b = message === null || message === void 0 ? void 0 : message.authorUser) === null || _b === void 0 ? void 0 : _b.firstName) || '', surName: ((_c = message === null || message === void 0 ? void 0 : message.authorUser) === null || _c === void 0 ? void 0 : _c.surname) || '', attachments: message.attachments, isMessageDraft: false, previewOnlyChannels: previewOnlyChannels, channelName: channelName, isTranslateAgentMessages: translationSettings.isTranslateAgentMessages, isTranslateCustomerMessages: translationSettings.isTranslateCustomerMessages, customerLanguage: customerLanguage, channelId: channelId, isAuthorNameRemoved: (message === null || message === void 0 ? void 0 : message.authorNameRemoved) !== null, isContentRemoved: (message === null || message === void 0 ? void 0 : message.contentRemoved) !== null, isTrackingMessageDeliveryStatus: isTrackingMessageDeliveryStatus || false }) }), message.id));
                    }), draftInteractionMessages === null || draftInteractionMessages === void 0 ? void 0 : draftInteractionMessages.map((message) => {
                        var _a, _b, _c;
                        return (_jsx(Box, Object.assign({ ref: selectedMessageId === message.id ? scrollMessageRef : null }, { children: _jsx(CcfContactMessage, { message: message, channelType: channelType, direction: message.direction, fullName: ((_a = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.fullName) || '', firstName: ((_b = message === null || message === void 0 ? void 0 : message.authorUser) === null || _b === void 0 ? void 0 : _b.firstName) || '', surName: ((_c = message === null || message === void 0 ? void 0 : message.authorUser) === null || _c === void 0 ? void 0 : _c.surname) || '', attachments: message.attachments, isMessageDraft: false, previewOnlyChannels: previewOnlyChannels, channelName: channelName, isTranslateAgentMessages: translationSettings.isTranslateAgentMessages, isTranslateCustomerMessages: translationSettings.isTranslateCustomerMessages, customerLanguage: customerLanguage, isTrackingMessageDeliveryStatus: isTrackingMessageDeliveryStatus || false }) }), message.id));
                    }), messageDrafts === null || messageDrafts === void 0 ? void 0 : messageDrafts.map((messageDraft) => {
                        var _a, _b;
                        const isFailedMessage = Array.isArray(failedInteractionMessages) &&
                            (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.find((failedMessageDraft) => failedMessageDraft.xTraceId === messageDraft.id));
                        return isFailedMessage ? null : (_jsx(CcfContactMessage, { message: messageDraft, channelType: channelType, direction: '', fullName: '', firstName: ((_a = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.user) === null || _a === void 0 ? void 0 : _a.firstName) || '', surName: ((_b = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.user) === null || _b === void 0 ? void 0 : _b.surname) || '', isMessageDraft: true, previewOnlyChannels: previewOnlyChannels, channelName: channelName, attachments: messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.attachments, channelId: channelId, isTrackingMessageDeliveryStatus: isTrackingMessageDeliveryStatus || false }));
                    }), conversationNote && conversationNote.status && (conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.noteId) === '' && (_jsx(CcfContactMessageNote, { messageId: lastInboundMessage, userDetails: userInfo, isReadOnly: false, noteContent: conversationNote.content || '' })), failedInteractionMessages &&
                        (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.length) > 0 &&
                        (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.map((message) => {
                            return (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfFailedMessageDeliveryBanner" }, { children: _jsx(CcfFailedMessageDeliveryBanner, { caseId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, failedMessage: message, messageAuthor: message.messageAuthor, wysiwygEnabled: message === null || message === void 0 ? void 0 : message.wysiwygEnabled }) })));
                        })), nextConversationMessages && (nextConversationMessages === null || nextConversationMessages === void 0 ? void 0 : nextConversationMessages.length) > 0 && (_jsx(_Fragment, { children: [...nextConversationMessages].reverse().map((conversation) => {
                            var _a, _b;
                            return (_jsxs(Box, Object.assign({ sx: styles.previousMessagesContainer }, { children: [_jsx(Divider, Object.assign({ sx: styles.previousCaseStatusDivider }, { children: _jsxs(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.caseStatus), { color: getStatusColor(conversation.case.status) }) }, { children: [`#${conversation.case.id} ${conversation.case.status.toUpperCase()}`, " ", _jsx(Box, Object.assign({ sx: styles.previewStyles, component: 'span', onClick: () => { var _a; return handlePreviewClick((_a = conversation === null || conversation === void 0 ? void 0 : conversation.case) === null || _a === void 0 ? void 0 : _a.id); }, onKeyDown: (e) => { var _a; return e.key === EventKeys.ENTER && handlePreviewClick((_a = conversation === null || conversation === void 0 ? void 0 : conversation.case) === null || _a === void 0 ? void 0 : _a.id); }, "aria-label": translate('preview'), tabIndex: 0 }, { children: translate('preview') }))] })) })), (_a = conversation === null || conversation === void 0 ? void 0 : conversation.messages) === null || _a === void 0 ? void 0 : _a.map((message, index) => {
                                        var _a, _b, _c;
                                        return (_jsx(Box, Object.assign({ ref: index === 0 ? nextCaseRef : null }, { children: _jsx(CcfContactMessage, { message: message, channelType: channelType, direction: message.direction, fullName: ((_a = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.fullName) || '', firstName: ((_b = message === null || message === void 0 ? void 0 : message.authorUser) === null || _b === void 0 ? void 0 : _b.firstName) || '', surName: ((_c = message === null || message === void 0 ? void 0 : message.authorUser) === null || _c === void 0 ? void 0 : _c.surname) || '', attachments: message.attachments, isMessageDraft: false, previewOnlyChannels: previewOnlyChannels, channelName: channelName, isNextCaseMessage: true, isTranslateAgentMessages: translationSettings.isTranslateAgentMessages, isTranslateCustomerMessages: translationSettings.isTranslateCustomerMessages, channelId: channelId, isAuthorNameRemoved: (message === null || message === void 0 ? void 0 : message.authorNameRemoved) !== null, isContentRemoved: (message === null || message === void 0 ? void 0 : message.contentRemoved) !== null, isTrackingMessageDeliveryStatus: isTrackingMessageDeliveryStatus || false }, message.id) }), message.id));
                                    }), (_b = conversation === null || conversation === void 0 ? void 0 : conversation.messageNotes) === null || _b === void 0 ? void 0 : _b.map((message) => {
                                        return (_jsx(CcfContactMessageNote, { messageId: message === null || message === void 0 ? void 0 : message.id, userDetails: message === null || message === void 0 ? void 0 : message.user, isReadOnly: false, noteContent: message.content || '', updatedAt: message.updatedAt, isNextConversationNote: true }, message === null || message === void 0 ? void 0 : message.id));
                                    })] }), conversation.case.id));
                        }) })), _jsx("div", { id: 'dummyBottomDivScroll', ref: dummyBottomDivScroll })] })), _jsxs(Box, Object.assign({ sx: styles.bottomContainer }, { children: [isEditorVisible && nextCaseId && loadMessagesContainer(LoadMessagesType.NEXT), isEditorVisible &&
                        showViewRecentMessages &&
                        !isScrolledToBottom &&
                        loadMessagesContainer(LoadMessagesType.RECENT)] }))] }));
};
export default memo(CcfContactMessageContainer);
//# sourceMappingURL=ccf-contact-message-container.js.map