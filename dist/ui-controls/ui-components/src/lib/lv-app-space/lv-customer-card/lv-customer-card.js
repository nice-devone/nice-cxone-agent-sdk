import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import { useCallback, useState } from 'react';
import { ccfDigitalSearchActions, getcurrentCustomerContactInfo, } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { useDispatch, useSelector } from 'react-redux';
import LvRemoteEcc from '../lv-remote/lv-remote-ecc/lv-remote-ecc';
import useLvCustomerState from './hooks/useLvCustomerState';
import LvContainer from '../lv-container/lv-container';
import { CcfBox, CcfCloseIcon } from '@nice-devone/ui-controls';
import useTabsFactory from './hooks/useTabsFactory';
import { clearLvCurrentInteraction, selectIsLvInteractionsSyncEnabled, } from '../lv-app-space.slice';
import { DATA_TEST_ID } from '../lv-app-space-utility';
import useCustomerIdUpdateOnActiveInteraction from '../hooks/useCustomerIdUpdateOnActiveInteraction';
/**
 * LVCustomer instance displayed when there is an active interactions
 * @example
 * ```
 * <LvCustomerCard />
 * ```
 */
export function LvCustomerCard(props) {
    const { allowCreate = true, allowSearch = true, onClose: propsOnClose, onSelect: propsOnSelect } = props;
    const { customerId, setCustomerId, searchCriteria, interaction, digitalContact, voiceContact } = useLvCustomerState();
    const isLvInteractionsSyncEnabled = useSelector(selectIsLvInteractionsSyncEnabled);
    const { tabs: extraTabs } = useTabsFactory();
    const { onInteractionUpdated, updateCustomerIdInActiveInteraction } = useCustomerIdUpdateOnActiveInteraction({
        interaction,
    });
    /**
     * Triggered when closing the customer card panel
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @example
     * ```
     * onClose()
     * ```
     */
    /* istanbul ignore next */
    const onClose = useCallback(() => {
        setCustomerId(undefined);
        propsOnClose === null || propsOnClose === void 0 ? void 0 : propsOnClose();
    }, [propsOnClose]);
    /**
     * Triggered when selecting a contact record from the search panel result
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @param record - Contact Record
     * @example
     * ```
     * onSelect({ customerId: '123'})
     * ```
     */
    /* istanbul ignore next */
    const onSelect = useCallback((record, updateCustomerIdInInteraction) => {
        const customerId = record === null || record === void 0 ? void 0 : record.account;
        setCustomerId(customerId);
        propsOnSelect === null || propsOnSelect === void 0 ? void 0 : propsOnSelect(record);
        if (updateCustomerIdInInteraction) {
            updateCustomerIdInActiveInteraction(customerId);
        }
    }, [updateCustomerIdInActiveInteraction, setCustomerId]);
    return (_jsx(LvRemoteEcc, { allowCreate: allowCreate, allowSearch: allowSearch, customerId: customerId, digitalContact: digitalContact, extraTabs: extraTabs, interaction: interaction, onClose: onClose, onCreated: onSelect, onInteractionUpdated: isLvInteractionsSyncEnabled ? onInteractionUpdated : undefined, onSelect: onSelect, searchCriteria: searchCriteria, voiceContact: voiceContact }));
}
/**
 * Wrapper of LV Customer Card to be used in the popper
 * Used in: .../ccf-app-space/ccf-digital-search/ccf-interaction-contact-info.tsx:32
 * @example
 * ```
 * <LvCustomerCardPopper />
 * ```
 */
export function LvCustomerCardPopper() {
    var _a;
    const isCustomerCardPopupOpen = (_a = useSelector(getcurrentCustomerContactInfo)) === null || _a === void 0 ? void 0 : _a.isCustomerCardPopupOpen; // flag to check whether customer card popop is open or not
    const dispatch = useDispatch();
    const [customerId, setCustomerId] = useState(undefined);
    /**
     * Triggered when closing the customer card poppup
     * make sure to clear the lvCurrent interaction and to close the customer card popup
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @example
     * ```
     * onClose()
     * ```
     */
    /* istanbul ignore next */
    const onClose = useCallback(() => {
        dispatch(clearLvCurrentInteraction());
        dispatch(ccfDigitalSearchActions.setcurrentCustomerContactInfo({
            customerId: '',
            caseId: '',
            isCustomerCardPopupOpen: false,
        }));
    }, []);
    /**
     * Triggered when selecting a contact record from the search panel result
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @param record - Contact Record
     * @example
     * ```
     * onSelect({ customerId: '123'})
     * ```
     */
    /* istanbul ignore next */
    const onSelect = useCallback((record) => {
        setCustomerId === null || setCustomerId === void 0 ? void 0 : setCustomerId(record === null || record === void 0 ? void 0 : record.account);
    }, []);
    return (_jsxs(LvContainer, Object.assign({ dataTestId: `${DATA_TEST_ID}-popper`, sx: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden',
        } }, { children: [isCustomerCardPopupOpen && !customerId ? (_jsx(CcfBox, Object.assign({ sx: {
                    alignItems: 'center',
                    borderBottom: (theme) => `1px solid ${theme.palette.border.main}`,
                    display: 'flex',
                    p: 2,
                } }, { children: _jsx(CcfCloseIcon, { "data-testid": "closeIcon", fontSize: "medium", onClick: onClose, sx: {
                        marginLeft: 'auto',
                        cursor: 'pointer',
                    } }) }))) : null, _jsx(CcfBox, Object.assign({ sx: {
                    display: 'grid',
                    flex: 1,
                    minHeight: 500,
                    overflowY: 'auto',
                } }, { children: _jsx(LvCustomerCard, { allowCreate: false, allowSearch: false, onClose: onClose, onSelect: onSelect }) }))] })));
}
export default LvCustomerCard;
//# sourceMappingURL=lv-customer-card.js.map