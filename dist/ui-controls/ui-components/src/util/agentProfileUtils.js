import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { AgentScreenSize } from '../enums/agent-profile-enums';
/**
 * Function to request fullscreen on supported browser windows as per Agent Profile Configuration
 * @example requestFullscreen()
 */
const requestFullscreen = () => {
    const elem = document === null || document === void 0 ? void 0 : document.documentElement;
    if (elem === null || elem === void 0 ? void 0 : elem.requestFullscreen) {
        elem.requestFullscreen();
    }
};
/**
 * Function to resize window for Defined By Agent screen size
 * @example resizeWindowForDefinedByAgent()
 */
const resizeWindowForDefinedByAgent = () => {
    let oldLogin = null;
    const pastLogins = LocalStorageHelper.getItem(StorageKeys.AGENT_SCREEN_SIZE, true) || [];
    const agentId = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['icAgentId'];
    if (pastLogins.length) {
        oldLogin = pastLogins.find((login) => login.agentId === agentId);
    }
    if (oldLogin && oldLogin.width && oldLogin.height) {
        window.resizeTo(oldLogin.width, oldLogin.height);
    }
};
/**
 * Function to store the resized window dimensions only in scenario if Agent Profile Configuration has Default Screen Size as Defined by Agent
 * @example storeResizeWindow()
 */
export const storeResizeWindow = (width, height) => {
    let oldLogin = null;
    const agentId = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['icAgentId'];
    const pastLogins = LocalStorageHelper.getItem(StorageKeys.AGENT_SCREEN_SIZE, true) || [];
    if (pastLogins.length) {
        oldLogin = pastLogins.find((login) => login.agentId === agentId);
    }
    if (oldLogin) {
        oldLogin.width = width;
        oldLogin.height = height;
    }
    else {
        pastLogins.push({ agentId, width, height });
    }
    LocalStorageHelper.setItem(StorageKeys.AGENT_SCREEN_SIZE, pastLogins);
};
/**
 * Function to resize window on supported browser windows as per Agent Profile Configuration
 * @param agentScreenSize - screen size to resize the window
 * @example resizeWindow()
 */
export const resizeWindow = (agentScreenSize) => {
    let width;
    let height;
    let screenSize;
    if (agentScreenSize && (agentScreenSize === null || agentScreenSize === void 0 ? void 0 : agentScreenSize.toUpperCase()) !== AgentScreenSize.DEFINED_BY_AGENT && (agentScreenSize === null || agentScreenSize === void 0 ? void 0 : agentScreenSize.toUpperCase()) !== AgentScreenSize.FULLSCREEN) {
        // Extract width and height if the format includes dimensions (e.g. 'Large (1920 x 1080)') 
        // Dev note: below regex is used to extract width and height from the string format 'Large (1920 x 1080)', please don't update without proper testing and consultation
        const regex = /^([A-Za-z\s]+)\s*\((\d+)\s*x\s*(\d+)\)$/;
        const match = agentScreenSize.match(regex);
        if (match) {
            screenSize = match[1].trim();
            width = parseInt(match[2], 10);
            height = parseInt(match[3], 10);
        }
    }
    else {
        screenSize = agentScreenSize;
    }
    // Normalize the screen size to match the enum values
    const normalizedScreenSize = screenSize === null || screenSize === void 0 ? void 0 : screenSize.toUpperCase();
    switch (normalizedScreenSize) {
        case AgentScreenSize.LARGE:
        case AgentScreenSize.MEDIUM:
        case AgentScreenSize.SMALL:
        case AgentScreenSize.CUSTOM:
            width && height && window.resizeTo(width, height);
            break;
        case AgentScreenSize.DEFINED_BY_AGENT:
            resizeWindowForDefinedByAgent();
            break;
        case AgentScreenSize.FULLSCREEN:
            requestFullscreen();
            break;
        default: break;
    }
};
//# sourceMappingURL=agentProfileUtils.js.map