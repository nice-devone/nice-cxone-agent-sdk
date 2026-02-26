import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { DigitalChannelType, SLAIndicatorType, } from '@nice-devone/common-sdk';
import CloseIcon from '@mui/icons-material/Close';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../../ccf-icon/ccf-icon';
import { CHANNEL_TYPE, revamped_icons } from '../../../ccf-icon/ccf-icon-list';
import { useDispatch, useSelector } from 'react-redux';
import { CcfAssignmentAction, getCollapsedCard, getDigitalContactDetailsByCaseId, selectInboxCollapsedState, updateDigitalMessageReadStatus, dismissPreviewContact, getContactDetailsForSelectedContact, getActiveContactInSelectedInteraction, getAllInteractions, getNonIncomingActiveContactInSelectedInteraction, getSelectedInteraction } from '../../ccf-assignment-panel.slice';
import ccfAssignmentCardStyle from '../ccf-assignment-card.style';
import { CcfBox, CcfCard, CcfInboundIcon, CcfOutboundIcon, CcfTooltip, CcfTypography } from '@nice-devone/ui-controls';
import { Navigation } from '../../../../enums/navigation-menus';
import { globalActions, updateExternalProdURL } from '../../../global.app.slice';
import { CXoneAgentEvents } from '@nice-devone/shared-apps-lib';
import { cxoneCCActivity } from '../../../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import ccfPreviewOnlyContactCardStyle from './ccf-preview-only-contact-card.style';
import { getChannelNameForNarration } from '../../ccf-assignment-utils';
/**
 * Component to display card for preview only contact
 * ```
 * @example-
 * <CcfPreviewOnlyContactCard />
 * ```
 */
export const CcfPreviewOnlyContactCard = (props) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const { caseId, interactionId } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const allInteractions = useSelector(getAllInteractions);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const contact = (_a = allInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[caseId];
    const cardStyles = ccfPreviewOnlyContactCardStyle(theme, (contact === null || contact === void 0 ? void 0 : contact.caseId) !== (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId) ? true : false);
    const getDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(contact === null || contact === void 0 ? void 0 : contact.caseId, contact === null || contact === void 0 ? void 0 : contact.interactionId));
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const assignmentCardStyle = ccfAssignmentCardStyle(theme, SLAIndicatorType.NORMAL, true);
    const collapsedCard = useSelector(getCollapsedCard);
    const { setSelectedMenu } = globalActions;
    const activityData = useSelector(cxoneCCActivity);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const selectedActivityData = activityData === null || activityData === void 0 ? void 0 : activityData.find((item) => item.contactId === (contact === null || contact === void 0 ? void 0 : contact.contactId));
    const isChannelIconRevamped = (contact === null || contact === void 0 ? void 0 : contact.channelName) ? revamped_icons.includes((_b = contact === null || contact === void 0 ? void 0 : contact.channelName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) : false;
    const selectedInteractionId = useSelector(getSelectedInteraction);
    /**
     * Used to get the style for expanded inbox card based on contact properties
     * @example getExpandedCardStyle()
     */
    const getExpandedCardStyle = () => {
        var _a, _b;
        let style = {};
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) === caseId) {
            style = Object.assign({}, assignmentCardStyle.active);
        }
        else {
            style = Object.assign(Object.assign({}, assignmentCardStyle.inactive), { backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.digitalTag });
        }
        return style;
    };
    /**
     * Function is executed when user clicks on an preview only card
     * @example updateSelectedContact()
     */
    const updateSelectedContact = () => {
        dispatch(CcfAssignmentAction.setSelectedContactId({ interactionId: contact.interactionId, contactId: contact.caseId }));
        const contactCollapse = {
            caseId: contact === null || contact === void 0 ? void 0 : contact.caseId,
            contactId: contact === null || contact === void 0 ? void 0 : contact.contactId,
            detail: true,
            contact: false,
            channels: false,
            activity: true,
            currentInteraction: true,
        };
        dispatch(CcfAssignmentAction.setActiveCollapse([...collapsedCard, contactCollapse]));
        if (!isSmView) {
            dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
            updateExternalProdURL(null, Navigation.INTERACTION, null);
        }
        else {
            if (isBelowMd) {
                dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: true, isLargeView: !(isBelowMd) }));
            }
            dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
            updateExternalProdURL(null, Navigation.INTERACTION, null);
        }
        dispatch(updateDigitalMessageReadStatus({
            interactionId: contact === null || contact === void 0 ? void 0 : contact.interactionId,
            caseId: contact === null || contact === void 0 ? void 0 : contact.caseId,
        }));
        const eventArgs = {};
        eventArgs.detail = selectedActivityData;
        const contactSwitchEvent = new CustomEvent(CXoneAgentEvents.CONTACT_SWITCH_EVENT, eventArgs);
        if ((contact === null || contact === void 0 ? void 0 : contact.caseId) && (contact === null || contact === void 0 ? void 0 : contact.interactionId) !== selectedInteractionId) // check if the contact is already selected or not, if not then call the details API and event hub subscription on contact switch
         {
            dispatch(getContactDetailsForSelectedContact({ contactId: contact === null || contact === void 0 ? void 0 : contact.caseId, isAssignedToAgentInbox: false, forceFetch: true })); //call details API and event hub subscription on contact switch
        }
        window.dispatchEvent(contactSwitchEvent);
    };
    /**
     * Function is executed when user dismisses the contact
     * @example dismissContactHandler(event)
     */
    const dismissContactHandler = (event) => {
        event.stopPropagation(); //to stop the event propagation to the contact card when cross icon is clicked, else it will run on click function of contact card
        dispatch(dismissPreviewContact(getDigitalContactDetails));
    };
    return (_jsxs(CcfBox, Object.assign({ className: "card", onClick: updateSelectedContact, id: "preview-only-contact-card", onKeyUp: (e) => {
            if (e.key === 'Enter')
                updateSelectedContact();
        }, sx: cardStyles.previewOnlyContactCard }, { children: [!((_c = getDigitalContactDetails === null || getDigitalContactDetails === void 0 ? void 0 : getDigitalContactDetails.channel) === null || _c === void 0 ? void 0 : _c.isPrivate) &&
                (contact === null || contact === void 0 ? void 0 : contact.channelName) !== DigitalChannelType.EMAIL && (_jsx(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, assignmentCardStyle.globeIconWrapper), (isInboxCollapsed
                    ? assignmentCardStyle.collapsedGlobeIconWrapper
                    : assignmentCardStyle.expandedGlobeIconWrapper)) }, { children: _jsx(CcfIcon, { iconName: CHANNEL_TYPE.PUBLIC, size: CHANNEL_ICON_SIZE.EXTRA_SMALL, svgIconStyles: {
                        htmlColor: theme.palette.text.black,
                        sx: isInboxCollapsed
                            ? assignmentCardStyle.globeIconCollapsed
                            : assignmentCardStyle.globeIconExpanded,
                    } }) }))), isInboxCollapsed ? (_jsx(CcfCard, Object.assign({ sx: (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) === caseId
                    ? Object.assign({}, assignmentCardStyle.activeCardCollapsed) : Object.assign({}, assignmentCardStyle.inactiveCardCollapsed), id: "inbox-collapsed-preview-card", "aria-labelledby": getChannelNameForNarration(contact === null || contact === void 0 ? void 0 : contact.isOutbound, contact === null || contact === void 0 ? void 0 : contact.channelName) }, { children: _jsxs(CcfBox, Object.assign({ style: cardStyles.inboxCollapsedCardContent }, { children: [(contact === null || contact === void 0 ? void 0 : contact.channelName) && (contact === null || contact === void 0 ? void 0 : contact.isOutbound) !== null &&
                            ((contact === null || contact === void 0 ? void 0 : contact.isOutbound) ? (_jsx(CcfIcon, { iconName: (_d = (isChannelIconRevamped ? (contact === null || contact === void 0 ? void 0 : contact.channelName) + '_outbound' : contact === null || contact === void 0 ? void 0 : contact.channelName)) === null || _d === void 0 ? void 0 : _d.toLowerCase(), size: CHANNEL_ICON_SIZE.SMALL })) : (_jsx(CcfIcon, { iconName: (_e = (isChannelIconRevamped ? (contact === null || contact === void 0 ? void 0 : contact.channelName) + '_inbound' : contact === null || contact === void 0 ? void 0 : contact.channelName)) === null || _e === void 0 ? void 0 : _e.toLowerCase(), size: CHANNEL_ICON_SIZE.SMALL }))), (contact === null || contact === void 0 ? void 0 : contact.channelName) && !isChannelIconRevamped && (contact === null || contact === void 0 ? void 0 : contact.isOutbound) !== null &&
                            ((contact === null || contact === void 0 ? void 0 : contact.isOutbound) ? (_jsx(CcfOutboundIcon, { viewBox: "7 -1 24 24", fontSize: "small" })) : (_jsx(CcfInboundIcon, { viewBox: "7 -1 24 24", fontSize: "small" }))), _jsx(IconButton, Object.assign({ "aria-label": "close", sx: ((contact === null || contact === void 0 ? void 0 : contact.channelName) && !isChannelIconRevamped) ? cardStyles.inboxCollapsedCloseIcon : cardStyles.revampinboxCollapsedCloseIcon, onClick: dismissContactHandler }, { children: _jsx(CloseIcon, { fontSize: "small" }) }))] })) }))) : (_jsx(CcfCard, Object.assign({ id: "inbox-expanded-preview-card", sx: getExpandedCardStyle(), "aria-labelledby": getChannelNameForNarration(contact === null || contact === void 0 ? void 0 : contact.isOutbound, contact === null || contact === void 0 ? void 0 : contact.channelName) }, { children: _jsxs(CcfBox, Object.assign({ className: `cardLeft ${(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) === caseId ? 'cardLeftActive' : ''}`, sx: Object.assign({}, cardStyles.inboxExpandedCardContainer), style: { display: 'flex', flexDirection: 'row', padding: '0.5rem', width: '100%' } }, { children: [_jsxs(CcfBox, Object.assign({ sx: cardStyles.iconAndCustomerNameWrapper }, { children: [(contact === null || contact === void 0 ? void 0 : contact.channelName) && (_jsx(CcfBox, Object.assign({ style: { display: 'flex' } }, { children: (contact === null || contact === void 0 ? void 0 : contact.isOutbound) !== null &&
                                        ((contact === null || contact === void 0 ? void 0 : contact.isOutbound) ? (_jsx(CcfIcon, { iconName: (_f = (isChannelIconRevamped ? (contact === null || contact === void 0 ? void 0 : contact.channelName) + '_outbound' : contact === null || contact === void 0 ? void 0 : contact.channelName)) === null || _f === void 0 ? void 0 : _f.toLowerCase(), size: CHANNEL_ICON_SIZE.SMALL })) : (_jsx(CcfIcon, { iconName: (_g = (isChannelIconRevamped ? (contact === null || contact === void 0 ? void 0 : contact.channelName) + '_inbound' : contact === null || contact === void 0 ? void 0 : contact.channelName)) === null || _g === void 0 ? void 0 : _g.toLowerCase(), size: CHANNEL_ICON_SIZE.SMALL }))) }))), _jsx(Stack, Object.assign({ flexDirection: "row", overflow: "hidden", textOverflow: "ellipsis" }, { children: _jsx(Stack, Object.assign({ flexDirection: "column", sx: cardStyles.customerNameContainer }, { children: _jsx(CcfTooltip, Object.assign({ title: contact === null || contact === void 0 ? void 0 : contact.customerName, arrow: true }, { children: _jsx("div", { children: _jsx(CcfTypography, Object.assign({ variant: "inherit", sx: cardStyles.customerName }, { children: contact === null || contact === void 0 ? void 0 : contact.customerName })) }) })) })) }))] })), _jsx(IconButton, Object.assign({ "aria-label": "close", onClick: dismissContactHandler, sx: cardStyles.crossIcon }, { children: _jsx(CloseIcon, { fontSize: "small" }) }))] })) })))] })));
};
//# sourceMappingURL=ccf-preview-only-contact-card.js.map