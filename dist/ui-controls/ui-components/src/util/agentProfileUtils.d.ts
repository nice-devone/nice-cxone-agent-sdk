/**
 * Function to store the resized window dimensions only in scenario if Agent Profile Configuration has Default Screen Size as Defined by Agent
 * @example storeResizeWindow()
 */
export declare const storeResizeWindow: (width: string, height: string) => void;
/**
 * Function to resize window on supported browser windows as per Agent Profile Configuration
 * @param agentScreenSize - screen size to resize the window
 * @example resizeWindow()
 */
export declare const resizeWindow: (agentScreenSize: string) => void;
