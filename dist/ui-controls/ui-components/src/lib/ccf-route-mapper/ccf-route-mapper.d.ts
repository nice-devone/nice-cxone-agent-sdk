/// <reference types="react" />
export interface RouteInterface {
    path: string;
    private: boolean;
    component?: React.ReactNode;
}
export interface CcfRouteMapperProps {
    routes: RouteInterface[];
}
/**
 * Component to map diiferent routes
 * @param param0 - CcfRouteMapperProps
 * @example - <CcfRouteMapper />
 * @returns
 */
export declare function CcfRouteMapper({ routes }: CcfRouteMapperProps): JSX.Element;
export default CcfRouteMapper;
