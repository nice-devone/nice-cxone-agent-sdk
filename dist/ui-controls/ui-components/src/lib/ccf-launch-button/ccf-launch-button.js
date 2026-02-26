import { jsx as _jsx } from "react/jsx-runtime";
import { LaunchPopover } from '../ccf-launch-popover/ccf-launch-popover';
import { useTheme } from '@mui/material';
import { useAsyncValue } from '../../hooks/useAsyncValue';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
/**
 * Component for launch button
 * ```
 * @example-
 * <CcfLaunchButton />
 * ```
 */
export const CcfLaunchButton = (props) => {
    const { anchorOrigin, contactId, htmlColor, sx, transformOrigin, tooltipPlacement, isRevampedIcon = true } = props;
    const theme = useTheme();
    const contactIndicators = useAsyncValue(CXoneAcdClient.instance.indicator.contactIndicatorsEventObservable);
    const relevantIndicators = (contactIndicators === null || contactIndicators === void 0 ? void 0 : contactIndicators.filter((indicator) => indicator.contactId === contactId && indicator.isEnabled)) || null;
    if ((relevantIndicators === null || relevantIndicators === void 0 ? void 0 : relevantIndicators.length) && (relevantIndicators === null || relevantIndicators === void 0 ? void 0 : relevantIndicators.length) > 0) {
        return (_jsx(LaunchPopover, { id: 'launchPopover', anchorOrigin: anchorOrigin, buttonSx: sx, isContact: true, htmlColor: htmlColor || theme.palette.text.clearText, transformOrigin: transformOrigin || { horizontal: 'left', vertical: 'top' }, parentIndicators: relevantIndicators, tooltipPlacement: tooltipPlacement, isRevampedIcon: isRevampedIcon, contactId: contactId }));
    }
    return null;
};
//# sourceMappingURL=ccf-launch-button.js.map