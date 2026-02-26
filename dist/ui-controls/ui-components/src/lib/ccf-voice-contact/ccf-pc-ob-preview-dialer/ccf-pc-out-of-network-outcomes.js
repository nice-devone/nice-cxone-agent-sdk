import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslator } from '@nice-devone/ui-controls';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { outcomeSelection, voiceContactSelector } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * CcfPcOutOfNetworkOutcomes - Displays the PC out of network outcomes
 * @example <CcfPcOutOfNetworkOutcomes />
 */
export function CcfPcOutOfNetworkOutcomes() {
    const [translate] = useTranslator();
    const [outcome, setOutcome] = useState('Choose Outcome');
    const dispatch = useDispatch();
    const voiceContactDetails = useSelector(voiceContactSelector);
    /**
   * handleChange - handles the change event for selecting an outcome
   * @example handleChange()
   */
    const handleChange = (event) => {
        setOutcome(event.target.value);
        dispatch(outcomeSelection({ contactId: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.contactID, outcome: event.target.value }));
    };
    return (_jsxs(FormControl, Object.assign({ sx: {
            margin: { xs: '15px', xl: '10px' },
            width: { xs: '50%', xl: '90%' },
            justifyContent: { xs: 'center' }
        }, size: 'small' }, { children: [_jsx(InputLabel, Object.assign({ "data-testid": "input-label", id: "choose-outcome" }, { children: translate('chooseOutcome') })), _jsxs(Select, Object.assign({ labelId: 'choose-outcome', label: 'Choose Outcome', value: outcome, onChange: handleChange }, { children: [_jsx(MenuItem, Object.assign({ value: 'Answered Call' }, { children: translate('answeredCall') })), _jsx(MenuItem, Object.assign({ value: 'Busy' }, { children: translate('busy') })), _jsx(MenuItem, Object.assign({ value: 'Fax' }, { children: translate('fax') })), _jsx(MenuItem, Object.assign({ value: 'Intercept' }, { children: translate('intercept') })), _jsx(MenuItem, Object.assign({ value: 'No Answer' }, { children: translate('noAnswer') }))] }))] })));
}
export default CcfPcOutOfNetworkOutcomes;
//# sourceMappingURL=ccf-pc-out-of-network-outcomes.js.map