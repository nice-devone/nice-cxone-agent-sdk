/**
 * Handles changes for a field selection in the autocomplete.
 *
 * @param handleColumnChange - Callback to update column criteria in the store
 * @param entityIndex - Index of the entity being updated
 * @param paramIndex - Index of the parameter within the entity
 * @param _ - Event argument (unused)
 * @param newValue - The selected field object with name and label
 *
 * @example
 * handleFieldChangeFn(
 *   mockHandleColumnChange,
 *   0,
 *   1,
 *   null,
 *   \{ name: 'accountId', label: 'Account ID' \}
 * );
 */
export declare const handleFieldChangeFn: (handleColumnChange: (entityIndex: number, paramIndex: number, fieldName: string, value: string, label?: string) => void, entityIndex: number, paramIndex: number, _: unknown, newValue: {
    name: string;
    label: string;
} | null) => void;
/**
 * Component displays agent workflow execution application Specific search workflow Information screen.
 *
 * This component renders a "workflow mapping" section for the agent workflow execution application.
 *
 * @returns JSX.Element A component displaying the workflow mapping information screen.
 * @example
 *   <CcfEnhancedWEManualFilter />
 */
declare const CcfEnhancedWEManualFilter: () => JSX.Element;
export default CcfEnhancedWEManualFilter;
export declare const __testables: {
    handleFieldChangeFn: (handleColumnChange: (entityIndex: number, paramIndex: number, fieldName: string, value: string, label?: string) => void, entityIndex: number, paramIndex: number, _: unknown, newValue: {
        name: string;
        label: string;
    } | null) => void;
    handleFetchError: (error: unknown, context: string) => void;
};
