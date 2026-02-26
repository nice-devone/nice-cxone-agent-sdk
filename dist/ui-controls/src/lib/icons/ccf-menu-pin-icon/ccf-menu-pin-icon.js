import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
import { IconVariant } from '@nice-devone/common-sdk';
/**
 * Displays a pin icon.
 * @example <CcfMenuPinIcon fillColor="#005C99" variant="outlined" />
 */
export function CcfMenuPinIcon(_a) {
    var { fillColor = '#005C99', variant = IconVariant.Outlined } = _a, props = __rest(_a, ["fillColor", "variant"]);
    const commonProps = Object.assign(Object.assign({}, props), { xmlns: 'http://www.w3.org/2000/svg', fill: 'none' });
    if (variant === 'outlined') {
        return (_jsxs(SvgIcon, Object.assign({}, commonProps, { viewBox: "0 0 18 19", width: 18, height: 19 }, { children: [_jsx("g", Object.assign({ clipPath: "url(#clip0)" }, { children: _jsx("path", { d: "M17.7307 5.4L12.6007 0.27C12.4207 0.09 12.1507 0 11.9707 0C11.7007 0 11.5207 0.09 11.3407 0.27C10.4407 1.26 9.9907 2.52 10.0807 3.87L8.4607 5.58C7.6507 5.22 6.7507 5.04 5.8507 5.04C3.9607 5.04 2.2507 5.76 0.900704 7.11L0.810704 7.29C0.630704 7.38 0.540704 7.65 0.540704 7.83C0.540704 8.01 0.630704 8.28 0.810704 8.46L4.2307 11.97L0.450704 16.74C0.450704 16.74 -0.179296 17.46 0.0907039 17.91C0.0907039 17.91 0.540704 18.27 1.1707 17.73L6.0307 13.86L9.4507 17.28C9.6307 17.46 9.8107 17.55 10.0807 17.55C10.2607 17.55 10.5307 17.46 10.7107 17.28L10.8007 17.19C12.7807 15.21 13.4107 12.24 12.4207 9.63L14.1307 7.92C14.3107 7.92 14.4007 7.92 14.5807 7.92C15.7507 7.92 16.8307 7.47 17.7307 6.66C17.9107 6.48 18.0007 6.3 18.0007 6.03C18.0007 5.85 17.9107 5.58 17.7307 5.4ZM14.5807 6.12C14.4907 6.12 14.4007 6.12 14.3107 6.12L13.5007 6.03L10.3507 9.18L10.8007 10.26C11.4307 11.97 11.1607 13.86 10.1707 15.3L7.4707 12.51L5.6707 10.62L2.9707 7.83C3.8707 7.2 4.9507 6.84 6.0307 6.84C6.5707 6.93 7.2007 7.02 7.8307 7.2L8.9107 7.65L12.0607 4.5L11.9707 3.6C11.8807 3.15 11.9707 2.7 12.1507 2.25L15.6607 5.76C15.3007 6.03 14.9407 6.12 14.5807 6.12Z", fill: fillColor }) })), _jsx("defs", { children: _jsx("clipPath", Object.assign({ id: "clip0" }, { children: _jsx("rect", { width: "18", height: "19", fill: "white" }) })) })] })));
    }
    return (_jsx(SvgIcon, Object.assign({}, commonProps, { viewBox: "0 0 20 21", width: 20, height: 21 }, { children: _jsx("path", { d: "M13.9747 0.3L19.6747 6C19.8747 6.2 19.9747 6.5 19.9747 6.7C19.9747 7 19.8747 7.2 19.6747 7.4C18.6747 8.3 17.4747 8.8 16.1747 8.8H15.6747L13.7747 10.7C14.8747 13.6 14.1747 16.9 11.9747 19.1L11.8747 19.2C11.6747 19.4 11.3747 19.5 11.1747 19.5C10.8747 19.5 10.6747 19.4 10.4747 19.2L6.67474 15.4L1.27474 19.7C0.574741 20.3 0.0747405 19.9 0.0747405 19.9C-0.22526 19.4 0.474741 18.6 0.474741 18.6L4.67474 13.3L0.87474 9.4C0.67474 9.2 0.57474 8.9 0.57474 8.7C0.57474 8.5 0.67474 8.2 0.87474 8.1L0.97474 7.9C2.47474 6.4 4.37474 5.6 6.47474 5.6C7.47474 5.6 8.47474 5.8 9.37474 6.2L11.1747 4.3C11.0747 2.8 11.5747 1.4 12.5747 0.3C12.7747 0.1 12.9747 0 13.2747 0C13.4747 0 13.7747 0.1 13.9747 0.3Z", fill: fillColor }) })));
}
export default CcfMenuPinIcon;
//# sourceMappingURL=ccf-menu-pin-icon.js.map