import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { CcfDoubleArrowIcon, CcfLoader, CcfTooltip, CcfTypography, useTranslator, } from '@nice-devone/ui-controls';
import { Box, useTheme } from '@mui/material';
import CcfLabelControl from '../ccf-label-control/ccf-label-control';
import { CcfInteractionMenu } from '../ccf-interaction-menu/ccf-interaction-menu';
import CcfContactContentHeaderStyles from './ccf-contact-content-header-styles';
import { useDispatch, useSelector } from 'react-redux';
import { CcfAssignmentAction, getcustomerContactCustomFieldDefinitionsByCaseId } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { globalActions } from '../../global.app.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import CcfChatFingerprintUi from './ccf-chat-fingerprint-ui/ccf-chat-fingerprint-ui';
import { CcfDigitalStatusShared } from '../../ccf-disposition/shared/ccf-digital-status-shared';
const emailTopMarginBaseline = 4;
const subjectStyle = {
    font: 'normal normal 600 12px/12px open-sans',
    'white-space': 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingBottom: '.2em',
    marginTop: `${emailTopMarginBaseline}px`,
};
const subjectLabel = {
    font: 'normal normal 600 12px/12px open-sans',
    lineHeight: 1,
    width: '100%',
    marginTop: `${emailTopMarginBaseline}px`,
};
const colonStyle = {
    marginTop: `${emailTopMarginBaseline + 1}px`,
};
/**
 * Component to displays interaction space header's content
 * @returns Interaction space header's content
 * @example
 * ```
 * <CcfContactContentHeader {...headerContent}/>
 * ```
 */
export function CcfContactContentHeader(props) {
    var _a, _b, _c, _d, _e, _f;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const { contactDetail, activeContact, isDraftOBDigitalContact } = props;
    const customFields = (_b = (_a = contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.case) === null || _a === void 0 ? void 0 : _a.customFields) !== null && _b !== void 0 ? _b : [];
    const subject = ((contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.messages) && (contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.messages.length) > 0)
        ? contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.messages[0].title
        : '';
    const theme = useTheme();
    const themeStyles = CcfContactContentHeaderStyles(theme);
    const { wysiwygEnabled, isPrivate, hasVisibleTitle } = (_c = contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.channel) !== null && _c !== void 0 ? _c : {};
    const isContentSubHeaderVisible = wysiwygEnabled || isPrivate;
    const cxoneCustomFieldDefs = useSelector(getcustomerContactCustomFieldDefinitionsByCaseId(activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId));
    const [fingerPrintShow, setFingerPrintShow] = useState(LocalStorageHelper.getItem(StorageKeys.FINGERPRINT_SHOW) === 'true' || false);
    const noCxoneCustomFieldDefs = Boolean(cxoneCustomFieldDefs && cxoneCustomFieldDefs.length < 1);
    const [updatedCustomFieldsLength, setUpdatedCustomFieldsLength] = useState(0);
    const [CcfCustomerFields, setCcfCustomerFields] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '30%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    /**
     * function to handle when view/hide details is clicked
     * @example
     * ```
     * handleViewDetails()
     * ```
    */
    const handleViewDetails = () => {
        dispatch(globalActions.setViewDetailsClicked(true));
        dispatch(CcfAssignmentAction.toggleViewDetails({
            caseId: activeContact.caseId,
            interactionId: activeContact.interactionId,
        }));
    };
    /**
     * function to get the length of updatedCustomFields from child to this parent component
     * @example
     * ```
     * getUpdatedCustomFieldsLength(updatedCustomFieldsLengthVal: number)
     * ```
    */
    const getUpdatedCustomFieldsLength = (updatedCustomFieldsLengthVal) => {
        setUpdatedCustomFieldsLength(updatedCustomFieldsLengthVal);
    };
    /**
     * function to show fingerprint details when clicked
     * @example
     * ```
     * handleShowFingerPrintDetails()
     * ```
    */
    const handleShowFingerPrintDetails = () => {
        const updatedBoolean = !fingerPrintShow;
        setFingerPrintShow(updatedBoolean);
        LocalStorageHelper.setItem(StorageKeys.FINGERPRINT_SHOW, updatedBoolean.toString());
    };
    useEffect(() => {
        if (activeContact === null || activeContact === void 0 ? void 0 : activeContact.expandedViewDetails) {
            /**
            * lazily loaded the custom field component when we have active contact
            * @example renderCustomFields()
            */
            const renderCustomFields = () => __awaiter(this, void 0, void 0, function* () {
                const customFieldComponent = yield import('../ccf-custom-fields/ccf-custom-fields');
                const CustomFields = customFieldComponent === null || customFieldComponent === void 0 ? void 0 : customFieldComponent.CcfCustomFields;
                setCcfCustomerFields(_jsx(CustomFields, { customFields: customFields, cxoneCustomFieldDefs: cxoneCustomFieldDefs, getUpdatedCustomFieldsLength: getUpdatedCustomFieldsLength }, activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId));
            });
            renderCustomFields();
        }
    }, [activeContact, customFields, cxoneCustomFieldDefs]);
    const statusFormParams = {
        renderedInOutcomesPanel: false,
    };
    /**
     * @returns - Component for case status or just the status
     * @example - if feature toggle is on then we will return new component else just the status
     */
    const caseChangeComponentFT = () => {
        if (!isDraftOBDigitalContact) {
            // if the feature toggle is enabled and the contact is not an outbound digital contact in a draft state, we will return the new component
            return _jsx(CcfDigitalStatusShared, Object.assign({}, statusFormParams));
        }
        else {
            return _jsx("span", { children: translate(contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.status) });
        }
    };
    return (_jsxs(Box, Object.assign({ component: "div", sx: [
            themeStyles.bookmark,
            (activeContact === null || activeContact === void 0 ? void 0 : activeContact.expandedViewDetails) && updatedCustomFieldsLength > 10 ? themeStyles.customFieldScroll : null
        ] }, { children: [_jsxs(Box, Object.assign({ component: "div", sx: [
                    themeStyles.bookmarkContent,
                    themeStyles.sticky_bookmarkContent,
                    (activeContact === null || activeContact === void 0 ? void 0 : activeContact.expandedViewDetails) && themeStyles.sticky_bookmarkContent_border
                ] }, { children: [_jsxs(Box, Object.assign({ component: "div", sx: Object.assign(Object.assign({}, themeStyles.bookmarkContentHeader), { flexWrap: 'wrap', alignItems: 'center', gap: '4px' }), tabIndex: 0 }, { children: [isContentSubHeaderVisible && (_jsx(Box, Object.assign({ component: "span", sx: themeStyles.bookmarkContentSubHeader }, { children: wysiwygEnabled
                                    ? hasVisibleTitle && (_jsx(CcfTooltip, Object.assign({ title: subject }, { children: _jsx("span", { children: _jsx(CcfLabelControl, { label: "subject", value: subject, styles: { text: subjectStyle, label: subjectLabel, colon: colonStyle } }) }) })))
                                    : isPrivate && (_jsxs("span", { children: [_jsx(CcfTypography, Object.assign({ style: Object.assign(Object.assign({}, themeStyles.subjectLabel), { marginRight: '0.2em' }), variant: 'caption' }, { children: ((_e = (_d = contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.messages) === null || _d === void 0 ? void 0 : _d.length) === null || _e === void 0 ? void 0 : _e.toString()) || '0' })), _jsx(CcfTypography, { translationKey: 'messages', style: Object.assign({}, themeStyles.subjectLabel), variant: 'h5' })] })) }))), _jsxs(Box, Object.assign({ component: "span", sx: themeStyles.caseDetailWrapper }, { children: [isPrivate
                                        ? !wysiwygEnabled && (_jsx(Box, Object.assign({ component: "span", sx: themeStyles.channelTypeSubheader }, { children: _jsx(CcfTypography, { variant: "inherit", translationKey: 'private' }) })))
                                        : !wysiwygEnabled && (_jsx(Box, Object.assign({ component: "span", sx: themeStyles.channelTypeSubheader }, { children: _jsx(CcfTypography, { variant: "inherit", translationKey: 'public' }) }))), _jsx("span", { children: "|" }), _jsx("span", { children: `#${(_f = contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.case) === null || _f === void 0 ? void 0 : _f.id}` })] })), _jsx(Box, Object.assign({ component: "span" }, { children: caseChangeComponentFT() }))] })), _jsxs(Box, Object.assign({ component: 'div', sx: themeStyles.viewButtonContainer }, { children: [_jsx(CcfTooltip, Object.assign({ placement: 'top', arrow: true, title: noCxoneCustomFieldDefs ? translate('noDataAvailable') : '' }, { children: _jsxs(Box, Object.assign({ component: 'button', sx: noCxoneCustomFieldDefs ? Object.assign(Object.assign({}, themeStyles.viewButton), { opacity: '0.5' }) : Object.assign({}, themeStyles.viewButton), onClick: () => handleViewDetails(), disabled: noCxoneCustomFieldDefs, "aria-label": translate((activeContact === null || activeContact === void 0 ? void 0 : activeContact.expandedViewDetails) ? 'hideDetails' : 'viewDetails'), role: 'button', "aria-expanded": activeContact === null || activeContact === void 0 ? void 0 : activeContact.expandedViewDetails }, { children: [_jsx(CcfTypography, { translationKey: (activeContact === null || activeContact === void 0 ? void 0 : activeContact.expandedViewDetails) ? 'hideDetails' : 'viewDetails' }), _jsx(CcfDoubleArrowIcon, { style: { maxWidth: '0.6em' }, className: `${themeStyles.doubleArrowIcon} ${(activeContact === null || activeContact === void 0 ? void 0 : activeContact.expandedViewDetails) ? themeStyles.upArrow : ''}` })] })) })), _jsx(CcfInteractionMenu, { contactDetails: contactDetail, handleShowFingerPrintDetails: handleShowFingerPrintDetails, activeContactCaseId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, activeContactInteractionId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId })] }))] })), (activeContact === null || activeContact === void 0 ? void 0 : activeContact.expandedViewDetails) && CcfCustomerFields, fingerPrintShow &&
                _jsx(CcfChatFingerprintUi, { activeContact: activeContact, fingerPrintShow: fingerPrintShow })] })));
}
export default React.memo(CcfContactContentHeader);
//# sourceMappingURL=ccf-contact-content-header.js.map