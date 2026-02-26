import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslator, CcfIconButton, CcfCloseIcon, CcfBox, CcfTypography } from '@nice-devone/ui-controls';
import { useTheme } from '@mui/material';
import ccfAgentCopilotSuggestedQuestionsStyles from './ccf-agent-copilot-suggested-questions.styles';
import { applyDecisionTreeSectionChange, skipDecisionTreeQuestion } from '../../ccf-agent-copilot-middleware';
import { useCopilotDecisionTree } from '../use-copilot-decision-tree';
import { CcfCopilotActions } from '../../ccf-agent-copilot-container.slice';
/**
 * Component that renders suggested decision tree questions and allows skipping optional ones.
 * @param decisionTree - decision tree data structure containing suggested questions
 * @returns React element containing sections and questions list
 * @example
 * ```tsx
 * <CcfAgentCopilotSuggestedQuestions
 *   decisionTree={decisionTreeData}
 * />
 * ```
 */
export const CcfAgentCopilotSuggestedQuestions = ({ decisionTree, }) => {
    var _a, _b, _c;
    const [translate] = useTranslator();
    const theme = useTheme();
    const styles = ccfAgentCopilotSuggestedQuestionsStyles(theme);
    const dispatch = useDispatch();
    const section = (_a = decisionTree === null || decisionTree === void 0 ? void 0 : decisionTree.suggestedQuestions) === null || _a === void 0 ? void 0 : _a[0];
    const decisionTreeQuestions = (_b = section === null || section === void 0 ? void 0 : section.questions) !== null && _b !== void 0 ? _b : [];
    const { taskSessionUid, contactId, decisionTreeId } = decisionTree || {};
    const [questions, setQuestions] = React.useState(decisionTreeQuestions);
    const [skippedQuestionIds, setSkippedQuestionIds] = React.useState([]);
    const previousSectionId = (_c = decisionTree === null || decisionTree === void 0 ? void 0 : decisionTree.previousSection) !== null && _c !== void 0 ? _c : '';
    const isEmpty = questions.length === 0;
    const testId = 'copilotSuggestedQuestions';
    const { headerIcon } = useCopilotDecisionTree(decisionTree);
    const ActionCheckIcon = headerIcon['CopilotDecisionTreeActionCheckIcon'];
    useEffect(() => {
        setQuestions(decisionTreeQuestions);
    }, [decisionTree]);
    /**
     * Handles skipping a question by invoking the onSkipQuestion callback and dispatching skip action.
     * @param questionId - ID of the question to skip
     * @example
     * ```ts
     * handleSkip('question-1');
     * ```
     */
    const handleSkip = (questionId) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        setSkippedQuestionIds(prev => [...prev, questionId]);
        try {
            const result = yield dispatch(skipDecisionTreeQuestion({
                taskSessionUid: taskSessionUid !== null && taskSessionUid !== void 0 ? taskSessionUid : '',
                contactId: contactId !== null && contactId !== void 0 ? contactId : '',
                decisionTreeId: decisionTreeId !== null && decisionTreeId !== void 0 ? decisionTreeId : '',
                questionId,
                sectionId: (_d = section === null || section === void 0 ? void 0 : section.sectionId) !== null && _d !== void 0 ? _d : '',
            }));
            if (skipDecisionTreeQuestion.fulfilled.match(result)) {
                setQuestions(currentQuestions => currentQuestions.filter(question => question.questionId !== questionId));
            }
        }
        catch (error) {
            console.error('Error while skipping question:', error);
        }
        finally {
            setSkippedQuestionIds(prev => prev.filter(id => id !== questionId));
        }
    });
    /**
     * Handles returning to the previous section by dispatching a section change action.
     * Updates the previousSection to the current section ID to enable bidirectional navigation.
     * @example
     * ```ts
     * handleReturnToPreviousSection();
     * ```
     */
    const handleReturnToPreviousSection = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!(decisionTree === null || decisionTree === void 0 ? void 0 : decisionTree.decisionTreeId))
            return;
        const currentSectionId = decisionTree.currentSectionId;
        const resultAction = yield dispatch(applyDecisionTreeSectionChange({
            taskSessionUid: taskSessionUid !== null && taskSessionUid !== void 0 ? taskSessionUid : '',
            contactId: contactId !== null && contactId !== void 0 ? contactId : '',
            decisionTreeId: decisionTreeId !== null && decisionTreeId !== void 0 ? decisionTreeId : '',
            sectionId: previousSectionId,
        }));
        if (applyDecisionTreeSectionChange.fulfilled.match(resultAction)) {
            const decisionTreeNewSectionData = resultAction.payload;
            dispatch(CcfCopilotActions.updateDecisionTreeState({
                contactId: contactId !== null && contactId !== void 0 ? contactId : '',
                updates: {
                    isDecisionTreeOpen: true,
                    decisionTreeData: Object.assign(Object.assign(Object.assign({}, decisionTree), decisionTreeNewSectionData), { previousSection: currentSectionId }),
                },
            }));
        }
    });
    return (_jsxs(CcfBox, Object.assign({ "data-testid": testId, sx: styles.root }, { children: [_jsx(CcfTypography, Object.assign({ variant: "h5", sx: styles.title }, { children: translate('acp_dt_suggestedQuestions') })), isEmpty
                ? (_jsxs(CcfBox, { children: [_jsxs(CcfBox, Object.assign({ display: "flex", alignItems: "center" }, { children: [_jsx(CcfIconButton, Object.assign({ "aria-label": translate('acp_dt_allQuestionsAnswered'), size: "small", sx: { color: theme.palette.success.main, mr: 1 }, disableRipple: true, disabled: true, tabIndex: -1 }, { children: ActionCheckIcon })), _jsx(CcfTypography, Object.assign({ variant: "body2" }, { children: translate('acp_dt_allQuestionsAnswered') }))] })), previousSectionId &&
                            _jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.returnLink, "aria-label": translate('acp_dt_returnToPreviousSection'), onClick: () => handleReturnToPreviousSection() }, { children: translate('acp_dt_returnToPreviousSection') }))] }))
                : _jsx(CcfBox, Object.assign({ sx: styles.questionsContainer }, { children: _jsx("ul", Object.assign({ style: styles.list }, { children: questions.map((question) => (_jsxs(CcfBox, Object.assign({ sx: styles.questionBox, "data-testid": `${testId}-question-${question.questionId}` }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body1", sx: styles.question }, { children: question.questionText })), !question.mandatory && (_jsx(CcfIconButton, Object.assign({ "aria-label": 'Skip question', onClick: () => handleSkip(question.questionId), "data-testid": `${testId}-skip-${question.questionId}`, disableRipple: true, size: "small", sx: styles.skipButton, disabled: skippedQuestionIds.includes(question.questionId) }, { children: _jsx(CcfCloseIcon, { fontSize: "small" }) })))] }), question.questionId))) })) }))] })));
};
export default CcfAgentCopilotSuggestedQuestions;
//# sourceMappingURL=ccf-agent-copilot-suggested-questions.js.map