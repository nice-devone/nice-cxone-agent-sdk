import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme, Box, Divider } from '@mui/material';
import CcfCopilotNBRStyles from './ccf-copilot-nbr.styles';
/**
 * Component that displays seperator above for nbr
 * @returns seperator for NBR
 * @example <CcfCopilotNBRSeperator/>
 */
const CcfCopilotNBRSeperator = ({ nbrCount }) => {
    const theme = useTheme();
    const styles = CcfCopilotNBRStyles(theme);
    return (_jsx(Box, { children: (nbrCount > 0) &&
            _jsx(Box, { children: _jsx(Divider, { style: styles.line }) }) }));
};
export default CcfCopilotNBRSeperator;
//# sourceMappingURL=ccf-copilot-nbr-seperator.js.map