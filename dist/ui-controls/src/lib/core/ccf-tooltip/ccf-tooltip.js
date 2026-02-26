import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip, useTheme } from '@mui/material';
import { withTranslation } from '../../ccf-translator/ccf-translator';
import CcfTooltipStyle from './ccf-tooltip-styles';
/**
 * Component to display tooltip
 * @param param0 - CcfTooltipProps
 * @example <CcfTooltip />
 * @returns
 */
const CcfTooltipWrapper = (_a) => {
    var { translator, translationKey, children, tooltipForRTL, styles, title } = _a, other = __rest(_a, ["translator", "translationKey", "children", "tooltipForRTL", "styles", "title"]);
    const theme = useTheme();
    const ccfTooltipStyles = CcfTooltipStyle(theme);
    //Default to title if no translationKey has been provided
    const translatedText = translator(translationKey) || title;
    return (_jsx(Tooltip, Object.assign({}, other, { componentsProps: { arrow: { sx: Object.assign(Object.assign({}, ccfTooltipStyles.ccfTooltipArrow), styles === null || styles === void 0 ? void 0 : styles.ccfTooltipArrow) },
            tooltip: { sx: tooltipForRTL && !(styles === null || styles === void 0 ? void 0 : styles.ccfTooltipArrow) ? Object.assign({}, ccfTooltipStyles.ccfTooltipRight0) : Object.assign(Object.assign({}, ccfTooltipStyles.ccfTooltip), styles === null || styles === void 0 ? void 0 : styles.ccfTooltip) } }, title: translatedText }, { children: children })));
};
export const CcfTooltip = withTranslation(CcfTooltipWrapper);
//# sourceMappingURL=ccf-tooltip.js.map