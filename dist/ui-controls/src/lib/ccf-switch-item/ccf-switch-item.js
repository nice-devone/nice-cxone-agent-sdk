import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslator } from '../ccf-translator/ccf-translator';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Switch from '@mui/material/Switch';
import { useMediaQuery, useTheme } from '@mui/material';
import { CCfSwitchItemStyle } from './ccf-switch-item.style';
/**
 *
 * @param param0 - switch parms
 * @example CcfSettingsSwitchItem()
 * @returns
 */
export const CcfSwitchItem = ({ handleChange, hideLessThanExtraLarge, icon, id, isChecked, isDisabled, name, text, listStyles, labelStyles, mdWidth = 165, }) => {
    const [translate] = useTranslator();
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = CCfSwitchItemStyle(theme);
    return (_jsxs(ListItem, Object.assign({ sx: {
            display: isSmView && hideLessThanExtraLarge ? 'none' : 'flex',
            listStyle: 'none',
        }, style: listStyles, id: `${id}-listItem` }, { children: [icon && _jsx(ListItemIcon, Object.assign({ sx: { display: { xs: 'none', sm: 'flex', minWidth: '30px' } } }, { children: icon })), _jsx(FormControlLabel, { htmlFor: id || 'switchItemLabel', control: _jsx(Switch, { disableRipple: true, sx: styles.toggleSwitch, checked: isChecked, disabled: isDisabled, id: id || 'switchItemLabel' }), disabled: isDisabled, label: translate(text), labelPlacement: "start", role: "switch", "aria-checked": isChecked, name: name, onChange: handleChange, sx: {
                    ' .MuiFormControlLabel-label': {
                        width: { xs: 165, md: mdWidth },
                    },
                    '&.Mui-disabled .MuiFormControlLabel-label': {
                        color: 'inherit',
                    },
                }, style: labelStyles })] })));
};
export default CcfSwitchItem;
//# sourceMappingURL=ccf-switch-item.js.map