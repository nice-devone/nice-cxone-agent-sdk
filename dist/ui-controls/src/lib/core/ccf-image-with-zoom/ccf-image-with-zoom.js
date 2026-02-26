import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ccfImageWithZoomStyles from './ccf-image-with-zoom.style';
import { useTheme, useMediaQuery, Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { CcfCloseIcon, CcfPlusIcon, CcfMinusIcon } from '../../../index';
import { useState } from 'react';
/**
 * Component displays image adaptive cards with zoom capability
 * @param props - CcfImageWithZoomProps
 * @returns image expanded with zoom options
 * @example `<CcfImageWithZoom imgUrl={imgUrl} imgAltText={imgAltText} isModalOpen={isModalOpen} closeModal={closeModal} isInboxCollapsed={true} />`
 */
export function CcfImageWithZoom({ imgUrl, imgAltText, isModalOpen, closeModal, isInboxCollapsed = false }) {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const cardStyles = ccfImageWithZoomStyles(theme);
    const [imageTransformScale, setImageTransformScale] = useState(1);
    /**
     * Method to check if further zoom in of attachment possible in preview mode
     * ```
     * @example
     * zoomInPossible()
     * />
     *
     * ```
     */
    const zoomInPossible = () => {
        if (imageTransformScale < (window.innerWidth < 425 ? 1.2 : 1.05)) {
            return true;
        }
        return false;
    };
    /**
     * Method to check if further zoom out of attachment possible in preview mode
     * ```
     * @example
     * zoomOutPossible()
     * />
     *
     * ```
     */
    const zoomOutPossible = () => {
        if (imageTransformScale > 0.8) {
            return true;
        }
        return false;
    };
    /**
     * Method to zoom in to increase the size of attachment in preview
     * ```
     * @example
     * handleZoomIn()
     * />
     *
     * ```
     */
    const handleZoomIn = () => {
        if (zoomInPossible()) {
            setImageTransformScale(imageTransformScale * 1.02);
        }
    };
    /**
     * Method to zoom out to decrease the size of attachment in preview
     * ```
     * @example
     * handleZoomOut()
     * />
     *
     * ```
     */
    const handleZoomOut = () => {
        if (zoomOutPossible()) {
            setImageTransformScale(imageTransformScale / 1.02);
        }
    };
    /**
     * Method to get cardStyle based on Md value
     * ```
     * @example
     * getCardStyle()
     * />
     *
     * ```
     */
    const getCardStyle = () => {
        if (isInboxCollapsed && !isBelowMd) {
            return cardStyles.widthInputCollapsed;
        }
        return isBelowMd ? cardStyles.widthBelowMd : {};
    };
    return (_jsxs(Dialog, Object.assign({ open: isModalOpen, onClose: closeModal, "aria-labelledby": "expanded-image-title", sx: Object.assign(Object.assign({}, cardStyles.expandedDialog), (getCardStyle())) }, { children: [_jsx(CcfCloseIcon, { sx: cardStyles.closeDialog, onClick: closeModal }), _jsx(DialogContent, Object.assign({ sx: cardStyles.dialogImage }, { children: _jsx("img", { src: imgUrl, alt: imgAltText, style: {
                        transform: `scale(${imageTransformScale})`,
                        maxWidth: '100%',
                        maxHeight: '100%',
                        padding: '1.25rem',
                    } }) })), _jsx(DialogActions, Object.assign({ sx: cardStyles.dialogActions }, { children: _jsxs("div", Object.assign({ style: cardStyles.dialogButtons }, { children: [_jsx(Button, Object.assign({ "data-testid": "zoomOut", onClick: () => handleZoomOut() }, { children: _jsx(CcfMinusIcon, { sx: cardStyles.zoomOutButton }) })), _jsx(Button, Object.assign({ "data-testid": "zoomIn", onClick: () => handleZoomIn() }, { children: _jsx(CcfPlusIcon, { sx: cardStyles.zoomInButton }) }))] })) }))] })));
}
export default CcfImageWithZoom;
//# sourceMappingURL=ccf-image-with-zoom.js.map