import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import { VoiceContactStatus, MediaType, DigitalChannelType, DigitalChannelStatus, } from '@nice-devone/common-sdk';
import { CallContactEventStatus } from '@nice-devone/core-sdk';
import { CcfPhoneInboundIcon, CcfPhoneRingingIcon, CcfTwitterIcon, CcfFacebookIcon, CcfLinkedinIcon, CcfWhatsAppIcon, CcfChatIcon, CcfEmailIcon, CcfSmsIcon, CcfWritingIcon, CcfPersonIcon, CcfTooltip, useTranslator, } from '@nice-devone/ui-controls';
import ccfInteractionStyle from './ccf-interaction.style';
/**
 * Component to store maps for interaction icons
 * @example CcfInteractionIconsMap
 */
export function CcfInteractionIconsMap() {
    const theme = useTheme();
    const styles = ccfInteractionStyle(theme);
    const [translate] = useTranslator();
    /**
     * Returns collapsed view icons for assignment pannel
     */
    const collapsedViewIconsMap = new Map([
        [
            VoiceContactStatus.INQUEUE.toString(),
            _jsx(CcfPersonIcon, { sx: styles.mediaIcon, "data-testid": "personal-queue-icon" }, VoiceContactStatus.INQUEUE)
        ],
        [
            VoiceContactStatus.RINGING.toString(),
            _jsx(CcfPhoneRingingIcon, { sx: styles.collapsedViewImage_RingingIcon, viewBox: "0 0 21 21", style: { fontSize: '18px' } }, VoiceContactStatus.RINGING)
        ],
        [
            MediaType.VOICE.toString(),
            _jsx(CcfPhoneInboundIcon, { sx: styles.mediaIcon }, MediaType.VOICE)
        ],
        [
            VoiceContactStatus.ACTIVE.toString(),
            _jsx(CcfTooltip, Object.assign({ title: translate('ib_call'), disableInteractive: true, arrow: true }, { children: _jsx(CcfPhoneInboundIcon, { sx: styles.mediaIcon }) }), VoiceContactStatus.ACTIVE)
        ],
        [
            VoiceContactStatus.JOINED.toString(),
            _jsx(CcfPhoneInboundIcon, { sx: styles.mediaIcon }, VoiceContactStatus.JOINED)
        ],
        [
            VoiceContactStatus.HOLDING.toString(),
            _jsx(CcfPhoneInboundIcon, { sx: styles.mediaIcon }, VoiceContactStatus.HOLDING)
        ],
        [
            VoiceContactStatus.MASKING.toString(),
            _jsx(CcfPhoneInboundIcon, { sx: styles.mediaIcon }, VoiceContactStatus.MASKING)
        ],
        [
            VoiceContactStatus.DIALING.toString(),
            _jsx(CcfPhoneRingingIcon, { sx: styles.mediaIcon, viewBox: "0 0 19 19", style: { marginLeft: '11px' } }, VoiceContactStatus.DIALING)
        ],
        [
            DigitalChannelType.TWITTER.toString(),
            _jsx(CcfTwitterIcon, { id: 'customerCardTwitterIcn', sx: styles.collapsedViewImage }, DigitalChannelType.TWITTER)
        ],
        [
            DigitalChannelType.FACEBOOK.toString(),
            _jsx(CcfFacebookIcon, { id: 'assignmentCardFBIcon', sx: styles.collapsedViewImage }, DigitalChannelType.FACEBOOK)
        ],
        [
            DigitalChannelType.LINKEDIN.toString(),
            _jsx(CcfLinkedinIcon, { sx: styles.collapsedViewImage }, DigitalChannelType.LINKEDIN)
        ],
        [
            DigitalChannelType.WHATSAPP.toString(),
            _jsx(CcfWhatsAppIcon, { sx: styles.collapsedViewImage }, DigitalChannelType.WHATSAPP)
        ],
        [
            DigitalChannelType.CHAT.toString(),
            _jsx(CcfChatIcon, { sx: styles.collapsedViewImage, viewBox: "0 0 19 19" }, DigitalChannelType.CHAT)
        ],
        [
            DigitalChannelType.EMAIL.toString(),
            _jsx(CcfEmailIcon, { sx: styles.collapsedViewImage }, DigitalChannelType.EMAIL)
        ],
        [
            DigitalChannelType.SMS.toString(),
            _jsx(CcfSmsIcon, { id: 'assignmentCardSMSIcon', sx: styles.collapsedViewImage }, DigitalChannelType.SMS)
        ],
        [
            VoiceContactStatus.INCOMING.toString(),
            _jsx(CcfTooltip, Object.assign({ title: translate('ringing'), disableInteractive: true, arrow: true }, { children: _jsx(CcfPhoneRingingIcon, { sx: styles.collapsedViewImage_RingingIcon, viewBox: "0 0 21 21", style: { fontSize: '18px' } }) }), VoiceContactStatus.INCOMING)
        ],
        [
            CallContactEventStatus.NATURAL_CALL_DIALING.toLowerCase(),
            _jsx(CcfPhoneRingingIcon, { sx: styles.mediaIcon }, CallContactEventStatus.NATURAL_CALL_DIALING)
        ],
        [
            CallContactEventStatus.NATURAL_CALL_RINGING.toLowerCase(),
            _jsx(CcfPhoneRingingIcon, { sx: styles.mediaIcon }, CallContactEventStatus.NATURAL_CALL_RINGING)
        ]
    ]);
    /**
     * Returns expanded view icons for assignment pannel
     */
    const expandedViewIconsMap = new Map([
        [
            VoiceContactStatus.INQUEUE.toString(),
            _jsx(CcfPersonIcon, { sx: styles.mediaIcon, "data-testid": "personal-queue-icon" }, VoiceContactStatus.INQUEUE)
        ],
        [
            VoiceContactStatus.RINGING.toString(),
            _jsx(CcfPhoneRingingIcon, { sx: styles.rightImage }, VoiceContactStatus.RINGING)
        ],
        [
            VoiceContactStatus.INCOMING.toString(),
            _jsx(CcfTooltip, Object.assign({ title: translate('ringing'), disableInteractive: true, arrow: true }, { children: _jsx(CcfPhoneRingingIcon, { sx: styles.rightImage }) }), VoiceContactStatus.INCOMING)
        ],
        [
            VoiceContactStatus.ACTIVE.toString(),
            _jsx(CcfTooltip, Object.assign({ title: translate('ib_call'), disableInteractive: true, arrow: true }, { children: _jsx(CcfPhoneInboundIcon, { sx: styles.mediaIcon }) }), VoiceContactStatus.ACTIVE)
        ],
        [
            VoiceContactStatus.JOINED.toString(),
            _jsx(CcfPhoneInboundIcon, { sx: styles.mediaIcon }, VoiceContactStatus.JOINED)
        ],
        [
            VoiceContactStatus.HOLDING.toString(),
            _jsx(CcfPhoneInboundIcon, { sx: styles.mediaIcon }, VoiceContactStatus.HOLDING)
        ],
        [
            VoiceContactStatus.MASKING.toString(),
            _jsx(CcfPhoneInboundIcon, { sx: styles.mediaIcon }, VoiceContactStatus.MASKING)
        ],
        [
            VoiceContactStatus.DIALING.toString(),
            _jsx(CcfPhoneRingingIcon, { sx: styles.mediaIcon }, VoiceContactStatus.DIALING)
        ],
        [
            CallContactEventStatus.NATURAL_CALL_DIALING.toLowerCase(),
            _jsx(CcfPhoneRingingIcon, { sx: styles.mediaIcon, viewBox: "0 0 21 21" }, CallContactEventStatus.NATURAL_CALL_DIALING)
        ],
        [
            CallContactEventStatus.NATURAL_CALL_RINGING.toLowerCase(),
            _jsx(CcfPhoneRingingIcon, { sx: styles.mediaIcon, viewBox: "0 0 21 21" }, CallContactEventStatus.NATURAL_CALL_RINGING)
        ],
        [
            DigitalChannelType.TWITTER.toString(),
            _jsx(CcfTwitterIcon, { id: 'twitterIconCustomerCard', sx: styles.digitalRightImage }, DigitalChannelType.TWITTER)
        ],
        [
            DigitalChannelType.FACEBOOK.toString(),
            _jsx(CcfFacebookIcon, { id: 'fbIconAssignmentCard', viewBox: "-2 2 24 24", sx: styles.digitalRightImage }, DigitalChannelType.FACEBOOK)
        ],
        [
            DigitalChannelType.LINKEDIN.toString(),
            _jsx(CcfLinkedinIcon, { sx: styles.digitalRightImage }, DigitalChannelType.LINKEDIN)
        ],
        [
            DigitalChannelType.WHATSAPP.toString(),
            _jsx(CcfWhatsAppIcon, { sx: styles.digitalRightImage }, DigitalChannelType.WHATSAPP)
        ],
        [
            DigitalChannelType.EMAIL.toString(),
            _jsx(CcfEmailIcon, { sx: styles.digitalRightImage }, DigitalChannelType.EMAIL)
        ],
        [
            DigitalChannelType.SMS.toString(),
            _jsx(CcfSmsIcon, { id: 'smsIcinAssignment', sx: styles.digitalRightImage }, DigitalChannelType.SMS)
        ],
        [DigitalChannelType.CHAT, _jsx(CcfChatIcon, { sx: styles.rightImage }, DigitalChannelType.CHAT)],
        [
            DigitalChannelStatus.OPEN,
            _jsx(CcfWritingIcon, { sx: styles.rightImage }, DigitalChannelStatus.OPEN)
        ]
    ]);
    /**
     * @example getCollapsedViewIconsMap()
     */
    const getCollapsedViewIconsMap = (contactStatus) => {
        return collapsedViewIconsMap.get(contactStatus);
    };
    /**
     * @example getExpandedViewIconsMap()
     */
    const getExpandedViewIconsMap = (contactStatus) => {
        return expandedViewIconsMap.get(contactStatus);
    };
    return [getCollapsedViewIconsMap, getExpandedViewIconsMap];
}
//# sourceMappingURL=ccf-interaction-icons-map.js.map