import { jsx as _jsx } from "react/jsx-runtime";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
/**
 * A single select group component using ToggleButtonGroup
 * @example -
 */
export const CcfToggleButtonGroup = ({ options, value, onChange, toggleButtonStyle, }) => {
    return (_jsx(ToggleButtonGroup, Object.assign({ value: value, exclusive: true, onChange: (_event, newValue) => {
            if (newValue !== null)
                onChange(newValue);
        }, "aria-label": "Single select group" }, { children: options.map(option => (_jsx(ToggleButton, Object.assign({ id: `ccf-single-select-${option.value}`, value: option.value, "aria-label": option.label, sx: toggleButtonStyle, disableFocusRipple: true }, { children: option.label }), option.value))) })));
};
//# sourceMappingURL=ccf-toggle-button-group.js.map