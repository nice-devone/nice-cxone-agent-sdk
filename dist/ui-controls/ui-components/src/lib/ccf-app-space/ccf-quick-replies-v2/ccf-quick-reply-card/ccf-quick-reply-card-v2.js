import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardHeader, useMediaQuery, useTheme } from '@mui/material';
import parse from 'html-react-parser';
import { CcfCard, CcfFavouriteIcon, CCfToggleIconButton, CcfTypography, CcfButton, CcfBox, useTranslator, CcfUnfavoredIcon } from '@nice-devone/ui-controls';
import { updateSelectedQReply, updatePreviewQuickReply, updateSentQReply, updateIsQReplySent, toggleRichMessageSelection, RICH_MESSAGE_TYPES, sendRichMessage, } from '../../ccf-app-space.slice';
import { MediaType, DigitalMessageContentTypes, EventKeys, ELEMENT_ROLES } from '@nice-devone/common-sdk';
import { getCxoneDigitalContactUserSavedProperties, getDigitalContactDetailsByCaseId, getActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { globalActions } from '../../../global.app.slice';
import { Navigation } from '../../../../enums/navigation-menus';
import ccfQuickReplyCardStyles from '../../ccf-quick-replies/ccf-quick-reply-card/ccf-quick-reply-card.styles';
import { getReplaceVariableDetails, toggleFavoriteQuickReply } from '../../ccf-quick-replies/ccf-quick-replies.util';
import { useThrottleClick } from '../../../../hooks/useThrottleClick';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../../ccf-icon/ccf-icon';
import { LINK_ICONS } from '../../../ccf-icon/ccf-icon-list';
const TIMER_DELAY = 2000;
/**
 * CcfQuickReplyCard - used to disply reply card in quick replies section
 * @param props - CcfQuickReplyCardProps
 * @example `<CcfQuickReplyCard reply=CXoneDigitalQuickReply />`
 */
const CcfQuickReplyCard = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
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
    const [cardExpanded, setCardExpanded] = useState(false);
    /**
     * cardClickHandler - used to select the reply to preview and send to media interaction
     * @example cardClickHandler()
     */
    const cardClickHandler = () => {
        /**
       * onCardClick - required logic to be executed on click of card
       * @example onCardClick()
       */
        const onCardClick = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            const reply = props.reply;
            const caseId = selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId;
            const contactQRVariableDetails = {
                contact: { contactNumber: caseId !== null && caseId !== void 0 ? caseId : '' },
                externalVariables: reply.externalVariables,
            };
            if (isRichMessage) {
                if (reply.hasVariables && caseId) {
                    dispatch(toggleRichMessageSelection({}));
                    dispatch(updateSelectedQReply({}));
                    dispatch(updatePreviewQuickReply(true));
                    dispatch(getReplaceVariableDetails({ replyContent: reply, digitalContactExternalVariables: contactQRVariableDetails }));
                }
                else {
                    dispatch(toggleRichMessageSelection(reply));
                    dispatch(updateSelectedQReply(reply));
                    if (isDateTimePickerRichMessage)
                        dispatch(updatePreviewQuickReply(true));
                }
                setCardExpanded(isExpanded => !isExpanded);
                return;
            }
            if (reply.hasVariables) {
                dispatch(updatePreviewQuickReply(true));
                dispatch(getReplaceVariableDetails({ replyContent: reply, digitalContactExternalVariables: contactQRVariableDetails }));
                dispatch(updateSelectedQReply(reply));
                return;
            }
            const textPayload = (_b = (_a = reply === null || reply === void 0 ? void 0 : reply.messageContent) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.text;
            dispatch(updateSentQReply(typeof textPayload === 'string' ? textPayload : ((_c = textPayload === null || textPayload === void 0 ? void 0 : textPayload.content) !== null && _c !== void 0 ? _c : '')));
            dispatch(updateSelectedQReply(reply));
            dispatch(updateIsQReplySent(true));
            dispatch(updatePreviewQuickReply(false));
            if (isSmView)
                dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
            setTimeout(() => {
                dispatch(updateIsQReplySent(false));
            }, 250);
        });
        if (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId) {
            if (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.wysiwygEnabled) {
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
            customerName: (_a = selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.customerName) !== null && _a !== void 0 ? _a : selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.customerName,
        };
        dispatch(sendRichMessage(replyDetails));
    }, TIMER_DELAY); // To limit the API calls on multiple clicks, passing a timer delay to the useThrottleClick hook.
    /**
     * Used to return description of rich messages
     * @param message - CXoneMessageContent
     * @example - getDescription(messageContent);
     */
    const getDescription = (message) => {
        var _a, _b, _c;
        switch (message.type) {
            case DigitalMessageContentTypes.QUICK_REPLIES:
                return (_b = (_a = message === null || message === void 0 ? void 0 : message.payload) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.content;
            case DigitalMessageContentTypes.TEXT:
                return parse(typeof ((_c = message === null || message === void 0 ? void 0 : message.payload) === null || _c === void 0 ? void 0 : _c.text) === 'string' ? message.payload.text : '');
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
        return ((_a = props === null || props === void 0 ? void 0 : props.reply) === null || _a === void 0 ? void 0 : _a.isFavorite) ? `${translate('remove')} ${(_b = props === null || props === void 0 ? void 0 : props.reply) === null || _b === void 0 ? void 0 : _b.title} ${translate('card')} ${translate('from')} ${translate('favorites')}` : `${translate('add')} ${(_c = props === null || props === void 0 ? void 0 : props.reply) === null || _c === void 0 ? void 0 : _c.title} ${translate('card')} ${translate('to')} ${translate('favorites')}`;
    };
    /**
     * Function to handle toggling favorite for Quick Reply.
     * @param reply - CXoneDigitalQuickReply selected QR
     * @example -
     * ```
     * handleFavQuickReplyToggle({...reply});
     * ```
     */
    const handleFavQuickReplyToggle = (reply) => {
        dispatch(toggleFavoriteQuickReply({ quickReplyId: reply.id, markAsFavorite: !reply.isFavorite }));
    };
    /**
     * Function to narrate Qr card content
     * @returns string - Narration for the card
     * @example narrationForQRCard()
     */
    const narrationForQRCard = () => {
        const reply = props === null || props === void 0 ? void 0 : props.reply;
        /*
        * Bydefault narration is set to add quick reply to editor
        * if card is expanded then card expanded narration is set
        * if rich message with variables and case id or date time picker rich message or plain message which has variable then set narration to preview
        * if rich message without variables and not date time picker rich message and card is not expanded then set narration to expand
        * */
        let narration = translate('addQRToEditor', { format: [reply === null || reply === void 0 ? void 0 : reply.title] });
        if (cardExpanded) {
            narration = translate('expandedQR', { format: [reply === null || reply === void 0 ? void 0 : reply.title] });
        }
        else if (!cardExpanded && isRichMessage && (!(reply.hasVariables && (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId)) && !isDateTimePickerRichMessage)) {
            narration = translate('expandQR', { format: [reply === null || reply === void 0 ? void 0 : reply.title] });
        }
        else if ((isRichMessage && ((reply.hasVariables && (selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId)) || isDateTimePickerRichMessage)) || (!isRichMessage && reply.hasVariables)) {
            narration = translate('previewQR', { format: [reply === null || reply === void 0 ? void 0 : reply.title] });
        }
        return narration;
    };
    return (_jsxs(CcfCard, Object.assign({ sx: [cardStyles.replyCard, isSelected ? cardStyles.selectedRichMsgCard : {}], onClick: cardClickHandler, "data-testid": "list-item", variant: "outlined", onKeyDown: (event) => {
            if (!event.target.closest('a') && (event.key === EventKeys.ENTER || event.key === EventKeys.SPACE)) {
                event.preventDefault();
                event.stopPropagation();
                cardClickHandler();
            }
        }, tabIndex: 0, role: cardExpanded ? ELEMENT_ROLES.REGION : ELEMENT_ROLES.BUTTON, "aria-label": narrationForQRCard() }, { children: [_jsx(CardHeader, { action: _jsx(CCfToggleIconButton, { sx: Object.assign(Object.assign(Object.assign(Object.assign({}, cardStyles.favButton), cardStyles === null || cardStyles === void 0 ? void 0 : cardStyles.textButton), cardStyles === null || cardStyles === void 0 ? void 0 : cardStyles.focussedElement), cardStyles === null || cardStyles === void 0 ? void 0 : cardStyles.hoveredElement), onClick: () => { handleFavQuickReplyToggle(props.reply); }, onKeyDown: event => { if (event.key === EventKeys.ENTER || event.key === EventKeys.SPACE) {
                        event.preventDefault();
                        event.stopPropagation();
                        handleFavQuickReplyToggle(props.reply);
                    } }, "data-testid": "card-header", disableRipple: true, icon: _jsx(CcfFavouriteIcon, { id: "favoriteIconQuickReply", sx: cardStyles.favReply }), isToggled: (_h = props === null || props === void 0 ? void 0 : props.reply) === null || _h === void 0 ? void 0 : _h.isFavorite, size: "small", toggleIcon: _jsx(CcfUnfavoredIcon, { id: "toggleFavoriteIcon" }), "aria-label": narrationForFavoriteQR() }), sx: cardStyles.quickReplyHeader, title: _jsxs(CcfBox, { children: [" ", isRichMessage &&
                            _jsx(CcfIcon, { iconName: LINK_ICONS.RICH_MESSAGE_LINK, size: CHANNEL_ICON_SIZE.EXTRA_SMALL, svgIconStyles: { sx: cardStyles.richLinkIcon } }), _jsx("span", Object.assign({ style: cardStyles === null || cardStyles === void 0 ? void 0 : cardStyles.replyCardTitle }, { children: props.reply.title }))] }) }), _jsx(CcfTypography, Object.assign({ sx: cardStyles.replyContentV2 }, { children: ((_j = props.reply) === null || _j === void 0 ? void 0 : _j.messageContent) && getDescription(props.reply.messageContent) })), isRichMessage && isSelected && !isDateTimePickerRichMessage && !isSecureFormRichMessage &&
                _jsx(CcfBox, Object.assign({ display: "flex", sx: cardStyles === null || cardStyles === void 0 ? void 0 : cardStyles.sendButton }, { children: _jsx(CcfButton, Object.assign({ isFocused: true, disableRipple: true, primary: true, size: "small", sx: Object.assign({}, cardStyles.focussedElement), onClick: (e) => { e.stopPropagation(); onSendButtonClick(); } }, { children: translate('send') })) }))] })));
};
export default CcfQuickReplyCard;
//# sourceMappingURL=ccf-quick-reply-card-v2.js.map