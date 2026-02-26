import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Metric } from './metric/metric';
import { useSelector } from 'react-redux';
import { getRTIGData } from '../features/rtig-slice';
import { CcfBox, useTranslator } from '@nice-devone/ui-controls';
import { NotificationMessage } from './notification-message/notification-message';
import { Accordion, AccordionDetails, AccordionSummary, Divider, useTheme } from '@mui/material';
import rtigStyles from './rtig.styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
/**
 * RTIG App component
 * @example - <RtigAppComponent />
 */
export function RtigAppComponent(props) {
    const theme = useTheme();
    const rtigAppStyles = rtigStyles(theme);
    const [translate] = useTranslator();
    const stateRtigData = useSelector(getRTIGData());
    const metricList = stateRtigData.metricScores;
    const notificationList = stateRtigData.notificationMessages;
    const overallSentimentMetric = stateRtigData.overallSentimentMetric;
    const assistEnlighten = stateRtigData.assistEnlighten;
    const configType = stateRtigData.configType;
    const hasEventMessage = stateRtigData.hasEventMessage;
    const hasPhraseMessage = stateRtigData.hasPhraseMessage;
    const msToSec = 1000;
    const msToHalfSec = 30000;
    const msToMin = 60000;
    const msToHour = 3600000;
    const msToDay = 86400000;
    const overallMetricGaugeRadius = props.isBelowLg && !props.isBelowMd ? 75 : 100;
    const overallMetricGaugeImageSize = props.isBelowLg && !props.isBelowMd ? 35 : 55;
    const overallMetricGaugeImageRight = props.isBelowLg && !props.isBelowMd ? '40%' : '35%';
    const overallMetricGaugeImageTop = props.isBelowLg && !props.isBelowMd ? '55%' : '50%';
    /**
     * Function to calculate fixed time
     * @example - fixedTime(dividend, divider)
     */
    const fixedTime = (dividend, divider) => {
        return (dividend / divider).toFixed();
    };
    /**
     * Function to calculate duration
     * @example - calculateDuration(date)
     */
    const calculateDuration = (receptionDate) => {
        const currentDate = new Date();
        const difInTime = currentDate.getTime() - receptionDate.getTime();
        let result = '';
        if (difInTime < msToHalfSec) {
            result = 'now';
        }
        else if (difInTime < msToMin) {
            result = fixedTime(difInTime, msToSec) + 's ago';
        }
        else if (difInTime > msToMin && difInTime < msToHour) {
            result = fixedTime(difInTime, msToMin) + 'm ago';
        }
        else if (difInTime > msToHour && difInTime < msToDay) {
            result = fixedTime(difInTime, msToHour) + 'h ago';
        }
        else if (difInTime > msToDay) {
            result = fixedTime(difInTime, msToDay) + 'd ago';
        }
        return result;
    };
    return (_jsxs(CcfBox, Object.assign({ sx: [props.isBelowMd && rtigAppStyles.mainFlexContainerMDView, rtigAppStyles.mainFlexContainer] }, { children: [assistEnlighten && (_jsxs(CcfBox, Object.assign({ sx: Object.assign({}, rtigAppStyles.metricSection) }, { children: [!props.isBelowMd && (_jsxs(CcfBox, Object.assign({ sx: rtigAppStyles.overallSentimentMetricSection }, { children: [_jsx(CcfBox, Object.assign({ sx: rtigAppStyles.headingStyle }, { children: configType.toLowerCase() === 'sales'
                                    ? translate('likelihoodToBuy')
                                    : translate('overallSentimentScore') })), _jsx(CcfBox, Object.assign({ sx: rtigAppStyles.overallMetricContainer }, { children: _jsx(Metric, { metricId: overallSentimentMetric.tag, percent: overallSentimentMetric.score, showLabel: false, radius: overallMetricGaugeRadius, strokeWidth: 16, imageSize: overallMetricGaugeImageSize, imageName: overallSentimentMetric.image_src, label: "No SCORE", useDefaultInfo: configType.toLowerCase() === 'sales' ? false : true, iconRightMargin: overallMetricGaugeImageRight, iconTopMargin: overallMetricGaugeImageTop }) }))] }))), metricList.length > 0 && (_jsxs(CcfBox, Object.assign({ sx: rtigAppStyles.guidanceMetricsSection }, { children: [_jsx(CcfBox, Object.assign({ sx: rtigAppStyles.headingStyle }, { children: translate('guidanceScores') })), _jsx(CcfBox, Object.assign({ sx: rtigAppStyles.guidanceMetricsMainContainer }, { children: _jsx(CcfBox, Object.assign({ sx: rtigAppStyles.guidanceMetricsFlexContainer }, { children: metricList.map((metric, index) => metric.tag.toLowerCase() !== 'sentiment' &&
                                        metric.tag.toLowerCase() !== 'likelihoodtobuy' && (_jsx(CcfBox, Object.assign({ sx: Object.assign({}, rtigAppStyles.guidanceMetricsGrid) }, { children: _jsx(Metric, { metricId: metric.tag, percent: metric.score, label: metric.tag, showLabel: true, imageName: metric.image_src, radius: 36, imageSize: 26, fontSize: 10, strokeWidth: 6, metric: metric, iconRightMargin: '30%', iconTopMargin: '42%' }) }), index))) })) }))] })))] }))), overallSentimentMetric.tag && !props.isBelowMd && (_jsx(Divider, { orientation: "vertical", style: rtigAppStyles.dividerLine, sx: rtigAppStyles.rtigSuggestionDivider })), !props.isBelowMd && (_jsxs(CcfBox, Object.assign({ sx: Object.assign({}, rtigAppStyles.suggestionSummariesSection) }, { children: [_jsx(CcfBox, Object.assign({ sx: rtigAppStyles.headingStyle }, { children: translate('suggestionSummary') })), _jsx(CcfBox, Object.assign({ sx: rtigAppStyles.suggestionsListContainer }, { children: _jsxs(CcfBox, Object.assign({ sx: rtigAppStyles.suggesttionListFlexBox }, { children: [!hasEventMessage && !hasPhraseMessage && (_jsx(CcfBox, Object.assign({ sx: rtigAppStyles.noSuggestions }, { children: translate('noSuggestionYet') }))), (hasEventMessage || hasPhraseMessage) &&
                                    notificationList.map((notification) => (_jsx(NotificationMessage, { label: notification.metric ? notification.metric.tag : notification.secondaryAlertName, message: notification.primaryAlertDescription
                                            ? notification.primaryAlertDescription
                                            : notification.secondaryAlertDescription, metric: notification.metric ? notification.metric : '', hasPhraseMessage: notification.hasPhraseExpression, duration: calculateDuration(notification.receptionDate), isBelowLg: props.isBelowLg }, 'notification-msg-' + notification.notificationId)))] })) }))] }))), props.isBelowMd && (_jsx(CcfBox, Object.assign({ sx: Object.assign({}, rtigAppStyles.suggestionSummariesSectionAccordion) }, { children: _jsxs(Accordion, Object.assign({ sx: rtigAppStyles.suggestionSummaryAccordion }, { children: [_jsx(AccordionSummary, Object.assign({ expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel1-content", id: "panel1-header", sx: rtigAppStyles.headingStyle }, { children: translate('suggestionSummary') })), _jsx(AccordionDetails, Object.assign({ sx: rtigAppStyles.suggestionSummaryDetails }, { children: _jsx(CcfBox, Object.assign({ sx: rtigAppStyles.suggestionsListContainer }, { children: _jsxs(CcfBox, Object.assign({ sx: rtigAppStyles.suggesttionListFlexBox }, { children: [!hasEventMessage && !hasPhraseMessage && (_jsx(CcfBox, Object.assign({ sx: rtigAppStyles.noSuggestions }, { children: translate('noSuggestionYet') }))), (hasEventMessage || hasPhraseMessage) &&
                                            notificationList.map((notification) => (_jsx(NotificationMessage, { label: notification.metric ? notification.metric.tag : notification.secondaryAlertName, message: notification.primaryAlertDescription
                                                    ? notification.primaryAlertDescription
                                                    : notification.secondaryAlertDescription, metric: notification.metric ? notification.metric : '', hasPhraseMessage: notification.hasPhraseExpression, duration: calculateDuration(notification.receptionDate) }, 'notification-msg-' + notification.notificationId)))] })) })) }))] })) }))), (assistEnlighten && props.isBelowMd) && (_jsxs(CcfBox, Object.assign({ sx: Object.assign({}, rtigAppStyles.overallSentimentMetricSection) }, { children: [_jsx(CcfBox, Object.assign({ sx: [rtigAppStyles.headingStyle, rtigAppStyles.mdHeadingStyle] }, { children: configType.toLowerCase() === 'sales' ? translate('likelihoodToBuy') : translate('overallSentimentScore') })), _jsx(CcfBox, Object.assign({ sx: rtigAppStyles.overallMetricContainer }, { children: _jsx(Metric, { metricId: overallSentimentMetric.tag, percent: overallSentimentMetric.score, showLabel: false, radius: 100, strokeWidth: 16, imageSize: 55, imageName: overallSentimentMetric.image_src, label: "No SCORE", useDefaultInfo: configType.toLowerCase() === 'sales' ? false : true, iconRightMargin: '35%', iconTopMargin: '50%' }) }))] })))] })));
}
//# sourceMappingURL=rtig.js.map