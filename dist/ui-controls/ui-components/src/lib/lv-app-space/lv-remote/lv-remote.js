import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import React, { lazy, Suspense, useCallback, useMemo } from 'react';
import { CcfAppType, loadRemoteModule, useScript } from '@nice-devone/shared-apps-lib';
import LvCircularProgress from '../lv-circular-progress/lv-circular-progress';
import useGetCxoneAuthInfo from '../hooks/useGetCxoneAuthInfo';
import useLVAppSpacePermission from '../hooks/useLVAppSpacePermission';
import useNotificationHandler from '../hooks/useNotificationHandler';
import useGetCxoneInstances from '../hooks/useGetCxoneInstances';
import useOmnichannelHandler from '../hooks/useOmnichannelHandler';
import LvContainer from '../lv-container/lv-container';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import useGetLvRemoteUrl from './hooks/useGetLvRemoteUrl';
import { useDispatch } from 'react-redux';
import { setIsLvInteractionsSyncEnabled } from '../lv-app-space.slice';
export var SMARTREACH_MODULES;
(function (SMARTREACH_MODULES) {
    SMARTREACH_MODULES["ECC"] = "CustomerCard";
    SMARTREACH_MODULES["DESK"] = "Desk";
})(SMARTREACH_MODULES || (SMARTREACH_MODULES = {}));
/**
 *
 * PureContentComponent pure component that should be rendered only if some prop has changed
 * @example
 * ```
 * <PureContentComponent />
 * ```
 */
function PureContentComponent(props) {
    const { ChannelSelectDialog, Component, dataTestId, failed, ready, sx, toastContainerId, } = props;
    return (_jsxs(LvContainer, Object.assign({ dataTestId: dataTestId, sx: sx, toastContainerId: toastContainerId }, { children: [failed ? (_jsx(CcfErrorBoundary, { componentName: dataTestId })) : null, !ready ? (_jsx(LvCircularProgress, {})) : (_jsxs(_Fragment, { children: [ChannelSelectDialog, _jsx(Suspense, Object.assign({ fallback: _jsx(LvCircularProgress, {}) }, { children: Component }))] }))] })));
}
// memoized
const PureContent = React.memo(PureContentComponent);
/**
 * LvRemote creates the MF connection with LV App Space, makes sure to pass CXA auth info and instances
 * @example
 * ```
 * <LvRemote />
 * ```
 */
export function LvRemote(props) {
    const { moduleName, sx, dataTestId, componentProps } = props;
    const toastContainerId = `${dataTestId}-toast-container`;
    const dispatch = useDispatch();
    const { url: scriptSrc, remoteName } = useGetLvRemoteUrl();
    const { ready, failed } = useScript({
        scriptSrc,
        //This will make sure that remoteEntry.js file is loaded only once.
        scriptType: 'text/javascript',
    });
    const Component = useMemo(() => lazy(loadRemoteModule(CcfAppType.LvAppSpace, remoteName, `./${moduleName}`)), [remoteName, moduleName]);
    const { locale, lvEnvironment, logLevel } = useLVAppSpacePermission();
    const authInfo = useGetCxoneAuthInfo();
    const instances = useGetCxoneInstances();
    const notificationsHandler = useNotificationHandler({
        containerId: toastContainerId,
    });
    const { ChannelSelectDialog, omnichannelProps } = useOmnichannelHandler();
    /**
     * Callback to enable or disable LV interactions sync.
     * Dispatches the `setIsLvInteractionsSyncEnabled` action with the provided value.
     *
     * @param isLvInteractionsSyncEnabled - Indicates whether LV interactions sync should be enabled.
     * @example
     * onEnableLvInteractionsSync(true);
     */
    const onEnableLvInteractionsSync = useCallback((isLvInteractionsSyncEnabled) => {
        dispatch(setIsLvInteractionsSyncEnabled(isLvInteractionsSyncEnabled));
    }, [dispatch]);
    // `componentProps` should be properly memoized at the parent level.
    // It should only change when its actual content changes to prevent unnecessary re-renders and
    // potential performance leaks.
    const RenderedComponent = useMemo(() => {
        return (_jsx(Component, { authInfo: authInfo, componentProps: componentProps, environment: lvEnvironment, instances: instances, lng: locale, logLevel: logLevel, notificationsHandler: notificationsHandler, omnichannel: omnichannelProps, onEnableLvInteractionsSync: onEnableLvInteractionsSync }));
    }, [
        Component,
        authInfo,
        componentProps,
        instances,
        locale,
        logLevel,
        lvEnvironment,
        notificationsHandler,
        omnichannelProps,
        onEnableLvInteractionsSync
    ]);
    return (_jsx(PureContent, { ChannelSelectDialog: ChannelSelectDialog, Component: RenderedComponent, dataTestId: dataTestId, toastContainerId: toastContainerId, failed: failed, ready: ready, sx: sx }));
}
export default LvRemote;
//# sourceMappingURL=lv-remote.js.map