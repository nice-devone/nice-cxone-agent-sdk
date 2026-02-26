import { __awaiter } from "tslib";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CcfCopilotActions, getDecisionTreeData } from '../../ccf-agent-copilot-container.slice';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { applyDecisionTreeSectionChange, submitDecisionTreeThunk, } from '../../ccf-agent-copilot-middleware';
/**
 * React hook that manages the full lifecycle of Decision Tree Capture Details,
 * including state selection, section navigation, field changes, response saving,
 * and final submission workflow with confirmation.
 *
 * ## Responsibilities
 * - Reads Decision Tree data for the active interaction from Redux
 * - Tracks currently selected capture section
 * - Updates field values locally while typing
 * - Sends section-change events to backend
 * - Sends single-response update events when ✓ is clicked
 * - Handles submission with confirmation modal support
 *
 * ## Returned API
 * The hook returns UI-ready state and handlers:
 *
 * - `activeCaseId` – current case/contact identifier
 * - `decisionTreeData` – full decision tree payload
 * - `uiSections` – UI-mapped section list for dropdown display
 * - `captureSections` – sections with answered questions
 * - `selectedSectionId` – currently active section id
 * - `selectedSection` – capture section corresponding to the active section
 * - `handleChange()` – called when typing changes a field value
 * - `handleSectionChange()` – called when a section is switched
 * - `handleResponseSave()` – called when ✓ save icon clicked
 * - `handleSubmit()` – opens confirmation modal
 * - `confirmFinalSubmit()` – performs final backend submit
 * - `showConfirmSubmit` – boolean controlling confirmation modal
 * - `setShowConfirmSubmit` – setter to manually control modal
 *
 * @example
 * ```tsx
 * const {
 *   uiSections,
 *   selectedSection,
 *   handleChange,
 *   handleSectionChange,
 *   handleResponseSave,
 *   handleSubmit,
 *   showConfirmSubmit,
 *   confirmFinalSubmit
 * } = useDecisionTreeCaptureDetails();
 *
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <SectionRenderer
 *       section={selectedSection}
 *       onChange={handleChange}
 *       onSaveResponse={handleResponseSave}
 *     />
 *     {showConfirmSubmit && (
 *       <ConfirmModal onConfirm={confirmFinalSubmit} />
 *     )}
 *   </form>
 * );
 * ```
 *
 * @returns Object containing state values and interaction handlers
 */
export function useDecisionTreeCaptureDetails() {
    var _a, _b;
    const dispatch = useDispatch();
    const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
    const [selectedSectionId, setSelectedSectionId] = useState('');
    // -----------------------------
    // SELECTORS
    // -----------------------------
    const activeContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeCaseId = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || `${activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId}`;
    const decisionTreeData = useSelector(getDecisionTreeData(activeCaseId));
    const uiSections = (_a = decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.sections) !== null && _a !== void 0 ? _a : [];
    const captureSections = (_b = decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.capturedResponses) !== null && _b !== void 0 ? _b : [];
    // -----------------------------
    // SELECTED SECTION MEMO
    // -----------------------------
    const selectedSection = useMemo(() => captureSections.find((s) => s.sectionId === selectedSectionId), [captureSections, selectedSectionId]);
    // -----------------------------
    // INITIAL SECTION SELECTOR
    // -----------------------------
    useEffect(() => {
        if (decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.currentSectionId) {
            setSelectedSectionId(decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.currentSectionId);
        }
    }, [decisionTreeData]);
    // -----------------------------
    // SECTION CHANGE
    // -----------------------------
    const handleSectionChange = useCallback((sectionId) => __awaiter(this, void 0, void 0, function* () {
        setSelectedSectionId(sectionId);
        if (!(decisionTreeData === null || decisionTreeData === void 0 ? void 0 : decisionTreeData.decisionTreeId))
            return;
        const currentSectionId = decisionTreeData.currentSectionId;
        const resultAction = yield dispatch(applyDecisionTreeSectionChange({
            taskSessionUid: decisionTreeData.taskSessionUid,
            contactId: activeCaseId,
            decisionTreeId: decisionTreeData.decisionTreeId,
            sectionId,
        }));
        // use fulfilled.match for type-safe check
        if (applyDecisionTreeSectionChange.fulfilled.match(resultAction)) {
            const decisionTreeNewSectionData = resultAction.payload;
            dispatch(CcfCopilotActions.updateDecisionTreeState({
                contactId: activeCaseId,
                updates: {
                    isDecisionTreeOpen: true,
                    decisionTreeData: Object.assign(Object.assign(Object.assign({}, decisionTreeData), decisionTreeNewSectionData), { previousSection: currentSectionId }),
                },
            }));
        }
    }), [dispatch, activeCaseId, decisionTreeData]);
    // -----------------------------
    // SUBMIT WITH CONFIRMATION
    // -----------------------------
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setShowConfirmSubmit(true);
    }, []);
    const confirmFinalSubmit = useCallback(() => {
        if (!decisionTreeData)
            return;
        setShowConfirmSubmit(false);
        dispatch(submitDecisionTreeThunk({
            taskSessionUid: decisionTreeData.taskSessionUid,
            contactId: activeCaseId,
            decisionTreeId: decisionTreeData.decisionTreeId,
        }));
        dispatch(CcfCopilotActions.updateDecisionTreeState({
            contactId: activeCaseId,
            updates: { isDecisionTreeOpen: false },
        }));
    }, [dispatch, activeCaseId, decisionTreeData]);
    return {
        activeCaseId,
        decisionTreeData,
        uiSections,
        captureSections,
        selectedSectionId,
        setSelectedSectionId,
        selectedSection,
        handleSectionChange,
        handleSubmit,
        showConfirmSubmit,
        setShowConfirmSubmit,
        confirmFinalSubmit,
    };
}
//# sourceMappingURL=useCaptureDetails.js.map