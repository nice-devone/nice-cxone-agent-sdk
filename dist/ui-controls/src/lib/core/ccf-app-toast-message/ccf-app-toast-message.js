import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CcfAppToastMessageStyles from './ccf-app-toast-message.styles';
import { Box, useTheme, LinearProgress } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { CcfTypography } from '../ccf-typography/ccf-typography';
import CcfButton from '../ccf-button/ccf-button';
import { useTranslator } from '../../../../../ui-controls/src/index';
/***
 * @example Use three type of containers to load this component
 * ie. AppToastContainer - container to load toast message at application level
 *     ComponentToastContainer - container to load toast message at component level
 *     ToolTipToastContainer - container to show toast message as tooltip
 */
export function CcfAppToastMessage(props) {
    const { titleKey, type, messageKey, descriptionKey, descriptionMessage, primaryBtnText, secondaryBtnText, extraArgs, children, naturalCallingSkillListParams, isLoading, isIndeterminate, loadingValue } = props;
    let titleMessage = props.titleMessage;
    const theme = useTheme();
    const classes = CcfAppToastMessageStyles(theme);
    const [translate] = useTranslator();
    if (naturalCallingSkillListParams === null || naturalCallingSkillListParams === void 0 ? void 0 : naturalCallingSkillListParams.translateDialerMessages) {
        titleMessage = (naturalCallingSkillListParams === null || naturalCallingSkillListParams === void 0 ? void 0 : naturalCallingSkillListParams.emptyList) ? translate('naturalCallingListIsEmpty') : translate('naturalCallingListRunningLow');
    }
    /**
     * @example primary button click handler
     */
    const primaryBtnClickHandler = () => {
        props.triggerPrimaryHandler && props.triggerPrimaryHandler();
    };
    /**
     * @example secondary button click handler
     */
    const secondaryBtnClickHandler = () => {
        props.triggerSecondaryHandler && props.triggerSecondaryHandler();
    };
    return (_jsxs(Box, Object.assign({ sx: classes.toastMessage, className: type }, { children: [titleKey && _jsxs("div", Object.assign({ className: 'titleText' }, { children: [" ", _jsx(CcfTypography, { translationKey: titleKey, variant: 'h4' })] })), _jsxs("div", Object.assign({ className: 'text' }, { children: [_jsx(CcfTypography, Object.assign({ sx: visuallyHidden, translationKey: messageKey, extraArgs: extraArgs, "aria-live": 'assertive', role: 'alert' }, { children: titleMessage })), _jsx(CcfTypography, Object.assign({ sx: type === 'agentMessage'
                            ? classes.text
                            : {}, translationKey: messageKey, variant: 'body1', variantMapping: { 'body1': 'span' }, extraArgs: extraArgs, "aria-hidden": true }, { children: titleMessage }))] })), isLoading &&
                _jsx(Box, Object.assign({ sx: { width: '100%' } }, { children: !isIndeterminate ? _jsx(LinearProgress, { variant: "determinate", value: loadingValue }) : _jsx(LinearProgress, {}) })), _jsx("div", Object.assign({ className: 'subMessageText' }, { children: descriptionMessage
                    ? _jsx(CcfTypography, { sx: type === 'agentMessage'
                            ? classes.subText
                            : {}, dangerouslySetInnerHTML: { __html: descriptionMessage }, variant: 'h6' })
                    : _jsx(CcfTypography, { translationKey: descriptionKey, variant: 'h6' }) })), children, _jsxs(Box, Object.assign({ className: 'confimationBtn', sx: Object.assign(Object.assign(Object.assign({}, (type === 'warning logoutConfirmationPanel'
                    ? classes.logoutConfirmationPanel
                    : {})), (type.indexOf('alignButtonsRight', 0) > 0
                    ? classes.alignButtonsRight
                    : {})), (type.indexOf('primaryButtonAlertBackground', 0) > 0
                    ? classes.primaryButtonAlertBackground
                    : {})) }, { children: [primaryBtnText && _jsx(CcfButton, Object.assign({ className: 'primaryBtn', sx: [
                            type.indexOf('centerButton', 0) > 0
                                ? classes.primaryBtn
                                : {}
                        ], onClick: () => primaryBtnClickHandler(), variant: "contained", size: "small", primary: true, autoFocus: true, "data-testid": 'primary-button-click' }, { children: _jsx(CcfTypography, { variant: 'h5', translationKey: primaryBtnText }) })), secondaryBtnText && _jsx(CcfButton, Object.assign({ sx: type === 'agentMessage' ? classes.secondaryButton : {}, onClick: () => secondaryBtnClickHandler(), variant: "contained", size: "small", "data-testid": 'secondary-button-click' }, { children: _jsx(CcfTypography, { variant: 'h5', translationKey: secondaryBtnText }) }))] }))] })));
}
export default CcfAppToastMessage;
//# sourceMappingURL=ccf-app-toast-message.js.map