import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Switch, useTheme } from '@mui/material';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import CcfSwitchButtonStyle from './ccf-switch.styles';
/**
 * CcfSwitchButton used to display switch button with on and off state
 * @param param - CcfSwitch
 * @example <CcfSwitchButton />
 */
export function CcfSwitchButton(_a) {
    var { sx } = _a, rest = __rest(_a, ["sx"]);
    const [translate] = useTranslator();
    const onLabel = translate('on');
    const offLabel = translate('off');
    const theme = useTheme();
    const switchButtonStyle = CcfSwitchButtonStyle(theme, onLabel, offLabel);
    return (_jsx(Switch, Object.assign({ color: rest.color ? rest.color : 'primary', checked: rest.status, inputProps: { 'aria-label': rest.ariaLabel }, sx: Object.assign(Object.assign({}, switchButtonStyle.root), sx) }, rest)));
}
//# sourceMappingURL=ccf-switch.js.map