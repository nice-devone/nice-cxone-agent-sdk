import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CcfCallMergeIcon, CcfCloseIcon, CcfIconButton, useTranslator } from '@nice-devone/ui-controls';
import { EventKeys } from '@nice-devone/common-sdk';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import customerCardTitleStyles from './ccf-customer-card-title.style';
import { ccfDigitalSearchActions, getcurrentCustomerContactInfo } from '../../ccf-digital-search/ccf-digital-search.slice';
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export function CcfCustomerCardDetailsTitle(props) {
    var _a, _b;
    const { title, imagePath } = props;
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = customerCardTitleStyles(theme);
    // Assign customer name, else 'Unknown' translated as per the selected locale
    const customerNameTranslated = translate(title === null || title === void 0 ? void 0 : title.toLowerCase()) || title;
    const dispatch = useDispatch();
    const customerId = (_a = useSelector(getcurrentCustomerContactInfo)) === null || _a === void 0 ? void 0 : _a.customerId;
    const isCustomerCardPopupOpen = (_b = useSelector(getcurrentCustomerContactInfo)) === null || _b === void 0 ? void 0 : _b.isCustomerCardPopupOpen; // flag to check whether customer card popop is open or not
    let customerName = customerNameTranslated ? customerNameTranslated : '';
    // when customer card popup is open and there is no customer id present then we are showing the customer card title without customer name
    if (isCustomerCardPopupOpen && !customerId) {
        customerName = '';
    }
    /**
     * Handles the close action for the customer card popup.
     * Dispatches an action to reset customer contact info and close the popup.
     * @example
     * // Usage example:
     * handleCloseClick();
     */
    const handleCloseClick = () => {
        dispatch(ccfDigitalSearchActions.setcurrentCustomerContactInfo({
            customerId: '',
            caseId: '',
            isCustomerCardPopupOpen: false,
        }));
    };
    /**
       * Handles keyboard events for closing the customer card popup when 'Escape' is pressed.
       * @param event - The keyboard event.
       * @example
       * // Usage example:
       * document.addEventListener('keydown', handleKeyDown);
       */
    const handleKeyDown = (event) => {
        if ((event.key === EventKeys.ESCAPE) &&
            (isCustomerCardPopupOpen || customerId)) {
            event.preventDefault();
            handleCloseClick();
        }
    };
    useEffect(() => {
        if (isCustomerCardPopupOpen || customerId) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (_jsxs(Box, Object.assign({ sx: styles.ccfContactHistoryTitleContainer }, { children: [imagePath && _jsx(Avatar, { sx: styles.ccfCCTitleAvatar, src: imagePath, alt: translate('avatar') }), customerName && _jsxs(Typography, Object.assign({ variant: "h4", sx: styles.customerName }, { children: [" ", customerName, " "] })), title !== 'Unknown' && !customerId && !isCustomerCardPopupOpen && (_jsx(CcfIconButton, Object.assign({ size: 'small', "data-testid": "mergeIcon", "aria-label": translate('mergeContacts'), onClick: () => props.displaySearchResultsCallback(title), sx: styles.mergeIconButton }, { children: _jsx(CcfCallMergeIcon, { sx: styles.mergeIcon }) }))), (customerId || isCustomerCardPopupOpen) &&
                _jsx(CcfCloseIcon, { sx: styles.closeIcon, fontSize: "medium", "data-testid": "closeIcon", role: "button", "aria-label": translate('close'), onClick: handleCloseClick, tabIndex: 0, onKeyDown: (e) => {
                        if (e.key === EventKeys.ENTER) {
                            handleCloseClick();
                        }
                    } })] })));
}
export default CcfCustomerCardDetailsTitle;
//# sourceMappingURL=ccf-customer-card-title.js.map