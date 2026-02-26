import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { lazy, memo, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, CircularProgress, useTheme, Divider, useMediaQuery } from '@mui/material';
import CcfDigitalEmailV2Header from './ccf-digital-email-v2-header/ccf-digital-email-v2-header';
import CcfDigitalEmailV2Styles from './ccf-digital-email-v2.style';
import { DigitalContactStatus, EventKeys } from '@nice-devone/common-sdk';
import { CcfDivider, DividerOrientation, DividerVariant, CcfAppToastMessage, CcfTypography, useTranslator, CcfSingleArrowIcon, CcfTooltip, CcfBox, CcfScrollToBottomIcon, isFeatureEnabled } from '@nice-devone/ui-controls';
import CcfDigitalEmailFooter from './ccf-digital-email-footer/ccf-digital-email-footer';
import { useDispatch, useSelector } from 'react-redux';
import { CcfAssignmentAction, getMessageActionResponse, getCxoneDigitalContactUserSavedProperties, getDigitalContactDetailsByCaseId, getInteractionFailedMessagesForCase, getPreviousCaseIdForSelectedCase, getPreviousConversationMessagesByCaseId, getNonIncomingActiveContactInSelectedInteraction, loadPreviousCaseConversations, getNextConversationMessagesByCaseId, getNextCaseIdForSelectedCase, loadNextCaseConversations, getContactDetailsForSelectedContact } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { userInfoSelector } from '../../ccf-agent-state/ccf-agent-state.slice';
import CcfFailedMessageDeliveryBanner from '../../ccf-failed-message-delivery-banner/ccf-failed-message-delivery-banner';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import CcfDigitalEmailV2MessageDraft from './ccf-digital-email-v2-messageDraft/ccf-digital-email-v2-messageDraft';
import CcfDigitalEmailV2MessageDraftStyles from './ccf-digital-email-v2-messageDraft/ccf-digital-email-v2-messageDraft.styles';
import CcfContactMessageNote from '../ccf-contact-message-note/ccf-contact-message-note';
import { getEmailMessageSortOrderSettings } from '../../ccf-settings/ccf-full-settings.slice';
import { EmailMessageSortOrder } from '../../../enums/email-message-sort-order-type';
import { analyzeHtmlContent } from './ccf-digital-email-utils';
import { ccfDigitalSearchActions, getSelectedMessage } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { LoadMessagesType } from '../../../enums/load-message-type';
import CcfDigitalEmailV2Messages from './ccf-digital-email-v2-messages/ccf-digital-email-v2-messages';
/**
 * Component to render the new revamped Email on Interaction Space
 * @returns Revamped Email Component Sections
 * ```
 * @example
 * <CcfDigitalEmailV2/>
 * ```
  */
export function CcfDigitalEmailV2(props) {
    var _a, _b, _c, _d, _e, _f, _g;
    const { messages, digitalContactDetails, translationSettings, messageDrafts, sender, channelType, isPrivateChannel, wysiwygEnabled } = props;
    const messageForFooter = messages === null || messages === void 0 ? void 0 : messages[messages.length - 1];
    const [translate] = useTranslator();
    const theme = useTheme();
    const dispatch = useDispatch();
    const caseId = (_a = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _a === void 0 ? void 0 : _a.id;
    const interactionId = (_b = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _b === void 0 ? void 0 : _b.interactionId;
    const userInfo = useSelector(userInfoSelector);
    const digitalContactUserSavedProperties = useSelector(getCxoneDigitalContactUserSavedProperties);
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(caseId, interactionId));
    const publicPostContainerStyles = CcfDigitalEmailV2MessageDraftStyles(theme);
    const messageActionResponse = useSelector(getMessageActionResponse());
    const previewOnlyChannels = ['ig'];
    const failedInteractionMessages = useSelector(getInteractionFailedMessagesForCase((_c = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _c === void 0 ? void 0 : _c.id));
    const closedContact = selectedDigitalContactDetails.status === DigitalContactStatus.CLOSED;
    //footer should be displayed only when the editor is not opened
    const [displayFooter, setDisplayFooter] = useState(true);
    // Dev Comment - This state is used to track if a new note has been added, so that we can scroll to it
    const [newNoteAdded, setNewNoteAdded] = useState(false);
    const isSingleMessage = messages && messages.length === 1;
    const [isLoadPreviousMessagesClickable, setIsLoadPreviousMessagesClickable] = useState(true);
    const [isLoadNextMessagesClickable, setIsLoadNextMessagesClickable] = useState(true);
    const selectedMessageId = useSelector(getSelectedMessage);
    const scrollMessageRef = useRef(null);
    const contactContentBodyRef = useRef(null);
    const noteRef = useRef(null);
    const nextCaseRef = useRef(null);
    const previousCaseRef = useRef(null);
    const userScrolledRef = useRef(false);
    const dummyBottomDivScroll = useRef(null);
    let filteredMessages = [];
    if (messages && messages.length > 0) {
        filteredMessages = isPrivateChannel ? messages : messages.filter(message => !message.isRelatedMessage);
    }
    const mostRecentMessageId = filteredMessages && ((_d = filteredMessages[filteredMessages.length - 1]) === null || _d === void 0 ? void 0 : _d.id);
    const scrollContainer = contactContentBodyRef === null || contactContentBodyRef === void 0 ? void 0 : contactContentBodyRef.current;
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const [showRecentMessagesButton, setShowRecentMessagesButton] = useState(false);
    const isEmailRenderV2ToggleEnabled = useMemo(() => isFeatureEnabled("release-cx-agent-email-rendering-AW-37207" /* FeatureToggles.EMAIL_RENDERING_FEATURE_TOGGLE */), []);
    const previousCaseId = useSelector(getPreviousCaseIdForSelectedCase(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const previousConversationMessages = useSelector(getPreviousConversationMessagesByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const nextCaseId = useSelector(getNextCaseIdForSelectedCase(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const nextConversationMessages = useSelector(getNextConversationMessagesByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const previousMessages = previousConversationMessages && (previousConversationMessages === null || previousConversationMessages === void 0 ? void 0 : previousConversationMessages.length) > 0;
    const nextMessages = nextConversationMessages && (nextConversationMessages === null || nextConversationMessages === void 0 ? void 0 : nextConversationMessages.length) > 0;
    const hasNextCaseId = Boolean(nextCaseId);
    const hasPreviousCaseId = Boolean(previousCaseId);
    const hasMoreMessages = ((_e = previousConversationMessages === null || previousConversationMessages === void 0 ? void 0 : previousConversationMessages.length) !== null && _e !== void 0 ? _e : 0) > 0 ||
        ((_f = nextConversationMessages === null || nextConversationMessages === void 0 ? void 0 : nextConversationMessages.length) !== null && _f !== void 0 ? _f : 0) > 0;
    useEffect(() => {
        var _a;
        setDisplayFooter(!((_a = digitalContactUserSavedProperties[caseId]) === null || _a === void 0 ? void 0 : _a.isResponse) ? true : false);
    }, [digitalContactDetails, digitalContactUserSavedProperties, caseId]);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const emailMessageSortOrder = useSelector(getEmailMessageSortOrderSettings);
    const LazyCcfDigitalEmailV2Messages = lazy(() => import('./ccf-digital-email-v2-messages/ccf-digital-email-v2-messages'));
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    /**
     *  * This useEffect will handle the error/success messages to be shown as toast notifications for the performed message actions.
     */
    useEffect(() => {
        const { messageKey, isError, placeholder } = messageActionResponse !== null && messageActionResponse !== void 0 ? messageActionResponse : {};
        if (messageKey) {
            const messageComponent = _jsx(CcfAppToastMessage, { type: isError ? 'error' : 'success', messageKey: messageKey, extraArgs: { format: [placeholder || ''] } });
            const toastOptions = { autoClose: 2000, hideProgressBar: true, closeButton: true, className: 'publicMessageToast', containerId: 'AppToastContainer',
                onClose: () => dispatch(CcfAssignmentAction.clearMessageActionResponse({})) };
            toast[isError ? 'error' : 'success'](messageComponent, toastOptions);
        }
    }, [messageActionResponse]);
    /**
     * Method used to check if the user has scrolled to the bottom of the message content
     * @example  shouldScrolledToBottom()
     */
    const shouldScrolledToBottom = () => {
        if (!contactContentBodyRef.current)
            return false;
        const { scrollTop, scrollHeight, clientHeight } = contactContentBodyRef.current;
        return Math.abs(scrollTop + clientHeight - scrollHeight) <= 6; // check if scrolled to bottom
    };
    /**
     * Method used to check if the user has scrolled to the top of the message content
     * @example  shouldScrolledToTop()
     */
    const shouldScrolledToTop = () => {
        if (!contactContentBodyRef.current)
            return false;
        return contactContentBodyRef.current.scrollTop === 0;
    };
    const isScrolledToBottom = shouldScrolledToBottom();
    const styles = CcfDigitalEmailV2Styles({
        theme,
        closedContact,
        hasMoreMessages,
        isScrolledToBottom,
        hasNextCaseId,
        emailMessageSortOrder: emailMessageSortOrder,
        isSmView,
        hasPreviousCaseId,
        showRecentMessagesButton,
    });
    let scrollTimeout;
    /**
     * Method used to handle manual scroll
     * @example  handleScroll()
     */
    const handleScroll = () => {
        const isScrollToBottom = shouldScrolledToBottom();
        const isScrollToTop = shouldScrolledToTop();
        if (!scrollContainer)
            return;
        if (!(userScrolledRef === null || userScrolledRef === void 0 ? void 0 : userScrolledRef.current)) {
            userScrolledRef.current = true;
        }
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (previousMessages || nextMessages) {
                if (emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP) {
                    setShowRecentMessagesButton(!isScrollToTop);
                }
                else {
                    setShowRecentMessagesButton(!isScrollToBottom);
                }
            }
        }, 100);
    };
    /**
     * Method used to scroll to the latest added note. This function will get callled from note component only when new note is added.
     * @example  scrollToLastNote()
     */
    const scrollToLastNote = () => {
        if (contactContentBodyRef.current && noteRef.current) {
            setNewNoteAdded(true);
        }
    };
    useEffect(() => {
        const isAtBottom = shouldScrolledToBottom();
        // If there are previous or next messages and the user is not at the bottom, show the recent messages button
        if (((previousConversationMessages && (previousConversationMessages === null || previousConversationMessages === void 0 ? void 0 : previousConversationMessages.length) > 0) || (nextConversationMessages && (nextConversationMessages === null || nextConversationMessages === void 0 ? void 0 : nextConversationMessages.length) > 0 && emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP)) && !isAtBottom && !isFirstRender) {
            setShowRecentMessagesButton(true);
        }
        else {
            setShowRecentMessagesButton(false);
        }
        setIsFirstRender(false);
    }, [previousConversationMessages, nextConversationMessages]);
    useEffect(() => {
        /**
       * Function that scrolls to bottom of the message content when case switches
       * @example -  scrollToBottom()
       */
        const scrollToBottom = () => {
            var _a, _b;
            if (contactContentBodyRef === null || contactContentBodyRef === void 0 ? void 0 : contactContentBodyRef.current) {
                if ((scrollMessageRef === null || scrollMessageRef === void 0 ? void 0 : scrollMessageRef.current) && !nextMessages) {
                    contactContentBodyRef.current.scrollTop = ((_a = scrollMessageRef.current) === null || _a === void 0 ? void 0 : _a.offsetTop) - ((_b = contactContentBodyRef === null || contactContentBodyRef === void 0 ? void 0 : contactContentBodyRef.current) === null || _b === void 0 ? void 0 : _b.offsetTop);
                }
                else if (nextMessages) {
                    contactContentBodyRef.current.scrollTop = contactContentBodyRef.current.scrollHeight;
                }
            }
        };
        const timeout = setTimeout(() => {
            ((previousMessages || nextMessages) && emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP) && scrollToBottom();
        }, 100);
        return () => {
            clearTimeout(timeout);
        };
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId]);
    useEffect(() => {
        var _a, _b, _c, _d;
        if (wysiwygEnabled && emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP) {
            if (selectedMessageId !== mostRecentMessageId) {
                dispatch(ccfDigitalSearchActions.updateSelectedMessageId(mostRecentMessageId));
            }
            if (selectedMessageId && !(failedInteractionMessages && (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.length) > 0)) {
                if ((scrollMessageRef === null || scrollMessageRef === void 0 ? void 0 : scrollMessageRef.current) && (contactContentBodyRef === null || contactContentBodyRef === void 0 ? void 0 : contactContentBodyRef.current)) {
                    if (userScrolledRef === null || userScrolledRef === void 0 ? void 0 : userScrolledRef.current) {
                        userScrolledRef.current = false;
                        return;
                    }
                    // If a new note is added, scroll to the position of the latest added note else scroll to latest message
                    if (!newNoteAdded) {
                        // Scroll to the position of the latest email message
                        contactContentBodyRef.current.scrollTop = ((_a = scrollMessageRef.current) === null || _a === void 0 ? void 0 : _a.offsetTop) - ((_b = contactContentBodyRef === null || contactContentBodyRef === void 0 ? void 0 : contactContentBodyRef.current) === null || _b === void 0 ? void 0 : _b.offsetTop);
                    }
                    else {
                        if (contactContentBodyRef.current && contactContentBodyRef.current.offsetTop
                            && noteRef.current && noteRef.current.offsetTop) {
                            contactContentBodyRef.current.scrollTo({
                                top: noteRef.current.offsetTop - contactContentBodyRef.current.offsetTop,
                                behavior: 'smooth',
                            });
                            setNewNoteAdded(false);
                        }
                    }
                }
            }
            else {
                (_c = contactContentBodyRef.current) === null || _c === void 0 ? void 0 : _c.scrollTo(0, (_d = contactContentBodyRef.current) === null || _d === void 0 ? void 0 : _d.scrollHeight);
            }
        }
    }, [messages, selectedMessageId]);
    useEffect(() => {
        if (previousCaseId && !isLoadPreviousMessagesClickable) {
            setIsLoadPreviousMessagesClickable(true);
        }
        else if (nextCaseId && !isLoadNextMessagesClickable) {
            setIsLoadNextMessagesClickable(true);
        }
    }, [previousCaseId, nextCaseId]);
    useEffect(() => {
        setTimeout(() => {
            if (nextMessages && nextCaseRef.current && emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP && !isFirstRender) {
                nextCaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }, [nextConversationMessages === null || nextConversationMessages === void 0 ? void 0 : nextConversationMessages.length]);
    useEffect(() => {
        setTimeout(() => {
            if (previousMessages && previousCaseRef.current && emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP && !isFirstRender) {
                previousCaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }, [previousConversationMessages === null || previousConversationMessages === void 0 ? void 0 : previousConversationMessages.length]);
    // Sort messages based on the emailMessageSortOrder setting
    const sortedMessages = (_g = [...(messages || [])]) === null || _g === void 0 ? void 0 : _g.sort((message1, message2) => {
        if (emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP) { // newest messages on top
            return new Date(message2.createdAt).getTime() - new Date(message1.createdAt).getTime();
        }
        // default to oldest messages on top
        return new Date(message1.createdAt).getTime() - new Date(message2.createdAt).getTime();
    });
    /**
     * Function to sort messages within conversations based on the emailMessageSortOrder
     * @param conversations - array of conversation objects
     * @param emailMessageSortOrder - current email message sort order
     * @example - sortMessages(previousConversationMessages, OLDEST_ON_TOP)
     * @returns - array of sorted conversation objects
     */
    const sortMessages = (conversations, emailMessageSortOrder) => {
        return conversations === null || conversations === void 0 ? void 0 : conversations.map((conversation) => (Object.assign(Object.assign({}, conversation), { messages: [...(conversation.messages || [])].sort((message1, message2) => {
                if (emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP) {
                    return new Date(message2.createdAt).getTime() - new Date(message1.createdAt).getTime();
                }
                return new Date(message1.createdAt).getTime() - new Date(message2.createdAt).getTime();
            }) })));
    };
    const sortedPreviousConversationMessages = sortMessages(previousConversationMessages, emailMessageSortOrder);
    const sortedNextConversationMessages = sortMessages(nextConversationMessages, emailMessageSortOrder);
    /**
     * Function that loads previous case /recent messages
     * @param  text - determines the type of messages to be loaded
     * @example -  loadMessages('previous' || 'next')
     */
    const loadMessages = (text) => {
        var _a, _b;
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
            if (emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP) {
                (_a = contactContentBodyRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else {
                (_b = dummyBottomDivScroll === null || dummyBottomDivScroll === void 0 ? void 0 : dummyBottomDivScroll.current) === null || _b === void 0 ? void 0 : _b.scrollIntoView(false);
            }
            setShowRecentMessagesButton(false);
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
        return _jsxs(Box, Object.assign({ tabIndex: 0, sx: text === LoadMessagesType.RECENT ? Object.assign({}, styles.loadMessagesContainerForViewRecent) : Object.assign({}, styles.loadMessagesContainer), onClick: () => loadMessages(text), "aria-label": `Load ${text} messages`, onKeyDown: (e) => {
                if (e.key === EventKeys.ENTER || e.key === EventKeys.SPACE) {
                    e.preventDefault();
                    loadMessages(text);
                }
            } }, { children: [text !== LoadMessagesType.RECENT && _jsx(CcfSingleArrowIcon, { sx: Object.assign(Object.assign({}, styles.doubleArrowIcon), { transform: (text === LoadMessagesType.PREVIOUS && emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP) ||
                            (text === LoadMessagesType.NEXT && emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP)
                            ? 'rotate(180deg)'
                            : '' }) }), _jsx(CcfTypography, Object.assign({ variant: "button", sx: styles.loadMessagesButton }, { children: text === LoadMessagesType.RECENT ? _jsx(CcfTooltip, Object.assign({ title: translate('viewRecentMessages') }, { children: _jsx(CcfBox, Object.assign({ sx: styles.scrollToBottomStyles }, { children: _jsx(CcfScrollToBottomIcon, { sx: styles.scrollToBottomIcon }) })) })) : buttonText }))] }));
    };
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
    /**
     * Function to render the pre/next case conversations
     * @returns - JSX element containing the prev/next conversations
     * @example -
     * ```
     * renderMessages()
     * ```
     */
    const renderMessages = (conversation, caseRef, isPreviousCase) => {
        var _a;
        return (_a = conversation.messages) === null || _a === void 0 ? void 0 : _a.map((message, index) => {
            var _a;
            const messageAnalysis = analyzeHtmlContent((_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.text);
            const isSingleMessage = conversation.messages.length === 1;
            const isLastMessage = index === conversation.messages.length - 1;
            return (_jsxs(Box, Object.assign({ sx: styles.previousMessageContainer, ref: index === 0 ? caseRef : null }, { children: [_jsx(CcfDigitalEmailV2Header, { message: message, digitalContactDetails: digitalContactDetails, isPreviousCaseMessage: isPreviousCase, isNextCaseMessage: !isPreviousCase }), isEmailRenderV2ToggleEnabled ?
                        _jsx(CcfDigitalEmailV2Messages, { message: message, digitalContactDetails: digitalContactDetails, translationSettings: translationSettings, isSingleMessage: isSingleMessage, messageAnalysis: messageAnalysis, isPreviousCaseMessage: isPreviousCase, isNextCaseMessage: !isPreviousCase }) : _jsx(Suspense, Object.assign({ fallback: _jsx(Box, Object.assign({ sx: styles.loaderContainer, "data-testid": "loader" }, { children: _jsx(CircularProgress, { size: 80 }) })) }, { children: _jsx(LazyCcfDigitalEmailV2Messages, { message: message, digitalContactDetails: digitalContactDetails, translationSettings: translationSettings, isSingleMessage: isSingleMessage, messageAnalysis: messageAnalysis, isPreviousCaseMessage: isPreviousCase, isNextCaseMessage: !isPreviousCase }) })), ((!isSingleMessage && !isLastMessage) ||
                        ((message === null || message === void 0 ? void 0 : message.messageNotes) && message.messageNotes.length > 0)) && (_jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: styles.divider }))] }), message.id));
        });
    };
    /**
     * Function to render the prev/next case message notes
     * @returns - JSX element containing the prev/next conversations notes
     * @example -
     * ```
     * renderMessageNotes()
     * ```
     */
    const renderMessageNotes = (conversation, isPreviousCase) => {
        var _a;
        // TODO - proper interface creation for messageNotes object as an enhancement
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (_a = conversation === null || conversation === void 0 ? void 0 : conversation.messageNotes) === null || _a === void 0 ? void 0 : _a.map((message) => (_jsx(CcfContactMessageNote, { messageId: message === null || message === void 0 ? void 0 : message.id, userDetails: message === null || message === void 0 ? void 0 : message.user, isReadOnly: false, noteContent: message.content || '', updatedAt: message.updatedAt, isPreviousConversationNote: isPreviousCase, isNextConversationNote: !isPreviousCase }, message === null || message === void 0 ? void 0 : message.id)));
    };
    /**
     * Function to render the prev/next case conversations header
     * @returns - JSX element containing the next conversations header
     * @example -
     * ```
     * renderConversationHeader()
     * ```
     */
    const renderConversationHeader = (conversation) => {
        var _a;
        return (_jsx(Divider, Object.assign({ sx: styles.previousCaseStatusDivider }, { children: _jsxs(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.caseStatus), { color: getStatusColor((_a = conversation === null || conversation === void 0 ? void 0 : conversation.case) === null || _a === void 0 ? void 0 : _a.status) }) }, { children: [`#${conversation.case.id} ${conversation.case.status.toUpperCase()}`, _jsx(Box, Object.assign({ sx: styles.previewStyles, component: "span", onClick: () => { var _a; return handlePreviewClick((_a = conversation === null || conversation === void 0 ? void 0 : conversation.case) === null || _a === void 0 ? void 0 : _a.id); }, onKeyDown: (e) => { var _a; return e.key === EventKeys.ENTER && handlePreviewClick((_a = conversation === null || conversation === void 0 ? void 0 : conversation.case) === null || _a === void 0 ? void 0 : _a.id); }, "aria-label": translate('preview'), tabIndex: 0 }, { children: translate('preview') }))] })) })));
    };
    /**
     * Function to render conversations prev/next
     * @returns - JSX element containing the prev/next conversations
     * @example -
     * ```
     * renderConversations()
     * ```
     */
    const renderConversations = (conversations, caseRef, isPreviousCase, reverseOrder) => {
        if (!conversations || conversations.length === 0)
            return null;
        const list = reverseOrder ? [...conversations].reverse() : conversations;
        return (_jsxs(_Fragment, { children: [list.map((conversation) => (_jsxs(Box, Object.assign({ sx: styles.previousMessagesContainer }, { children: [renderConversationHeader(conversation), renderMessages(conversation, caseRef, isPreviousCase), renderMessageNotes(conversation, isPreviousCase)] }), conversation.case.id))), ((isPreviousCase && emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP) ||
                    (!isPreviousCase && emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP)) && (_jsx(Box, Object.assign({ sx: styles.currentCaseStatusDivider }, { children: _jsx(Divider, Object.assign({ sx: styles.previousCaseStatusDivider }, { children: _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.caseStatus), { color: getStatusColor(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) }) }, { children: `#${nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId} ${nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus.toUpperCase()}` })) })) })))] }));
    };
    /**
     * Function to render the previous case conversations
     * @returns - JSX element containing the previous conversations
     * @example -
     * ```
     * renderNextConversations()
     * ```
     */
    const renderPreviousConversations = () => renderConversations(sortedPreviousConversationMessages, previousCaseRef, true, emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP ? false : true);
    /**
     * Function to render the next case conversations
     * @returns - JSX element containing the next conversations
     * @example -
     * ```
     * renderNextConversations()
     * ```
     */
    const renderNextConversations = () => renderConversations(sortedNextConversationMessages, nextCaseRef, false, emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP ? true : false);
    return (_jsxs(Box, Object.assign({ component: 'div', sx: styles.mainContainer }, { children: [emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP && showRecentMessagesButton && loadMessagesContainer(LoadMessagesType.RECENT), _jsxs(Box, Object.assign({ component: 'div', sx: styles.contactContentEmailContainer, ref: contactContentBodyRef, "data-testid": "contact-content-body", onScroll: handleScroll }, { children: [emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP && previousCaseId && loadMessagesContainer(LoadMessagesType.PREVIOUS), emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP && nextCaseId && loadMessagesContainer(LoadMessagesType.NEXT), emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP ? renderPreviousConversations() : renderNextConversations(), sortedMessages === null || sortedMessages === void 0 ? void 0 : sortedMessages.map((message) => {
                        var _a;
                        const messageAnalysis = analyzeHtmlContent((_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.text);
                        return (_jsxs(Box, Object.assign({ sx: styles.boxContainer, ref: selectedMessageId === message.id ? scrollMessageRef : null, "data-testid": "message-scroll-anchor" }, { children: [_jsx(CcfDigitalEmailV2Header, { message: message, digitalContactDetails: digitalContactDetails }), isEmailRenderV2ToggleEnabled ?
                                    _jsx(CcfDigitalEmailV2Messages, { message: message, digitalContactDetails: digitalContactDetails, translationSettings: translationSettings, isSingleMessage: isSingleMessage, messageAnalysis: messageAnalysis }) : _jsx(Suspense, Object.assign({ fallback: _jsx(Box, Object.assign({ sx: styles.loaderContainer, "data-testid": "loader" }, { children: _jsx(CircularProgress, { size: 80 }) })) }, { children: _jsx(LazyCcfDigitalEmailV2Messages, { message: message, digitalContactDetails: digitalContactDetails, translationSettings: translationSettings, isSingleMessage: isSingleMessage, messageAnalysis: messageAnalysis }) })), (!isSingleMessage || ((message === null || message === void 0 ? void 0 : message.messageNotes) && message.messageNotes.length > 0)) && (_jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: styles.divider }))] }), message.id));
                    }), messageDrafts === null || messageDrafts === void 0 ? void 0 : messageDrafts.map((messageDraft) => (_jsx(CcfDigitalEmailV2MessageDraft, { messageDraft: messageDraft, sender: `${sender}`, styles: publicPostContainerStyles, channelType: channelType, direction: '', previewOnlyChannels: previewOnlyChannels, digitalContactDetails: digitalContactDetails }, messageDraft.id))), failedInteractionMessages && (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.length) > 0 && (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.map((message) => {
                        var _a, _b;
                        return _jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfFailedMessageDeliveryBanner' }, { children: _jsx(CcfFailedMessageDeliveryBanner, { caseId: (_a = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _a === void 0 ? void 0 : _a.id, failedMessage: message, messageAuthor: message.messageAuthor, channelDisplayName: (_b = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.channel) === null || _b === void 0 ? void 0 : _b.name, wysiwygEnabled: message === null || message === void 0 ? void 0 : message.wysiwygEnabled }) }), message.xTraceId);
                    })), _jsx(Box, Object.assign({ ref: noteRef }, { children: _jsx(CcfContactMessageNote, { messageId: messageForFooter === null || messageForFooter === void 0 ? void 0 : messageForFooter.id, isReadOnly: false, userDetails: userInfo, noteContent: '', isEmailNote: true, scrollContainerRef: contactContentBodyRef, scrollToLastNote: scrollToLastNote }) })), emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP ? renderNextConversations() : renderPreviousConversations(), _jsx("div", { id: 'dummyBottomDivScroll', ref: dummyBottomDivScroll })] })), _jsxs(Box, Object.assign({ sx: { display: 'flex', flexDirection: 'row-reverse' } }, { children: [_jsxs(Box, Object.assign({ sx: { width: '50%', height: emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP && nextCaseId || emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP && previousCaseId ? '2rem' : '0' } }, { children: [emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP && nextCaseId && loadMessagesContainer(LoadMessagesType.NEXT), emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP && previousCaseId && loadMessagesContainer(LoadMessagesType.PREVIOUS)] })), _jsx(Box, Object.assign({ sx: { flexGrow: '1' } }, { children: emailMessageSortOrder === EmailMessageSortOrder.OLDEST_ON_TOP && showRecentMessagesButton && loadMessagesContainer(LoadMessagesType.RECENT) }))] })), displayFooter && !closedContact && _jsx(Box, { sx: styles.footerSpacer }), (displayFooter && !closedContact && messageForFooter) && _jsx(CcfDigitalEmailFooter, { message: messageForFooter, digitalContactDetails: digitalContactDetails, updateDisplayFooter: () => { setDisplayFooter(false); } })] })));
}
export default memo(CcfDigitalEmailV2);
//# sourceMappingURL=ccf-digital-email-v2.js.map