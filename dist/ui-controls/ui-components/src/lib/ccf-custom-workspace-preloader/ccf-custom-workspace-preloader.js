import { jsx as _jsx } from "react/jsx-runtime";
import { CcfBox, useTranslator } from '@nice-devone/ui-controls';
import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getCustomWorkspaces, getSelectedMenuName, globalActions } from '../global.app.slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppSpaceActiveTabStatus } from '../ccf-app-space/ccf-app-space.slice';
import { Navigation } from '../../enums/navigation-menus';
import ccfCustomWorkspacepreloaderStyles from './ccf-custom-workspace-preloader.style';
/**
 *
 * @param props - CcfCustomWorkspacePreloaderProps
 * @returns Preloaded iframes for custom workspaces
 * @example - <CcfCustomWorkspacePreloader />
 */
export const CcfCustomWorkspacePreloader = (props) => {
    const { anchorElcustomWorkspace, setAnchorElementCustomWorkspace, } = props;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = ccfCustomWorkspacepreloaderStyles();
    const customWorkspaces = useSelector(getCustomWorkspaces);
    const selectedMenuAppSpace = useSelector(selectAppSpaceActiveTabStatus);
    const selectedMenu = useSelector(getSelectedMenuName);
    const [customWorkspacesIframes, setCustomWorkspacesIframes] = useState([]);
    const [allIframesLoaded, setAllIframesLoaded] = useState(false);
    const customWorkspacePreloaderRef = useRef(null);
    /**
     *
     * @param index - number
     * @example - handleIframeLoad(0)
     */
    const handleIframeLoad = (index) => {
        if (index === (customWorkspaces.length - 1))
            setAllIframesLoaded(true);
    };
    useEffect(() => {
        if (customWorkspaces.length) {
            let iframeArr = [];
            iframeArr = customWorkspaces.map((workSpace, index) => {
                return {
                    label: workSpace.persistentPanelLabel,
                    frame: () => {
                        return _jsx("iframe", { title: translate('customWorkspace'), src: workSpace.persistentPanelURI, id: workSpace.persistentPanelId.toString(), width: '100%', onLoad: () => handleIframeLoad(index), style: { visibility: 'hidden', height: '0', width: '0' }, allow: "camera *; microphone *;autoplay;geolocation;fullscreen;usb;picture-in-picture;web-share;" });
                    },
                };
            });
            setCustomWorkspacesIframes(iframeArr);
        }
    }, [customWorkspaces]);
    useEffect(() => {
        if (allIframesLoaded) {
            dispatch(globalActions.setIsCustomIframesLoaded(true));
        }
    }, [allIframesLoaded]);
    useEffect(() => {
        const containerDiv = customWorkspacePreloaderRef.current;
        if (containerDiv) {
            if (anchorElcustomWorkspace) {
                const anchorElRectangle = anchorElcustomWorkspace.getBoundingClientRect();
                containerDiv.style.cssText = `width: ${anchorElRectangle.width}px;
          height: ${anchorElRectangle.height}px;
          top: ${anchorElRectangle.top}px;
          left: ${anchorElRectangle.left}px;
          visibility: visible`;
            }
            else {
                ['width', 'top', 'left'].forEach(prop => containerDiv.style.removeProperty(prop));
                containerDiv.style.cssText = 'height: 0; width: 0; visibility: hidden;';
            }
        }
    }, [anchorElcustomWorkspace, customWorkspacePreloaderRef === null || customWorkspacePreloaderRef === void 0 ? void 0 : customWorkspacePreloaderRef.current]);
    //Hide the iframes if menu other than custom workspace is selected
    useEffect(() => {
        if (!(selectedMenu === Navigation.CUSTOMWORKSPACE || (selectedMenu === Navigation.INTERACTION && selectedMenuAppSpace.tab === Navigation.CUSTOMWORKSPACE))) {
            const parentDiv = customWorkspacePreloaderRef.current;
            if (parentDiv) {
                const iframes = parentDiv.querySelectorAll('iframe');
                if (iframes) {
                    iframes.forEach((child) => {
                        child.style.cssText = 'height: 0; width: 0; visibility: hidden;';
                    });
                }
            }
            setAnchorElementCustomWorkspace(null);
        }
    }, [selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab, selectedMenu]);
    return (!isSmView && customWorkspacesIframes.length > 0
        ? _jsx(CcfBox, Object.assign({ id: 'workspacePreloadedContainer', sx: styles.workspacePreloadedContainer, ref: customWorkspacePreloaderRef, "data-testid": 'workspacePreloadedContainer' }, { children: customWorkspacesIframes.map((element, index) => {
                const _index = index;
                const IframeComponent = element.frame;
                return _jsx(IframeComponent, {}, `${element.label}_${_index}`);
            }) }))
        : _jsx("div", {}));
};
export default CcfCustomWorkspacePreloader;
//# sourceMappingURL=ccf-custom-workspace-preloader.js.map