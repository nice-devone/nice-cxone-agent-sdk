import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getRangeOfMetricByScore, getDisableMetricColor } from '../../features/agent-assist-middleware';
import { SemiCircleProgress } from './progressbar-semicircle';
import { CcfBox, useTranslator } from '@nice-devone/ui-controls';
import { getRTIGIcon } from '../../constants/rtig-icons';
import metricStyles from './metric.styles';
import { useTheme } from '@mui/material';
/**
 * Metric component
 * @example - <Metric />
 */
export function Metric(props) {
    var _a, _b;
    const theme = useTheme();
    const metricScoreStyles = metricStyles();
    const [translate] = useTranslator();
    const [stateColor, setStateColor] = useState((_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white);
    const [_metricId, setMetricId] = useState(props.metricId);
    const [label, setLabel] = useState(props.label);
    const [imageName, setImageName] = useState(props.imageName);
    /**
     * function to get the diameter of the semi circle meter from props
     * @example - getDiameter();
     */
    const getDiameter = () => {
        return props.radius * 2;
    };
    /**
     * function to get the metric image source by metric id from props
     * @example - getImageSrcByMetricId();
     */
    const getImageSrcByMetricId = () => {
        const rangeOfMetric = getRangeOfMetricByScore(props.percent || 0, props.metric);
        if (rangeOfMetric) {
            setStateColor(rangeOfMetric.color);
            if (props === null || props === void 0 ? void 0 : props.useDefaultInfo) {
                setLabel(rangeOfMetric.label);
                setImageName(rangeOfMetric.imageSrc);
            }
        }
        else {
            setStateColor(getDisableMetricColor());
        }
        if (props === null || props === void 0 ? void 0 : props.metricId) {
            setMetricId('interruption');
        }
    };
    useEffect(() => {
        getDiameter();
        getImageSrcByMetricId();
    }, [props]);
    return (_jsxs(CcfBox, Object.assign({ sx: metricScoreStyles.mainFlexContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: metricScoreStyles.scoreMeterContainer }, { children: [_jsx(SemiCircleProgress, { diameter: getDiameter(), strokeWidth: props.strokeWidth, stroke: stateColor, percentage: props.percent, showPercentValue: false }), _jsx(CcfBox, Object.assign({ style: {
                            color: stateColor,
                            position: 'absolute',
                            right: props.iconRightMargin,
                            top: props.iconTopMargin,
                            bottom: 'auto',
                        } }, { children: getRTIGIcon(imageName, props.imageSize) }))] })), props.showLabel && (_jsx(CcfBox, Object.assign({ sx: metricScoreStyles.RTIGTitleContainer, title: `${label}` }, { children: _jsx("span", Object.assign({ style: { fontSize: props.fontSize } }, { children: translate(label).toUpperCase() })) })))] })));
}
//# sourceMappingURL=metric.js.map