import { BoxProps } from '@mui/material/Box';
export declare type LvContainerProps = {
    dataTestId: string;
    toastContainerId?: string;
} & BoxProps;
/**
 * CcfBox Wrapper, adds:
 *  - Toast container for using internal CXOne toast notification system, the Toast container
 *    is added inside createPortal to make sure it displays on top of all internal LV components
 *  - Suspense to lazy load components
 *  - CcfErrorBoundary - to make sure the component is wrapped into an error boundary
 * @example
 * ```
 * <LvContainer> {children} </LvContainer>
 * ```
 */
export declare function LvContainer(props: LvContainerProps): JSX.Element;
export default LvContainer;
