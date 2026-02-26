import { __awaiter } from "tslib";
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import CcfAgentCopilotDecisionTreeStyles from './ccf-agent-copilot-decision-tree.styles';
import { copilotDecisionTreeIcons } from '../ccf-agent-copilot-icons';
import { CcfCopilotActions } from '../ccf-agent-copilot-container.slice';
import { useDispatch, useSelector } from 'react-redux';
import { cancelDecisionTreeThunk } from '../ccf-agent-copilot-middleware';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * Hook encapsulating layout + derived state for the Copilot Decision Tree panel.
 * Responsibilities:
 * - Resolves MUI theme & computes style object via factory
 * - Tracks responsive breakpoint (compact mode) using ResizeObserver
 * - Derives header metadata (title, icon, answered/total counts)
 * - Exposes icon map for rendering header icon safely
 *
 * @param decisionTreeData - Decision tree data object (may be null during initial load)
 * @returns Object with layout refs, derived display data and computed styles
 * @example
 * ```tsx
 * const {
 *   containerRef,
 *   styles,
 *   headerIcon,
 *   title,
 *   icon,
 *   showQuestionsCount,
 *   answeredQuestions,
 *   totalNoOfQuestions,
 * } = useCopilotDecisionTree(decisionTreeData);
 * ```
 */
export function useCopilotDecisionTree(decisionTreeData) {
    var _a, _b;
    const theme = useTheme();
    const dispatch = useDispatch();
    const activeContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeCaseId = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || `${activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId}`;
    const headerIcon = Object.assign({}, copilotDecisionTreeIcons);
    const containerRef = useRef(null);
    const [isCompact, setIsCompact] = useState(false);
    const title = (_a = decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.title) !== null && _a !== void 0 ? _a : '';
    const icon = (_b = decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.icon) !== null && _b !== void 0 ? _b : '';
    const { answeredQuestions, totalNoOfQuestions } = decisionTreeData || {};
    const showQuestionsCount = answeredQuestions !== undefined && totalNoOfQuestions !== undefined;
    const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
    useEffect(() => {
        const node = containerRef.current;
        if (!node)
            return;
        const observer = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;
            setIsCompact(width < 900);
        });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    const styles = CcfAgentCopilotDecisionTreeStyles(theme, isCompact);
    /**
     * Function to handle close button click (shows confirmation modal)
     * @example
     * ```tsx
     * handleCloseDecisionTree();
     * ```
     */
    const handleCloseDecisionTree = () => {
        setShowCloseConfirmation(true);
    };
    /**
     * Function to confirm closing the decision tree
     * @example
     * ```tsx
     * confirmCloseDecisionTree();
     * ```
     */
    const confirmCloseDecisionTree = () => __awaiter(this, void 0, void 0, function* () {
        if (!decisionTreeData)
            return;
        const result = yield dispatch(cancelDecisionTreeThunk({
            taskSessionUid: decisionTreeData.taskSessionUid,
            contactId: activeCaseId,
            decisionTreeId: decisionTreeData.decisionTreeId,
        }));
        if (cancelDecisionTreeThunk.fulfilled.match(result)) {
            dispatch(CcfCopilotActions.updateDecisionTreeState({
                contactId: activeCaseId,
                updates: { isDecisionTreeOpen: false, decisionTreeData: { title, icon, sections: decisionTreeData.sections, completeBtnTitle: decisionTreeData.completeBtnTitle } },
            }));
            setShowCloseConfirmation(false);
        }
    });
    /**
     * Function to cancel closing the decision tree
     * @example
     * ```tsx
     * cancelCloseDecisionTree();
     * ```
     */
    const cancelCloseDecisionTree = () => {
        setShowCloseConfirmation(false);
    };
    return {
        containerRef,
        styles,
        headerIcon,
        title,
        icon,
        showQuestionsCount,
        answeredQuestions,
        totalNoOfQuestions,
        isCompact,
        showCloseConfirmation,
        handleCloseDecisionTree,
        confirmCloseDecisionTree,
        cancelCloseDecisionTree,
    };
}
//# sourceMappingURL=use-copilot-decision-tree.js.map