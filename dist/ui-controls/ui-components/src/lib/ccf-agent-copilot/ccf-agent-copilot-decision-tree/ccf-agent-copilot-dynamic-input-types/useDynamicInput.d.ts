import { DecisionTreeInputValue, QuestionType } from '@nice-devone/common-sdk';
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
export declare function useDynamicInput({ id, value, required, type, }: {
    id: string;
    value: DecisionTreeInputValue;
    required?: boolean;
    type: QuestionType;
}): {
    /** state */
    tempValue: DecisionTreeInputValue;
    isEditing: boolean;
    error: string;
    /** functions */
    startEdit: () => void;
    cancelEdit: () => void;
    saveEdit: () => void;
    handleTempChange: (decisionTreeInputValue: DecisionTreeInputValue) => void;
    normalizeForInput: (val: DecisionTreeInputValue) => string;
    handleChange: (questionId: string, value: DecisionTreeInputValue) => void;
    handleResponseSave: (questionId: string, newValue: string) => Promise<void>;
    /** ref */
    inputRef: import("react").MutableRefObject<HTMLInputElement | null>;
};
