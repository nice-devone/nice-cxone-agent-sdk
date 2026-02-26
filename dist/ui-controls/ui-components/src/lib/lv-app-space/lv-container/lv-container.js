import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
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
export function LvContainer(props) {
    const { children, toastContainerId, dataTestId, sx } = props, rest = __rest(props, ["children", "toastContainerId", "dataTestId", "sx"]);
    return (_jsxs(Box, Object.assign({ component: "div", "data-testid": dataTestId, sx: [{ display: 'flex', flex: 1, height: 1 }, ...(Array.isArray(sx) ? sx : [sx])] }, rest, { children: [toastContainerId ? (_jsx(ToastContainer, { closeOnClick: true, containerId: toastContainerId, draggable: true, enableMultiContainer: true, newestOnTop: false, pauseOnFocusLoss: true, position: "top-center", rtl: false, style: {
                    position: 'absolute', // CXDSK-33
                } })) : null, _jsx(CcfErrorBoundary, Object.assign({ componentName: dataTestId }, { children: children }))] })));
}
export default LvContainer;
//# sourceMappingURL=lv-container.js.map