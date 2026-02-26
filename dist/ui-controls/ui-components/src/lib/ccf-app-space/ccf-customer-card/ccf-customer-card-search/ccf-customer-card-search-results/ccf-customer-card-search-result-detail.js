import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import { CcfBox } from '@nice-devone/ui-controls';
import customerCardSearchResultDetailStyles from './ccf-customer-card-search-result-detail.style';
/**
 * CcfCustomerCardSearchResultDetail - used to display the single search result detail
 * @param props -?-CcfCustomerCardSearchResultProps
 * @example <CcfCustomerCardSearchResultDetail />
 */
export function CcfCustomerCardSearchResultDetail(props) {
    const theme = useTheme();
    const styles = customerCardSearchResultDetailStyles(theme);
    /**
     * Function to display custome details and value side by side
     * @example - getFieldValuePair(array)
     */
    const getFieldValuePair = (arrayList) => {
        let pairData = [];
        if (arrayList.length > 0) {
            pairData = arrayList.map((item) => {
                return Object.assign(Object.assign({}, item), { 'ident': item.ident, 'value': item.value });
            });
        }
        return pairData;
    };
    const customFields = getFieldValuePair(props.customer.customFields);
    return (_jsx(CcfBox, Object.assign({ sx: styles.customerCardSearchResultDetailContainer }, { children: customFields.length > 0 && customFields.map((customField, index) => (_jsxs(CcfBox, Object.assign({ sx: styles.bottomPad15, "data-testId": 'customFieldsBox' }, { children: [_jsx(CcfBox, Object.assign({ component: "div", sx: styles.flexSpaceBetween }, { children: _jsx(CcfBox, Object.assign({ component: "div", sx: styles.detailsCustomFieldLabel }, { children: customField.ident })) })), _jsx(CcfBox, Object.assign({ component: "div", sx: styles.detailsCustomFieldData }, { children: customField.value }))] }), customField.value))) })));
}
export default CcfCustomerCardSearchResultDetail;
//# sourceMappingURL=ccf-customer-card-search-result-detail.js.map