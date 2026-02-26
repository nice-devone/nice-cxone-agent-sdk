import { jsx as _jsx } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import React, { useEffect, useState } from 'react';
import LvRemote, { SMARTREACH_MODULES } from '../lv-remote';
import { DATA_TEST_ID, PRE_LOADER_TIMEOUT } from '../../lv-app-space-utility';
export const dataTestId = `${DATA_TEST_ID}-desk`;
// Required to prevent changing the object reference between renders
const default_obj = {};
/**
 *
 * LvDesk is the wrapper that imports LVDESK into CXone
 * @example
 * ```
 * <LvDesk />
 * ```
 */
export function LvRemoteDesk(props) {
    const { sx, onMounted, componentProps } = props;
    useEffect(() => {
        onMounted === null || onMounted === void 0 ? void 0 : onMounted();
    }, [onMounted]);
    return (_jsx(LvRemote, { componentProps: componentProps !== null && componentProps !== void 0 ? componentProps : default_obj, dataTestId: dataTestId, moduleName: SMARTREACH_MODULES.DESK, sx: sx }));
}
/**
 * Preloads the LV Desk module federation in the DOM without displaying the component.
 * The component mounts `LvDesk` with `display: 'none'` to trigger module federation loading,
 * then removes itself from the DOM after a short delay.
 *
 * @example
 * // Usage: Place <LvDeskPreloader /> somewhere in your app to preload ECC in the background.
 * <LvDeskPreloader />
 */
export const LvDeskPreloader = React.memo(function LvDeskPreloader() {
    const [show, setShow] = useState(true);
    return show ? (_jsx(LvRemoteDesk, { onMounted: () => {
            setTimeout(() => setShow(false), PRE_LOADER_TIMEOUT);
        }, sx: { display: 'none' } })) : null;
});
export default LvRemoteDesk;
//# sourceMappingURL=lv-remote-desk.js.map