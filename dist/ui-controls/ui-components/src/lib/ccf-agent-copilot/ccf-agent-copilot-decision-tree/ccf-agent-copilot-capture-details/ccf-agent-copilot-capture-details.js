import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SectionRenderer } from '../ccf-agent-copilot-dynamic-input-types/ccf-section-renderer';
import { Box, useTheme } from '@mui/material';
import { CcfBox, CcfDialogBox, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import ccfAgentCopilotSuggestedQuestionsStyles from '../ccf-agent-copilot-suggested-questions/ccf-agent-copilot-suggested-questions.styles';
/**
 * Capture details section rendering selected section questions and submit action.
 * @example
 * ```tsx
 * <CcfAgentCopilotCaptureDetails
 *   sections={sections}
 *   selectedSection={selectedSection}
 *   onSubmit={(e)=>e.preventDefault()}
 *   showSubmit
 * />
 * ```
 */
export const CcfAgentCopilotCaptureDetails = ({ selectedSection, showConfirmSubmit, setShowConfirmSubmit, confirmFinalSubmit, }) => {
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = ccfAgentCopilotSuggestedQuestionsStyles(theme);
    return (_jsxs(_Fragment, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.root }, { children: [_jsx(CcfTypography, Object.assign({ variant: "h5", sx: styles.title }, { children: translate('acp_dt_captureDetails') })), selectedSection ? (_jsx(SectionRenderer, { section: selectedSection }, selectedSection.sectionId)) : (_jsx(Box, { children: translate('acp_dt_noCaptureDetails') }))] })), _jsx(CcfDialogBox, Object.assign({ isOpen: showConfirmSubmit, title: translate('acp_dt_confirmSubmission'), primaryButtonText: translate('submit'), secondaryButtonText: translate('cancel'), primaryButtonProps: {
                    variant: 'contained',
                    onClick: () => {
                        confirmFinalSubmit();
                        setShowConfirmSubmit(false);
                    },
                }, secondaryButtonProps: {
                    variant: 'outlined',
                    onClick: () => setShowConfirmSubmit(false),
                }, handleOnClickOfHeaderCloseButton: () => setShowConfirmSubmit(false), handleOnClose: () => setShowConfirmSubmit(false) }, { children: translate('acp_dt_confirmSubmit') }))] }));
};
export default CcfAgentCopilotCaptureDetails;
//# sourceMappingURL=ccf-agent-copilot-capture-details.js.map