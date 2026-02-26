import { jsx as _jsx } from "react/jsx-runtime";
import { FormControlLabel, Checkbox, } from '@mui/material';
/**
 * Component used to display checkbox
 * @param props - CcfCheckboxProps
 * @example <CcfCheckbox />
 * @returns checkbox
 */
export function CcfCheckbox(props) {
    const { onCheckboxChange, onKeyButtonPress, checked, label, labelPlacement, icon, checkedIcon, id } = props;
    return (_jsx("div", { children: _jsx(FormControlLabel, { value: "rememberPreference", checked: checked, control: _jsx(Checkbox
            // color={color}
            , { 
                // color={color}
                icon: icon, checkedIcon: checkedIcon, onChange: onCheckboxChange, onKeyPress: onKeyButtonPress, id: id }), label: label, labelPlacement: labelPlacement }) }));
}
export default CcfCheckbox;
//# sourceMappingURL=ccf-checkbox.js.map