/**
 * Custom hook to handle Omilia handshake, get next, and call disconnect logic
 * for a popped-out window
 * @param targetWindow - The window object where Omilia is opened (can be current window or new window)
 * @param isWindowPoppedOut - Whether the window is popped out
 * @example -
 * ```
 * useOmiliaNewWindowHandler(targetWindow, isWindowPoppedOut);
 * ```
 */
export declare const useOmiliaNewWindowHandler: (targetWindow: Window | undefined, isWindowPoppedOut: boolean) => void;
