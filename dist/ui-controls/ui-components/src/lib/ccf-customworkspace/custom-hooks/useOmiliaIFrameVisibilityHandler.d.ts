import { PersistentPanel } from '@nice-devone/core-sdk';
import { Navigation } from '../../../enums/navigation-menus';
/**
 * Custom hook to handle messaging between the custom workspace iframe and the agent application
 * @param isIframesPreloaded - Whether the iframes are preloaded
 * @param customWorkspaces - List of custom workspaces
 * @param activecustomWorkspace - Currently active custom workspace
 * @param selectedMenu - Currently selected menu
 * @param selectedMenuAppSpaceTab - Currently selected tab in app space
 * @example -
 * ```
 * useOmiliaIFrameVisibilityHandler(true, customWorkspaces, activecustomWorkspace, selectedMenu, selectedMenuAppSpaceTab);
 * ```
 */
export declare const useOmiliaIFrameVisibilityHandler: (isIframesPreloaded: boolean, customWorkspaces: PersistentPanel[], activecustomWorkspace: PersistentPanel | null, selectedMenu: Navigation, selectedMenuAppSpaceTab: string | null) => void;
