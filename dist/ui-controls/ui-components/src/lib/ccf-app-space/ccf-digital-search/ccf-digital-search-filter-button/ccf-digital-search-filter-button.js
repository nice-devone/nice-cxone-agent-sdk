import { jsx as _jsx } from "react/jsx-runtime";
import { Button, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ccfDigitalSearchActions, getFiltersMenuElement, getIsFilterSelected } from '../ccf-digital-search.slice';
import { CcfCheckIcon, CcfFilterIcon, useTranslator } from '@nice-devone/ui-controls';
import CcfDigitalSearchStyle from '../ccf-digital-search-styles';
/**
 * Button component representing a filter button.
 * @returns JSX.Element - The JSX for the component
 * @example <CcfDigitalSearchFilterButton/>
 */
const CcfDigitalSearchFilterButton = () => {
    var _a, _b;
    const theme = useTheme();
    const dispatch = useDispatch();
    const styles = CcfDigitalSearchStyle(theme);
    const filterTargetValue = useSelector(getFiltersMenuElement);
    const isFilterMenuOpen = Boolean(filterTargetValue);
    const isFilterSelected = useSelector(getIsFilterSelected);
    const [translate] = useTranslator();
    const label = translate('filters');
    /**
     * Handles the click event of the filter button.
     * @param event - The click event object.
     * @example handleClick(e)
     */
    const handleClick = (e) => {
        dispatch(ccfDigitalSearchActions.updateFiltersMenuElement(e.currentTarget));
    };
    return (_jsx(Button, Object.assign({ variant: "outlined", startIcon: _jsx(CcfFilterIcon, { svgIconProps: { sx: styles.filterIcon }, isFilterSelected: isFilterSelected }), endIcon: _jsx(CcfCheckIcon, { svgIconProps: { sx: styles.filterIcon }, isFilterSelected: isFilterSelected }), size: "small", disableRipple: true, sx: Object.assign(Object.assign(Object.assign(Object.assign({}, styles.kebabMenuBtn), styles === null || styles === void 0 ? void 0 : styles.focussedElement), { minWidth: '6.875rem' }), (isFilterSelected ? { backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.filterButton } : {})), id: "filter-button", "data-testid": "filter-button", "aria-controls": isFilterMenuOpen ? 'filter-options' : undefined, "aria-haspopup": "true", "aria-expanded": isFilterMenuOpen ? 'true' : undefined, onClick: handleClick }, { children: label })));
};
export default CcfDigitalSearchFilterButton;
//# sourceMappingURL=ccf-digital-search-filter-button.js.map