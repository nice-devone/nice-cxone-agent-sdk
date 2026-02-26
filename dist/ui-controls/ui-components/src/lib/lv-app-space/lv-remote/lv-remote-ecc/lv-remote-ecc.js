import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import React, { useEffect, useState } from 'react';
import LvRemote, { SMARTREACH_MODULES } from '../lv-remote';
import { DATA_TEST_ID, PRE_LOADER_TIMEOUT } from '../../lv-app-space-utility';
export const dataTestId = `${DATA_TEST_ID}-ecc`;
/**
 * LvEcc is the wrapper that imports LV Enhanced Customer Card into CXone
 * Notes:
 * - If allowFilter & allowSearch is not provided, it will pick the setting from the designer desktop
 * - Currently we have to instances of this component, each intance has its own variantion
 *   of the LVCustomer
 *   1) LVCustomerCard: Shown when an interaction is active
 *   2) LVSearchCustomers: Shown on the search section, customer tab
 * @example
 * ```
 *  <LvEcc />
 * ```
 */
export function LvRemoteEcc(props) {
    const { sx, onMounted } = props, componentProps = __rest(props, ["sx", "onMounted"]);
    useEffect(() => {
        onMounted === null || onMounted === void 0 ? void 0 : onMounted();
    }, [onMounted]);
    return (_jsx(LvRemote, { componentProps: componentProps, dataTestId: dataTestId, moduleName: SMARTREACH_MODULES.ECC, sx: sx }));
}
/**
 * Preloads the LV Enhanced Customer Card (ECC) module federation in the DOM without displaying the component.
 * The component mounts `LvEcc` with `display: 'none'` to trigger module federation loading,
 * then removes itself from the DOM after a short delay.
 *
 * @example
 * // Usage: Place <LvEccPreloader /> somewhere in your app to preload ECC in the background.
 * <LvEccPreloader />
 */
export const LvEccPreloader = React.memo(function LvEccPreloader() {
    const [show, setShow] = useState(true);
    return show ? (_jsx(LvRemoteEcc, { onMounted: () => {
            setTimeout(() => setShow(false), PRE_LOADER_TIMEOUT);
        }, sx: { display: 'none' } })) : null;
});
export default LvRemoteEcc;
//# sourceMappingURL=lv-remote-ecc.js.map