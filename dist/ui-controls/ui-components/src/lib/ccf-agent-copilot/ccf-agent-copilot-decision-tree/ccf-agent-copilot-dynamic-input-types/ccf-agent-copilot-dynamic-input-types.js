import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputWrapper } from './ccf-input-wrapper';
import { CopilotInput, CopilotTextWrapper, CopilotEditIconWrapper, CopilotEditActions, CopilotRadio, ErrorText, Fieldset, LabelSpacing, DateInput, } from './ccf-agent-copilot-dynamic-input-types.styles';
import { CcfEditIcon } from '@nice-devone/ui-controls';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import { useDynamicInput } from './useDynamicInput';
/**
 * - Boolean → Yes/No
 * - Date → always editable
 * - Text/Number → inline edit mode with ✓ ✕
 * @example
 * ```tsx
 * <CommonInput
 *  question={q}
 * />
 * ```
 * @returns JSX.Element
 */
export const CcfAgentCopilotDynamicInput = ({ question }) => {
    const theme = useTheme();
    const { questionId: id, questionText: label, questionResponse: value, mandatory: required, dataType: type } = question;
    const placeholder = value;
    const { tempValue, isEditing, error, startEdit, cancelEdit, saveEdit, handleTempChange, normalizeForInput, handleChange, handleResponseSave, inputRef, } = useDynamicInput({
        id,
        value,
        required,
        type,
    });
    /** BOOLEAN → Yes/No radio */
    if (type === 'Boolean') {
        return (_jsxs(InputWrapper, Object.assign({ label: label, required: required }, { children: [_jsx(Fieldset, { children: _jsxs("div", Object.assign({ role: "radiogroup", "aria-label": label }, { children: [_jsx(CopilotRadio, { id: `${id}-yes`, type: "radio", checked: value === true, onChange: () => {
                                    handleChange === null || handleChange === void 0 ? void 0 : handleChange(id, true);
                                    handleResponseSave === null || handleResponseSave === void 0 ? void 0 : handleResponseSave(id, 'true');
                                } }), _jsx(LabelSpacing, Object.assign({ htmlFor: `${id}-yes` }, { children: "Yes" })), _jsx(CopilotRadio, { id: `${id}-no`, type: "radio", checked: value === false, onChange: () => {
                                    handleChange === null || handleChange === void 0 ? void 0 : handleChange(id, false);
                                    handleResponseSave === null || handleResponseSave === void 0 ? void 0 : handleResponseSave(id, 'false');
                                } }), _jsx("label", Object.assign({ htmlFor: `${id}-no` }, { children: "No" }))] })) }), error && _jsx(ErrorText, { children: error })] })));
    }
    /** DATE → regular input */
    if (type === 'Date') {
        return (_jsxs(InputWrapper, Object.assign({ label: label, required: required }, { children: [_jsx(DateInput, { type: "date", value: normalizeForInput(tempValue), onChange: (e) => handleTempChange(e.target.value), "data-error": !!error, onBlur: saveEdit, "aria-label": label }), error && _jsx(ErrorText, { children: error })] })));
    }
    /** TEXT + NUMBER */
    return (_jsxs(InputWrapper, Object.assign({ label: label, required: required }, { children: [_jsxs(CopilotTextWrapper, { children: [_jsx(CopilotInput, { ref: inputRef, type: type === 'Number' ? 'number' : 'text', disabled: !isEditing, placeholder: placeholder, value: normalizeForInput(isEditing ? tempValue : value), onChange: (e) => handleTempChange(e.target.value), "aria-label": label, "data-error": !!error }), !isEditing && (_jsx(CopilotEditIconWrapper, Object.assign({ onClick: startEdit }, { children: _jsx(CcfEditIcon, {}) }))), isEditing && (_jsxs(CopilotEditActions, { children: [_jsx(DoneIcon, { sx: {
                                    color: tempValue ? theme.palette.success.main : theme.palette.action.disabled,
                                    cursor: tempValue ? 'pointer' : 'not-allowed',
                                }, onClick: tempValue ? saveEdit : undefined, "aria-label": 'save' }), _jsx(CloseIcon, { sx: { cursor: 'pointer' }, onClick: cancelEdit, "aria-label": 'cancel' })] }))] }), error && _jsx(ErrorText, { children: error })] })));
};
//# sourceMappingURL=ccf-agent-copilot-dynamic-input-types.js.map