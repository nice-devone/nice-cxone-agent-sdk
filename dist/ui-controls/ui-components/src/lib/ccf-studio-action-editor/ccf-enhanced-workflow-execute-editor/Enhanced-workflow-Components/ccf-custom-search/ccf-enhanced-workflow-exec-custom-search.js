import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfBox } from '@nice-devone/ui-controls';
import CcfEnhancedWEStepperContainer from '../ccf-stepper-section/ccf-enhanced-workflow-exec-stepper-container';
import CcfEnhancedWECustomSearchStyles from './ccf-enhanced-workflow-exec-custom-search.styles';
import CcfEnhancedWEConfigurationTable from '../ccf-config-table/ccf-enhanced-workflow-exec-config-table';
import { useTheme } from '@mui/material';
/**
 * Component displays agent workflow execution application Specific search workflow Information screen.
 *
 * This component renders a "workflow mapping" section for the agent workflow execution application.
 *
 * @returns JSX.Element A component displaying the workflow mapping information screen for phone / email.
 * @example
 *   <CcfEnhancedWECustomSearch />
 */
const CcfEnhancedWECustomSearch = () => {
    const theme = useTheme();
    const styles = CcfEnhancedWECustomSearchStyles(theme);
    return (_jsxs(CcfBox, Object.assign({ sx: styles.mainContainer }, { children: [_jsx(CcfEnhancedWEStepperContainer, {}), _jsx(CcfBox, { children: _jsx(CcfBox, { children: _jsx(CcfEnhancedWEConfigurationTable, {}) }) })] })));
};
export default CcfEnhancedWECustomSearch;
//# sourceMappingURL=ccf-enhanced-workflow-exec-custom-search.js.map