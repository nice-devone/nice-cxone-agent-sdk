import { CapturedSection, DecisionTreeData, DecisionTreeSection } from '@nice-devone/common-sdk';
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
export declare function useDecisionTreeCaptureDetails(): {
    activeCaseId: string;
    decisionTreeData: DecisionTreeData;
    uiSections: DecisionTreeSection[];
    captureSections: CapturedSection[];
    selectedSectionId: string;
    setSelectedSectionId: import("react").Dispatch<import("react").SetStateAction<string>>;
    selectedSection: CapturedSection | undefined;
    handleSectionChange: (sectionId: string) => Promise<void>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    showConfirmSubmit: boolean;
    setShowConfirmSubmit: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    confirmFinalSubmit: () => void;
};
export declare type UseDecisionTreeCaptureDetailsReturn = ReturnType<typeof useDecisionTreeCaptureDetails>;
