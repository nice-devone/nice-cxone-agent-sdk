import { RouteProps } from 'react-router-dom-v5-compat';
export declare type ExtendedRouteProps = RouteProps & {
    key?: string;
};
/**
 * Component to provide protected routes for application
 * @param param0 - CcfProtectedRouteProps
 * @example - <CcfProtectedRoute />
 * @returns
 */
export declare function CcfProtectedRoute({ children, ...others }: ExtendedRouteProps): JSX.Element;
export default CcfProtectedRoute;
