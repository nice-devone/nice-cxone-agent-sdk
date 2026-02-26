import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { CcfBackIcon, CcfDeboucedInput, useTranslator } from '@nice-devone/ui-controls';
import { Box, IconButton, InputAdornment, useTheme } from '@mui/material';
import customerCardSearchStyles from '../ccf-customer-card-search.styles';
import { Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { CcfCustomerCardActions, searchCustomerCard } from '../../ccf-customer-card.slice';
/**
 * CcfCustomerCardSearchTextfield - used to display the search header
 * @example <CcfCustomerCardSearchTextfield />
 */
export function CcfCustomerCardSearchTextfield(props) {
    var _a, _b;
    const theme = useTheme();
    const styles = customerCardSearchStyles(theme);
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const placeHolderValue = translate('searchContacts');
    const [searchValue, setSearchvalue] = useState('');
    let customerName = '';
    const [inputBoxDirty, setInputBoxDirty] = useState(false);
    /**
     * Function to handle the change event
     * @param e - OnChange Event
     * @example - handleChange(event)
     */
    const handleChange = (event) => {
        customerName = event.target.value;
        props.searchedText(customerName);
        props.isSearchTextUpdated(inputBoxDirty);
        customerName && dispatch(CcfCustomerCardActions.flushCustomerCardList());
        customerName.length > 2 && dispatch(searchCustomerCard({ customerName, externalIds: props.externalIdsToExclude }));
    };
    useEffect(() => {
        setInputBoxDirty(true);
        setSearchvalue(customerName);
    }, [customerName]);
    /**
     * Function to handle the click event
     * @param e - OnChange Event
     * @example - handleChange(event)
     */
    const onClickHandler = () => {
        props.returnToMainScreen();
    };
    return (_jsxs(Box, Object.assign({ display: 'flex' }, { children: [_jsx(IconButton, Object.assign({ sx: styles.backIconButton, onClick: onClickHandler, role: 'button', "aria-label": "Back", "data-testId": 'iconButton' }, { children: _jsx(CcfBackIcon, { sx: styles.backIcon }) })), _jsx(CcfDeboucedInput, { size: "small", style: {
                    background: `${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper}`,
                    margin: '5px 5px 0',
                }, InputProps: {
                    startAdornment: (_jsx(InputAdornment, Object.assign({ position: "start" }, { children: _jsx(Search, { htmlColor: "grey" }) }))),
                }, onChange: handleChange, placeholder: placeHolderValue, variant: "outlined", fullWidth: true, delay: 1000, value: searchValue, inputProps: { 'data-testid': 'search-customer' } })] })));
}
export default CcfCustomerCardSearchTextfield;
//# sourceMappingURL=ccf-customer-card-search-textfield.js.map