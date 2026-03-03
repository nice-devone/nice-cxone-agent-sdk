import { jsx as _jsx } from "react/jsx-runtime";
import { Autocomplete } from '@mui/material';
/**
 * CcfAutoComplete used to dropdown options as per user's input
 * @param param - CcfAutoComplete
 * @example <CcfTextField />
 */
export const CcfAutoComplete = (props) => {
    const { disablePortal, id, onHighlightChange, options, size, limitTags, multiple, getOptionLabel, onChange, renderInput, value, filterSelectedOptions, renderOption, filterOptions, onClose, disableCloseOnSelect, renderTags, isOptionEqualToValue, sx, ListboxComponent, onInputChange, open, onOpen, disableClearable, PaperComponent, slotProps, } = props;
    return (_jsx(Autocomplete, { disablePortal: disablePortal, id: id, onHighlightChange: onHighlightChange, size: size, options: options, limitTags: limitTags, multiple: multiple, getOptionLabel: getOptionLabel, onChange: onChange, renderInput: renderInput, value: value, filterSelectedOptions: filterSelectedOptions, renderOption: renderOption, filterOptions: filterOptions, onClose: onClose, disableCloseOnSelect: disableCloseOnSelect, renderTags: renderTags, isOptionEqualToValue: isOptionEqualToValue, sx: sx, ListboxComponent: ListboxComponent, onInputChange: onInputChange, open: open, onOpen: onOpen, disableClearable: disableClearable, PaperComponent: PaperComponent, slotProps: slotProps }));
};
//# sourceMappingURL=ccf-autocomplete.js.map