import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Chip, Link, Popover, useTheme } from '@mui/material';
import { CcfBox, CcfTooltip, CcfTypography } from '@nice-devone/ui-controls';
import { hexToRgbA } from '../../../../../../util/colorUtils';
import CcfMessagesTagStyles from './ccf-messages-tags-style';
/**
 * @param param -CcfMessagesTagsProps
 * @returns popover which shows to digital message tag
 * @example <CcfMessagesTags/>
 */
export default function CcfMessagesTags({ tagsList }) {
    var _a;
    const theme = useTheme();
    const styles = CcfMessagesTagStyles(theme);
    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);
    const visibleTags = 2;
    /**
     * Handles click event on "Show more" button.
     * @param event - The click event.
     * @example handleShowMoreButtonClick (e)
     */
    const handleShowMoreButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    /**
     * Closes the popover.
     * @example handleClosePopover()
     */
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    /**
   * Generates an array of Chip components based on a list of tags.
   * Only the specified number of tags will be displayed.
   * @param tagsList - The list of tags to display.
   * @param visibleTags - The maximum number of tags to display.
   * @returns An array of Chip components representing the displayed tags.
   */
    const displayedTags = (_a = tagsList === null || tagsList === void 0 ? void 0 : tagsList.slice(0, visibleTags)) === null || _a === void 0 ? void 0 : _a.map(tagItem => (_jsx(CcfTooltip, Object.assign({ title: tagItem === null || tagItem === void 0 ? void 0 : tagItem.title }, { children: _jsx(Chip, { sx: styles.chipStyle, style: { backgroundColor: hexToRgbA(tagItem.color, 0.2) }, label: tagItem.title, size: "small", "data-testid": "displayedTagsChips" }, tagItem === null || tagItem === void 0 ? void 0 : tagItem.id) }), tagItem.id)));
    /**
   * Generates a list of Chip components for the remaining tags in the tagsList array after a specified index.
   * @param tagsList - The array of tags.
   * @param visibleTags - The index from which to start slicing the tagsList.
   * @returns An array of Chip components representing the remaining tags.
   */
    const remainingTags = tagsList === null || tagsList === void 0 ? void 0 : tagsList.slice(visibleTags).map(tagItem => (_jsx(CcfTooltip, Object.assign({ title: tagItem === null || tagItem === void 0 ? void 0 : tagItem.title }, { children: _jsx(Chip, { sx: styles.chipStyle, style: { backgroundColor: hexToRgbA(tagItem.color, 0.2) }, label: tagItem === null || tagItem === void 0 ? void 0 : tagItem.title, size: "small", "data-testid": "remainingTagsChips" }, tagItem === null || tagItem === void 0 ? void 0 : tagItem.id) }), tagItem.id)));
    return (_jsxs(CcfBox, Object.assign({ sx: styles.tagWrapper }, { children: [tagsList && displayedTags, tagsList.length > 2 && (_jsx(CcfBox, Object.assign({ sx: styles.flexVerticalCenter }, { children: _jsxs(Link, Object.assign({ component: "button", variant: "body2", "data-testid": "showMoreTags", onClick: handleShowMoreButtonClick }, { children: [!popoverOpen && (_jsx(CcfTypography, Object.assign({ variant: "h5", sx: styles.viewLess }, { children: '+' + (tagsList.length - visibleTags) }))), popoverOpen && (_jsx(CcfTypography, { variant: "h5", sx: styles.viewLess, translationKey: "viewLess" }))] })) }))), _jsx(Popover, Object.assign({ open: popoverOpen, anchorEl: anchorEl, sx: styles.popover, onClose: handleClosePopover, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                } }, { children: _jsx(CcfBox, { children: remainingTags }) }))] })));
}
//# sourceMappingURL=ccf-messages-tags.js.map