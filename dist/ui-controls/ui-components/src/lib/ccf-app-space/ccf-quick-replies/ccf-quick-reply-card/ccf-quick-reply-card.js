import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { CardHeader, useMediaQuery, useTheme } from '@mui/material';
import parse from 'html-react-parser';
import { CcfCard, CcfFavouriteIcon, CCfToggleIconButton, CcfTypography, CcfButton, CcfBox, useTranslator, CcfAppToastMessage, CcfUnfavoredIcon } from '@nice-devone/ui-controls';
import { updateSelectedQReply, updatePreviewQuickReply, replaceVariables, replaceQucikResponseVariables, updateSentQReply, updateIsQReplySent, setFavQuickReplies, toggleRichMessageSelection, RICH_MESSAGE_TYPES, sendRichMessage, setFavOutboundQuickReplies, getQuickReplyFavoritesToastReference, appSpaceSlice, getAllFavQuickReplies, } from '../../ccf-app-space.slice';
import { MediaType, DigitalMessageContentTypes, DigitalContactStatus } from '@nice-devone/common-sdk';
import { getCxoneDigitalContactUserSavedProperties, getDigitalContactDetailsByCaseId, getActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { globalActions } from '../../../global.app.slice';
import { Navigation } from '../../../../enums/navigation-menus';
import ccfQuickReplyCardStyles from './ccf-quick-reply-card.styles';
import { DYNAMIC_CONTENT_QUICK_RESPONSE, getReplaceVariableDetails, getSecureFormLink } from '../ccf-quick-replies.util';
import { useThrottleClick } from '../../../../hooks/useThrottleClick';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../../ccf-icon/ccf-icon';
import { LINK_ICONS } from '../../../ccf-icon/ccf-icon-list';
import { toast } from 'react-toastify';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
import { useRef } from 'react';
const TIMER_DELAY = 2000;
/**
 * CcfQuickReplyCard - used to disply reply card in quick replies section
 * @param props - CcfQuickReplyCardProps
 * @example `<CcfQuickReplyCard reply=CXoneDigitalQuickReply />`
 */
const CcfQuickReplyCard = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const dispatch = useDispatch();
    const theme = useTheme();
    const cardStyles = ccfQuickReplyCardStyles(theme);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const selectedContact = activeContactInSelectedInteraction && activeContactInSelectedInteraction.media === MediaType.DIGITAL ? activeContactInSelectedInteraction : undefined;
    const digitalContactUserSavedProperties = useSelector(getCxoneDigitalContactUserSavedProperties);
    const { setSelectedMenu } = globalActions;
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const [translate] = useTranslator();
    const isSelected = (_a = props === null || props === void 0 ? void 0 : props.reply) === null || _a === void 0 ? void 0 : _a.isSelected; // To check reply option in selected or not
    const isRichMessage = RICH_MESSAGE_TYPES.includes((_c = (_b = props === null || props === void 0 ? void 0 : props.reply) === null || _b === void 0 ? void 0 : _b.messageContent) === null || _c === void 0 ? void 0 : _c.type); // To validate message type is rich or not
    const isDateTimePickerRichMessage = ((_e = (_d = props === null || props === void 0 ? void 0 : props.reply) === null || _d === void 0 ? void 0 : _d.messageContent) === null || _e === void 0 ? void 0 : _e.type) === DigitalMessageContentTypes.TIME_PICKER;
    const isSecureFormRichMessage = ((_g = (_f = props === null || props === void 0 ? void 0 : props.reply) === null || _f === void 0 ? void 0 : _f.messageContent) === null || _g === void 0 ? void 0 : _g.type) === DigitalMessageContentTypes.FORM;
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId, selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.interactionId));
    const favoritesToastReference = useSelector(getQuickReplyFavoritesToastReference);
    const allFavQuickReplies = useSelector(getAllFavQuickReplies);
    const appToastContainer = useRef();
    /**
     * cardClickHandler - used to select the reply to preview and send to media interaction
     * @example cardClickHandler()
     */
    const cardClickHandler = () => {
        /**
       * selectedCardHandler - required logic to be executed on click of card
       * @example selectedCardHandler()
       */
        const onCardClick = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if (isRichMessage) {
                // As per new v1.0 quick-response GET API standard, we need to consider below conditions
                // if hasVariables flag is true, invoke replace-variable v1.0 API
                // in case of false value, read the messageContent part from GET API list itself
                // Adding new Secure FORM flow logic below, which comes under this logic
                if (props.reply.hasVariables && (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId)) {
                    dispatch(toggleRichMessageSelection({}));
                    dispatch(updateSelectedQReply({}));
                    dispatch(updatePreviewQuickReply(true));
                    const contactQRVariableDetails = {
                        contact: { contactNumber: selectedContact.caseId },
                        externalVariables: props.reply.externalVariables,
                    };
                    const payloadForQRVariable = { replyContent: props.reply, digitalContactExternalVariables: contactQRVariableDetails };
                    yield dispatch(getReplaceVariableDetails(payloadForQRVariable));
                }
                else {
                    if (isSecureFormRichMessage && (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId)) {
                        // TODO: Add same old API logic here for now - Temporary Logic
                        // TODO: When DX FT is turned ON along with Integration Box across all customer regions, then remove this
                        const formDetailsToPost = { formId: (_b = (_a = props.reply.messageContent) === null || _a === void 0 ? void 0 : _a.parameters) === null || _b === void 0 ? void 0 : _b.formId, caseId: selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId };
                        yield dispatch(getSecureFormLink(formDetailsToPost));
                        dispatch(updateSelectedQReply(props.reply));
                        dispatch(updateIsQReplySent(true));
                        dispatch(updatePreviewQuickReply(false));
                        isSmView && dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
                        setTimeout(() => {
                            dispatch(updateIsQReplySent(false));
                        }, 250);
                    }
                    else if (!isDateTimePickerRichMessage) {
                        dispatch(toggleRichMessageSelection(props.reply)); //To toggle the rich message selection
                        return; // if RMS type is not Time Picker/Secure Form, then we will perform 'Send' directly from main QR section
                    }
                    else {
                        dispatch(toggleRichMessageSelection(props.reply)); //To toggle the rich message selection
                        dispatch(updatePreviewQuickReply(true));
                        dispatch(updateSelectedQReply(props.reply));
                    }
                }
            }
            // Below flows should come into effect for Non Rich type QRs only
            // Once other types are moved into new Replace Variable API, below codes need refactoring
            // For Dynamic content type, regex matches anything inside curly braces '{}'
            else if (props.reply.hasVariables || ((_d = (_c = props.reply.content) === null || _c === void 0 ? void 0 : _c.match(/{(.*?)}/g)) === null || _d === void 0 ? void 0 : _d.length) || props.reply.type === DYNAMIC_CONTENT_QUICK_RESPONSE) {
                dispatch(updatePreviewQuickReply(true));
                // For Outbound Draft state contacts, different replace variable API need to get called
                if ((selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.isOutbound) && (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.contactStatus) === DigitalContactStatus.DRAFT) {
                    dispatch(replaceQucikResponseVariables({ replyId: props.reply.id.toString() }));
                }
                else {
                    (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId) && dispatch(replaceVariables({ caseId: selectedContact.caseId, replyId: props.reply.id.toString() }));
                }
                dispatch(updateSelectedQReply(props.reply));
            }
            else {
                dispatch(updateSentQReply(props.reply.content));
                dispatch(updateSelectedQReply(props.reply));
                dispatch(updateIsQReplySent(true));
                dispatch(updatePreviewQuickReply(false));
                isSmView && dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
                setTimeout(() => {
                    dispatch(updateIsQReplySent(false));
                }, 250);
            }
        });
        if (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId) {
            if ((selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.channelName) === 'Email') {
                //Execute only when editor is visible for email channels
                if (Object.keys(digitalContactUserSavedProperties).includes(selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId)) {
                    onCardClick();
                }
            }
            else {
                onCardClick();
            }
        }
    };
    /**
     * Function to handle send button click
     * @example -
     * ```
     * onSendButtonClick();
     * ```
     */
    const onSendButtonClick = useThrottleClick(() => {
        var _a;
        const replyDetails = {
            contactDetails: selectedDigitalContactDetails,
            richMessageDetails: props === null || props === void 0 ? void 0 : props.reply,
            customerName: (_a = selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.customerName) !== null && _a !== void 0 ? _a : selectedDigitalContactDetails.customerName,
        };
        dispatch(sendRichMessage(replyDetails));
    }, TIMER_DELAY); // To limit the API calls on multiple clicks, passing a timer delay to the useThrottleClick hook.
    /**
     * Used to return description of rich messages
     * @example - getDescription(messageContent);
     */
    const getDescription = (message) => {
        var _a, _b;
        switch (message.type) {
            case DigitalMessageContentTypes.QUICK_REPLIES:
                return (_b = (_a = message === null || message === void 0 ? void 0 : message.payload) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.content;
            case DigitalMessageContentTypes.RICH_LINK:
            case DigitalMessageContentTypes.LIST_PICKER:
            case DigitalMessageContentTypes.TIME_PICKER:
                return message.payload.title.content;
            default:
                return null;
        }
    };
    /**
     * Function to narrate favorite option for selected quick response card
     * @example narrationForFavorite()
     */
    const narrationForFavoriteQR = () => {
        var _a, _b, _c;
        return ((_a = props === null || props === void 0 ? void 0 : props.reply) === null || _a === void 0 ? void 0 : _a.isfavorite) ? `${translate('remove')} ${(_b = props === null || props === void 0 ? void 0 : props.reply) === null || _b === void 0 ? void 0 : _b.title} ${translate('card')} ${translate('from')} ${translate('favorites')}` : `${translate('add')} ${(_c = props === null || props === void 0 ? void 0 : props.reply) === null || _c === void 0 ? void 0 : _c.title} ${translate('card')} ${translate('to')} ${translate('favorites')}`;
    };
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    /**
     * Function to handle toggling favorite for Quick Reply.
     * Checks favorite limit and dispatches appropriate action for inbound or outbound.
     * @example -
     * ```
     * handleFavQuickReplyToggle()
     * ```
     */
    const handleFavQuickReplyToggle = () => {
        var _a, _b;
        if (isFavoritesFTEnabled) {
            const FAV_QUICK_REPLY_LIMIT = 25;
            const inboundFavCount = ((_a = allFavQuickReplies === null || allFavQuickReplies === void 0 ? void 0 : allFavQuickReplies.inbound) === null || _a === void 0 ? void 0 : _a.length) || 0;
            const outboundFavCount = ((_b = allFavQuickReplies === null || allFavQuickReplies === void 0 ? void 0 : allFavQuickReplies.outbound) === null || _b === void 0 ? void 0 : _b.length) || 0;
            const favoriteCount = inboundFavCount + outboundFavCount;
            if (!props.reply.isfavorite && favoriteCount >= FAV_QUICK_REPLY_LIMIT) {
                favoritesToastReference && toast.dismiss(favoritesToastReference);
                appToastContainer.current = toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'favsLimitExceeded', extraArgs: { format: [FAV_QUICK_REPLY_LIMIT || ''] } }), {
                    autoClose: false,
                    closeOnClick: true,
                    position: 'top-center',
                    containerId: 'AppToastContainer',
                });
                dispatch(appSpaceSlice.actions.updateFavsToastReference(appToastContainer.current));
                return;
            }
        }
        if (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.isOutbound) {
            dispatch(setFavOutboundQuickReplies(props.reply));
        }
        else {
            dispatch(setFavQuickReplies(props.reply));
        }
    };
    return (_jsxs(CcfCard, Object.assign({ sx: [cardStyles.replyCard, isSelected ? cardStyles.selectedRichMsgCard : {}], onClick: cardClickHandler, "data-testid": "list-item", variant: "outlined" }, { children: [_jsx(CardHeader, { action: _jsx(CCfToggleIconButton, { sx: Object.assign(Object.assign(Object.assign(Object.assign({}, cardStyles.favButton), cardStyles === null || cardStyles === void 0 ? void 0 : cardStyles.textButton), cardStyles === null || cardStyles === void 0 ? void 0 : cardStyles.focussedElement), cardStyles === null || cardStyles === void 0 ? void 0 : cardStyles.hoveredElement), onClick: handleFavQuickReplyToggle, "data-testid": "card-header", disableRipple: true, icon: _jsx(CcfFavouriteIcon, { id: "favoriteIconQuickReply", sx: cardStyles.favReply }), isToggled: props.reply.isfavorite, size: "small", toggleIcon: _jsx(CcfUnfavoredIcon, { id: "toggleFavoriteIcon" }), "aria-label": narrationForFavoriteQR() }), sx: cardStyles.quickReplyHeader, title: _jsxs(CcfBox, { children: [" ", isRichMessage &&
                            _jsx(CcfIcon, { iconName: LINK_ICONS.RICH_MESSAGE_LINK, size: CHANNEL_ICON_SIZE.EXTRA_SMALL, svgIconStyles: { sx: cardStyles.richLinkIcon } }), _jsx("span", Object.assign({ style: { paddingLeft: isRichMessage ? '0.4rem' : 0 } }, { children: props.reply.title }))] }) }), _jsxs(CcfTypography, Object.assign({ sx: cardStyles.replyContent }, { children: [props.reply.type === 'htmlText'
                        ? parse(props.reply.content)
                        : props.reply.content, ((_h = props.reply) === null || _h === void 0 ? void 0 : _h.messageContent) && getDescription(props.reply.messageContent)] })), isRichMessage && isSelected && !isDateTimePickerRichMessage && !isSecureFormRichMessage &&
                _jsx(CcfBox, Object.assign({ display: "flex", sx: cardStyles === null || cardStyles === void 0 ? void 0 : cardStyles.sendButton }, { children: _jsx(CcfButton, Object.assign({ primary: true, size: "small", onClick: onSendButtonClick }, { children: translate('send') })) }))] })));
};
export default CcfQuickReplyCard;
//# sourceMappingURL=ccf-quick-reply-card.js.map