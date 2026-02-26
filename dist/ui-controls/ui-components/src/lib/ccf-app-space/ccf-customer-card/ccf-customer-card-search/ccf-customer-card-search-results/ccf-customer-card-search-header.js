import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfTypography } from '@nice-devone/ui-controls';
import { Box, useTheme } from '@mui/material';
import customerCardTitleStyles from '../ccf-customer-card-search.styles';
import { useSelector } from 'react-redux';
import { customerCardList } from '../../ccf-customer-card.slice';
/**
 * CcfCustomerCardSearchHeader - used to display the search header
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCardSearchHeader />
 */
export function CcfCustomerCardSearchHeader(props) {
    const theme = useTheme();
    const styles = customerCardTitleStyles(theme);
    const getCustomerList = useSelector(customerCardList);
    const resultCount = (props === null || props === void 0 ? void 0 : props.isSearchBoxUpdated) && (props === null || props === void 0 ? void 0 : props.searchedText) === '' ? 0 : getCustomerList === null || getCustomerList === void 0 ? void 0 : getCustomerList.length;
    return (_jsxs(Box, Object.assign({ sx: styles.searchHeader }, { children: [_jsx(CcfTypography, { translationKey: "search", sx: styles.searchHeaderTypography, textTransform: 'uppercase' }), _jsxs(CcfTypography, Object.assign({ sx: styles.searchHeaderTypography }, { children: ["\u00A0", `(${resultCount})`] }))] })));
}
export default CcfCustomerCardSearchHeader;
//# sourceMappingURL=ccf-customer-card-search-header.js.map