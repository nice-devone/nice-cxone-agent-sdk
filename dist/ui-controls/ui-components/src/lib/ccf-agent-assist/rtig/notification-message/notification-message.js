import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Metric } from '../metric/metric';
import { useState } from 'react';
import { CcfBox, useTranslator } from '@nice-devone/ui-controls';
import { Card, CardContent, useTheme } from '@mui/material';
import { PhrasesIcon } from '../../constants/rtig-icons';
import notificationMessageStyles from './notification-message.style';
/**
 * Notification Message component
 * @example - <NotificationMessage />
 */
export function NotificationMessage(props) {
    const theme = useTheme();
    const notificationMessagesSx = notificationMessageStyles(theme);
    const [translate] = useTranslator();
    const [message] = useState(props === null || props === void 0 ? void 0 : props.message);
    const [label] = useState(props === null || props === void 0 ? void 0 : props.label);
    const metricGaugeRadius = props.isBelowLg ? 25 : 38;
    const metricGaugeImageSize = props.isBelowLg ? 20 : 32;
    /**
     * parse html string to remove p tag
     * @example - parseHtml(htmlString);
     */
    const parseHtml = (html) => {
        return html === null || html === void 0 ? void 0 : html.replace(/^<p>(.*?)<\/p>$/, '$1');
    };
    return (_jsx(Card, Object.assign({ variant: "outlined", style: notificationMessagesSx.mainCard }, { children: _jsx(CardContent, Object.assign({ sx: notificationMessagesSx.cardContent }, { children: _jsxs(CcfBox, Object.assign({ sx: notificationMessagesSx.scoreMeterContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: notificationMessagesSx.iconContainer }, { children: [props.metric && (_jsx(Metric, { metricId: props.metric.tag, percent: props.metric.score, imageName: props.metric.image_src, showLabel: false, radius: metricGaugeRadius, imageSize: metricGaugeImageSize, strokeWidth: 6, metric: props.metric, iconRightMargin: '28%', iconTopMargin: '42%' })), !props.metric && (_jsx(CcfBox, Object.assign({ sx: notificationMessagesSx.phrasesIconContainerParent }, { children: _jsx(CcfBox, Object.assign({ sx: notificationMessagesSx.phrasesIconContainer }, { children: _jsx(PhrasesIcon, { imageSize: 32 }) })) })))] })), _jsxs(CcfBox, Object.assign({ sx: notificationMessagesSx.messageBoxContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: notificationMessagesSx.messageFlexContainer }, { children: [_jsx("span", Object.assign({ style: notificationMessagesSx.messageHeading }, { children: props.metric ? translate(label) : label })), _jsx("span", Object.assign({ style: notificationMessagesSx.duration }, { children: props.duration }))] })), _jsx("span", { style: notificationMessagesSx.messageText, dangerouslySetInnerHTML: { __html: parseHtml(message) } })] }))] })) })) })));
}
//# sourceMappingURL=notification-message.js.map