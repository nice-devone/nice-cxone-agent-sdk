export interface CcfExternalAppProps {
    path: string;
    title: string;
    allowedProperties?: string;
}
/**
 * This Component can be used to render any Iframe Component
 * @example - <CcfExternalApp />
 * @returns
 */
export declare const CcfExternalApp: ({ path, title, allowedProperties, }: CcfExternalAppProps) => JSX.Element;
export default CcfExternalApp;
