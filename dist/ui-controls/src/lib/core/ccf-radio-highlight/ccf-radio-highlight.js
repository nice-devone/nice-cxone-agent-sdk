import { jsx as _jsx } from "react/jsx-runtime";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import { Box, useTheme } from '@mui/material';
import ccfRadioHighlightStyles from './ccf-radio-highlight.styles';
export var LabelType;
(function (LabelType) {
    /**
      * @remarks - enum for phone number type
    */
    LabelType["PHONE_NUMBER"] = "Set Phone Number";
    /**
      * @remarks - enum for station ID type
    */
    LabelType["STATION_ID"] = "Set Station ID";
    /**
      * @remarks - enum for acs connection type
    */
    LabelType["CONNECT_ACS"] = "Connect using ACS";
    /**
      * @remarks - enum for softphone type
    */
    LabelType["INTEGRATED_SOFTPHONE"] = "Integrated Softphone";
    /**
     * @remarks - enum for acs type
    */
    LabelType["ACS"] = "phone-AcsEnabled";
    /**
     * @remarks - enum for default type
    */
    LabelType["DEFAULT"] = "defaultToolTipLabel";
})(LabelType || (LabelType = {}));
/**
 *
 * @param props - any
 * @example styledRadio(props)
 * @returns
 */
function StyledRadio(props) {
    const theme = useTheme();
    const radioHighlightStyles = ccfRadioHighlightStyles(theme);
    return (_jsx("div", { children: _jsx(Radio, Object.assign({ disableRipple: true, color: "default", checkedIcon: _jsx(Box, { component: "span", sx: Object.assign(Object.assign({}, radioHighlightStyles.checkedIconRad), radioHighlightStyles.iconRad) }), icon: _jsx(Box, { component: "span", sx: radioHighlightStyles.iconRad, id: props.id }) }, props)) }));
}
/**
 *
 * @param props - any
 * @example <CcfRadioHighlight />
 * @returns
 */
export function CcfRadioHighlight(props) {
    const { options, onRadioButtonSelection, id } = props;
    const [translate] = useTranslator();
    const theme = useTheme();
    const ccfRadioHighlightStyle = ccfRadioHighlightStyles(theme);
    /**
     *
     * @example - renderTranslatedText()
     * @returns - translated format of the text
     */
    const renderTranslatedText = (labelText) => {
        switch (labelText) {
            case LabelType.PHONE_NUMBER:
                return translate('setPhoneNumber');
            case LabelType.STATION_ID:
                return translate('setStationID');
            case LabelType.CONNECT_ACS:
                return translate('connectUsingAcs');
            case LabelType.INTEGRATED_SOFTPHONE:
                return translate('integratedSoftPhone');
            case LabelType.ACS:
                return translate('acsEmailIdLabel');
            default:
                return translate(LabelType.DEFAULT);
        }
    };
    return (_jsx(Box, Object.assign({ component: "div", sx: ccfRadioHighlightStyle.highlightLabelWithRadio }, { children: _jsx(RadioGroup, Object.assign({ role: "button", "aria-label": "radio", name: "highlightedRadio", value: options.defaultSelected, onChange: onRadioButtonSelection, id: id }, { children: options.data.map((option) => option.showRadioOption && (_jsx(Box, Object.assign({ sx: ccfRadioHighlightStyle.radioBox }, { children: _jsx(FormControlLabel, { tabIndex: 0, sx: ccfRadioHighlightStyle.customBlue, value: option.value, control: _jsx(StyledRadio, { id: id }), label: renderTranslatedText(option === null || option === void 0 ? void 0 : option.label) }) }), option.value))) })) })));
}
export default CcfRadioHighlight;
//# sourceMappingURL=ccf-radio-highlight.js.map