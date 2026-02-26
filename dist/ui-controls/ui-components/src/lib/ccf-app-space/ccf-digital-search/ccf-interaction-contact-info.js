import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Box, useTheme, CircularProgress } from '@mui/material';
import CcfDigitalSearchStyle from './ccf-digital-search-styles';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getNumberOfVisibleColumns } from './ccf-digital-search.slice';
import useLVAppSpacePermission from '../../lv-app-space/hooks/useLVAppSpacePermission';
/**
 * Parent component to show contact info from interaction search grid
 * @returns contact info container
 * ```
 * @example
 * <CcfContactPreview/>
 * ```
 */
export default function CcfContactPreview() {
    const theme = useTheme();
    const styles = CcfDigitalSearchStyle(theme);
    const numberOfVisibleColumns = useSelector(getNumberOfVisibleColumns);
    const [CustomerCard, setCustomerCard] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '70%' }, { children: _jsx(CircularProgress, { size: 30 }) })));
    const { isLvCustomerCardEnabled } = useLVAppSpacePermission();
    //load when click on left nav item
    useEffect(() => {
        // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
        const renderCustomerCard = () => __awaiter(this, void 0, void 0, function* () {
            let customerCard, CustomerCard;
            if (isLvCustomerCardEnabled) {
                customerCard = yield import('../../lv-app-space/lv-customer-card/lv-customer-card');
                CustomerCard = customerCard.LvCustomerCardPopper;
            }
            else {
                customerCard = yield import('../ccf-customer-card/ccf-customer-card');
                CustomerCard = customerCard.CcfCustomerCard;
            }
            setCustomerCard(_jsx(CustomerCard, {}));
        });
        renderCustomerCard();
    }, [isLvCustomerCardEnabled]);
    return (_jsx(Box, Object.assign({ "data-testid": 'customerCard', sx: Object.assign(Object.assign({}, styles.contactInfo), { width: numberOfVisibleColumns <= 4 ? '80%' : '40%' }) }, { children: CustomerCard })));
}
//# sourceMappingURL=ccf-interaction-contact-info.js.map