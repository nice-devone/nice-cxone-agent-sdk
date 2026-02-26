import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import { useTranslator, CcfTextField, } from '@nice-devone/ui-controls';
import pcManualDialFieldStyles from './ccf-PC-Manual-Dial-Field.styles';
import { PCDeliveryType } from '../../../../enums/delivery-type';
/**
 * CcfPCManualDialField - used for the text field of manual PC dialing.
 * @param props - CcfPCManualDialFieldProps
 * @example <CcfPCManualDialField />
 */
export function CcfPCManualDialField(props) {
    const [translate] = useTranslator();
    const theme = useTheme();
    const style = pcManualDialFieldStyles(theme);
    const { phoneNumber, pcDeliveryType: deliveryType, setCallButtonIsDisabled: setCallButton } = props;
    const placeholderText = translate('typePhoneNumberHere');
    return (_jsx(CcfTextField, { sx: style.manualPCOuterTextField, inputProps: { sx: style.manualPCInnerTextField }, id: 'PCManualInput', autoComplete: 'off', "aria-label": placeholderText, placeholder: placeholderText, onPaste: (e) => e.preventDefault(), onChange: (e) => {
            if (deliveryType === PCDeliveryType.MANUAL_DIAL_AUTO_CORRECT && e.target.value.length >= phoneNumber.length) {
                e.target.value = phoneNumber;
            }
            setCallButton(phoneNumber !== e.target.value);
        } }));
}
export default CcfPCManualDialField;
//# sourceMappingURL=ccf-PC-Manual-Dial-Field.js.map