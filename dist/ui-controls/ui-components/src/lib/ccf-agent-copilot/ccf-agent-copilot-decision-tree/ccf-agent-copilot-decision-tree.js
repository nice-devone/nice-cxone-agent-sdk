import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CcfAgentCopilotSuggestedQuestions from './ccf-agent-copilot-suggested-questions/ccf-agent-copilot-suggested-questions';
import { Button, Divider, Typography } from '@mui/material';
import { useCopilotDecisionTree } from './use-copilot-decision-tree';
import CcfAgentCopilotCaptureDetails from './ccf-agent-copilot-capture-details/ccf-agent-copilot-capture-details';
import { useDecisionTreeCaptureDetails } from './ccf-agent-copilot-capture-details/useCaptureDetails';
import { CopilotSelect } from './ccf-agent-copilot-dynamic-input-types/ccf-agent-copilot-dynamic-input-types.styles';
import { CcfDialogBox, useTranslator } from '@nice-devone/ui-controls';
/**
 * Component that renders the Copilot Decision Tree UI including:
 * - Responsive layout (switches to compact mode below 900px width via ResizeObserver)
 * - Header with dynamic icon and decision tree title
 * - Two logical panels: "Suggested Questions" and "Capture Details" (content to be injected in future iterations)
 * - Accessible close button for dismissing the decision tree panel
 *
 * @param decisionTreeData - Decision tree domain object containing title, icon and nested question structures
 * @returns React element wrapping decision tree header and placeholder sections
 * @example
 * ```tsx
 * import { CcfAgentCopilotDecisionTree } from '@nice-devone/ui-components';
 *
 * <CcfAgentCopilotDecisionTree
 *   decisionTreeData={myDecisionTreeData}
 *   onClose={() => setShowDecisionTree(false)}
 * />
 * ```
 */
export const CcfAgentCopilotDecisionTree = ({ decisionTreeData }) => {
    const [translate] = useTranslator();
    const { containerRef, styles, headerIcon, title, icon, showQuestionsCount, answeredQuestions, totalNoOfQuestions, isCompact, showCloseConfirmation, handleCloseDecisionTree, confirmCloseDecisionTree, cancelCloseDecisionTree, } = useCopilotDecisionTree(decisionTreeData);
    const { uiSections, captureSections, selectedSectionId, selectedSection, handleSubmit, handleSectionChange, setShowConfirmSubmit, showConfirmSubmit, confirmFinalSubmit, } = useDecisionTreeCaptureDetails();
    const showSubmit = !!selectedSection && (decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.showSubmit);
    const captureDetailsProps = {
        sections: captureSections,
        selectedSection,
        onSubmit: handleSubmit,
        showSubmit,
        showConfirmSubmit,
        setShowConfirmSubmit,
        confirmFinalSubmit,
        decisionTreeData,
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: styles.container, "data-testid": "decision-tree-container" }, { children: [_jsxs(Box, Object.assign({ sx: styles.header }, { children: [_jsxs(Box, Object.assign({ sx: styles.headerContent }, { children: [headerIcon[icon], _jsx(Box, Object.assign({ sx: { ml: 1 } }, { children: _jsx(Typography, Object.assign({ variant: "h5", "data-testid": "decision-tree-title", sx: styles.title }, { children: title })) }))] })), _jsxs(Box, Object.assign({ sx: styles.headerAction }, { children: [showQuestionsCount && (_jsx(Typography, Object.assign({ variant: "body2", sx: { ml: 1 }, "data-testid": "decision-tree-question-count" }, { children: `${answeredQuestions}/${totalNoOfQuestions}` }))), _jsx(IconButton, Object.assign({ "aria-label": "close", onClick: handleCloseDecisionTree, size: "small" }, { children: _jsx(CloseIcon, { fontSize: "small" }) }))] }))] })), _jsx(Box, Object.assign({ sx: Object.assign({}, styles.dropdownContainer) }, { children: uiSections.length > 0 && (_jsx(CopilotSelect, Object.assign({ sx: { mb: '3rem' }, id: "decision-tree-section-select", value: selectedSectionId, onChange: (e) => handleSectionChange(e.target.value) }, { children: uiSections.map((section) => {
                                return (_jsx("option", Object.assign({ value: section.sectionId }, { children: section.sectionTitle }), section.sectionId));
                            }) }))) })), _jsxs(Box, Object.assign({ ref: containerRef, sx: styles.contentWrapper }, { children: [_jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.sections), styles.sqSection) }, { children: decisionTreeData && _jsx(CcfAgentCopilotSuggestedQuestions, { decisionTree: decisionTreeData }) })), _jsx(Divider, { orientation: isCompact ? 'horizontal' : 'vertical', sx: styles.divider, "aria-hidden": "true" }), _jsx(Box, Object.assign({ sx: Object.assign({}, styles.sections) }, { children: _jsx(CcfAgentCopilotCaptureDetails, Object.assign({}, captureDetailsProps)) }))] })), selectedSection && showSubmit && (_jsx(Box, Object.assign({ sx: { display: 'flex', justifyContent: 'flex-end', mt: '1rem' } }, { children: _jsx(Button, Object.assign({ variant: "contained", color: "primary", sx: { minWidth: '6rem' }, onClick: () => setShowConfirmSubmit(true) }, { children: (decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.completeBtnTitle) || translate('submit') })) })))] })), _jsx(CcfDialogBox, Object.assign({ isOpen: showCloseConfirmation, title: translate('acp_dt_areYouSure'), primaryButtonText: translate('acp_dt_dontSave'), secondaryButtonText: translate('cancel'), primaryButtonProps: {
                    variant: 'contained',
                    onClick: () => confirmCloseDecisionTree(),
                }, secondaryButtonProps: {
                    variant: 'outlined',
                    onClick: () => cancelCloseDecisionTree(),
                }, handleOnClickOfHeaderCloseButton: () => cancelCloseDecisionTree(), handleOnClose: () => cancelCloseDecisionTree() }, { children: translate('acp_dt_confirmCancel') }))] }));
};
export default CcfAgentCopilotDecisionTree;
//# sourceMappingURL=ccf-agent-copilot-decision-tree.js.map