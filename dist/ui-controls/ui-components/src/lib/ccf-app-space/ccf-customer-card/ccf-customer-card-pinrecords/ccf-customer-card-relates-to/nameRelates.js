import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { CcfBox, useTranslator } from '@nice-devone/ui-controls';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import nameRelatesStyles from './nameRelates.style';
import { useTheme } from '@mui/material';
import { CcfCustomerCardSlice, getNameValue, getRelatesToValue } from '../../ccf-customer-card.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RecordTypeName } from '@nice-devone/common-sdk';
/**
 * Component for rendering a name relates to dropdown.
 *
 * @param CcfNameRelatesToProps - props - The properties for the component.
 * @returns - JSX.Element The rendered component.
 * @example - CcfNameRelatesTo(data: CcfNameRelatesToProps)
 */
export function CcfNameRelatesTo({ nameList, relatesToList, selectedContactId, }) {
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = nameRelatesStyles(theme);
    const nameValue = useSelector(getNameValue);
    const relatesToValue = useSelector(getRelatesToValue);
    const isNameDisabled = nameList.length === 0;
    const isRelatesToDisabled = (() => {
        var _a, _b, _c;
        const selectedNameId = nameValue[selectedContactId];
        const sFCRMNavigationData = LocalStorageHelper.getItem(StorageKeys.SFCRM_NAVIGATION_DATA, true);
        const selectedEntityType = (_c = (_b = (_a = sFCRMNavigationData === null || sFCRMNavigationData === void 0 ? void 0 : sFCRMNavigationData[selectedContactId]) === null || _a === void 0 ? void 0 : _a.whoid) === null || _b === void 0 ? void 0 : _b.find((item) => item.entityValue === selectedNameId)) === null || _c === void 0 ? void 0 : _c.entityType;
        return (selectedEntityType === null || selectedEntityType === void 0 ? void 0 : selectedEntityType.toLowerCase()) === RecordTypeName.LEAD || relatesToList.length === 0;
    })();
    /**
     * Sets a value in local storage.
     *
     * @param mappingFieldName - The name of the field to map.
     * @param item - The item to set in local storage.
     * @example - setValueInLocalStorage('name', 'John Doe')
     */
    const setValueInLocalStorage = (item, mappingFieldName) => {
        var _a, _b;
        const navigationData = LocalStorageHelper.getItem(StorageKeys.CRM_NAVIGATION_DATA, true) || {};
        const sfCrmNavigationData = LocalStorageHelper.getItem(StorageKeys.SFCRM_NAVIGATION_DATA, true) || {};
        navigationData[selectedContactId] = navigationData[selectedContactId] || {};
        const data = {
            value: item,
            contactId: selectedContactId,
        };
        const selectedObjectInNameField = (_b = (((_a = sfCrmNavigationData[selectedContactId]) === null || _a === void 0 ? void 0 : _a.whoid) || []).find((entitydata) => entitydata.entityValue === item)) === null || _b === void 0 ? void 0 : _b.entityType;
        if (mappingFieldName === 'whoid') {
            navigationData[selectedContactId][mappingFieldName] = item;
            dispatch(CcfCustomerCardSlice.actions.setNameValue(data));
            if ((selectedObjectInNameField === null || selectedObjectInNameField === void 0 ? void 0 : selectedObjectInNameField.toLowerCase()) === RecordTypeName.LEAD) {
                navigationData[selectedContactId]['whatid'] = '';
                dispatch(CcfCustomerCardSlice.actions.setRelatesToValue({
                    value: '',
                    contactId: selectedContactId,
                }));
            }
        }
        else {
            navigationData[selectedContactId][mappingFieldName] = item;
            dispatch(CcfCustomerCardSlice.actions.setRelatesToValue(data));
        }
        LocalStorageHelper.setItem(StorageKeys.CRM_NAVIGATION_DATA, navigationData);
    };
    return (_jsxs(CcfBox, Object.assign({ component: "div", className: "nameRelatesToPopover", sx: styles.nameRelatesToPopoverStyle }, { children: [_jsxs(CcfBox, Object.assign({ component: "div", sx: styles.nameRelatesToBoxStyle }, { children: [_jsxs("label", Object.assign({ style: styles.nameRelatesLabel }, { children: [" ", translate('name')] })), _jsxs("select", Object.assign({ "data-testid": "nameRelatesName", value: nameValue[selectedContactId], style: styles.nameRelatesSelect, disabled: isNameDisabled, onChange: e => setValueInLocalStorage(e.target.value, 'whoid') }, { children: [_jsx("option", Object.assign({ value: "", selected: true }, { children: translate('none') })), nameList === null || nameList === void 0 ? void 0 : nameList.map((item, index) => (_jsx("option", Object.assign({ "data-testid": `name-item-${index}`, value: item.entityValue }, { children: item.entityName }), `name-item-${item.entityValue}`)))] }))] })), _jsxs(CcfBox, Object.assign({ component: "div", sx: styles.nameRelatesToBoxStyle }, { children: [_jsxs("label", Object.assign({ style: styles.nameRelatesLabel }, { children: [" ", translate('relatesTo')] })), _jsxs("select", Object.assign({ "data-testid": "relatesTo", value: relatesToValue[selectedContactId], style: styles.nameRelatesSelect, disabled: isRelatesToDisabled, onChange: e => setValueInLocalStorage(e.target.value, 'whatid') }, { children: [_jsx("option", Object.assign({ value: "", selected: true }, { children: translate('none') })), relatesToList === null || relatesToList === void 0 ? void 0 : relatesToList.map((item, index) => (_jsx("option", Object.assign({ "data-testid": `relatesTo-item-${index}`, value: item.entityValue }, { children: item.entityName }), `relatesTo-item-${item.entityValue}`)))] }))] }))] })));
}
export default CcfNameRelatesTo;
//# sourceMappingURL=nameRelates.js.map