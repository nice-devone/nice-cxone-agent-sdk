import { jsx as _jsx } from "react/jsx-runtime";
import { FormGroup, Popover, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ccfDigitalSearchActions, getFiltersMenuElement } from '../ccf-digital-search.slice';
import CcfSearchInteractionStyles from '../ccf-interaction-tabs/ccf-search-interactions/ccf-search-interactions-styles';
import { CcfDigitalSearchFilter } from './ccf-digital-search-filter';
/** Component to render Search Filters Popover
 * @example CcfDigitalSearchFilterContainer()
 */
const CcfDigitalSearchFilterContainer = (props) => {
    const { filterOptions, anchorOrigin, transformOrigin, MultiSelectPaginationDropdown } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const interactionStyles = CcfSearchInteractionStyles(theme);
    const filterTargetValue = useSelector(getFiltersMenuElement);
    const isFilterMenuOpen = Boolean(filterTargetValue);
    return (_jsx(Popover, Object.assign({ id: "filter-options", open: isFilterMenuOpen, anchorEl: filterTargetValue, onClose: () => dispatch(ccfDigitalSearchActions.updateFiltersMenuElement(null)), anchorOrigin: anchorOrigin
            ? anchorOrigin
            : {
                vertical: 'bottom',
                horizontal: 'right',
            }, transformOrigin: transformOrigin
            ? transformOrigin
            : {
                vertical: 'top',
                horizontal: 'right',
            }, PaperProps: {
            style: {
                width: '16.875rem',
            },
            'aria-labelledby': 'dropdown-title',
            role: 'dialog',
        }, sx: interactionStyles.listBox }, { children: _jsx(FormGroup, { children: _jsx(CcfDigitalSearchFilter, { filterOptions: filterOptions, MultiSelectPaginationDropdown: MultiSelectPaginationDropdown }) }) })));
};
export default CcfDigitalSearchFilterContainer;
//# sourceMappingURL=ccf-digital-search-filter-container.js.map