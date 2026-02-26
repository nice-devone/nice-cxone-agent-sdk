import { jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { ATTACHMENT_ICON_NAME, CHANNEL_ICON_NAME, CHANNEL_TYPE, iconList, REACTION_ICONS, LINK_ICONS, DIGITAL_SEARCH_ICONS } from './ccf-icon-list';
import { MessageKebabMenu } from '../ccf-assignment-panel/ccf-assignment-utils';
export const CHANNEL_ICON_SIZE = {
    SMALL: 'S',
    MEDIUM: 'M',
    LARGE: 'L',
    EXTRA_SMALL: 'XS',
    REM1: 'R1',
};
export const ATTACHMENT_ICON_SIZE = {
    SMALL: 'S',
    MEDIUM: 'M',
    LARGE: 'L',
    EXTRA_SMALL: 'XS',
};
/**
 * Component displays getSVG
 * @param iconName -string
 * @param size -string
 * @returns icon component for project
 * @example getSVG
 */
const getSvgIcons = (iconName, size, svgIconStyles, viewBox) => {
    if (Object.values(CHANNEL_ICON_NAME).includes(iconName) || Object.values(REACTION_ICONS).includes(iconName) || Object.values(LINK_ICONS).includes(iconName) || Object.values(CHANNEL_TYPE).includes(iconName) || Object.values(DIGITAL_SEARCH_ICONS).includes(iconName) || Object.values(MessageKebabMenu).includes(iconName)) {
        return svgIconStyles ? iconList[iconName](size, svgIconStyles, viewBox) : iconList[iconName](size, undefined, viewBox);
    }
};
/**
 * getAttachmentSVG
 * @param attachment -string
 * @param size -string (S, M or L)
 * @returns the attachment svg icon
 * @example getAttachmentSVG
 */
const getAttachmentSVG = (attachment, size) => {
    if (Object.values(ATTACHMENT_ICON_NAME).includes(attachment)) {
        return iconList[attachment](size);
    }
};
/**
 * CcfIcon used to digital channel icon
 * @param props - CcfIcon
 * @example -- <CcfIcon />
 */
export function CcfIcon(props) {
    const { attachmentIcon, iconName, customStyle, size, svgIconStyles, viewBox } = props;
    let fSize = '1.1rem';
    if (iconName) {
        if ((iconName === 'apple-apps-reviews' || iconName === 'voice')) {
            if (size === CHANNEL_ICON_SIZE.MEDIUM) {
                fSize = '2rem';
            }
            else if (size === CHANNEL_ICON_SIZE.LARGE) {
                fSize = '2.375rem';
            }
            else if (size === CHANNEL_ICON_SIZE.SMALL) {
                fSize = '1.5rem';
            }
        }
        else {
            fSize = '1.5rem';
            if (size === CHANNEL_ICON_SIZE.MEDIUM) {
                fSize = '2.375rem';
            }
            else if (size === CHANNEL_ICON_SIZE.LARGE) {
                fSize = '3rem';
            }
            else if (size === CHANNEL_ICON_SIZE.EXTRA_SMALL) {
                fSize = '.875rem';
            }
            else if (size === CHANNEL_ICON_SIZE.REM1) {
                fSize = '1rem';
            }
        }
    }
    if (attachmentIcon) {
        if (size === ATTACHMENT_ICON_SIZE.MEDIUM) {
            fSize = '1.5rem';
        }
        else if (size === ATTACHMENT_ICON_SIZE.EXTRA_SMALL) {
            fSize = '.875rem';
        }
    }
    const svgIcon = iconName && getSvgIcons(iconName, fSize ? fSize : CHANNEL_ICON_SIZE.SMALL, svgIconStyles, viewBox);
    const attachmentSvg = attachmentIcon && getAttachmentSVG(attachmentIcon, fSize ? fSize : CHANNEL_ICON_SIZE.SMALL);
    return (customStyle ? _jsxs(Box, Object.assign({ component: "div", sx: customStyle }, { children: [svgIcon, attachmentSvg] })) : _jsxs(_Fragment, { children: [svgIcon, attachmentSvg] }));
}
export default CcfIcon;
//# sourceMappingURL=ccf-icon.js.map