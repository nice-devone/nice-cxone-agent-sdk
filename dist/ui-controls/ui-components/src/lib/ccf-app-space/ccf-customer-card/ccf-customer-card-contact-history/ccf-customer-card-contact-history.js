import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReplyIcon from '@mui/icons-material/Reply';
import { useTranslator, CcfBox } from '@nice-devone/ui-controls';
import { AdaptiveCard } from 'adaptivecards-react';
import { memo, useEffect, useState } from 'react';
import * as ActivityCardTemplate from 'adaptivecards-templating';
import * as DesignTemplate from './ccf-customer-card-contact-history-template.json';
import { cxoneDigitalContactDetails, } from '../ccf-customer-card.slice';
import { getActiveContactInSelectedInteraction, getContactDetailsForSelectedContact, voiceContactCardSelector, voiceContactSelector, voiceMailContactSelector, } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import customerCardContactHistoryStyles from './ccf-customer-card-contact-history.style';
import { useTheme } from '@mui/material';
import encodeSVG from '../ccf-customer-card-contact-history/ccf-encode-svg';
import { CHANNEL_ICON_NAME } from '../../../ccf-icon/ccf-icon-list';
import { DateTimeUtilService } from '@nice-devone/core-sdk';
import { getChannelSVG } from './ccf-channel-svg';
import { getRoutingQueueId, cxoneRoutingQueuId, getDigitalUserId, } from '../../ccf-agent-contact-history/ccf-agent-contact-history.slice';
import { MediaType } from '@nice-devone/common-sdk';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
const CHANNEL_ICON_SIZE = {
    SMALL: 'S',
    MEDIUM: 'M',
    LARGE: 'L',
};
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export function CcfCustomerCardContactHistory(props) {
    var _a, _b;
    const { customerId } = props;
    const theme = useTheme();
    const style = customerCardContactHistoryStyles(theme);
    const cxoneDigitalClient = CXoneDigitalClient.instance;
    const [inBoundCount, setInBoundCount] = useState(0);
    const [outBoundCount, setOutBoundCount] = useState(0);
    const [chatCount, setChatCount] = useState(0);
    const [contactHistory, setContactHistory] = useState(null);
    const [isDataLoading, setDataLoading] = useState(true);
    const getdigitalContactDetails = useSelector(cxoneDigitalContactDetails);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const getVoiceContactDetails = useSelector(voiceContactSelector);
    const getVoiceMailContactDetails = useSelector(voiceMailContactSelector);
    const voiceContactCards = useSelector(voiceContactCardSelector);
    const [cxoneRoutingQueueId, setCxoneRoutingQueueId] = useState((Array));
    const [isLoading, setIsLoading] = useState(false);
    const [translate] = useTranslator();
    const templatePayload = DesignTemplate;
    const template = new ActivityCardTemplate.Template(templatePayload === null || templatePayload === void 0 ? void 0 : templatePayload.data);
    const [isMounted, setIsMounted] = useState(true);
    const underScoreExpression = /-/g;
    /**
     * hostconfig property is a pre-defined & mandatory to render the Adaptive card on UI.
     * */
    const hostConfig = {
        fontFamily: '',
    };
    const dispatch = useDispatch();
    const getCxoneRoutingQueuId = useSelector(cxoneRoutingQueuId);
    /**
    * fetch contact history to get inbound, outbound and no of entries
    * @param customerId - customer Id
    * @example - `getContactHistory("sms_12345")`
    */
    const getContactHistory = (customerId) => __awaiter(this, void 0, void 0, function* () {
        const contactHistoryData = [];
        try {
            setIsLoading(true);
            const response = yield cxoneDigitalClient.digitalService.getContactHistory(customerId, '');
            if (response) {
                setIsLoading(false);
                if (isMounted) {
                    contactHistoryData.push(response.cxoneCase);
                }
            }
        }
        catch (_c) {
            setIsLoading(false);
        }
        const mergedContactsData = contactHistoryData.flat(1);
        if (mergedContactsData != null) {
            const inboundCount = mergedContactsData.filter((element) => {
                return element.direction === 'inbound';
            }).length;
            const outboundCount = mergedContactsData.filter((element) => {
                return element.direction === 'outbound';
            }).length;
            setInBoundCount(inboundCount);
            setOutBoundCount(outboundCount);
            setChatCount(inboundCount + outboundCount);
        }
        if (mergedContactsData && mergedContactsData.length > 0) {
            const contactHistories = mergedContactsData.map((contact) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                contact.agentName =
                    contact.ownerAssigneeUser !== null
                        ? contact.ownerAssigneeUser.firstName +
                            ' ' +
                            contact.ownerAssigneeUser.surname
                        : '';
                let customerName = '';
                if (((_a = contact === null || contact === void 0 ? void 0 : contact.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.externalPlatformId) !== 'chat') {
                    customerName = (_d = (_c = (_b = contact.endUser) === null || _b === void 0 ? void 0 : _b.identities) === null || _c === void 0 ? void 0 : _c.find((index) => { var _a; return index.externalPlatformId === ((_a = contact === null || contact === void 0 ? void 0 : contact.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.externalPlatformId); })) === null || _d === void 0 ? void 0 : _d.idOnExternalPlatform;
                    contact.name = customerName ? customerName : '';
                }
                else {
                    contact.name = (_e = contact === null || contact === void 0 ? void 0 : contact.authorEndUserIdentity) === null || _e === void 0 ? void 0 : _e.fullName;
                }
                const channelName = ((_f = contact === null || contact === void 0 ? void 0 : contact.authorEndUserIdentity) === null || _f === void 0 ? void 0 : _f.externalPlatformId)
                    ? (_g = contact === null || contact === void 0 ? void 0 : contact.authorEndUserIdentity) === null || _g === void 0 ? void 0 : _g.externalPlatformId.toUpperCase()
                    : (_j = (_h = contact === null || contact === void 0 ? void 0 : contact.endUser) === null || _h === void 0 ? void 0 : _h.identities[0]) === null || _j === void 0 ? void 0 : _j.externalPlatformId.toUpperCase();
                contact.channelAltTxt = channelName === null || channelName === void 0 ? void 0 : channelName.replace(/_/g, ' ');
                const channelType = CHANNEL_ICON_NAME[(_k = channelName === null || channelName === void 0 ? void 0 : channelName.toUpperCase()) === null || _k === void 0 ? void 0 : _k.replace(underScoreExpression, '_')];
                contact.image = encodeSVG(getChannelSVG(channelType, CHANNEL_ICON_SIZE.SMALL));
                const routingQueueId = cxoneRoutingQueueId === null || cxoneRoutingQueueId === void 0 ? void 0 : cxoneRoutingQueueId.filter((element) => {
                    return contact.routingQueueId === element.id;
                });
                contact.skill = (routingQueueId && ((_l = routingQueueId[0]) === null || _l === void 0 ? void 0 : _l.name)) || '';
                const dateFormat = DateTimeUtilService.getRequiredDateFormat(contact.statusUpdatedAt);
                contact.createdAt = dateFormat.toString();
                return contact;
            });
            const sortedContactHistories = contactHistories.sort((firstDate, secondDate) => secondDate.statusUpdatedAt.getTime() -
                firstDate.statusUpdatedAt.getTime() &&
                Number(secondDate.id) - Number(firstDate.id));
            setContactHistory({ result: { data: sortedContactHistories } });
            setDataLoading(false);
        }
        else {
            setContactHistory({ result: { data: [] } });
            setDataLoading(true);
            setIsLoading(false);
        }
    });
    /**
     * we receive customerCardUrl in callContactEvent , we get cutomer id from it and then searching for customer.
     * else customercardUrl not present we call api with voice_ANI
     */
    useEffect(() => {
        var _a, _b;
        setIsMounted(true);
        if (getdigitalContactDetails || getVoiceMailContactDetails || voiceContactCards.length) {
            if ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.VOICE) {
                const voiceContactData = activeContactInSelectedInteraction;
                if (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.customerCardUrl) {
                    const queryParams = new URLSearchParams(decodeURIComponent(voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.customerCardUrl));
                    const voiceCallNumber = queryParams.get('customerId') || '';
                    getContactHistory(voiceCallNumber);
                }
                else if (getVoiceContactDetails.dnis) {
                    getContactHistory(getVoiceContactDetails.dnis);
                }
            }
            else if ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.VOICEMAIL) {
                const voiceContactData = activeContactInSelectedInteraction;
                if (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.customerCardUrl) {
                    const queryParams = new URLSearchParams(decodeURIComponent(voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.customerCardUrl));
                    const customerId = queryParams.get('customerId') || '';
                    getContactHistory(customerId);
                }
                else if ((_a = getVoiceMailContactDetails === null || getVoiceMailContactDetails === void 0 ? void 0 : getVoiceMailContactDetails.voiceMailEventData) === null || _a === void 0 ? void 0 : _a.from) {
                    getContactHistory((_b = getVoiceMailContactDetails === null || getVoiceMailContactDetails === void 0 ? void 0 : getVoiceMailContactDetails.voiceMailEventData) === null || _b === void 0 ? void 0 : _b.from.toString());
                }
            }
        }
        return () => {
            setIsMounted(false);
        };
    }, [customerId]);
    useEffect(() => {
        dispatch(getDigitalUserId()).unwrap().then(digitalUserId => {
            if (digitalUserId) {
                if ((getCxoneRoutingQueuId === null || getCxoneRoutingQueuId === void 0 ? void 0 : getCxoneRoutingQueuId.length) <= 0) {
                    dispatch(getRoutingQueueId(''));
                }
                if (cxoneRoutingQueueId.length <= 0) {
                    setCxoneRoutingQueueId(getCxoneRoutingQueuId);
                }
            }
        });
    }, []);
    /**
     * This useEffect is to get customer contact history
     * once customerId is retrieved from customer details
     */
    useEffect(() => {
        setDataLoading(true);
        if (customerId !== '')
            getContactHistory(customerId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerId]);
    const adaptiveCardCSS = `
    #positive > div {
      color: ${theme.palette.success.light};
    }
    #deliveryStatus {
      font-size: 12px !important;
      color: ${theme.palette.grey[900]} !important;
      opacity: 0.45;
    }
    #contactHistoryChannelIcon {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      color: ${theme.palette.common.white};
      align-items: unset !important;
      margin-top: -8px;
    }
    #directionIcon {
      width: 18px;
      height: 18px;
      max-height: 100%;
      border-radius: 50%;
      color: ${theme.palette.common.white};
      align-items: unset !important;
      margin-top: -8px;
      margin-left: -6px;
    }
    #activityIconvoice {
      width: 34px !important;
      height: 34px !important;
      max-height: 100%;
      padding-top: 7px;
      border-radius: 50%;
      color: ${theme.palette.common.white};
      align-items: unset !important;
      margin-right: -18px;
      margin-left: 2px;
    }
    #activityCard {
      box-shadow: 0px 1px 3px ${theme.palette.grey[400]};
      padding: 7px 5px 5px !important;
      border-radius: 0.5px;
      position: relative;
      cursor: pointer;
    }
    #address-content > div,
    #address-content > div > div {
      padding: 0px;
    }
    #ccfAppSpaceActivityContactNumber {
      font-size: 14px !important;
      padding-bottom: 5px;
      color: ${theme.palette.common.black} !important;
    }
    #agentName {
      font-size: 10px !important;
      color: ${theme.palette.common.black} !important;
      flex-direction: column !important;
      white-space: inherit !important;
      text-align: justify;
      border-left: 1px solid ${theme.palette.common.black};
      border-spacing: 15px !important;
      padding: 0px 4px;
    }
    .ac-textBlock {
      word-break: break-all !important;
    }
    #agentNameId {
      font-size: 10px !important;
      color: ${theme.palette.common.black} !important;
      flex-direction: column !important;
    }
    .ac-container {
      margin-top: '12px' !important;
    }
    #ccfPaddingLR10 {
      padding: 0 10px !important;
    }
    .loader {
      border: 10px solid ${theme.palette.background.LogoColor};
      border-top: 10px solid ${theme.palette.background.sparkleBlue};
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      align: center;
      top: calc(50% - 40px);
      left: calc(56% - 40px);
      position: absolute;
    }
    #activityCard img{
      position: relative
    }
    #activityCard img[alt]:after{
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${theme.palette.common.white};
      content: attr(alt);
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
    
      100% {
        transform: rotate(360deg);
      }
    }
  `;
    /**
     * method that fetches the details of the contact
     * @example loadContactDetails('123')
     */
    const loadContactDetails = (id) => {
        dispatch(getContactDetailsForSelectedContact({ contactId: id, isAssignedToAgentInbox: false }));
    };
    return (_jsxs("div", { children: [isLoading && _jsx(CcfBox, { children: _jsx(CcfBox, Object.assign({ sx: style.loader }, { children: " " })) }), !isLoading && (!isDataLoading ? (_jsxs(CcfBox, { children: [_jsx("style", { children: adaptiveCardCSS }), _jsxs(CcfBox, Object.assign({ sx: style.ccfContactHistoryInfo }, { children: [_jsx(CcfBox, Object.assign({ sx: style.ccfBottomMargin }, { children: _jsxs(Box, Object.assign({ sx: style.ccfBottomMargin }, { children: [chatCount, ' ', chatCount > 1 ? translate('entries') : translate('entry')] })) })), _jsxs(CcfBox, Object.assign({ sx: style.ccfContactCardPadR10 }, { children: [_jsx(ReplyIcon, { fontSize: "small", sx: style.ccfReplyIcon }), ' ', _jsx(Box, Object.assign({ sx: style.ccfReplyCountBottomMargin }, { children: inBoundCount }))] })), _jsxs(CcfBox, Object.assign({ sx: style.ccfContactCardPadR10 }, { children: [_jsx(ReplyIcon, { fontSize: "small", sx: style.ccfReplyIconInverted }), ' ', _jsx(Box, Object.assign({ sx: style.ccfReplyCountBottomMargin }, { children: outBoundCount }))] }))] })), _jsx(CcfBox, Object.assign({ sx: style.ccfContactHistoryAdaptiveCardContainer }, { children: (_b = (_a = contactHistory === null || contactHistory === void 0 ? void 0 : contactHistory.result) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map((history) => {
                            const card = template.expand({
                                $root: { data: history },
                            });
                            return _jsx(AdaptiveCard, { style: { fontFamily: theme.typography.fontFamily }, payload: card, hostConfig: hostConfig, onExecuteAction: (action) => {
                                    loadContactDetails(action.id);
                                } }, history.id);
                        }) }))] })) : (_jsx(CcfBox, Object.assign({ sx: style.noInformation }, { children: translate('noInformationAvailable') }))))] }));
}
export default memo(CcfCustomerCardContactHistory);
//# sourceMappingURL=ccf-customer-card-contact-history.js.map