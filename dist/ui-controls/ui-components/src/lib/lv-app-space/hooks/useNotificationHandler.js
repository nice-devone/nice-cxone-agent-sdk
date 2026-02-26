import { jsx as _jsx } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { CcfAppToastMessage } from '@nice-devone/ui-controls';
import { Logger } from '@nice-devone/core-sdk';
import { LOGGER_MODULE } from '../lv-app-space-utility';
const logger = new Logger(LOGGER_MODULE, 'useNotificationHandler');
const TOAST_MESSAGE_DEFAULTS = {
    autoClose: 5000,
};
/**
 * Connect LV notification system with CXone notification system
 * @example
 * ```
 * const { success, info, warn, error } = useNotificationHandler({ containerId: 'test' })
 * ```
 */
export default function useNotificationHandler(props) {
    logger.info('ECC - useNotificationHandler', 'Getting LV Notification Handler');
    const { containerId } = props;
    /**
     *
     * @param message - message to display
     * @example
     * ```
     * const { success } = useNotificationHandler({ containerId: 'test' })
     * success('Success message goes here')
     * ```
     */
    const successHandler = useCallback((message) => {
        toast.success(_jsx(CcfAppToastMessage, { type: "success", descriptionMessage: message }), Object.assign(Object.assign({}, TOAST_MESSAGE_DEFAULTS), { containerId }));
    }, [containerId]);
    /**
     *
     * @param message - message to display
     * @example
     * ```
     * const { info } = useNotificationHandler({ containerId: 'test' })
     * info('Info message goes here')
     * ```
     */
    const infoHandler = useCallback((message) => {
        toast.info(_jsx(CcfAppToastMessage, { type: "info", descriptionMessage: message }), Object.assign(Object.assign({}, TOAST_MESSAGE_DEFAULTS), { containerId }));
    }, [containerId]);
    /**
     *
     * @param message - message to display
     * @example
     * ```
     * const { warn } = useNotificationHandler({ containerId: 'test' })
     * warn('Warning message goes here')
     * ```
     */
    const warnHandler = useCallback((message) => {
        if (typeof message === 'string')
            toast.warn(_jsx(CcfAppToastMessage, { type: "warning", descriptionMessage: message }), Object.assign(Object.assign({}, TOAST_MESSAGE_DEFAULTS), { containerId }));
        else
            toast.warn(_jsx(CcfAppToastMessage, Object.assign({ type: "warning" }, { children: message })), Object.assign(Object.assign({}, TOAST_MESSAGE_DEFAULTS), { containerId }));
    }, [containerId]);
    /**
     *
     * @param message - message to display
     * @example
     * ```
     * const { error } = useNotificationHandler({ containerId: 'test' })
     * error('Error message goes here')
     * ```
     */
    const errorHandler = useCallback((message) => {
        toast.error(_jsx(CcfAppToastMessage, { type: "error", descriptionMessage: message }), Object.assign(Object.assign({}, TOAST_MESSAGE_DEFAULTS), { containerId }));
    }, [containerId]);
    return useMemo(() => ({
        error: errorHandler,
        info: infoHandler,
        success: successHandler,
        warn: warnHandler,
    }), [errorHandler, infoHandler, successHandler, warnHandler]);
}
//# sourceMappingURL=useNotificationHandler.js.map