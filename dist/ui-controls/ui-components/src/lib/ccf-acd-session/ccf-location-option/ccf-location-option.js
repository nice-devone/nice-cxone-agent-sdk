import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, FormControl, MenuItem, Select, Typography, ListItemText, useTheme } from '@mui/material';
import { ModeOfOperation } from '@nice-devone/common-sdk';
import { useTranslator, CcfInfoIcon, CcfTooltip } from '@nice-devone/ui-controls';
import ccfLocationOptionStyles from './ccf-location-option-styles';
import { useDefaultLocationOption } from './ccf-location-option-hook';
/**
 * Component used for CXA - Agents Displayed Option to Choose Their Location
 * @param props - CcfLocationOptionProps
 * @example <CcfLocationOption />
 * @returns
 */
export function CcfLocationOption({ useLocationOptionHook } = {}) {
    // Only one hook runs — never both
    const { locationData = [], selectedLocation, modeOfOperation, location, handleLocationChange, } = (useLocationOptionHook !== null && useLocationOptionHook !== void 0 ? useLocationOptionHook : useDefaultLocationOption)();
    const [translate] = useTranslator();
    const theme = useTheme();
    const styles = ccfLocationOptionStyles(theme);
    return (_jsxs(FormControl, { children: [_jsxs(Box, Object.assign({ sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'end' } }, { children: [_jsx(Typography, Object.assign({ id: "select-location", sx: Object.assign(Object.assign({}, styles.locationLabel), (((locationData === null || locationData === void 0 ? void 0 : locationData.length) <= 0 || modeOfOperation === (ModeOfOperation.FULLY_AUTO || ModeOfOperation.AUTO_PREVIEW_ONLY)) && { opacity: 0.4 })) }, { children: translate('location').toUpperCase() })), _jsx(CcfTooltip, Object.assign({ id: "select-location-tooltip", role: "tooltip", "aria-label": 'location-tooltip', sx: { height: '24px' }, title: _jsx(_Fragment, { children: translate('locationTooltip') }), arrow: true, placement: "top", disableInteractive: true }, { children: _jsx(Box, { children: _jsx(CcfInfoIcon, { tabIndex: 0, role: "img", titleAccess: translate('locationTooltip'), sx: Object.assign({}, (((locationData === null || locationData === void 0 ? void 0 : locationData.length) <= 0 ||
                                    modeOfOperation === (ModeOfOperation.FULLY_AUTO || ModeOfOperation.AUTO_PREVIEW_ONLY)) && {
                                    opacity: 0.4,
                                })), htmlColor: "", viewBox: "0 0 28 28", "aria-describedby": "select-location-tooltip" }) }) }))] })), _jsx(CcfTooltip, Object.assign({ arrow: true, placement: "top", disableInteractive: true, title: (locationData === null || locationData === void 0 ? void 0 : locationData.length) <= 0 ? translate('noDataAvailable') : '' }, { children: _jsx(Select, Object.assign({ labelId: "demo-simple-select-label", readOnly: modeOfOperation === (ModeOfOperation.FULLY_AUTO || ModeOfOperation.AUTO_PREVIEW_ONLY) && selectedLocation ? true : false, disabled: (locationData === null || locationData === void 0 ? void 0 : locationData.length) <= 0, id: "select-location", "data-testid": "select-location", value: location, size: "small", displayEmpty: true, renderValue: location !== '' ? undefined : () => _jsx(Typography, Object.assign({ sx: Object.assign({ opacity: 0.4 }, styles.locationItem) }, { children: "Select Location" })), onChange: handleLocationChange, sx: Object.assign(Object.assign({}, (modeOfOperation === (ModeOfOperation.FULLY_AUTO || ModeOfOperation.AUTO_PREVIEW_ONLY) && { opacity: 0.4 })), styles.locationItem) }, { children: locationData === null || locationData === void 0 ? void 0 : locationData.map((locationDetail) => (_jsx(MenuItem, Object.assign({ value: locationDetail.id, sx: Object.assign({}, styles.locationItem) }, { children: _jsx(ListItemText, { primary: locationDetail.locationName }) }), locationDetail.id))) })) })), ((modeOfOperation === ModeOfOperation.AUTO_PREVIEW_ADJUST) && location) && (_jsx(Typography, Object.assign({ paragraph: true, sx: Object.assign({}, styles.locationNote) }, { children: translate('adjustLocation') })))] }));
}
//# sourceMappingURL=ccf-location-option.js.map