import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { VoiceContactStatus } from '@nice-devone/common-sdk';
import { Box, Grid, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { CcfOutcomeResolveIcon, CcfTransferIcon, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import CcfDigitalEmailContactHeaderStyles from '../ccf-interaction-space/ccf-digital-email-v2/ccf-digital-email-contact-header/ccf-digital-email-contact-header-styles';
import { MoreVert } from '@mui/icons-material';
import CcfInteractionMenuStyles from '../ccf-interaction-space/ccf-interaction-menu/ccf-interaction-menu-styles';
import { globalActions } from '../global.app.slice';
import { useDispatch, useSelector } from 'react-redux';
import { dispositionInteractionActions, getDispositionData, getIsDispositionOpen } from '../ccf-disposition/ccf-disposition-slice';
import { getVoiceContactDetailsById } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * Header component for the voice transcription tab content.
 *
 * @param contactId - The contact ID to display in the header.
 * @example \<CcfVoiceTranscriptionTabContentHeader contactId=\{contactId\} /\>
 */
export const CcfVoiceTranscriptionTabContentHeader = ({ contactId }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const theme = useTheme();
    const dispatch = useDispatch();
    const themeStyles = CcfDigitalEmailContactHeaderStyles(theme);
    const [translate] = useTranslator();
    const [anchorEl, setAnchorEl] = useState(null);
    const styles = CcfInteractionMenuStyles(theme);
    const open = Boolean(anchorEl);
    const isDispositionOpen = useSelector(getIsDispositionOpen);
    const dispositionData = useSelector(getDispositionData);
    const showOutcomesButton = dispositionData && ((((_a = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactId]) === null || _a === void 0 ? void 0 : _a.dispositionList) && ((_c = (_b = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactId]) === null || _b === void 0 ? void 0 : _b.dispositionList) === null || _c === void 0 ? void 0 : _c.length) > 0) || (((_d = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactId]) === null || _d === void 0 ? void 0 : _d.tagList) && ((_f = (_e = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactId]) === null || _e === void 0 ? void 0 : _e.tagList) === null || _f === void 0 ? void 0 : _f.length) > 0));
    const selectedVoiceContact = useSelector(getVoiceContactDetailsById(contactId));
    /**
       * Handles the selection of a menu item from the kebab menu.
       * @param menuItem - The selected menu item.
       * @example handleKebabMenuSelection(menuItem);
       */
    const handleKebabMenuSelection = (menuItem) => {
        switch (menuItem) {
            case 'outcome-menu':
                toggleOutcomesPanel(menuItem);
                break;
            case VoiceContactStatus.TRANSFER:
                setTimeout(() => {
                    dispatch(globalActions.setSelectedMenu({ name: 'Directory' }));
                }, 0);
                break;
            default: break;
        }
    };
    /**
     * Toggles the outcomes panel visibility.
     * @param event - Mouse event
     * @example toggleOutcomesPanel(event);
     */
    const toggleOutcomesPanel = (event) => {
        setAnchorEl(event.currentTarget);
        dispatch(dispositionInteractionActions.displayDispositionCard(!isDispositionOpen));
    };
    /**
     * Handles the click event to open the kebab menu.
     * @param event - Mouse event
     * @example openKebabMenu(event);
     */
    const openKebabMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    /**
     * Handles the click event to close the kebab menu.
     * @example closeKebabMenu();
     */
    const closeKebabMenu = () => {
        setAnchorEl(null);
    };
    const options = [
        {
            name: 'transfer',
            icon: _jsx(CcfTransferIcon, {}),
            menuItem: VoiceContactStatus.TRANSFER,
            isActive: ((_g = selectedVoiceContact === null || selectedVoiceContact === void 0 ? void 0 : selectedVoiceContact.callControlButton) === null || _g === void 0 ? void 0 : _g.transfer.isVisible) && ((_h = selectedVoiceContact === null || selectedVoiceContact === void 0 ? void 0 : selectedVoiceContact.callControlButton) === null || _h === void 0 ? void 0 : _h.transfer.isEnable),
        },
        {
            name: 'outcome',
            icon: _jsx(CcfOutcomeResolveIcon, { color: 'primary' }),
            menuItem: 'outcome-menu',
            isActive: showOutcomesButton,
        }
    ];
    return _jsx(Box, Object.assign({ component: "div", sx: themeStyles.bookmark }, { children: _jsxs(Box, Object.assign({ component: "div", sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 15px' } }, { children: [_jsx(Box, Object.assign({ component: "div", sx: { fontSize: (_j = theme.typography.caption) === null || _j === void 0 ? void 0 : _j.fontSize } }, { children: _jsx("span", { children: `# ${contactId}` }) })), _jsx(IconButton, Object.assign({ "aria-label": translate('moreContactActions'), id: "interaction-long-button", "aria-controls": open ? 'long-menu' : undefined, "aria-expanded": open ? 'true' : undefined, "aria-haspopup": "true", onClick: openKebabMenu, disableRipple: true, style: { maxWidth: '0.8em', padding: '5px 0' } }, { children: _jsx(MoreVert, {}) })), _jsx(Menu, Object.assign({ id: "interaction-long-menu", anchorEl: anchorEl, open: open, onClose: closeKebabMenu, MenuListProps: {
                        'aria-labelledby': 'long-button',
                    } }, { children: (options || []).filter(opt => (opt === null || opt === void 0 ? void 0 : opt.isActive)).map((option) => {
                        return (_jsx(MenuItem, Object.assign({ value: option === null || option === void 0 ? void 0 : option.menuItem, tabIndex: 0, sx: styles.menuItemMinHeight, onClick: () => handleKebabMenuSelection(option === null || option === void 0 ? void 0 : option.menuItem) }, { children: _jsxs(Grid, Object.assign({ container: true, sx: styles.menuItemContent }, { children: [_jsx(Box, Object.assign({ sx: styles.menuItemIcon }, { children: _jsx("span", { children: option === null || option === void 0 ? void 0 : option.icon }) })), _jsx(Box, Object.assign({ sx: styles.menuItemNameBold }, { children: _jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: option === null || option === void 0 ? void 0 : option.name }) }))] })) }), option === null || option === void 0 ? void 0 : option.menuItem));
                    }) }))] })) }));
};
//# sourceMappingURL=ccf-voice-transcription-tab-content-header.js.map