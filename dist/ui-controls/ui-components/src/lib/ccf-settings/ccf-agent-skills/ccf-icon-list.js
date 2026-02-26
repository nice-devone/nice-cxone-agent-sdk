import { jsx as _jsx } from "react/jsx-runtime";
import { CcfWorkItemIcon, CcfVoicemailIcon, CcfQueueCounterDigitalIcon, CcfPhoneInboundRevampedIcon, CcfPhoneOutboundRevampedIcon, CcfDigitalEmailIcon, CcfDigitalChatIcon, } from '@nice-devone/ui-controls';
export const MediaTypeIds = {
    0: 'all',
    1: 'email',
    3: 'chatContactMode',
    4: 'voice',
    5: 'voicemail',
    6: 'workItem',
    9: 'digital',
};
export const iconList = {
    1: (fSize, isOutbound) => {
        if (isOutbound) {
            return _jsx(CcfDigitalEmailIcon, { iconName: 'EMAIL_OB', style: { fontSize: fSize } });
        }
        else {
            return _jsx(CcfDigitalEmailIcon, { iconName: 'EMAIL_IB', style: { fontSize: fSize } });
        }
    },
    5: (fSize) => _jsx(CcfVoicemailIcon, { style: { fontSize: fSize } }),
    9: (fSize) => _jsx(CcfQueueCounterDigitalIcon, { style: { fontSize: fSize } }),
    3: (fSize, isOutbound) => {
        if (isOutbound) {
            return _jsx(CcfDigitalChatIcon, { iconName: 'CHAT_OB', style: { fontSize: fSize } });
        }
        else {
            return _jsx(CcfDigitalChatIcon, { iconName: 'CHAT_IB', style: { fontSize: fSize } });
        }
    },
    6: (fSize) => _jsx(CcfWorkItemIcon, { style: { fontSize: fSize } }),
    4: (fSize, isOutbound) => {
        if (isOutbound) {
            return _jsx(CcfPhoneOutboundRevampedIcon, { sx: { fontSize: fSize } });
        }
        else {
            return _jsx(CcfPhoneInboundRevampedIcon, { sx: { fontSize: fSize } });
        }
    },
};
//# sourceMappingURL=ccf-icon-list.js.map