import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CcfQuickRepliesIcon, CcfTextField, CcfTooltip, CcfTypography, useTranslator, } from '@nice-devone/ui-controls';
import { capitalizeFirstLetter } from '../../../util/stringUtils';
import CcfDigitalWAOBContactStyles from './ccf-digital-wa-ob-contact.style';
import { CcfAssignmentAction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useDispatch } from 'react-redux';
import { DeleteOutlined } from '@mui/icons-material';
import { globalActions } from '../../global.app.slice';
import { StorageKeys } from '@nice-devone/core-sdk';
import { updateAppSpaceTabStatus } from '../../ccf-app-space/ccf-app-space.slice';
import { Navigation } from '../../../enums/navigation-menus';
import { removeObDraft } from '../../ccf-assignment-panel/ccf-assignment-utils';
import CcfDigitalStatusShared from '../../ccf-disposition/shared/ccf-digital-status-shared';
/**
 * Component displays Interaction space for whatsapp ob
 * @returns whatsapp ob screen
 * ```
 * @example
 * <CcfDigitalWAOBContact/>
 * ```
 */
const CcfDigitalWaOBContact = (props) => {
    const { id, status, customerName, caseId, interactionId, contactId, closeTab, isDraftOBDigitalContact } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const styles = CcfDigitalWAOBContactStyles(theme);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    /**
     * Function to change recipient name
     * @param e - React.ChangeEvent<HTMLInputElement>
     * @example - recipientChangeHandler(e)
     */
    const recipientChangeHandler = (e) => {
        e.preventDefault();
        dispatch(CcfAssignmentAction.updateDigitalRecipientName({
            recipientName: e.target.value,
            caseId,
            interactionId,
        }));
    };
    /**
    * onDiscardClick method to remove digital OB contact
    * @example onDiscardClick();
    */
    const onDiscardClick = (id) => {
        //Removed Digital ob sms contact
        if (contactId) {
            closeTab && closeTab(id);
            dispatch(CcfAssignmentAction.removeCXoneDigitalContact({
                interactionId: interactionId,
                contactId: caseId,
            }));
            removeObDraft(caseId, status);
        }
    };
    /**
    * handleQuickRepliesClick method to navigate to quick replies tab on app space
    * @example handleQuickRepliesClick();
    */
    const handleQuickRepliesClick = () => {
        if (isSmView) {
            dispatch(globalActions.setSelectedMenu({ name: Navigation.QUICK_REPLY }));
        }
        else {
            const externalProdUrls = JSON.parse(localStorage.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS) || '{}');
            if (externalProdUrls) {
                externalProdUrls.selectedMenuPanelApp = Navigation.QUICK_REPLY;
                localStorage.setItem(StorageKeys.EXTERNAL_PRODUCT_URLS, JSON.stringify(externalProdUrls));
            }
            dispatch(updateAppSpaceTabStatus({ index: Navigation.QUICK_REPLY, tab: Navigation.QUICK_REPLY }));
        }
    };
    const statusFormParams = {
        renderedInOutcomesPanel: false,
    };
    /**
     * @returns - Component for case status or its new component
     * @example - if feature toggle is on then we will return new component else old component
     */
    const caseChangeComponentFT = () => {
        if (!isDraftOBDigitalContact) {
            return _jsx(CcfDigitalStatusShared, Object.assign({}, statusFormParams));
        }
        else {
            return (_jsx("span", Object.assign({ style: styles.caseStatus }, { children: capitalizeFirstLetter(status) })));
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ sx: styles.headerContainer }, { children: _jsxs(Box, Object.assign({ sx: styles.statusBox }, { children: [_jsx(CcfTypography, { variant: "inherit", style: styles.privateText, translationKey: "private" }), ' | ', caseChangeComponentFT()] })) })), _jsxs(Box, Object.assign({ sx: styles.whatsAppNotificationContainer }, { children: [_jsx(Box, Object.assign({ sx: styles.whatsAppNotificationContentContainer }, { children: _jsx(Typography, Object.assign({ sx: styles.whatsAppNotificationText }, { children: translate('whatsappNotificationOnDraftScreen') })) })), _jsx(Button, Object.assign({ variant: "outlined", startIcon: _jsx(CcfQuickRepliesIcon, {}), onClick: handleQuickRepliesClick, sx: styles.quickRepliesBtn, "data-testid": 'quick-replies-btn' }, { children: translate('replies') }))] })), _jsx(Box, Object.assign({ sx: styles.recipientBox }, { children: _jsx(CcfTextField, { fullWidth: true, label: translate('recipient'), required: true, size: "small", id: "outlined-basic", variant: "outlined", margin: "normal", onChange: recipientChangeHandler, onKeyDown: (e) => {
                        e.key === 'Enter' && e.preventDefault();
                    }, "data-testid": "recipient-textbox", value: customerName, defaultValue: customerName, error: customerName.trim() ? false : true }) })), _jsx(Box, { sx: styles.contentHeight }), _jsx(Box, Object.assign({ sx: styles.discardDraftContainer }, { children: _jsx(CcfTooltip, Object.assign({ title: translate('discardReply') }, { children: _jsx(Button, Object.assign({ onClick: () => onDiscardClick(id), "data-testid": 'discard-button' }, { children: _jsx(DeleteOutlined, {}) })) })) }))] }));
};
export default memo(CcfDigitalWaOBContact);
//# sourceMappingURL=ccf-digital-wa-ob-contact.js.map