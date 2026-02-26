import { ACDSessionManager, FeatureToggleService } from '@nice-devone/core-sdk';
import { useEffect, useRef } from 'react';
import { OmiliaEnum } from '@nice-devone/common-sdk';
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
export const useOmiliaIFrameVisibilityHandler = (isIframesPreloaded, customWorkspaces, activecustomWorkspace, selectedMenu, selectedMenuAppSpaceTab) => {
    const HIDDEN_STYLES = 'height: 0px; width: 0px; visibility: hidden;';
    const VISIBLE_STYLES = 'height: 100%; width: 100%; visibility: visible;';
    const isOmiliaWrapperFTOn = useRef(FeatureToggleService.instance.getFeatureToggleSync("release-aai-omiliawrapper-aai-34358" /* FeatureToggles.OMILIA_CUSTOM_WORKSPACE_FEATURE_TOGGLE */));
    // Custom Omilia hide/show handling
    useEffect(() => {
        var _a, _b;
        const omiliaWorkspace = customWorkspaces === null || customWorkspaces === void 0 ? void 0 : customWorkspaces.find(ws => { var _a; return ((_a = ws === null || ws === void 0 ? void 0 : ws.persistentPanelLabel) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === OmiliaEnum.OMILIA_LABEL; });
        if (!omiliaWorkspace) {
            return;
        }
        const iframe = document === null || document === void 0 ? void 0 : document.getElementById((_a = omiliaWorkspace.persistentPanelId) === null || _a === void 0 ? void 0 : _a.toString());
        if (!iframe) {
            return;
        }
        if (((_b = activecustomWorkspace === null || activecustomWorkspace === void 0 ? void 0 : activecustomWorkspace.persistentPanelLabel) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== OmiliaEnum.OMILIA_LABEL) {
            iframe.style.cssText = HIDDEN_STYLES;
            return;
        }
        if (!isOmiliaWrapperFTOn.current) {
            iframe.style.cssText = HIDDEN_STYLES;
        }
        else {
            iframe.style.cssText = VISIBLE_STYLES;
        }
        const subscription = ACDSessionManager.instance.agentAssistOmiliaGetNextSubject.subscribe((getNextEvent) => {
            var _a, _b, _c;
            if (getNextEvent) {
                const openInEmbeddedModeValue = (_b = JSON.parse((_a = getNextEvent.allParams) === null || _a === void 0 ? void 0 : _a.AgentAssistAppConfigJson).Params) === null || _b === void 0 ? void 0 : _b.openInEmbeddedMode;
                const isOmiliaEmbeddedMode = openInEmbeddedModeValue === true || openInEmbeddedModeValue === 'true';
                if (!isOmiliaEmbeddedMode) {
                    iframe.style.cssText = HIDDEN_STYLES;
                }
                else if (((_c = activecustomWorkspace === null || activecustomWorkspace === void 0 ? void 0 : activecustomWorkspace.persistentPanelLabel) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === OmiliaEnum.OMILIA_LABEL && isOmiliaEmbeddedMode && isOmiliaWrapperFTOn.current) {
                    iframe.style.cssText = VISIBLE_STYLES;
                }
            }
        });
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [activecustomWorkspace, isIframesPreloaded, selectedMenuAppSpaceTab, selectedMenu]);
};
//# sourceMappingURL=useOmiliaIFrameVisibilityHandler.js.map