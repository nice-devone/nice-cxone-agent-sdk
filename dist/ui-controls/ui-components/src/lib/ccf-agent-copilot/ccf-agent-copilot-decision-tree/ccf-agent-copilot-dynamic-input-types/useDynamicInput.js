import { __awaiter } from "tslib";
import { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDecisionTreeData, CcfCopilotActions } from '../../ccf-agent-copilot-container.slice';
import { updateDecisionTreeResponseThunk } from '../../ccf-agent-copilot-middleware';
import { useDecisionTreeCaptureDetails } from '../ccf-agent-copilot-capture-details/useCaptureDetails';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * useDynamicInput
 *
 * Universal hook for managing inline-edit input fields for:
 *  - String
 *  - Number
 *  - Boolean
 *  - Date
 *
 * Provides:
 *  - temp editing value
 *  - edit mode control
 *  - required validation
 *  - save/cancel behavior
 *  - value normalization
 *
 * @example
 * `const {} = useDynamicInput({ id, value, required, type, onChange, onSaveResponse });`
 */
export function useDynamicInput({ id, value, required, type, }) {
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeCaseId = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) || `${nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId}`;
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const [tempValue, setTempValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const decisionTreeData = useSelector(getDecisionTreeData(activeCaseId));
    const { uiSections, captureSections, selectedSectionId } = useDecisionTreeCaptureDetails();
    // -----------------------------
    // CHANGE HANDLER (typing)
    // -----------------------------
    const handleChange = useCallback((questionId, value) => {
        if (!decisionTreeData)
            return;
        /**
            * updateQuestion - helper to update question response in a section
            * @param section - CapturedSection to update
            * @returns updated CapturedSection with modified question response
            * @example
            * const updatedSection = updateQuestion(section);
            */
        const updateQuestion = (section) => (Object.assign(Object.assign({}, section), { questionsResponded: section.questionsResponded.map((question) => question.questionId === questionId ? Object.assign(Object.assign({}, question), { questionResponse: value }) : question) }));
        const updatedCaptured = captureSections.map(updateQuestion);
        dispatch(CcfCopilotActions.updateDecisionTreeState({
            contactId: activeCaseId,
            updates: {
                isDecisionTreeOpen: true,
                decisionTreeData: Object.assign(Object.assign({}, decisionTreeData), { capturedResponses: updatedCaptured }),
            },
        }));
    }, [decisionTreeData, captureSections, uiSections, dispatch, activeCaseId]);
    // -----------------------------
    // SAVE RESPONSE (✓ click)
    // -----------------------------
    const handleResponseSave = useCallback((questionId, newValue) => __awaiter(this, void 0, void 0, function* () {
        if (!decisionTreeData || !selectedSectionId)
            return;
        dispatch(updateDecisionTreeResponseThunk({
            taskSessionUid: decisionTreeData.taskSessionUid,
            contactId: activeCaseId,
            decisionTreeId: decisionTreeData.decisionTreeId,
            sectionId: selectedSectionId,
            questionId,
            newResponse: newValue || '',
        }));
    }), [dispatch, activeCaseId, decisionTreeData, selectedSectionId]);
    /** Normalize value → string for <input/> */
    const normalizeForInput = useCallback((val) => {
        if (val === null || val === undefined)
            return '';
        if (val instanceof Date)
            return val.toISOString().substring(0, 10);
        return String(val);
    }, []);
    /** Start inline editing
     * @example
     * ```ts
     * startEdit(); // enables edit mode and loads current value into tempValue
     * ```
    */
    const startEdit = () => {
        setTempValue(value);
        setIsEditing(true);
        setError('');
        setTimeout(() => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, 0);
    };
    /** Cancel editing & restore original value
     * @example
     * ```ts
     * cancelEdit(); // exits edit mode and restores original value
     * ```
    */
    const cancelEdit = () => {
        setIsEditing(false);
        setTempValue(value);
        setError('');
    };
    /** Required validation helper
     * @example
     * ```ts
     * const valid = isValid(tempValue); // checks if tempValue meets required criteria
     * ```
    */
    const isValid = (decisionTreeInputValue) => {
        if (!required)
            return true;
        return String(decisionTreeInputValue).trim().length > 0;
    };
    /** Save final value
     * @example
     * ```ts
     * saveEdit(); // validates and saves tempValue, exits edit mode
     * ```
    */
    const saveEdit = () => {
        if (!isValid(tempValue)) {
            setError('This is a required field.');
            return;
        }
        let finalValue = tempValue;
        if (type === 'Number')
            finalValue = Number(tempValue);
        if (type === 'Date')
            finalValue = new Date(tempValue);
        setIsEditing(false);
        setError('');
        handleChange === null || handleChange === void 0 ? void 0 : handleChange(id, finalValue);
        handleResponseSave === null || handleResponseSave === void 0 ? void 0 : handleResponseSave(id, String(finalValue));
    };
    /** Handle live changes in edit mode
     * @example
     * ```ts
     * handleTempChange(newVal); // updates tempValue and performs live validation
     * ```
    */
    const handleTempChange = (decisionTreeInputValue) => {
        setTempValue(decisionTreeInputValue);
        if (!isValid(decisionTreeInputValue)) {
            setError('This is a required field.');
        }
        else {
            setError('');
        }
    };
    return {
        /** state */
        tempValue,
        isEditing,
        error,
        /** functions */
        startEdit,
        cancelEdit,
        saveEdit,
        handleTempChange,
        normalizeForInput,
        handleChange,
        handleResponseSave,
        /** ref */
        inputRef,
    };
}
//# sourceMappingURL=useDynamicInput.js.map