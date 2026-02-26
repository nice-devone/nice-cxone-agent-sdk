import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom-v5-compat';
import { CcfProtectedRoute } from '../ccf-protected-route/ccf-protected-route';
/**
 * function to map different routes
 * @param param0 - RouteInterface
 * @example - <RouteMapperTemplate />
 * @returns
 */
const RouteMapperTemplate = ({ route }) => {
    return (_jsx(Box, Object.assign({ height: "100%", flex: "1" }, { children: route.component })));
};
/**
 * Component to map diiferent routes
 * @param param0 - CcfRouteMapperProps
 * @example - <CcfRouteMapper />
 * @returns
 */
export function CcfRouteMapper({ routes }) {
    /**
     * function to render route
     * @param route - RouteInterface
     * @param index - number
     * @example renderRoute()
     * @returns
     */
    const renderRoute = (route, index) => {
        if (route.private) {
            return (_jsx(CcfProtectedRoute, Object.assign({ path: route.path }, { children: _jsx(RouteMapperTemplate, { route: route }) }), `route-${index}-${route.path}`));
        }
        return (_jsx(Route, Object.assign({ path: route.path }, { children: _jsx(RouteMapperTemplate, { route: route }) }), `route-${index}-${route.path}`));
    };
    return (_jsx(Routes, { children: routes.map((route, index) => renderRoute(route, index)) }));
}
export default CcfRouteMapper;
//# sourceMappingURL=ccf-route-mapper.js.map