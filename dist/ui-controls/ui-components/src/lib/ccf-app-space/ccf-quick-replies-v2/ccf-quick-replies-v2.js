import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { toast } from 'react-toastify';
import { CcfBox, CcfSearchIcon, CcfTabs, CcfNoResultFoundIcon, CcfTypography, CcfButton, CcfUpArrowIcon, useTranslator, CcfAppToastMessage } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { getDigitalContactDetailsByCaseId, getDigitalContactMessagesByCaseId, getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfMessageTemplates } from '../ccf-quick-replies/ccf-message-templates/ccf-message-templates';
import CcfOutboundTemplatePreview from '../ccf-quick-replies/ccf-message-templates/ccf-outbound-template-preview/ccf-outbound-template-preview';
import CcfQuickReplyCard from './ccf-quick-reply-card/ccf-quick-reply-card-v2';
import CcfQuickReplyPreview from '../ccf-quick-replies/ccf-quick-reply-preview/ccf-quick-reply-preview';
import ccfQuickRepliesStyles from '../ccf-quick-replies/ccf-quick-replies.styles';
import { Box, CircularProgress, Grid, InputAdornment, Paper, TextField, useMediaQuery, useTheme } from '@mui/material';
import { getAllQReplies, getIfNextLinkAvailable, getLoadingStatus, getPreviewOutboundTemplate, getPreviewQuickReply, getTotalQRepliesCount, getQuickReplyToastResponseById, updateQuickReplyToastResponse, fetchAllMessageTemplates, updatePreviewQuickReply, resetVarReplacedContent, getDraftRichMessagePayload, getRichMessageSendState, getUnifiedFavoriteQuickReplies, getTotalFavoriteQRCount, getIsFavNextLinkAvailable, clearQuickRepliesCache, loadQuickRepliesFromCache, getCachedData, getFavCachedData, clearFavoriteQuickRepliesCache, loadFavoriteQuickRepliesFromCache, getFavoriteToggleToast, clearFavoriteToggleToast } from '../ccf-app-space.slice';
import { useEffect, useRef, useState } from 'react';
import { DigitalChannelType, DigitalContactDirection, DigitalContactStatus } from '@nice-devone/common-sdk';
import { fetchUnifiedQuickReplies } from '../ccf-quick-replies/ccf-quick-replies.util';
import { Navigation } from '../../../enums/navigation-menus';
import useComponentDidUpdate from '../../../hooks/useComponentDidUpdate';
import { globalActions } from '../../global.app.slice';
import { updateSelectedMessageTemplate } from '../ccf-quick-replies/ccf-message-templates/ccf-outbound-template-preview/ccf-outbound-template-preview.slice';
import { updateDraftMessageIntoState } from '../../../util/common';
import { ToastMessageType } from '../../../enums/toast-message-type';
/**
 * CcfQuickReplies - used to display quick replies component
 * @param props -?-CcfQuickRepliesProps
 * @example <CcfQuickReplies />
 */
export function CcfQuickReplies() {
    var _a, _b, _c;
    const theme = useTheme();
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const [searchValue, setSearchValue] = useState('');
    const isRepliesLoading = useSelector(getLoadingStatus);
    const isBelowXL = useMediaQuery(theme.breakpoints.down('xl'));
    const replyContainerRef = useRef(null);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const quickRepliesStyles = ccfQuickRepliesStyles(theme, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound);
    const previewReply = useSelector(getPreviewQuickReply);
    const [showMessageTemplate, setShowMessageTemplate] = useState(false);
    // this will be by default true, For a new Whatsapp OB contact, if there's no message from customer, all features like quick reply need to be hidden
    const [showQuickReply, setShowQuickReply] = useState(true);
    const [tab, setTab] = useState(0);
    const allQReplies = useSelector(getAllQReplies);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFavPage, setCurrentFavPage] = useState(1);
    const pageSize = 20; // Number of items to display per page
    const getNextLinks = useSelector(getIfNextLinkAvailable);
    const getFavNextLinks = useSelector(getIsFavNextLinkAvailable);
    const getQRepliesCount = useSelector(getTotalQRepliesCount);
    const getFavoriteQRCount = useSelector(getTotalFavoriteQRCount);
    const quickRepliesCache = useSelector(getCachedData);
    const favQuickRepliesCache = useSelector(getFavCachedData);
    const isFirstRender = useRef(true);
    const SEARCH_DEBOUNCE_TIME = 500;
    const contactId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId;
    const quickReplyToastDetails = useSelector(getQuickReplyToastResponseById(contactId));
    const favoriteToggleToast = useSelector(getFavoriteToggleToast);
    const draftRichMessagePayload = useSelector(getDraftRichMessagePayload);
    const richMessageSendStatus = useSelector(getRichMessageSendState);
    const allFavQReplies = useSelector(getUnifiedFavoriteQuickReplies);
    const FIRST_PAGE_TAB = 1;
    const currentTabPage = tab === FIRST_PAGE_TAB ? currentFavPage : currentPage;
    const activeCache = tab === FIRST_PAGE_TAB ? favQuickRepliesCache : quickRepliesCache;
    const cachedPages = Object.keys(activeCache || {}).map(Number);
    const hasCachedPrev = cachedPages.includes(currentTabPage - 1);
    const hasCachedNext = cachedPages.includes(currentTabPage + 1);
    const activeNextLinks = tab === FIRST_PAGE_TAB ? getFavNextLinks : getNextLinks;
    const canGoPrev = currentTabPage > 1 && ((activeNextLinks === null || activeNextLinks === void 0 ? void 0 : activeNextLinks.previous) !== null || hasCachedPrev);
    const canGoNext = (activeNextLinks === null || activeNextLinks === void 0 ? void 0 : activeNextLinks.next) !== null || hasCachedNext;
    /**
       * This useComponentDidUpdate will show toast messages during quick reply API operations.
       */
    useComponentDidUpdate(() => {
        if (quickReplyToastDetails === null || quickReplyToastDetails === void 0 ? void 0 : quickReplyToastDetails.messageKey) {
            const messageType = (quickReplyToastDetails === null || quickReplyToastDetails === void 0 ? void 0 : quickReplyToastDetails.isError) ? ToastMessageType.ERROR : ToastMessageType.SUCCESS;
            const messageComponent = _jsx(CcfAppToastMessage, { type: messageType, messageKey: quickReplyToastDetails === null || quickReplyToastDetails === void 0 ? void 0 : quickReplyToastDetails.messageKey, extraArgs: { format: [(quickReplyToastDetails === null || quickReplyToastDetails === void 0 ? void 0 : quickReplyToastDetails.placeholder) || ''] } });
            const toastOptions = { autoClose: 2000, containerId: 'AppToastContainer', className: 'publicMessageToast', onClose: () => {
                    dispatch(updateQuickReplyToastResponse({ contactId, responseDetails: {} }));
                    isBelowXL && dispatch(globalActions.setSelectedMenu({ name: Navigation.INTERACTION }));
                } };
            toast[messageType](messageComponent, toastOptions);
        }
    }, [quickReplyToastDetails]);
    useEffect(() => {
        var _a, _b, _c;
        if (favoriteToggleToast && favoriteToggleToast.messageKey) {
            const messageType = favoriteToggleToast.isError ? ToastMessageType.ERROR : ToastMessageType.SUCCESS;
            const messageComponent = _jsx(CcfAppToastMessage, { type: messageType, messageKey: favoriteToggleToast.messageKey });
            const toastOptions = { autoClose: 2000, containerId: 'AppToastContainer', className: 'publicMessageToast', onClose: () => {
                    dispatch(clearFavoriteToggleToast());
                } };
            toast[messageType](messageComponent, toastOptions);
            if (tab === FIRST_PAGE_TAB && favoriteToggleToast !== null) {
                // Refresh favorite quick replies list on toggling favorite
                dispatch(fetchUnifiedQuickReplies({
                    channelId: (_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.id,
                    search: searchValue,
                    skillId: (_c = (_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.routingQueue) === null || _b === void 0 ? void 0 : _b.skillId) !== null && _c !== void 0 ? _c : undefined,
                    isFavorite: true,
                    page: currentFavPage,
                }));
            }
        }
    }, [favoriteToggleToast]);
    //Dev Note: code added for visual indicators
    useEffect(() => {
        updateDraftMessageIntoState(draftRichMessagePayload, richMessageSendStatus, selectedDigitalContactDetails, dispatch);
    }, [richMessageSendStatus]);
    /**
     *
     * @param newPage - number
     * @example - handlePageChange(1)
     */
    const handlePageChange = (newPage) => {
        var _a, _b, _c;
        const isFavTab = tab === FIRST_PAGE_TAB;
        const isPageCached = !!(isFavTab ? favQuickRepliesCache === null || favQuickRepliesCache === void 0 ? void 0 : favQuickRepliesCache[newPage] : quickRepliesCache === null || quickRepliesCache === void 0 ? void 0 : quickRepliesCache[newPage]);
        if (isPageCached) {
            if (isFavTab) {
                dispatch(loadFavoriteQuickRepliesFromCache(newPage));
                setCurrentFavPage(newPage);
            }
            else {
                dispatch(loadQuickRepliesFromCache(newPage));
                setCurrentPage(newPage);
            }
            return;
        }
        dispatch(fetchUnifiedQuickReplies({
            channelId: (_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.id,
            page: newPage,
            limit: pageSize,
            search: searchValue,
            skillId: (_c = (_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.routingQueue) === null || _b === void 0 ? void 0 : _b.skillId) !== null && _c !== void 0 ? _c : undefined,
            isFavorite: (tab === 1) ? true : false,
        }));
        if (tab === FIRST_PAGE_TAB) {
            setCurrentFavPage(newPage);
        }
        else {
            setCurrentPage(newPage);
        }
    };
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const getDigitalContactMessages = useSelector(getDigitalContactMessagesByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    /**
       * Updating Tab index while Switching Tabs in Quick Replies Panel
       * @param newTabIndex - number
       * @example - handleChange(1)
      */
    const handleChange = (newValue) => {
        var _a, _b, _c, _d;
        if (nonIncomingActiveContactInSelectedInteraction && (nonIncomingActiveContactInSelectedInteraction.contactStatus === DigitalContactStatus.DRAFT && ((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.hasOutboundTemplates))) {
            setTab(0);
        }
        else {
            setTab(newValue);
        }
        if (newValue === 1) {
            const isFavCached = !!(favQuickRepliesCache === null || favQuickRepliesCache === void 0 ? void 0 : favQuickRepliesCache[currentFavPage]);
            if (isFavCached) {
                dispatch(loadFavoriteQuickRepliesFromCache(currentFavPage));
            }
            else {
                dispatch(fetchUnifiedQuickReplies({
                    channelId: (_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _b === void 0 ? void 0 : _b.id,
                    search: searchValue,
                    skillId: (_d = (_c = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.routingQueue) === null || _c === void 0 ? void 0 : _c.skillId) !== null && _d !== void 0 ? _d : undefined,
                    isFavorite: true,
                    page: currentFavPage,
                }));
            }
        }
    };
    const isOBWhatsapp = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === DigitalChannelType.WHATSAPP;
    useEffect(() => {
        var _a, _b, _c;
        if (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) {
            dispatch(clearQuickRepliesCache());
            dispatch(clearFavoriteQuickRepliesCache());
            dispatch(fetchUnifiedQuickReplies({
                channelId: (_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.id,
                skillId: (_c = (_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.routingQueue) === null || _b === void 0 ? void 0 : _b.skillId) !== null && _c !== void 0 ? _c : undefined,
                search: searchValue,
            }));
        }
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId]);
    useEffect(() => {
        if (!isFirstRender.current) {
            const timer = setTimeout(() => {
                var _a, _b, _c;
                if (tab === 0) {
                    setCurrentPage(1);
                }
                else if (tab === FIRST_PAGE_TAB) {
                    setCurrentFavPage(1);
                }
                dispatch(clearQuickRepliesCache());
                dispatch(clearFavoriteQuickRepliesCache());
                dispatch(fetchUnifiedQuickReplies({
                    channelId: (_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.id,
                    search: searchValue,
                    skillId: (_c = (_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.routingQueue) === null || _b === void 0 ? void 0 : _b.skillId) !== null && _c !== void 0 ? _c : undefined,
                    isFavorite: (tab === FIRST_PAGE_TAB) ? true : false,
                }));
            }, SEARCH_DEBOUNCE_TIME); // debounce time added to avoid multiple API calls on each keystroke
            return () => clearTimeout(timer);
        }
        isFirstRender.current = false;
        return;
    }, [searchValue]);
    useEffect(() => {
        // For a new Whatsapp OB contact, if there's no message from customer, all features like quick reply needs to be hidden
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === DigitalChannelType.WHATSAPP &&
            !(getDigitalContactMessages === null || getDigitalContactMessages === void 0 ? void 0 : getDigitalContactMessages.some(({ direction }) => direction === DigitalContactDirection.INBOUND))) {
            setShowQuickReply(true);
        }
        else if (!showQuickReply) {
            setShowQuickReply(true);
        }
    }, [nonIncomingActiveContactInSelectedInteraction, getDigitalContactMessages]);
    useEffect(() => {
        if (previewReply) {
            dispatch(updatePreviewQuickReply(false));
            dispatch(resetVarReplacedContent());
        }
    }, []);
    useEffect(() => {
        var _a;
        if ((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.hasOutboundTemplates)
            dispatch(fetchAllMessageTemplates(selectedDigitalContactDetails.channel.id));
        dispatch(updateSelectedMessageTemplate(null));
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId]);
    useEffect(() => {
        var _a;
        if (nonIncomingActiveContactInSelectedInteraction &&
            nonIncomingActiveContactInSelectedInteraction.contactStatus === DigitalContactStatus.DRAFT &&
            ((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.hasOutboundTemplates)) {
            setTab(0);
            setShowMessageTemplate(true);
        }
        else {
            setShowMessageTemplate(false);
        }
    }, [nonIncomingActiveContactInSelectedInteraction, selectedDigitalContactDetails]);
    /**
     * Function to display quick responses list
     * @param qrList - quick replies list
     * @param totalQRCount - number of total quick replies
     * @param pageNumber - current page number
     * @param nextPageLink - next page link
     * @example - displayQuickResponses(qrList, totalQRCount, pageNumber);
     */
    const displayQuickResponses = (qrList, totalQRCount, pageNumber, navEnabled) => {
        var _a;
        const qrCount = (_a = qrList === null || qrList === void 0 ? void 0 : qrList.length) !== null && _a !== void 0 ? _a : 0;
        return (_jsxs(_Fragment, { children: [_jsx(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.cardsContainer }, { children: (isRepliesLoading) ? (_jsx(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.loader }, { children: _jsx(CircularProgress, {}) }))) : (_jsx(Box, { children: qrCount > 0 ? (_jsx(CcfBox, Object.assign({ component: "div" }, { children: qrList.map((reply) => (_jsx(CcfQuickReplyCard, { reply: reply }, reply.id))) }))) : (_jsx(CcfBox, Object.assign({ component: "div", sx: quickRepliesStyles.noMatchFound, style: { flexDirection: 'column' } }, { children: _jsx(CcfBox, { children: _jsx(CcfNoResultFoundIcon, { sx: quickRepliesStyles.noResultFoundIcon }) }) }))) })) })), qrCount > 0 && _jsxs(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.paginationWrapper }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'caption', "data-testid": "pagination" }, (qrCount <= 0 ? { 'aria-hidden': 'true', 'role': 'presentation' } : { 'aria-live': 'polite' }), { children: `${(pageNumber - 1) * pageSize + 1} - ${Math.min(pageNumber * pageSize, totalQRCount)} of ${totalQRCount} ` })), _jsx(CcfButton, Object.assign({ disableRipple: true, sx: Object.assign(Object.assign(Object.assign({}, quickRepliesStyles.quickReplyContainer.prevNextButton), quickRepliesStyles === null || quickRepliesStyles === void 0 ? void 0 : quickRepliesStyles.focussedElement), { transform: 'rotate(-90deg)' }), onClick: () => handlePageChange(pageNumber - 1), disabled: !(navEnabled === null || navEnabled === void 0 ? void 0 : navEnabled.canPrev), "aria-label": translate('previousPage') }, { children: _jsx(CcfUpArrowIcon, { viewBox: '6 -5 4 24' }) })), _jsx(CcfButton, Object.assign({ disableRipple: true, sx: Object.assign(Object.assign(Object.assign({}, quickRepliesStyles.quickReplyContainer.prevNextButton), quickRepliesStyles === null || quickRepliesStyles === void 0 ? void 0 : quickRepliesStyles.focussedElement), { transform: 'rotate(90deg)' }), onClick: () => handlePageChange(pageNumber + 1), disabled: !(navEnabled === null || navEnabled === void 0 ? void 0 : navEnabled.canNext), "aria-label": translate('nextPage') }, { children: _jsx(CcfUpArrowIcon, { viewBox: '6 -2 4 24' }) }))] }))] }));
    };
    const previewOBTemplate = useSelector(getPreviewOutboundTemplate);
    /**
       * Handle filteration on type of value in search field
       * @param e - form event
       * @example - handleSearchValue
      */
    const handleSearchValue = (event) => setSearchValue(event.target.value);
    return (_jsxs(Box, Object.assign({ sx: quickRepliesStyles.quickReplyContainer, ref: replyContainerRef }, { children: [previewReply && (_jsx(Paper, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.previewSection }, { children: _jsx(CcfQuickReplyPreview, {}) }))), !previewReply && previewOBTemplate && (_jsx(Paper, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.previewSection }, { children: _jsx(CcfOutboundTemplatePreview, {}) }))), !previewReply && !previewOBTemplate &&
                _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.listContainer, xs: 12, sm: previewReply ? 6 : 12, item: true }, { children: _jsxs(Paper, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.listSection }, { children: [_jsx(CcfBox, Object.assign({ component: "div", sx: quickRepliesStyles.searchContainer }, { children: _jsx(TextField, { size: "small", InputProps: {
                                                startAdornment: (_jsx(InputAdornment, Object.assign({ position: "start" }, { children: _jsx(CcfSearchIcon, { htmlColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.filter }) }))),
                                            }, placeholder: translate('search'), variant: "outlined", fullWidth: true, value: searchValue, onChange: handleSearchValue, sx: quickRepliesStyles.searchInput, role: "search", inputProps: { maxLength: 255, 'aria-label': `${translate('searchQuickReplies')}`, sx: quickRepliesStyles === null || quickRepliesStyles === void 0 ? void 0 : quickRepliesStyles.searchInputField } }) })), (!showMessageTemplate && showQuickReply) ? (_jsxs(CcfTabs, Object.assign({ currentTab: tab, variant: CcfTabs.Variant.FULL_WIDTH, setCurrentTab: handleChange, sx: quickRepliesStyles.tabsContainer, bottomBorder: true, focusFirstTab: false }, { children: [_jsx(CcfTabs.TabPanel, Object.assign({ label: translate('viewAll') }, { children: displayQuickResponses(allQReplies, getQRepliesCount, currentPage, { canPrev: canGoPrev, canNext: canGoNext }) })), _jsx(CcfTabs.TabPanel, Object.assign({ label: translate('favorties') }, { children: displayQuickResponses(allFavQReplies, getFavoriteQRCount !== null && getFavoriteQRCount !== void 0 ? getFavoriteQRCount : 0, currentFavPage, { canPrev: canGoPrev, canNext: canGoNext }) })), (((_c = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _c === void 0 ? void 0 : _c.hasOutboundTemplates) && isOBWhatsapp) ? (_jsx(CcfTabs.TabPanel, Object.assign({ label: translate('whatsAppMsgTemplates') }, { children: _jsx(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.cardsContainer }, { children: _jsx(CcfMessageTemplates, { searchQuery: searchValue }) })) }))) : undefined] }))) : (_jsxs(CcfTabs, Object.assign({ currentTab: 0, variant: CcfTabs.Variant.FULL_WIDTH, setCurrentTab: handleChange, sx: quickRepliesStyles.tabsContainer, bottomBorder: true }, { children: [_jsx(CcfTabs.TabPanel, Object.assign({ label: translate('whatsAppMsgTemplates') }, { children: _jsx(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.cardsContainer }, { children: _jsx(CcfMessageTemplates, { searchQuery: searchValue }) })) })), _jsx(CcfTabs.TabPanel, { children: _jsx(CcfBox, {}) })] })))] })) })), previewReply && (_jsx(Grid, Object.assign({ xs: 12, sm: 6, item: true }, { children: _jsx(Paper, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.previewSection }, { children: _jsx(CcfQuickReplyPreview, {}) })) })))] }))] })));
}
export default CcfQuickReplies;
//# sourceMappingURL=ccf-quick-replies-v2.js.map