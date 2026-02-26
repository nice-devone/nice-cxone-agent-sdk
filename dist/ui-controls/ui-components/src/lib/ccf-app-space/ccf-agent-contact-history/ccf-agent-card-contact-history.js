import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import agentContactHistoryStyles, { contactHistoryAdaptiveCardCSS } from './ccf-agent-card-contact-history.style';
import { useTheme, useMediaQuery } from '@mui/material';
import { CcfBox, useTranslator } from '@nice-devone/ui-controls';
import encodeSVG from '../ccf-customer-card/ccf-customer-card-contact-history/ccf-encode-svg';
import { CHANNEL_ICON_NAME, iconList, revamped_icons, } from '../../ccf-icon/ccf-icon-list';
import { cxoneAgentVoiceContactData, getAcdContactHistory, getDigitalContactHistory, cxoneAgentDigitalContactData, getRoutingQueueId, cxoneRoutingQueuId, getDigitalUserId, } from './ccf-agent-contact-history.slice';
import { DigitalContactDirection, MediaType, MediaTypeId, formatDateTime, getTimeStringFromMS, } from '@nice-devone/common-sdk';
import { cxoneDigitalStatus, cxoneVoiceStatus, } from '../ccf-customer-card/ccf-customer-card.slice';
import { LocalStorageHelper, NotificationSettings } from '@nice-devone/core-sdk';
import { getApplicationLocale } from '../../global.app.slice';
import { currentUserAgentId } from '../../ccf-agent-state/ccf-agent-state.slice';
import { voiceMailContactSelector, workItemContactSelector } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfAgentCardContactHistoryView from './ccf-agent-card-contact-history-view';
/**
   * Method to get SVG based on channel icons
   * @param channel -string
   * @param size - 'S' (small) | 'M' (medium) | 'L' (large)
   * @returns icon component for project
   * @example getChannelSVG(channel, size)
   */
const getChannelSVG = (channel, theme, size = 'S') => {
    var _a, _b;
    if (Object.values(CHANNEL_ICON_NAME).includes(channel)) {
        if (channel === CHANNEL_ICON_NAME.VOICEMAIL || channel === CHANNEL_ICON_NAME.WORK_ITEM_TRANSPARENT) {
            return iconList[channel](size, { htmlColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.noteLabel });
        }
        else {
            return iconList[channel](size);
        }
    }
};
/**
 * Format Digital contact details for App Space (Agent Contact history)
 * @returns AgentContactHistory[]
 * @example formatDigitalContactHistory(history, routingQIds, 'en-US', true)
 */
const formatDigitalContactHistory = (contactHistory, routingQueueIds, locale, is12HrTime, NOT_AVAILABLE, theme, translate) => {
    return contactHistory.map((digitalContact) => {
        var _a, _b, _c, _d;
        let contactName = null;
        const { authorEndUserIdentity, endUserRecipients, endUser, id } = digitalContact;
        if ((authorEndUserIdentity === null || authorEndUserIdentity === void 0 ? void 0 : authorEndUserIdentity.externalPlatformId) === 'chat') {
            contactName = authorEndUserIdentity.fullName;
        }
        else if (digitalContact.direction === DigitalContactDirection.OUTBOUND) {
            contactName = (authorEndUserIdentity === null || authorEndUserIdentity === void 0 ? void 0 : authorEndUserIdentity.externalPlatformId) ||
                ((_a = endUserRecipients[0]) === null || _a === void 0 ? void 0 : _a.idOnExternalPlatform);
        }
        else {
            contactName = (_b = endUser === null || endUser === void 0 ? void 0 : endUser.identities[0]) === null || _b === void 0 ? void 0 : _b.idOnExternalPlatform;
        }
        // It is possible for the contact name to be undefined/null for digital
        contactName = contactName || NOT_AVAILABLE;
        let channel = (authorEndUserIdentity && (authorEndUserIdentity === null || authorEndUserIdentity === void 0 ? void 0 : authorEndUserIdentity.externalPlatformId)) || (endUser && ((_c = endUser === null || endUser === void 0 ? void 0 : endUser.identities[0]) === null || _c === void 0 ? void 0 : _c.externalPlatformId)) || '';
        if (revamped_icons.includes(channel.toLowerCase())) {
            channel = (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.direction) === 'outbound' ? channel + '_OB' : channel + '_IB';
        }
        const channelName = (channel && CHANNEL_ICON_NAME[(_d = channel === null || channel === void 0 ? void 0 : channel.toUpperCase()) === null || _d === void 0 ? void 0 : _d.replace(/-/g, '_')]) || '';
        const channelIconNameTranslationKey = channelName === null || channelName === void 0 ? void 0 : channelName.replace(/-/g, '_');
        const isChannelIconNameTranslationAvailable = translate(channelIconNameTranslationKey);
        const channelAltTxt = isChannelIconNameTranslationAvailable ? translate(channelIconNameTranslationKey) : channelName === null || channelName === void 0 ? void 0 : channelName.replace(/_/g, ' ');
        const icon = getChannelSVG(channelName, theme);
        const channelIcon = channel ? encodeSVG(icon) : '';
        const routingQueueId = routingQueueIds === null || routingQueueIds === void 0 ? void 0 : routingQueueIds.find(element => digitalContact.routingQueueId === element.id);
        const skill = (routingQueueId === null || routingQueueId === void 0 ? void 0 : routingQueueId.name) || '';
        const statusDate = digitalContact.statusUpdatedAt || new Date(digitalContact.createdAt);
        const statusUpdatedDate = statusDate.toLocaleDateString();
        const statusUpdatedDateTime = formatDateTime(statusDate.toUTCString(), locale, is12HrTime);
        return {
            contactId: id,
            contactName,
            skill,
            channelIcon,
            channelName,
            channelAltTxt,
            mediaType: MediaType.DIGITAL,
            dispositionStatus: digitalContact.status,
            statusUpdatedDate,
            statusUpdatedDateTime,
            statusUpdatedDateTimeMillis: statusDate.getTime(),
        };
    });
};
/**
 * Format ACD contact details for App Space (Agent Contact history)
 * @returns AgentContactHistory[]
 * @example formatDigitalContactHistory(history, 'en-US', true)
*/
const formatAcdContactHistory = (contactHistory, locale, is12HrTime, NOT_AVAILABLE, theme, translate) => {
    return contactHistory.map((voiceContact) => {
        var _a;
        const contactName = (voiceContact.isOutbound ? voiceContact.toAddr : voiceContact.fromAddr) || NOT_AVAILABLE;
        let channelName;
        switch (voiceContact.mediaType) {
            case MediaTypeId.PhoneCall.toString():
                channelName = voiceContact.isOutbound ? CHANNEL_ICON_NAME.OBCALL : CHANNEL_ICON_NAME.IBCALL;
                break;
            // TODO: Need to correct VoiceEmail name.
            case MediaTypeId.VoiceEmail.toString():
                channelName = CHANNEL_ICON_NAME.VOICEMAIL;
                break;
            case MediaTypeId.WorkItem.toString():
                channelName = CHANNEL_ICON_NAME.WORK_ITEM_TRANSPARENT;
                break;
            default:
                channelName = voiceContact.isOutbound ? CHANNEL_ICON_NAME.OBCALL : CHANNEL_ICON_NAME.IBCALL;
        }
        const icon = getChannelSVG(channelName, theme);
        const channelIcon = encodeSVG(icon);
        const channelIconNameTranslationKey = channelName === null || channelName === void 0 ? void 0 : channelName.replace(/-/g, '_');
        const isChannelIconNameTranslationAvailable = translate(channelIconNameTranslationKey);
        const channelAltTxt = isChannelIconNameTranslationAvailable ? translate(channelIconNameTranslationKey) : channelName === null || channelName === void 0 ? void 0 : channelName.replace(/_/g, ' ');
        const statusDate = new Date(voiceContact.contactStart || '');
        const statusUpdatedDate = statusDate.toLocaleDateString(locale);
        const statusUpdatedDateTime = formatDateTime(statusDate.toUTCString(), locale, is12HrTime);
        const dispositionNotes = voiceContact.dispositionNotes || '';
        const interactionDuration = getTimeStringFromMS((voiceContact.totalDurationSeconds || 0) * 1000);
        const tags = ((_a = voiceContact
            .tags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.TagName)) || null;
        return {
            contactId: voiceContact.contactId || '',
            contactName,
            channelName,
            skill: voiceContact.skillName || NOT_AVAILABLE,
            skillId: voiceContact.skillId,
            dispositionId: voiceContact.primaryDispositionId,
            channelIcon,
            channelAltTxt,
            statusUpdatedDate,
            statusUpdatedDateTime,
            dispositionStatus: 'Closed',
            dispositionNotes,
            mediaType: MediaType.VOICE,
            interactionDuration,
            tags,
            statusUpdatedDateTimeMillis: statusDate.getTime(),
        };
    });
};
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export function CcfAgentContactHistory() {
    const theme = useTheme();
    const style = agentContactHistoryStyles(theme);
    const adaptiveCardCSS = contactHistoryAdaptiveCardCSS(theme);
    const [contactHistory, setContactHistory] = useState([]);
    const digitalContactDetails = useSelector(cxoneDigitalStatus);
    const voiceContactDetails = useSelector(cxoneVoiceStatus);
    const workItemContactDetails = useSelector(workItemContactSelector);
    const voiceMailContactDetails = useSelector(voiceMailContactSelector);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const routingQueuIds = useSelector(cxoneRoutingQueuId);
    const digitalContactData = useSelector(cxoneAgentDigitalContactData);
    const acdContactData = useSelector(cxoneAgentVoiceContactData);
    const [translate] = useTranslator();
    const is12HrTime = !(LocalStorageHelper.getItem(NotificationSettings.TWENTY_FOUR_HOUR_TIME) === 'true');
    const locale = useSelector(getApplicationLocale);
    const [selectedContactHistory, setSelectedContactHistory] = useState(null);
    // Currently, we don't have breakpoints defined in cxone-agent/src/cxone-agent.theme.config.ts
    // so using a self defined number 500.
    const integratedView = useMediaQuery(theme.breakpoints.down(500));
    const NOT_AVAILABLE = translate('notAvailable');
    const icAgentId = useSelector(currentUserAgentId);
    /**
     * hostconfig property is a pre-defined & mandatory to render the Adaptive card on UI.
     * */
    const hostConfig = {
        fontFamily: '',
    };
    const [DispositionModal, setDispositionModal] = useState(null);
    useEffect(() => {
        if ((routingQueuIds === null || routingQueuIds === void 0 ? void 0 : routingQueuIds.length) <= 0) {
            // To avoid multiple calls to get routing name will call the API only on initial load
            dispatch(getRoutingQueueId(''));
        }
    }, []);
    useEffect(() => {
        dispatch(getDigitalUserId()).unwrap().then(digitalUserId => {
            if (!digitalUserId)
                return;
            // retrieve digital contact history
            const digitalContactHistoryRequest = {
                ownerAssignee: digitalUserId,
            };
            dispatch(getDigitalContactHistory(digitalContactHistoryRequest));
        });
    }, [digitalContactDetails]);
    useEffect(() => {
        /**
          * lazily loaded the renderCcfDispositionModal
          * @example renderCcfDispositionModal()
          */
        const renderCcfDispositionModal = () => __awaiter(this, void 0, void 0, function* () {
            const dispositionModal = yield import('./disposition-modal');
            const CcfDispositionModal = dispositionModal.DispositionModal;
            setDispositionModal(_jsx(CcfDispositionModal, { setModalData: setSelectedContactHistory, modalData: selectedContactHistory }));
        });
        setDispositionModal(null);
        if (selectedContactHistory) {
            renderCcfDispositionModal();
        }
    }, [selectedContactHistory]);
    useEffect(() => {
        // retrieve ACD contact history
        if (!icAgentId)
            return;
        const currentDate = new Date();
        const startDate = new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000); // Subtract 3 days in milliseconds
        const endDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add 1 day in milliseconds
        const acdContactHistoryRequest = {
            startDate: startDate.toUTCString(),
            endDate: endDate.toUTCString(),
            agentId: icAgentId,
            top: 25,
            orderby: 'lastUpdateTime desc',
        };
        dispatch(getAcdContactHistory(acdContactHistoryRequest));
    }, [voiceContactDetails, workItemContactDetails, voiceMailContactDetails, icAgentId]);
    useEffect(() => {
        /*
        TODO ----
        Loading state needs to be tied to the network request (in CreateAsyncThunk)
        otherwise, if the contactData length in response is 0, it will always be true.
        This will be done as part of AW-15738
        Currently this setIsLoading(false) won't make any difference.
        */
        setIsLoading(false);
        const digitalHistory = formatDigitalContactHistory(digitalContactData, routingQueuIds, locale, is12HrTime, NOT_AVAILABLE, theme, translate);
        const acdHistory = formatAcdContactHistory(acdContactData, locale, is12HrTime, NOT_AVAILABLE, theme, translate);
        if (digitalHistory.length || acdHistory.length) {
            setContactHistory([...digitalHistory, ...acdHistory]
                .sort((first, second) => first.statusUpdatedDateTimeMillis < second.statusUpdatedDateTimeMillis ? 1 : -1)
                .slice(0, 50));
        }
    }, [digitalContactData, acdContactData, routingQueuIds, locale, is12HrTime]);
    if (isLoading) {
        return (_jsx(CcfBox, Object.assign({ sx: style.detailsMenu }, { children: _jsx(CcfBox, { children: _jsxs(CcfBox, Object.assign({ sx: style.noRecordClass }, { children: [translate('loading'), "..."] })) }) })));
    }
    if (contactHistory.length) {
        return (_jsx(CcfAgentCardContactHistoryView, { contactHistory: contactHistory, integratedView: integratedView, hostConfig: hostConfig, selectedContactHistory: selectedContactHistory, DispositionModal: DispositionModal, onExecuteAction: setSelectedContactHistory }));
    }
    return (_jsx(CcfBox, Object.assign({ sx: style.detailsMenu }, { children: _jsx(CcfBox, { children: _jsx(CcfBox, Object.assign({ sx: style.noRecordClass }, { children: translate('noRecordsFound') })) }) })));
}
export default memo(CcfAgentContactHistory);
//# sourceMappingURL=ccf-agent-card-contact-history.js.map