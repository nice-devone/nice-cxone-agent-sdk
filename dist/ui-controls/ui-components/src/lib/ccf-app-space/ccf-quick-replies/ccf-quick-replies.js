import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { InputAdornment, CircularProgress, TextField, Grid, useTheme, Paper, useMediaQuery, } from '@mui/material';
import { CcfBox, CcfSearchIcon, useTranslator, CcfTypography, CcfUpArrowIcon, CcfButton, CcfTabs, CcfNoResultFoundIcon, CcfAppToastMessage } from '@nice-devone/ui-controls';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ccfQuickRepliesStyles from './ccf-quick-replies.styles';
import { getAllQReplies, getFavQReplies, getAllQRepliesOutbound, getFavQRepliesOutbound, getOutboundLoadingStatus, getPreviewQuickReply, getLoadingStatus, updatePreviewQuickReply, resetVarReplacedContent, getPreviewOutboundTemplate, fetchAllMessageTemplates, getQuickReplyToastResponseById, updateQuickReplyToastResponse, getRichMessageSendState, getDraftRichMessagePayload, getClientDataApiFailedFavQkReplyToast, appSpaceSlice, getQuickReplyFavoritesToastReference, } from '../ccf-app-space.slice';
import CcfQuickReplyCard from './ccf-quick-reply-card/ccf-quick-reply-card';
import CcfQuickReplyPreview from './ccf-quick-reply-preview/ccf-quick-reply-preview';
import { getDigitalContactDetailsByCaseId, getDigitalContactMessagesByCaseId, getNonIncomingActiveContactInSelectedInteraction } from './../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { Box } from '@mui/system';
import { DigitalContactStatus, DigitalChannelType, DigitalContactDirection } from '@nice-devone/common-sdk';
import { CcfMessageTemplates } from './ccf-message-templates/ccf-message-templates';
import { CcfOutboundTemplatePreview } from './ccf-message-templates/ccf-outbound-template-preview/ccf-outbound-template-preview';
import { updateSelectedMessageTemplate } from './ccf-message-templates/ccf-outbound-template-preview/ccf-outbound-template-preview.slice';
import { fetchAllQReplies, fetchOutboundQuickReplies } from './ccf-quick-replies.util';
import { toast } from 'react-toastify';
import { globalActions } from '../../global.app.slice';
import { Navigation } from '../../../enums/navigation-menus';
import useComponentDidUpdate from '../../../hooks/useComponentDidUpdate';
import { updateDraftMessageIntoState } from '../../../util/common';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
/**
 * CcfQuickReplies - used to display quick replies component
 * @param props -?-CcfQuickRepliesProps
 * @example <CcfQuickReplies />
 */
export function CcfQuickReplies() {
    var _a, _b, _c, _d, _e, _f, _g;
    const [translate] = useTranslator();
    const theme = useTheme();
    const dispatch = useDispatch();
    const placeHolderValue = translate('search');
    const [searchValue, setSearchValue] = useState('');
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const getDigitalContactMessages = useSelector(getDigitalContactMessagesByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const previewReply = useSelector(getPreviewQuickReply);
    const allQReplies = useSelector(getAllQReplies);
    const favQRepliesLS = (_a = useSelector(getFavQReplies)) !== null && _a !== void 0 ? _a : [];
    const isRepliesLoading = useSelector(getLoadingStatus);
    const allQuickRepliesOutbound = useSelector(getAllQRepliesOutbound);
    const favQRepliesOutbound = (_b = useSelector(getFavQRepliesOutbound)) !== null && _b !== void 0 ? _b : [];
    const isOutboundRepliesLoading = useSelector(getOutboundLoadingStatus);
    const [filteredQReplies, setFilteredQReplies] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredFavReplies, setFilteredFavReplies] = useState([]);
    const favReplies = useRef([]); //used for creating fav reply with all properties
    const [tab, setTab] = useState(0);
    const replyContainerRef = useRef(null);
    const isFirstRender = useRef(true);
    const [showMessageTemplate, setShowMessageTemplate] = useState(false);
    const previewOBTemplate = useSelector(getPreviewOutboundTemplate);
    // this will be by default true, For a new Whatsapp OB contact, if there's no message from customer, all features like quick reply need to be hidden
    const [showQuickReply, setShowQuickReply] = useState(true);
    //use below flag to show spinner for the first time, hide spinner on click of load more
    const [isLoadMoreClicked, _setIsLoadMoreClicked] = useState(false);
    const contactId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId;
    const quickReplyToastDetails = useSelector(getQuickReplyToastResponseById(contactId));
    const isBelowXL = useMediaQuery(theme.breakpoints.down('xl'));
    const pageSize = 25; // Number of items to display per page
    const [totalPages, setTotalPages] = useState();
    const isOBWhatsapp = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === DigitalChannelType.WHATSAPP;
    const richMessageSendStatus = useSelector(getRichMessageSendState);
    const draftRichMessagePayload = useSelector(getDraftRichMessagePayload);
    const showApiFailedToast = useSelector(getClientDataApiFailedFavQkReplyToast);
    const favoritesToastReference = useSelector(getQuickReplyFavoritesToastReference);
    const appToastContainer = useRef();
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    /** This function dismisses any existing favorites toast, then shows a new error toast for favorites-related errors.
   *
   * @param messageKey - The key used to determine the error message to display in the toast.
   * @example -
   * ```
   * showFavoritesErrorToast(messageKey);
   * ```
   */
    const showFavoritesErrorToast = (messageKey) => {
        if (favoritesToastReference)
            toast.dismiss(favoritesToastReference);
        appToastContainer.current = toast.error(_jsx(CcfAppToastMessage, { type: "error", titleKey: "error", messageKey: messageKey }), {
            autoClose: false,
            closeButton: true,
            containerId: 'AppToastContainer',
            position: 'top-center',
        });
        dispatch(appSpaceSlice.actions.setClientDataApiFailedFavQkReplyToast({ storageExceeded: false, apiFailed: false }));
        dispatch(appSpaceSlice.actions.updateFavsToastReference(appToastContainer.current));
    };
    useEffect(() => {
        if ((showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.storageExceeded) && isFavoritesFTEnabled) {
            showFavoritesErrorToast('clientDataApiStorageExceeded');
        }
        else if ((showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.apiFailed) && isFavoritesFTEnabled) {
            showFavoritesErrorToast('networkFailure');
        }
    }, [showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.storageExceeded, showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.apiFailed]);
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
        setCurrentPage(newPage);
    };
    /**
     * This useComponentDidUpdate will show toast messages during quick reply API operations.
     */
    useComponentDidUpdate(() => {
        if (quickReplyToastDetails === null || quickReplyToastDetails === void 0 ? void 0 : quickReplyToastDetails.messageKey) {
            const messageType = (quickReplyToastDetails === null || quickReplyToastDetails === void 0 ? void 0 : quickReplyToastDetails.isError) ? 'error' : 'success';
            const messageComponent = _jsx(CcfAppToastMessage, { type: messageType, messageKey: quickReplyToastDetails === null || quickReplyToastDetails === void 0 ? void 0 : quickReplyToastDetails.messageKey, extraArgs: { format: [(quickReplyToastDetails === null || quickReplyToastDetails === void 0 ? void 0 : quickReplyToastDetails.placeholder) || ''] } });
            const toastOptions = { autoClose: 2000, containerId: 'AppToastContainer', className: 'publicMessageToast', onClose: () => {
                    dispatch(updateQuickReplyToastResponse({ contactId, responseDetails: {} }));
                    isBelowXL && dispatch(globalActions.setSelectedMenu({ name: Navigation.INTERACTION }));
                } };
            toast[messageType](messageComponent, toastOptions);
        }
    }, [quickReplyToastDetails]);
    /**
     * Updating Tab index while Switching Tabs in Quick Replies Panel
     * @param newTabIndex - number
     * @example - handleChange(1)
    */
    const handleChange = (newValue) => {
        var _a;
        if (nonIncomingActiveContactInSelectedInteraction && (nonIncomingActiveContactInSelectedInteraction.contactStatus === DigitalContactStatus.DRAFT && ((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.hasOutboundTemplates))) {
            setTab(0);
        }
        else {
            setTab(newValue);
        }
    };
    /**
     * Filter function to filter the replies based on search value
     * @param list - CXoneDigitalQuickReply[]
     * @example - filterReplies
    */
    const filterReplies = (list) => {
        return list.filter(reply => {
            var _a, _b;
            return (((_a = reply === null || reply === void 0 ? void 0 : reply.title) === null || _a === void 0 ? void 0 : _a.toUpperCase().indexOf(searchValue.toUpperCase())) > -1 ||
                ((_b = reply === null || reply === void 0 ? void 0 : reply.content) === null || _b === void 0 ? void 0 : _b.toUpperCase().indexOf(searchValue.toUpperCase())) > -1);
        });
    };
    useEffect(() => {
        var _a;
        if (allQReplies.length && ((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _a === void 0 ? void 0 : _a.direction) === DigitalContactDirection.INBOUND) {
            setFilteredQReplies(filterReplies(allQReplies));
            favReplies.current = favQRepliesLS.reduce((acc, curr) => {
                acc = [...acc, allQReplies.find((qReply) => qReply.id === curr.id)];
                return acc;
            }, []);
            favReplies.current.sort((a, b) => a.title.localeCompare(b.title));
            setFilteredFavReplies(filterReplies(favReplies.current));
        }
    }, [allQReplies, favQRepliesLS]);
    useEffect(() => {
        var _a;
        if (allQuickRepliesOutbound.length && ((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _a === void 0 ? void 0 : _a.direction) === DigitalContactDirection.OUTBOUND) {
            setFilteredQReplies(filterReplies(allQuickRepliesOutbound));
            favReplies.current = favQRepliesOutbound.reduce((acc, curr) => {
                acc = [...acc, allQuickRepliesOutbound.find((qReply) => qReply.id === curr.id)];
                return acc;
            }, []);
            favReplies.current.sort((a, b) => a.title.localeCompare(b.title));
            setFilteredFavReplies(filterReplies(favReplies.current));
        }
    }, [allQuickRepliesOutbound, favQRepliesOutbound]);
    useEffect(() => {
        if (!isFirstRender.current) {
            const timer = setTimeout(() => {
                if (tab === 0) {
                    setCurrentPage(1);
                    setFilteredQReplies(filterReplies((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound) ? allQuickRepliesOutbound : allQReplies));
                }
                else {
                    favReplies.current.sort((a, b) => a.title.localeCompare(b.title));
                    setFilteredFavReplies(filterReplies(favReplies.current));
                }
            }, 500);
            return () => clearTimeout(timer);
        }
        isFirstRender.current = false;
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);
    useEffect(() => {
        setTotalPages(Math.ceil(filteredQReplies.length / pageSize));
        setDisplayedData(filteredQReplies.slice((currentPage - 1) * pageSize, currentPage * pageSize));
    }, [filteredQReplies, currentPage]);
    useEffect(() => {
        if (tab === 0) {
            setFilteredQReplies(filterReplies((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound) ? allQuickRepliesOutbound : allQReplies));
        }
        else if (tab === 1) {
            setFilteredFavReplies(filterReplies(favReplies.current));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab]);
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
        var _a, _b, _c;
        if (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound) {
            if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) === DigitalContactStatus.DRAFT) {
                dispatch(fetchOutboundQuickReplies({ page: 1, channelId: (_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.id }));
            }
            else {
                dispatch(fetchOutboundQuickReplies({
                    page: 1,
                    channelId: (_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _b === void 0 ? void 0 : _b.id,
                    isCaseStatusNotInDraft: true,
                }));
            }
        }
        else {
            (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) && dispatch(fetchAllQReplies({ contactId: nonIncomingActiveContactInSelectedInteraction.caseId, channelId: (_c = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _c === void 0 ? void 0 : _c.id }));
        }
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId]);
    useEffect(() => {
        // For a new Whatsapp OB contact, if there's no message from customer, all features like quick reply needs to be hidden
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === DigitalChannelType.WHATSAPP &&
            !(getDigitalContactMessages === null || getDigitalContactMessages === void 0 ? void 0 : getDigitalContactMessages.some(({ direction }) => direction === 'inbound'))) {
            setShowQuickReply(true);
        }
        else if (!showQuickReply) {
            setShowQuickReply(true);
        }
    }, [nonIncomingActiveContactInSelectedInteraction, getDigitalContactMessages]);
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
     * Handle filteration on type of value in search field
     * @param e - form event
     * @example - handleSearchValue
    */
    const handleSearchValue = (e) => setSearchValue(e.target.value);
    const quickRepliesStyles = ccfQuickRepliesStyles(theme, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound);
    return (_jsxs(Box, Object.assign({ sx: quickRepliesStyles.quickReplyContainer, ref: replyContainerRef }, { children: [previewReply && (_jsx(Paper, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.previewSection }, { children: _jsx(CcfQuickReplyPreview, {}) }))), !previewReply && previewOBTemplate && (_jsx(Paper, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.previewSection }, { children: _jsx(CcfOutboundTemplatePreview, {}) }))), !previewReply && !previewOBTemplate &&
                _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.listContainer, xs: 12, sm: previewReply ? 6 : 12, item: true }, { children: _jsxs(Paper, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.listSection }, { children: [_jsx(CcfBox, Object.assign({ component: "div", sx: quickRepliesStyles.searchContainer }, { children: _jsx(TextField, { size: "small", InputProps: {
                                                startAdornment: (_jsx(InputAdornment, Object.assign({ position: "start", sx: { color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.filter } }, { children: _jsx(CcfSearchIcon, { htmlColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.filter }) }))),
                                            }, placeholder: placeHolderValue, variant: "outlined", fullWidth: true, value: searchValue, onChange: handleSearchValue, sx: quickRepliesStyles.searchInput, role: "search", inputProps: { maxLength: 255, 'aria-label': `${translate('searchQuickReplies')}`, sx: quickRepliesStyles === null || quickRepliesStyles === void 0 ? void 0 : quickRepliesStyles.searchInputField } }) })), (!showMessageTemplate && showQuickReply) ? (_jsxs(CcfTabs, Object.assign({ currentTab: tab, variant: CcfTabs.Variant.FULL_WIDTH, setCurrentTab: handleChange, sx: quickRepliesStyles.tabsContainer, bottomBorder: true, focusFirstTab: false }, { children: [_jsx(CcfTabs.TabPanel, Object.assign({ label: translate('viewAll') }, { children: _jsxs(_Fragment, { children: [_jsx(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.cardsContainer }, { children: ((isRepliesLoading || isOutboundRepliesLoading) && !isLoadMoreClicked) ? (_jsx(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.loader }, { children: _jsx(CircularProgress, {}) }))) : (_jsxs(_Fragment, { children: [(displayedData === null || displayedData === void 0 ? void 0 : displayedData.length) > 0 && (_jsx(CcfBox, Object.assign({ component: "div" }, { children: displayedData.map((reply) => (_jsx(CcfQuickReplyCard, { reply: reply }, reply.id))) }))), ((displayedData === null || displayedData === void 0 ? void 0 : displayedData.length) <= 0 && searchValue && (_jsx(CcfBox, Object.assign({ component: "div", sx: quickRepliesStyles.noMatchFound, style: { flexDirection: 'column' } }, { children: _jsx(CcfBox, { children: _jsx(CcfNoResultFoundIcon, { sx: quickRepliesStyles.noResultFoundIcon }) }) }))))] })) })), _jsxs(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.paginationWrapper }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'caption', "data-testid": "pagination" }, ((filteredQReplies === null || filteredQReplies === void 0 ? void 0 : filteredQReplies.length) <= 0 && searchValue ? { 'aria-hidden': 'true', 'role': 'presentation' } : { 'aria-live': 'polite' }), { children: currentPage === totalPages
                                                                        ? `${((currentPage - 1) * pageSize) + 1} - ${currentPage * filteredQReplies.length / totalPages} of ${filteredQReplies.length}`
                                                                        : `${currentPage * displayedData.length - (displayedData.length - 1)} - ${currentPage * displayedData.length} of ${filteredQReplies.length}` })), _jsx(CcfButton, Object.assign({ disableRipple: true, sx: Object.assign(Object.assign(Object.assign({}, quickRepliesStyles.quickReplyContainer.prevNextButton), quickRepliesStyles === null || quickRepliesStyles === void 0 ? void 0 : quickRepliesStyles.focussedElement), { transform: 'rotate(-90deg)' }), onClick: () => handlePageChange(currentPage - 1), disabled: currentPage === 1, "aria-label": translate('previousPage') }, { children: _jsx(CcfUpArrowIcon, { viewBox: '6 -5 4 24' }) })), _jsx(CcfButton, Object.assign({ disableRipple: true, sx: Object.assign(Object.assign(Object.assign({}, quickRepliesStyles.quickReplyContainer.prevNextButton), quickRepliesStyles === null || quickRepliesStyles === void 0 ? void 0 : quickRepliesStyles.focussedElement), { transform: 'rotate(90deg)' }), onClick: () => handlePageChange(currentPage + 1), disabled: currentPage === totalPages, "aria-label": translate('nextPage') }, { children: _jsx(CcfUpArrowIcon, { viewBox: '6 -2 4 24' }) }))] }))] }) })), _jsx(CcfTabs.TabPanel, Object.assign({ label: translate('favorties') }, { children: _jsx(CcfBox, Object.assign({ sx: quickRepliesStyles.favListContainer }, { children: (isRepliesLoading || isOutboundRepliesLoading) ? (_jsx(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.loader }, { children: _jsx(CircularProgress, {}) }))) : (_jsxs(_Fragment, { children: [(filteredFavReplies === null || filteredFavReplies === void 0 ? void 0 : filteredFavReplies.length) > 0 && (_jsx(CcfBox, Object.assign({ component: "div" }, { children: filteredFavReplies.map((reply) => (_jsx(CcfQuickReplyCard, { reply: reply }, reply.id))) }))), ((filteredFavReplies === null || filteredFavReplies === void 0 ? void 0 : filteredFavReplies.length) <= 0 && searchValue && (_jsx(CcfBox, Object.assign({ component: "div", sx: quickRepliesStyles.noMatchFound, style: { flexDirection: 'column' } }, { children: _jsx(CcfBox, { children: _jsx(CcfNoResultFoundIcon, { sx: quickRepliesStyles.noResultFoundIcon }) }) }))))] })) })) })), (((_g = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _g === void 0 ? void 0 : _g.hasOutboundTemplates) && isOBWhatsapp) ? (_jsx(CcfTabs.TabPanel, Object.assign({ label: translate('whatsAppMsgTemplates') }, { children: _jsx(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.cardsContainer }, { children: _jsx(CcfMessageTemplates, { searchQuery: searchValue }) })) }))) : undefined] }))) : (_jsxs(CcfTabs, Object.assign({ currentTab: 0, variant: CcfTabs.Variant.FULL_WIDTH, setCurrentTab: handleChange, sx: quickRepliesStyles.tabsContainer, bottomBorder: true }, { children: [_jsx(CcfTabs.TabPanel, Object.assign({ label: translate('whatsAppMsgTemplates') }, { children: _jsx(CcfBox, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.cardsContainer }, { children: _jsx(CcfMessageTemplates, { searchQuery: searchValue }) })) })), _jsx(CcfTabs.TabPanel, { children: _jsx(CcfBox, {}) })] })))] })) })), previewReply && (_jsx(Grid, Object.assign({ xs: 12, sm: 6, item: true }, { children: _jsx(Paper, Object.assign({ sx: quickRepliesStyles.quickReplyContainer.previewSection }, { children: _jsx(CcfQuickReplyPreview, {}) })) })))] }))] })));
}
export default CcfQuickReplies;
//# sourceMappingURL=ccf-quick-replies.js.map