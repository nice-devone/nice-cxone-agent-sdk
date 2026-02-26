import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Route } from 'react-router-dom-v5-compat';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { RoutePaths } from '../../enums/route-paths';
/**
 * Component to provide protected routes for application
 * @param param0 - CcfProtectedRouteProps
 * @example - <CcfProtectedRoute />
 * @returns
 */
export function CcfProtectedRoute(_a) {
    var { children } = _a, others = __rest(_a, ["children"]);
    const userLoginDetails = CXoneAuth.instance.getAuthState();
    const isTokenValid = userLoginDetails.isTokenValid;
    return (_jsx(Route, { path: others.path, element: (isTokenValid && children) || _jsx(Navigate, { to: RoutePaths.LOGIN }) }, others.key));
}
export default CcfProtectedRoute;
//# sourceMappingURL=ccf-protected-route.js.map