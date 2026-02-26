import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useRef, useState } from 'react';
import { Avatar, Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DigitalContactDirection } from '@nice-devone/common-sdk';
import CcfEmailHeaderStyles from './ccf-digital-email-v2-header.style';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { CcfCustomPopOver, CcfEmailSubjectSummary, CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import { canDeleteMessageAuthorName, canDeleteMessageContent, MessageKebabMenu, } from '../../../ccf-assignment-panel/ccf-assignment-utils';
import CcfPopoverTag from '../../../ccf-popover-tag/ccf-popover-tag';
import CcfDigitalEmailV2ReplyContainer from '../ccf-digital-email-v2-reply-container/ccf-digital-email-v2-reply-container';
import { useSelector } from 'react-redux';
import { getIntegratedAgent } from '../../../global.app.slice';
import dayjs from 'dayjs';
import { CcfMessageActionConfirmationDialog } from '../../../ccf-digital/ccf-message-action-confirmation-dialog/ccf-message-action-confirmation-dialog';
import CcfContactMessageTimeStamp from '../../../ccf-digital/ccf-contact-message-container/ccf-contact-message-timestamp';
/**
 * Function to append formatted email addresses to a string.
 * @param existing - The existing string of email addresses.
 * @param formatted - The new formatted email address to append.
 * @returns The updated string of email addresses.
 * ```
 * @example
 * appendFormatted(existing, formatted)
 * ```
 */
export const appendFormatted = (existing, formatted) => {
    return existing === '' ? formatted : `${existing}, ${formatted}`;
};
/**
 * Function to get to cc and bcc fields from recipients
 * @returns an object with to, cc and bcc properties
 * ```
 * @example
 * getToCcBccFields(recipients)
 * ```
 */
export function getToCcBccFields(recipients, sender, isReplyAll) {
    let to = '';
    let cc = '';
    let bcc = '';
    (recipients || []).forEach((recipient) => {
        // To get the formatted email address, we check if the recipient has a name and format accordingly.
        // If the recipient has name, we format it as "Name <email>", otherwise just use the email. 
        const formatted = (recipient === null || recipient === void 0 ? void 0 : recipient.name)
            ? `${recipient === null || recipient === void 0 ? void 0 : recipient.name} <${recipient === null || recipient === void 0 ? void 0 : recipient.idOnExternalPlatform}>`
            : recipient === null || recipient === void 0 ? void 0 : recipient.idOnExternalPlatform;
        if (recipient.isPrimary === true &&
            recipient.isPrivate === false &&
            !(isReplyAll && (recipient === null || recipient === void 0 ? void 0 : recipient.idOnExternalPlatform) === sender)) {
            to = appendFormatted(to, formatted);
        }
        if ((recipient === null || recipient === void 0 ? void 0 : recipient.isPrimary) === false && (recipient === null || recipient === void 0 ? void 0 : recipient.isPrivate) === false) {
            cc = appendFormatted(cc, formatted);
        }
        if ((recipient === null || recipient === void 0 ? void 0 : recipient.isPrimary) === false && (recipient === null || recipient === void 0 ? void 0 : recipient.isPrivate) === true) {
            bcc = appendFormatted(bcc, formatted);
        }
    });
    return {
        to,
        cc,
        bcc,
    };
}
/**
 * CcfEmailHeader component displays the email header with sender details, date, and action icons.
 *
 * @param  props - The sender's details including full name, email, and date.
 * @returns  The rendered email header component.
 * @example
 * ```
 * <CcfEmailHeader message={message} digitalContactDetails={digitalContactDetails} />
 * ```
 */
export const CcfDigitalEmailV2Header = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const theme = useTheme();
    const [translate] = useTranslator();
    const { message, digitalContactDetails, isPreviousCaseMessage, isNextCaseMessage } = props;
    const isIntegratedAgent = useSelector(getIntegratedAgent);
    const sender = message.direction === DigitalContactDirection.OUTBOUND
        ? (_a = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.idOnExternalPlatform
        : (_b = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _b === void 0 ? void 0 : _b.idOnExternalPlatform;
    const hasVisibleRecipients = !!((_c = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.channel) === null || _c === void 0 ? void 0 : _c.hasVisibleRecipients);
    const recipients = hasVisibleRecipients ? message === null || message === void 0 ? void 0 : message.recipients : [];
    const isPrivateChannel = (_d = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.channel) === null || _d === void 0 ? void 0 : _d.isPrivate;
    const isMobile = useMediaQuery(theme.breakpoints.down('md')) || isIntegratedAgent;
    const { to = '', cc = '', bcc = '' } = getToCcBccFields(recipients, sender);
    const isAuthorNameRemoved = Boolean((message === null || message === void 0 ? void 0 : message.authorNameRemoved) !== null);
    const themeStyles = CcfEmailHeaderStyles(theme, isMobile, message === null || message === void 0 ? void 0 : message.direction, isAuthorNameRemoved);
    const isContentRemoved = Boolean((message === null || message === void 0 ? void 0 : message.contentRemoved) !== null);
    const canDeleteAuthorName = canDeleteMessageAuthorName(isAuthorNameRemoved, message === null || message === void 0 ? void 0 : message.direction);
    const canDeleteContent = canDeleteMessageContent(isContentRemoved);
    const toField = useRef(null);
    const addressContainer = useRef(null);
    const replyContainer = useRef(null);
    const toFieldContainer = useRef(null);
    const [nameInitials, setNameInitials] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const channelDisplayName = (_e = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.channel) === null || _e === void 0 ? void 0 : _e.name;
    const [ConfirmationPopupOpenId, setConfirmationPopupOpenId] = useState(null);
    const [messageAction, updateMessageAction] = useState({ action: MessageKebabMenu.DELETE_CONTENT, messageId: '' });
    let from;
    if ((message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.OUTBOUND) {
        from = ((_f = message === null || message === void 0 ? void 0 : message.replyChannel) === null || _f === void 0 ? void 0 : _f.name) || channelDisplayName;
    }
    else {
        const fullName = (_g = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _g === void 0 ? void 0 : _g.fullName;
        const idOnExternalPlatform = (_h = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _h === void 0 ? void 0 : _h.idOnExternalPlatform;
        from = fullName
            ? (_jsxs(_Fragment, { children: [_jsx("b", { children: fullName }), " ", '<', idOnExternalPlatform, '>'] }))
            : idOnExternalPlatform;
    }
    const open = Boolean(anchorEl);
    // Set the popover ID based on whether the popover is open or not
    const popoverId = open ? 'simple-popover' : undefined;
    const [popupWidth, setPopupWidth] = useState(0);
    const day = new Date(message === null || message === void 0 ? void 0 : message.createdAt);
    // Format the date to "MMM DD, YYYY, HH:MM AM/PM"
    const date = dayjs(day).format('MMM D, YYYY h:mm A');
    useEffect(() => {
        const observer = new ResizeObserver(() => {
            var _a;
            if ((toField === null || toField === void 0 ? void 0 : toField.current) && (addressContainer === null || addressContainer === void 0 ? void 0 : addressContainer.current)) {
                const addressContainerWidth = addressContainer.current.offsetWidth;
                // For mobile, we set the popup width to the address container width minus 60px.
                !isMobile ? setPopupWidth(addressContainerWidth - 60) : setPopupWidth(addressContainerWidth);
                const replyContainerWidth = ((_a = replyContainer.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
                toField.current.style.maxWidth = `${addressContainerWidth - replyContainerWidth - 80}px`; // 80px for avatar width and padding which is constant
                if (isMobile && toFieldContainer.current) {
                    toFieldContainer.current.style.width = `${addressContainerWidth - replyContainerWidth - 60}px`; // 60px for avatar width
                }
            }
        });
        if (addressContainer === null || addressContainer === void 0 ? void 0 : addressContainer.current) {
            observer.observe(addressContainer.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [toField]);
    /**
     * Extracts initials from the sender's full name or email.
     * If the full name is available, it takes the first letter of up to two words.
     * If the full name is not available, it takes the first letter of the email.
     *
     * @example setInitials(); // returns "JD" for "John Doe" or "J" for "johndoe\@gmail.com"
     */
    const setInitials = (name) => {
        var _a;
        if (name === null || name === void 0 ? void 0 : name.trim()) {
            const words = name
                .split(/\s+/)
                .filter(Boolean)
                .map((word) => word[0].toUpperCase());
            setNameInitials((_a = words === null || words === void 0 ? void 0 : words.slice(0, 2)) === null || _a === void 0 ? void 0 : _a.join(''));
        }
        else {
            setNameInitials('');
        }
    };
    /**
     * Extracts the display name from the message object.
     * If the message is outbound, it uses the author's full name.
     * If the message is inbound and the author's name is removed, it uses "anonymous".
     * Otherwise, it uses the author's full name or email.
     *
     * @example getDisplayName(); // returns "John Doe" or "anonymous"
     */
    const getDisplayName = () => {
        var _a, _b, _c, _d, _e, _f;
        let name = '';
        if (message.direction === DigitalContactDirection.OUTBOUND && (message === null || message === void 0 ? void 0 : message.authorUser)) {
            name = `${(_a = message === null || message === void 0 ? void 0 : message.authorUser) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = message === null || message === void 0 ? void 0 : message.authorUser) === null || _b === void 0 ? void 0 : _b.surname}`;
            setInitials(name);
        }
        else {
            if (isAuthorNameRemoved) {
                name = translate('anonymous');
                setInitials('');
            }
            else {
                if ((_d = (_c = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _c === void 0 ? void 0 : _c.fullName) === null || _d === void 0 ? void 0 : _d.trim()) {
                    name = (_e = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _e === void 0 ? void 0 : _e.fullName;
                    setInitials(name);
                }
                else {
                    name = (_f = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _f === void 0 ? void 0 : _f.idOnExternalPlatform;
                    setInitials('');
                }
            }
        }
        setDisplayName(name);
    };
    useEffect(() => {
        getDisplayName();
    }, [isAuthorNameRemoved]);
    /**
     * Renders a container displaying the formatted date and time.
     *
     * @returns A JSX element containing the date and time.
     * @example getDateContainer(); // returns a Box component with date and time
     */
    function getDateContainer() {
        return (_jsx(Box, Object.assign({ sx: themeStyles.dateStyles }, { children: _jsx(CcfContactMessageTimeStamp, { createdAt: message === null || message === void 0 ? void 0 : message.createdAt, direction: message === null || message === void 0 ? void 0 : message.direction, timestampPlacement: 'bottom-start', arrow: false }) })));
    }
    /**
     * Handles the selection of a kebab menu item.
     * Currently, it does not perform any action.
     *
     * @param item - The selected menu item.
     * @example onKebabMenuItemSelection(item); // handles the selection of a menu item
     */
    const onKebabMenuItemSelection = (item) => () => {
        var _a;
        switch (item.type) {
            case MessageKebabMenu.DELETE_AUTHOR_NAME:
            case MessageKebabMenu.DELETE_CONTENT:
                setConfirmationPopupOpenId(message === null || message === void 0 ? void 0 : message.id);
                updateMessageAction({ action: item.type, messageId: (_a = message === null || message === void 0 ? void 0 : message.id) !== null && _a !== void 0 ? _a : '' });
                break;
            default:
                return;
        }
        ;
    };
    return (_jsxs(Box, Object.assign({ display: "flex", p: 1, pr: 0, sx: { gap: isMobile ? 1 : 0 }, ref: addressContainer, role: "group", tabIndex: 0 }, { children: [_jsxs(Box, Object.assign({ sx: themeStyles.addressContainer, mr: !isMobile ? 1 : 0 }, { children: [_jsx(Avatar, Object.assign({ sx: themeStyles.avatar, alt: nameInitials }, { children: nameInitials !== '' && nameInitials })), _jsxs(Box, Object.assign({ sx: { flex: 1 } }, { children: [_jsxs(Box, Object.assign({ display: "flex", sx: isMobile ? { marginBottom: '-0.8rem' } : themeStyles.displayNameContainer }, { children: [_jsx(CcfTooltip, Object.assign({ title: displayName }, { children: _jsx(Typography, Object.assign({ variant: "h6", component: "h2", sx: themeStyles.displayName, "aria-label": `${translate('from')} ${displayName}`, tabIndex: 0 }, { children: displayName })) })), _jsx(Box, Object.assign({ sx: themeStyles.tagsStyle }, { children: _jsx(CcfPopoverTag, { author: displayName, isPrivateChannel: isPrivateChannel, id: 'messageTag', message: message, isPreviousCaseMessage: isPreviousCaseMessage, isNextCaseMessage: isNextCaseMessage }) }))] })), _jsxs(Box, Object.assign({ sx: themeStyles.toContainer }, { children: [_jsxs(Box, Object.assign({ ref: toFieldContainer, sx: themeStyles.toFieldContainer, tabIndex: 0, "aria-label": `${translate('recipient')} ${to}` }, { children: [to !== '' ? (_jsx(CcfTooltip, Object.assign({ title: to }, { children: _jsxs(Box, Object.assign({ component: "span", sx: themeStyles.toField, ref: toField, "data-testid": "toField" }, { children: [translate('to'), ": ", to] })) }))) : _jsx(Box, { ref: toField }), _jsx(IconButton, Object.assign({ sx: { padding: 0 }, "aria-describedby": popoverId, onClick: () => { setAnchorEl(toField.current); }, "aria-label": translate('viewDetails') }, { children: _jsx(ArrowDropDownIcon, { "aria-hidden": "true", sx: themeStyles.downArrowIconStyle }) })), _jsx(CcfCustomPopOver, Object.assign({ id: popoverId || '', open: open, onClose: () => setAnchorEl(null), anchorEl: anchorEl, popoverMaxWidth: popupWidth, isMobile: isMobile }, { children: _jsx(CcfEmailSubjectSummary, { from: isAuthorNameRemoved ? '' : from, to: to, cc: cc, bcc: bcc, date: date, subject: (!isContentRemoved && (message === null || message === void 0 ? void 0 : message.title)) ? message === null || message === void 0 ? void 0 : message.title : '' }) }))] })), isMobile && (_jsx(Box, Object.assign({ sx: themeStyles.buttonContainer, ref: replyContainer }, { children: _jsx(CcfDigitalEmailV2ReplyContainer, { message: message, canDeleteContent: canDeleteContent, canDeleteAuthorName: canDeleteAuthorName, digitalContactDetails: digitalContactDetails, onKebabMenuItemSelection: onKebabMenuItemSelection, isPreviousCaseMessage: isPreviousCaseMessage, isNextCaseMessage: isNextCaseMessage }) })))] })), isMobile && getDateContainer()] }))] })), !isMobile && (_jsxs(Box, Object.assign({ sx: themeStyles.iconContainer, ref: replyContainer, ml: 2 }, { children: [_jsx(Box, Object.assign({ sx: themeStyles.buttonContainer }, { children: _jsx(CcfDigitalEmailV2ReplyContainer, { message: message, canDeleteContent: canDeleteContent, canDeleteAuthorName: canDeleteAuthorName, digitalContactDetails: digitalContactDetails, onKebabMenuItemSelection: onKebabMenuItemSelection, isPreviousCaseMessage: isPreviousCaseMessage, isNextCaseMessage: isNextCaseMessage }) })), getDateContainer()] }))), ConfirmationPopupOpenId === (message === null || message === void 0 ? void 0 : message.id) && _jsx(CcfMessageActionConfirmationDialog, { isOpen: ConfirmationPopupOpenId === (message === null || message === void 0 ? void 0 : message.id), messageId: messageAction.messageId, caseId: (_j = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _j === void 0 ? void 0 : _j.id, interactionId: (_l = (_k = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _k === void 0 ? void 0 : _k.interactionId) !== null && _l !== void 0 ? _l : '', action: messageAction.action, onCancelClick: () => setConfirmationPopupOpenId(null), isPreviousCaseMessage: isPreviousCaseMessage, isNextCaseMessage: isNextCaseMessage })] })));
};
export default memo(CcfDigitalEmailV2Header);
//# sourceMappingURL=ccf-digital-email-v2-header.js.map