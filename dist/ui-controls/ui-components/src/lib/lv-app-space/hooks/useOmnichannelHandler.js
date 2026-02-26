import { jsx as _jsx } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import { useCallback, useState, useMemo } from 'react';
import { DigitalContactStatus, InteractionType, } from '@nice-devone/common-sdk';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchOutboundQuickReplies } from '../../ccf-app-space/ccf-quick-replies/ccf-quick-replies.util';
import { OBChannels } from '../../ccf-outbound-options/ccf-outbound-options';
import { getSelectedInteractionInfo } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfPopOverWrapper } from '@nice-devone/ui-controls';
import useOutboundHandler from '../../ccf-outbound-options/hooks/useOutboundHandler';
import useGetOutboundOptions from '../../ccf-outbound-options/hooks/useGetOutboundOptions';
import CcfAddChannelOptions from '../../ccf-add-channel-options/ccf-add-channel-options';
import { getCustomerName, LOGGER_MODULE } from '../lv-app-space-utility';
import { Logger } from '@nice-devone/core-sdk';
const logger = new Logger(LOGGER_MODULE, 'useOmnichannelHandler');
/**
 * Elevations: Make sure to only return an interactionId for the valid cases
 * - https://nice-ce-cxone-prod.atlassian.net/browse/AW-25
 * Ref:
 * - libs/react/ui-components/src/lib/ccf-interaction-space/ccf-interaction-space.tsx:187
 * @example
 * ```
 * const interactionId = getInteractionIdForNewOutbound(selectedInteraction)
 * ```
 */
const getInteractionIdForNewOutbound = (selectedInteraction) => {
    const { digitalContacts, interactionId, interactionType } = selectedInteraction !== null && selectedInteraction !== void 0 ? selectedInteraction : {};
    const areThereDraftOrClosedContacts = Object.keys(digitalContacts !== null && digitalContacts !== void 0 ? digitalContacts : {}).some((key) => {
        var _a;
        const { contactStatus, isAssignedToAgentInbox } = (_a = digitalContacts === null || digitalContacts === void 0 ? void 0 : digitalContacts[key]) !== null && _a !== void 0 ? _a : {};
        return (contactStatus === DigitalContactStatus.DRAFT ||
            contactStatus === DigitalContactStatus.CLOSED ||
            !isAssignedToAgentInbox //Check for preview
        );
    });
    if (interactionType && [InteractionType.WORKITEM, InteractionType.ELEVATED].includes(interactionType)) {
        return undefined;
    }
    else if (areThereDraftOrClosedContacts) {
        return undefined;
    }
    return interactionId;
};
/**
 * Integrates LV omnichannel with CX one outbound digital
 * @example
 * ```
 * const omnichannel = useOmniChannelHandler()
 * ```
 */
export default function useOmnichannelHandler() {
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [anchorEl, setAnchorEl] = useState(null);
    const [omnichannel, setOmnichannel] = useState();
    const { triggerOutboundDigital, triggerOutboundCall: ccfTriggerOutboundCall } = useOutboundHandler();
    const { emailOBChannels, emailOBChannelsLength, hasEmailOBChannels, hasPhoneOBSkills, hasSmsOBChannels, hasWhatsappOBChannels, phoneOBSkills, phoneOBSkillsLength, smsOBChannels, smsOBChannelsLength, whatsappOBChannels, whatsappOBChannelsLength, } = useGetOutboundOptions();
    const selectedInteraction = useSelector(getSelectedInteractionInfo, shallowEqual);
    const interactionId = getInteractionIdForNewOutbound(selectedInteraction);
    /**
     * Notes:
     * - We need to set the LVCustomerId as for the moment there is no relationship with
     *   the triggered action
     * - When sending interactionId and contactId the Call will be handled as an Elevation
     * @example
     * ```
     * triggerOutboundCall()
     * ```
     */
    const triggerOutboundCall = useCallback((callInfo, customer, interaction) => {
        const { phone } = callInfo !== null && callInfo !== void 0 ? callInfo : {};
        const { account } = customer;
        const { skillId, channelId, contactId } = interaction;
        try {
            if (skillId || channelId) {
                ccfTriggerOutboundCall({
                    contactId,
                    customerId: account,
                    interactionId,
                    phone,
                    skillId: skillId || Number(channelId),
                });
            }
        }
        catch (error) {
            logger.error('ECC - triggerOutboundCall', `Error triggering outbound call - ${JSON.stringify(error)}`);
        }
    }, [ccfTriggerOutboundCall, interactionId]);
    /**
     * Notes:
     * - No need to set LVCustomerId as when creating the CXoneDigitalContact
     *   the customerId will be set
     * - When sending interactionId the digital will be handled as an Elevation
     * @example
     * ```
     * triggerOutboundEmail()
     * ```
     */
    const triggerOutboundEmail = useCallback((emailInfo, customer, interaction) => {
        const { emailAddress } = emailInfo !== null && emailInfo !== void 0 ? emailInfo : {};
        const { account, firstName, lastName } = customer;
        const { channelId } = interaction;
        try {
            if (channelId) {
                // fetch all configured quick replies for the outbound channel
                dispatch(fetchOutboundQuickReplies({ page: 1, channelId }));
                triggerOutboundDigital({
                    channelType: OBChannels.EMAIL,
                    channelId,
                    customerId: account,
                    customerName: getCustomerName({ firstName, lastName }),
                    interactionId,
                    receiverTo: emailAddress,
                });
            }
        }
        catch (error) {
            logger.error('ECC - triggerOutboundEmail', `Error triggering outbound email - ${JSON.stringify(error)}`);
        }
    }, [dispatch, emailOBChannels, triggerOutboundDigital, interactionId]);
    /**
     * Notes:
     * - No need to set LVCustomerId as when creating the CXoneDigitalContact
     *   the customerId will be set
     * - When sending interactionId the digital will be handled as an Elevation
     * @example
     * ```
     * triggerOutboundSms()
     * ```
     */
    const triggerOutboundSms = useCallback((smsInfo, customer, interaction) => {
        const { phone } = smsInfo !== null && smsInfo !== void 0 ? smsInfo : {};
        const { account, firstName, lastName } = customer;
        const { channelId } = interaction;
        try {
            if (channelId) {
                // fetch all configured quick replies for the outbound channel
                dispatch(fetchOutboundQuickReplies({ page: 1, channelId }));
                triggerOutboundDigital({
                    channelType: OBChannels.SMS,
                    channelId,
                    customerId: account,
                    customerName: getCustomerName({ firstName, lastName }),
                    interactionId,
                    receiverTo: phone,
                });
            }
        }
        catch (error) {
            logger.error('ECC - triggerOutboundSms', `Error triggering outbound sms - ${JSON.stringify(error)}`);
        }
    }, [dispatch, smsOBChannels, triggerOutboundDigital, interactionId]);
    /**
     * Notes:
     * - No need to set LVCustomerId as when creating the CXoneDigitalContact
     *   the customerId will be set
     * - When sending interactionId the digital will be handled as an Elevation
     * @example
     * ```
     * triggerOutboundWhatsapp()
     * ```
     */
    const triggerOutboundWhatsapp = useCallback((whatsappInfo, customer, interaction) => {
        const { phone } = whatsappInfo !== null && whatsappInfo !== void 0 ? whatsappInfo : {};
        const { account, firstName, lastName } = customer;
        const { channelId } = interaction;
        try {
            if (channelId) {
                // fetch all configured quick replies for the outbound channel
                dispatch(fetchOutboundQuickReplies({ page: 1, channelId }));
                triggerOutboundDigital({
                    channelType: OBChannels.WHATSAPP,
                    channelId,
                    customerId: account,
                    customerName: getCustomerName({ firstName, lastName }),
                    interactionId,
                    receiverTo: phone,
                });
            }
        }
        catch (error) {
            logger.error('ECC - triggerOutboundWhatsapp', `Error triggering outbound whatsapp - ${JSON.stringify(error)}`);
        }
    }, [dispatch, triggerOutboundDigital, whatsappOBChannels, interactionId]);
    /**
     * Notes:
     * - if there is only one skill it will not show the popup and will
     *   trigger directly the omnichannel
     * @example
     * ```
     * onTriggerOmnichannel(OBChannels.VOICE)({
     *   phone: string;
     * })
     * ```
     */
    const onTriggerOmnichannel = useCallback((channelType) => (info, customer, callback) => {
        const isVoiceChannel = channelType === OBChannels.VOICE, isEmailChannel = channelType === OBChannels.EMAIL, isSmsChannel = channelType === OBChannels.SMS, isWhatsappChannel = channelType === OBChannels.WHATSAPP;
        if (phoneOBSkillsLength === 1 && isVoiceChannel) {
            triggerOutboundCall(info, customer, { skillId: phoneOBSkills[0].skillId });
            callback === null || callback === void 0 ? void 0 : callback();
        }
        else if (emailOBChannelsLength === 1 && isEmailChannel) {
            triggerOutboundEmail(info, customer, { channelId: emailOBChannels[0].channelId });
            callback === null || callback === void 0 ? void 0 : callback();
        }
        else if (smsOBChannelsLength === 1 && isSmsChannel) {
            triggerOutboundSms(info, customer, { channelId: smsOBChannels[0].channelId });
            callback === null || callback === void 0 ? void 0 : callback();
        }
        else if (whatsappOBChannelsLength === 1 && isWhatsappChannel) {
            triggerOutboundWhatsapp(info, customer, { channelId: whatsappOBChannels[0].channelId });
            callback === null || callback === void 0 ? void 0 : callback();
        }
        else {
            let value;
            if (isVoiceChannel) {
                value = info.phone;
            }
            else if (isEmailChannel) {
                value = info.emailAddress;
            }
            else if (isSmsChannel) {
                value = info.phone;
            }
            else if (isWhatsappChannel) {
                value = info.phone;
            }
            setOmnichannel({ channelType, info, customer, value, callback });
        }
    }, [
        emailOBChannels,
        emailOBChannelsLength,
        phoneOBSkills,
        phoneOBSkillsLength,
        smsOBChannels,
        smsOBChannelsLength,
        whatsappOBChannels,
        whatsappOBChannelsLength,
        triggerOutboundCall,
        triggerOutboundEmail,
        triggerOutboundSms,
        triggerOutboundWhatsapp
    ]);
    /**
     *
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @example
     * ```
     * onCloseOmnichannel()
     * ```
     */
    const onCloseOmnichannel = useCallback(() => {
        setOmnichannel(undefined);
    }, []);
    /**
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @example
     * ```
     * onChannelSelect({
     *   channelId?: CXoneDigitalChannel['channelId'],
     *   contactId?: CXoneContact['contactID'],
     *   fromProvider?: ElevatedFrom,
     *   skillId?: number,
     * })
     * ```
     */
    const onChannelSelect = useCallback((interaction) => {
        if (!omnichannel || !(omnichannel === null || omnichannel === void 0 ? void 0 : omnichannel.info))
            return;
        const { channelType, info, customer, callback } = omnichannel;
        switch (channelType) {
            case OBChannels.VOICE:
                triggerOutboundCall(info, customer, interaction);
                callback === null || callback === void 0 ? void 0 : callback();
                break;
            case OBChannels.EMAIL:
                triggerOutboundEmail(info, customer, interaction);
                callback === null || callback === void 0 ? void 0 : callback();
                break;
            case OBChannels.SMS:
                triggerOutboundSms(info, customer, interaction);
                callback === null || callback === void 0 ? void 0 : callback();
                break;
            case OBChannels.WHATSAPP:
                triggerOutboundWhatsapp(info, customer, interaction);
                callback === null || callback === void 0 ? void 0 : callback();
                break;
        }
        onCloseOmnichannel();
    }, [omnichannel]);
    const ChannelSelectDialog = useMemo(() => (_jsx(CcfPopOverWrapper, Object.assign({ anchorOrigin: { vertical: 'center', horizontal: 'center' }, handleClose: onCloseOmnichannel, id: "elevation-popover", open: Boolean(omnichannel === null || omnichannel === void 0 ? void 0 : omnichannel.channelType), transformOrigin: { vertical: 'center', horizontal: 'center' } }, { children: _jsx(CcfAddChannelOptions, { channelType: omnichannel === null || omnichannel === void 0 ? void 0 : omnichannel.channelType, handleClose: onCloseOmnichannel, handleSelect: onChannelSelect, value: omnichannel === null || omnichannel === void 0 ? void 0 : omnichannel.value }) }))), [omnichannel === null || omnichannel === void 0 ? void 0 : omnichannel.channelType, omnichannel === null || omnichannel === void 0 ? void 0 : omnichannel.value, onChannelSelect, onCloseOmnichannel]);
    return useMemo(() => ({
        ChannelSelectDialog,
        omnichannelProps: {
            allowDial: hasPhoneOBSkills,
            allowEmail: hasEmailOBChannels,
            allowSms: hasSmsOBChannels,
            allowWhatsapp: hasWhatsappOBChannels,
            onDial: onTriggerOmnichannel(OBChannels.VOICE),
            onEmail: onTriggerOmnichannel(OBChannels.EMAIL),
            onSms: onTriggerOmnichannel(OBChannels.SMS),
            onWhatsapp: onTriggerOmnichannel(OBChannels.WHATSAPP),
            setAnchorEl,
            triggerOutboundCall,
            triggerOutboundEmail,
            triggerOutboundSms,
            triggerOutboundWhatsapp,
        },
    }), [
        ChannelSelectDialog,
        hasEmailOBChannels,
        hasPhoneOBSkills,
        hasSmsOBChannels,
        hasWhatsappOBChannels,
        onTriggerOmnichannel,
        triggerOutboundCall,
        triggerOutboundEmail,
        triggerOutboundSms,
        triggerOutboundWhatsapp,
    ]);
}
//# sourceMappingURL=useOmnichannelHandler.js.map