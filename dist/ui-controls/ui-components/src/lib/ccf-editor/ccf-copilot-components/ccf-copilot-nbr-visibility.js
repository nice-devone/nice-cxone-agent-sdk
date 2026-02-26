import { jsx as _jsx } from "react/jsx-runtime";
import { useSelector, useDispatch } from 'react-redux';
import { CcfTooltip, useTranslator, CcfSparklesIcon, } from '@nice-devone/ui-controls';
import { useTheme, useMediaQuery, Box, IconButton } from '@mui/material';
import { getIsNBRAvailable, CcfCopilotActions, getIsNBROpen, } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import CcfCopilotNBRStyles from './ccf-copilot-nbr.styles';
/**
 * Component that displays copilot toggle for nbr
 * @returns nbr toggle icon
 * @example <CcfCopilotNBRVisibility/>
 */
const CcfCopilotNBRVisibility = ({ caseId, nbrCount }) => {
    var _a, _b;
    const showSparkleIcon = useSelector(getIsNBRAvailable(caseId || ''));
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('md'));
    const styles = CcfCopilotNBRStyles(theme);
    const primaryIconColor = ((_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.primary) === null || _b === void 0 ? void 0 : _b.main);
    const [translate] = useTranslator();
    const isResponseVisible = useSelector(getIsNBROpen(caseId || ''));
    const dispatch = useDispatch();
    /**
     * method to handle visibility of NBR
     * @example
     * ```
     * toggleNBRVisibility()
     * ```
     */
    const toggleNBRVisibility = () => {
        dispatch(CcfCopilotActions.setIsNBROpen({ isNBROpen: !isResponseVisible, caseId }));
    };
    return (_jsx(Box, { children: isSmView && (_jsx(Box, { children: _jsx(CcfTooltip, Object.assign({ title: isResponseVisible
                    ? translate('hideNextBestResponses')
                    : translate('showNextBestResponses'), placement: "top-end", styles: {
                    ccfTooltip: Object.assign({}, styles.timeStampTooltip),
                    ccfTooltipArrow: Object.assign({}, styles.timeStampTooltipArrow),
                }, arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: styles.nullHover }, { children: (nbrCount > 0) && showSparkleIcon && (_jsx(CcfSparklesIcon, { onClick: toggleNBRVisibility, htmlColor: primaryIconColor, sx: styles.sparklesIcon, "data-testid": "sparkle" })) })) })) })) }));
};
export default CcfCopilotNBRVisibility;
//# sourceMappingURL=ccf-copilot-nbr-visibility.js.map