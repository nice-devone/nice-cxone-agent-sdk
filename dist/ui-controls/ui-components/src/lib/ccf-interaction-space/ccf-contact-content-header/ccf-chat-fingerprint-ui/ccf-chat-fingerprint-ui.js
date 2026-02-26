import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Typography, List, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { getDigitalContactDetailsByCaseId } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useTranslator } from '@nice-devone/ui-controls';
import { DigitalChannelType } from '@nice-devone/common-sdk';
/**
 * style object for agentState
 * @returns chatFingerprint styles object
 * @example
 * ```
 * ccfChatFingerprintUIStyles(theme)
 * ```
 */
const ccfChatFingerprintUIStyles = () => {
    const styles = {
        textCapitalize: {
            textTransform: 'capitalize',
        },
        fingerprintList: {
            listStyle: 'none',
            paddingLeft: '0',
            paddingTop: '0',
            paddingBottom: '0',
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: '10px',
            marginTop: '8px',
            marginBottom: '8px',
        },
        fingerprintListItem: {
            whiteSpace: 'nowrap',
            '&::after': {
                content: '"|"',
                paddingLeft: '5px',
                paddingRight: '5px',
            },
            '&:last-child': {
                '&::after': {
                    content: '""',
                },
            },
            width: 'auto',
            paddingLeft: '0',
            paddingRight: '0',
            paddingTop: '0',
            paddingBottom: '0',
        },
        fingerprintListItemName: {
            marginRight: '3px',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            fontSize: 'inherit',
        },
        fingerprintListItemValue: {
            fontSize: '10px',
        },
        fingerprintError: {
            fontSize: '10px',
            marginTop: '8px',
            marginBottom: '8px',
            paddingLeft: '16px',
            paddingRight: '16px',
        },
    };
    return styles;
};
/**
 * Component to displays chat fingerprint content
 * @returns chat fingerprint
 * @example
 * ```
 * <CcfChatFingerprintUi {...props}/>
 * ```
 */
export default function CcfChatFingerprintUi(props) {
    var _a, _b, _c, _d, _e, _f;
    const chatFingerprintUIStyles = ccfChatFingerprintUIStyles();
    const { fingerPrintShow } = props;
    const getDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId((_a = props === null || props === void 0 ? void 0 : props.activeContact) === null || _a === void 0 ? void 0 : _a.caseId, (_b = props === null || props === void 0 ? void 0 : props.activeContact) === null || _b === void 0 ? void 0 : _b.interactionId));
    const [translate] = useTranslator();
    const inboundFingerprint = (_e = (_d = (_c = getDigitalContactDetails === null || getDigitalContactDetails === void 0 ? void 0 : getDigitalContactDetails.messages) === null || _c === void 0 ? void 0 : _c.filter((item) => item.direction === 'inbound')) === null || _d === void 0 ? void 0 : _d.slice(-1)[0]) === null || _e === void 0 ? void 0 : _e.deviceFingerprint;
    return (_jsx(_Fragment, { children: fingerPrintShow && getDigitalContactDetails.channelType === ((_f = DigitalChannelType.CHAT) === null || _f === void 0 ? void 0 : _f.toLowerCase()) && (inboundFingerprint ? (
        // If fingerPrint data for inbound message is present in API, then show this section
        _jsx(Box, Object.assign({ component: "section", sx: { px: 2 }, "aria-label": "Chat Fingerprint", "data-testid": "chat-fingerprint" }, { children: _jsxs(List, Object.assign({ sx: chatFingerprintUIStyles.fingerprintList }, { children: [inboundFingerprint.os &&
                        _jsxs(ListItem, Object.assign({ sx: chatFingerprintUIStyles.fingerprintListItem }, { children: [_jsx(Typography, Object.assign({ component: "span", sx: chatFingerprintUIStyles.fingerprintListItemName }, { children: translate('os') })), _jsxs(Typography, Object.assign({ component: "span", sx: [chatFingerprintUIStyles.fingerprintListItemValue] }, { children: [inboundFingerprint.os, " ", inboundFingerprint.osVersion] }))] })), inboundFingerprint.browser &&
                        _jsxs(ListItem, Object.assign({ sx: chatFingerprintUIStyles.fingerprintListItem }, { children: [_jsx(Typography, Object.assign({ component: "span", sx: chatFingerprintUIStyles.fingerprintListItemName }, { children: translate('browser') })), _jsxs(Typography, Object.assign({ component: "span", sx: [chatFingerprintUIStyles.fingerprintListItemValue] }, { children: [inboundFingerprint.browser, " v.", inboundFingerprint.browserVersion] }))] })), inboundFingerprint.language &&
                        _jsxs(ListItem, Object.assign({ sx: chatFingerprintUIStyles.fingerprintListItem }, { children: [_jsx(Typography, Object.assign({ component: "span", sx: chatFingerprintUIStyles.fingerprintListItemName }, { children: translate('language') })), _jsx(Typography, Object.assign({ component: "span", sx: [chatFingerprintUIStyles.fingerprintListItemValue] }, { children: inboundFingerprint.language }))] })), inboundFingerprint.ip &&
                        _jsxs(ListItem, Object.assign({ sx: chatFingerprintUIStyles.fingerprintListItem }, { children: [_jsx(Typography, Object.assign({ component: "span", sx: chatFingerprintUIStyles.fingerprintListItemName }, { children: translate('ip') })), _jsx(Typography, Object.assign({ component: "span", sx: [chatFingerprintUIStyles.fingerprintListItemValue] }, { children: inboundFingerprint.ip }))] })), inboundFingerprint.location &&
                        _jsxs(ListItem, Object.assign({ sx: chatFingerprintUIStyles.fingerprintListItem }, { children: [_jsx(Typography, Object.assign({ component: "span", sx: chatFingerprintUIStyles.fingerprintListItemName }, { children: translate('location') })), _jsx(Typography, Object.assign({ component: "span", sx: [chatFingerprintUIStyles.textCapitalize, chatFingerprintUIStyles.fingerprintListItemValue] }, { children: inboundFingerprint.location }))] })), inboundFingerprint.country &&
                        _jsxs(ListItem, Object.assign({ sx: chatFingerprintUIStyles.fingerprintListItem }, { children: [_jsx(Typography, Object.assign({ component: "span", sx: chatFingerprintUIStyles.fingerprintListItemName }, { children: translate('country') })), _jsx(Typography, Object.assign({ component: "span", sx: [chatFingerprintUIStyles.textCapitalize, chatFingerprintUIStyles.fingerprintListItemValue] }, { children: inboundFingerprint.country }))] })), inboundFingerprint.deviceType &&
                        _jsxs(ListItem, Object.assign({ sx: chatFingerprintUIStyles.fingerprintListItem }, { children: [_jsx(Typography, Object.assign({ component: "span", sx: chatFingerprintUIStyles.fingerprintListItemName }, { children: translate('deviceType') })), _jsx(Typography, Object.assign({ component: "span", sx: [chatFingerprintUIStyles.textCapitalize, chatFingerprintUIStyles.fingerprintListItemValue] }, { children: inboundFingerprint.deviceType }))] })), inboundFingerprint.deviceToken &&
                        _jsxs(ListItem, Object.assign({ sx: chatFingerprintUIStyles.fingerprintListItem }, { children: [_jsx(Typography, Object.assign({ component: "span", sx: chatFingerprintUIStyles.fingerprintListItemName }, { children: translate('deviceToken') })), _jsx(Typography, Object.assign({ component: "span", sx: [chatFingerprintUIStyles.fingerprintListItemValue] }, { children: inboundFingerprint.deviceToken }))] })), inboundFingerprint.applicationType &&
                        _jsxs(ListItem, Object.assign({ sx: chatFingerprintUIStyles.fingerprintListItem }, { children: [_jsx(Typography, Object.assign({ component: "span", sx: chatFingerprintUIStyles.fingerprintListItemName }, { children: translate('applicationType') })), _jsx(Typography, Object.assign({ component: "span", sx: [chatFingerprintUIStyles.textCapitalize, chatFingerprintUIStyles.fingerprintListItemValue] }, { children: inboundFingerprint.applicationType }))] }))] })) }))) : (
        // If fingerPrint data for inbound message is not present in API, then show this error message
        _jsx(Typography, Object.assign({ sx: chatFingerprintUIStyles.fingerprintError, "data-testid": "no-chat-fingerprint-message" }, { children: translate('noChatfingerprintDataMessage') })))) }));
}
//# sourceMappingURL=ccf-chat-fingerprint-ui.js.map