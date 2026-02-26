import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, FormLabel, FormControlLabel, FormHelperText, useTheme } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CcfRadioGroupStyle from './ccf-radio-group.styles';
/**
 * Component used to display Radio Group
 * @param props - CcfRadioGroupProps
 * @example <CcfRadioGroup />
 */
/**
 * @example - CcfRadioGroup - using to show the list of radio buttons in story book
*/
export function CcfRadioGroup(props) {
    const { data, defaultValue, error, helperText, horizontalAlign, labelPlacement, isStandaloneRadio, name, onRadioButtonSelection, selected, size, label, } = props;
    const theme = useTheme();
    const radioGroupStyle = CcfRadioGroupStyle(theme, props);
    return isStandaloneRadio ?
        _jsx(_Fragment, { children: data.map((option) => _jsx(Radio, { sx: radioGroupStyle.radio, checked: selected === option.value, onChange: onRadioButtonSelection, value: option.value, name: name, inputProps: {
                    'aria-label': option.label,
                } }, option.id)) })
        :
            _jsxs(FormControl, Object.assign({ component: "fieldset", error: error, sx: radioGroupStyle.fieldset }, { children: [_jsx(FormLabel, Object.assign({ component: "legend", sx: radioGroupStyle.legend }, { children: label })), _jsx(RadioGroup, Object.assign({ "aria-label": name, sx: radioGroupStyle.radioGroup, defaultValue: defaultValue, value: selected, name: name, onChange: onRadioButtonSelection, row: horizontalAlign }, { children: data.map((option) => (_jsx(FormControlLabel, { value: option.value, control: _jsx(Radio, { inputProps: {
                                    'aria-label': option.label,
                                }, sx: radioGroupStyle.radio, size: size }), sx: radioGroupStyle.formcontrolLabel, labelPlacement: labelPlacement, label: option.label, disabled: !!option.isDisabled }, option.id))) })), 
                    //show helper text when error is set to true
                    error && _jsx(FormHelperText, Object.assign({ sx: radioGroupStyle.formHelperText }, { children: helperText }))] }));
}
export default CcfRadioGroup;
//# sourceMappingURL=ccf-radio-group.js.map