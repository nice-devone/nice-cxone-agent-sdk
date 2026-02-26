import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfDoodleImage } from '@nice-devone/ui-controls';
import { Navigate } from 'react-router-dom-v5-compat';
import { RoutePaths } from '../../enums/route-paths';
/**
 * Component to handle closing of logout callback
 * @example -
 */
export function CcfLogoutCallback() {
    return (_jsxs(_Fragment, { children: [_jsx(CcfDoodleImage, {}), ";", window.opener && window.opener !== window ? (window === null || window === void 0 ? void 0 : window.close()) : (_jsx(Navigate, { to: RoutePaths.LOGIN }))] }));
}
export default CcfLogoutCallback;
//# sourceMappingURL=ccf-logout-callback.js.map