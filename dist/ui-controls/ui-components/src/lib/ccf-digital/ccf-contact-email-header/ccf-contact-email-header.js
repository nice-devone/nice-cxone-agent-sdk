import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import { CcfDoubleArrowIcon, CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import React, { useEffect } from 'react';
import CcfLabelControl from '../../ccf-interaction-space/ccf-label-control/ccf-label-control';
import CcfContactEmailHeaderStyles from './ccf-contact-email-header-style';
const styleWrapper = {
    font: 'normal normal normal 11px/15px Open Sans',
    color: '#FFFFFF',
    'text-align': 'left',
    'letter-spacing': '0',
    display: 'flex',
};
const styleLabel = {
    font: 'normal normal 700 11px/15px Open Sans',
    color: '#FFFFFF',
    height: '17px',
    'text-align': 'left',
    'align-items': 'center',
    'letter-spacing': '0',
    display: 'flex',
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
    //TODO: handling multiple receipients
    let to = '';
    let cc = '';
    let bcc = '';
    (recipients || []).forEach((recipient) => {
        if (recipient.isPrimary === true && recipient.isPrivate === false && !(isReplyAll && recipient.idOnExternalPlatform === sender)) {
            to += (to === '') ? recipient.idOnExternalPlatform : ',' + recipient.idOnExternalPlatform;
        }
        if (recipient.isPrimary === false && recipient.isPrivate === false) {
            cc += (cc === '') ? recipient.idOnExternalPlatform : ',' + recipient.idOnExternalPlatform;
        }
        if (recipient.isPrimary === false && recipient.isPrivate === true) {
            bcc += (bcc === '') ? recipient.idOnExternalPlatform : ',' + recipient.idOnExternalPlatform;
        }
    });
    return {
        to,
        cc,
        bcc,
    };
}
/**
 * Component displays Email Header for selected contact
 * @returns Email Header for selected contact
 * ```
 * @example
 * <CcfContactEmailHeader/>
 * ```
 */
export function CcfContactEmailHeader(props) {
    const [viewDetails, setViewDetails] = React.useState(props.isExpanded);
    const { to = '', cc = '', bcc = '' } = getToCcBccFields(props.recipients, props.sender);
    const day = new Date(props.time);
    const time = day.toLocaleDateString('en-us', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }) +
        ' (' +
        Math.ceil((new Date().valueOf() - day.valueOf()) / (1000 * 60 * 60 * 24) - 1) +
        ' days ago)';
    const theme = useTheme();
    const themeStyles = CcfContactEmailHeaderStyles(theme);
    const [translate] = useTranslator();
    useEffect(() => {
        setViewDetails(props.isExpanded);
    }, [props.isExpanded, props.time]);
    return (_jsxs(Box, Object.assign({ component: 'div', sx: themeStyles.header }, { children: [_jsx(Box, Object.assign({ component: 'div', sx: themeStyles.senderDetails }, { children: _jsxs("div", { children: [_jsx(Box, Object.assign({ component: 'div', sx: themeStyles.accordionContent }, { children: _jsx(CcfTooltip, Object.assign({ title: props.channelDisplayName }, { children: _jsxs("span", { children: [_jsx("b", { children: translate('from') }), ": ", props.channelDisplayName] }) })) })), _jsx(Box, Object.assign({ sx: themeStyles.boxAlignment }, { children: _jsx(CcfTooltip, Object.assign({ title: time }, { children: _jsxs(Box, Object.assign({ component: 'span', sx: themeStyles.accordionTime }, { children: [" ", time, " "] })) })) })), _jsx(Box, Object.assign({ component: 'button', sx: themeStyles.viewButton, onClick: () => setViewDetails(!viewDetails), role: 'button', "aria-label": viewDetails ? translate('collapseEmailHeadersLabel') : translate('expandEmailHeadersLabel'), "aria-expanded": viewDetails }, { children: _jsx(CcfDoubleArrowIcon, { sx: [viewDetails && themeStyles.upArrow] }) }))] }) })), viewDetails && (_jsxs(Box, Object.assign({ component: 'div', sx: themeStyles.accordionReceipientContainer }, { children: [(to != '') ? _jsx(CcfTooltip, Object.assign({ title: to }, { children: _jsxs(Box, Object.assign({ component: 'span', sx: themeStyles.accordionContent }, { children: [_jsx("b", { children: translate('to') }), ": ", to] })) })) : null, (cc != '') ? _jsx(CcfTooltip, Object.assign({ title: cc }, { children: _jsxs(Box, Object.assign({ component: 'span', sx: themeStyles.accordionContent }, { children: [_jsx("b", { children: "Cc" }), ": ", cc] })) })) : null, (bcc != '') ? _jsx(CcfTooltip, Object.assign({ title: bcc }, { children: _jsxs(Box, Object.assign({ component: 'span', sx: themeStyles.accordionContent }, { children: [_jsx("b", { children: "Bcc" }), ": ", bcc] })) })) : null, _jsx(Box, Object.assign({ component: 'span', sx: themeStyles.subject }, { children: props.hasVisibleTitle &&
                            _jsx(CcfLabelControl, { label: "subject", value: props.subject, styles: { wrapper: styleWrapper, label: styleLabel } }) }))] })))] })));
}
//# sourceMappingURL=ccf-contact-email-header.js.map