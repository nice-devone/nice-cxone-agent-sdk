import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { CcfBackIcon, CcfButton, CcfTypography, useTranslator, CcfTextField, CcfBox, CcfPdfTemplatePreview } from '@nice-devone/ui-controls';
import { useTheme, InputLabel, IconButton, useMediaQuery, Box } from '@mui/material';
import CcfOutboundTemplatePreviewStyle from './ccf-outbound-template-preview.style';
import { updatePreviewOutboundTemplate } from '../../../ccf-app-space.slice';
import { globalActions } from '../../../../global.app.slice';
import { Navigation } from '../../../../../enums/navigation-menus';
import { useDispatch, useSelector } from 'react-redux';
import { sendOBMessageTemplate, OBMessageTemplateActions, getSelectedTemplateDetails, updateSelectedMessageTemplate, getIsTemplateSent, updateIsTemplateSent, getTemplateEditableContent, } from './ccf-outbound-template-preview.slice';
import { getDigitalContactDetailsByCaseId, getNonIncomingActiveContactInSelectedInteraction, CcfAssignmentAction, } from '../../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { DigitalContactStatus, DigitalMessageContentTypes, MultimediaTypes } from '@nice-devone/common-sdk';
import parse, { Element } from 'html-react-parser';
import { useThrottleClick } from '../../../../../hooks/useThrottleClick';
const TIMER_DELAY = 2000;
/**
 * CcfOutboundTemplatePreview - used to preview outbound template
 * @param props -?-CcfOutboundTemplatePreview
 * @example <CcfOutboundTemplatePreview />
 */
export function CcfOutboundTemplatePreview() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const theme = useTheme();
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = CcfOutboundTemplatePreviewStyle(theme);
    const { setSelectedMenu } = globalActions;
    const selectedTemplate = useSelector(getSelectedTemplateDetails);
    const templateEditableContent = useSelector(getTemplateEditableContent);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const isTemplateSent = useSelector(getIsTemplateSent);
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const templateType = (_c = (_b = (_a = selectedTemplate === null || selectedTemplate === void 0 ? void 0 : selectedTemplate.messageContent) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.elements[0]) === null || _c === void 0 ? void 0 : _c.type;
    const supportedImageTypes = [
        MultimediaTypes.IMAGE_JPEG,
        MultimediaTypes.IMAGE_JPG,
        MultimediaTypes.IMAGE_PNG
    ];
    useEffect(() => {
        return () => {
            backToTemplateList(false);
        };
    }, []);
    useEffect(() => {
        var _a;
        if (isTemplateSent) {
            backToTemplateList();
            if (((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _a === void 0 ? void 0 : _a.status) === DigitalContactStatus.DRAFT) {
                setTimeout(() => {
                    dispatch(CcfAssignmentAction.removeCXoneDigitalContact({
                        interactionId: selectedDigitalContactDetails.interactionId,
                        contactId: selectedDigitalContactDetails.caseId,
                    }));
                }, 2000);
            }
        }
        dispatch(updateIsTemplateSent(false));
    }, [isTemplateSent]);
    /**
     * Function to change selected variable value
     * @param event -  React.ChangeEvent<HTMLInputElement>
     * @example - onVariableChange(e)
     */
    const onVariableChange = (event, elementId) => {
        if (selectedTemplate && elementId && event) {
            const variableDetails = {
                key: event.target.name,
                value: event.target.value,
                elementId: elementId,
            };
            dispatch(OBMessageTemplateActions.updateTemplateVariables(variableDetails));
        }
    };
    /**
     * Function to handle send button click
     * @example - onSendButtonClick()
     */
    const onSendButtonClick = useThrottleClick(() => {
        var _a, _b;
        const replyDetails = {
            contactDetails: selectedDigitalContactDetails,
            messageContent: selectedTemplate.messageContent,
            customerName: (_a = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.customerName) !== null && _a !== void 0 ? _a : selectedDigitalContactDetails.customerName,
            elevatedInteractionId: selectedDigitalContactDetails.interactionId,
            elevatedFrom: (_b = selectedDigitalContactDetails.fromProvider) !== null && _b !== void 0 ? _b : '',
        };
        dispatch(sendOBMessageTemplate(replyDetails));
    }, TIMER_DELAY);
    /**
     * Function to navigate back template list
     * @param goToHome -  got to home page or not
     * @example - backToTemplateList()
     */
    const backToTemplateList = (goToHome = true) => {
        dispatch(updatePreviewOutboundTemplate(false));
        dispatch(updateSelectedMessageTemplate({}));
        isSmView && goToHome && dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
    };
    /**
     * Type guard function to check if a value is a MultimediaTypes enum member
     * @param type - multimedia type value to check
     * @returns boolean value
     * @example - isMultimediaType('image/jpeg')
     */
    const isMultimediaType = (type) => Object.values(MultimediaTypes).includes(type);
    return (_jsxs(CcfBox, Object.assign({ sx: styles.templateWrapper }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.backSection, onClick: () => backToTemplateList(false) }, { children: [_jsx(IconButton, Object.assign({ sx: styles.navigateBackButton }, { children: _jsx(CcfBackIcon, { sx: styles.backIcon }) })), _jsx(CcfTypography, Object.assign({ sx: styles.messageTemplate }, { children: translate('msgTemplates') }))] })), _jsx(CcfBox, Object.assign({ sx: styles.templateHeading }, { children: selectedTemplate.template })), _jsx(CcfBox, Object.assign({ sx: styles.bodySection }, { children: _jsx("form", { children: (_j = (templateType === DigitalMessageContentTypes.MENU
                        ? (_f = (_e = (_d = selectedTemplate === null || selectedTemplate === void 0 ? void 0 : selectedTemplate.messageContent) === null || _d === void 0 ? void 0 : _d.payload) === null || _e === void 0 ? void 0 : _e.elements[0]) === null || _f === void 0 ? void 0 : _f.elements
                        : (_h = (_g = selectedTemplate === null || selectedTemplate === void 0 ? void 0 : selectedTemplate.messageContent) === null || _g === void 0 ? void 0 : _g.payload) === null || _h === void 0 ? void 0 : _h.elements)) === null || _j === void 0 ? void 0 : _j.map((element, index) => (_jsx(Box, { children: templateType === DigitalMessageContentTypes.MENU && index === 0 ? (_jsxs(Box, Object.assign({ sx: styles.mediaContainer }, { children: [(element === null || element === void 0 ? void 0 : element.mimeType) === MultimediaTypes.VIDEO_MP4 && (_jsxs("video", Object.assign({ controls: true, style: Object.assign({}, styles.multimediaControls) }, { children: [_jsx("track", { kind: "captions", src: "", srcLang: "en", label: "English", default: true }), _jsx("source", { src: element.url, type: MultimediaTypes.VIDEO_MP4 })] }))), isMultimediaType(element === null || element === void 0 ? void 0 : element.mimeType) && supportedImageTypes.includes(element === null || element === void 0 ? void 0 : element.mimeType) && (_jsx("img", { src: element.url, alt: element.filename, style: Object.assign({}, styles.multimediaControls) })), (element === null || element === void 0 ? void 0 : element.mimeType) === MultimediaTypes.PDF && (_jsx(CcfPdfTemplatePreview, { sourceUrl: element.url || '', fileName: element.filename || '', isPreview: true }))] }))) : (_jsxs(CcfBox, Object.assign({ id: element.id }, { children: [_jsx(CcfBox, Object.assign({ sx: styles.payloadStyle }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.replyContentBody }, { children: _jsx(TextFieldVariableParser, { templateEditableContent: templateEditableContent, elementId: element === null || element === void 0 ? void 0 : element.id, elementVariables: element === null || element === void 0 ? void 0 : element.variables, styles: styles }) })) })), (element === null || element === void 0 ? void 0 : element.variables) &&
                                    Object.keys(element.variables).map((variableKey, index) => (_jsx(CcfBox, Object.assign({ sx: styles.templateBox, id: variableKey }, { children: _jsxs(CcfBox, { children: [_jsx(InputLabel, Object.assign({ sx: styles.templateVariable }, { children: `${variableKey}.` })), _jsx(CcfTextField, { sx: styles.variableEditor, "data-testid": "template-variable-label", id: "outlined-basic", variant: "outlined", margin: "normal", size: "small", name: variableKey, onChange: (event) => onVariableChange(event, element.id ? element === null || element === void 0 ? void 0 : element.id : ''), onKeyDown: (e) => {
                                                        e.key === 'Enter' && e.preventDefault();
                                                    }, defaultValue: (element === null || element === void 0 ? void 0 : element.variables) ? Object.values(element === null || element === void 0 ? void 0 : element.variables)[index] : '' })] }) }), variableKey)))] }), element.id)) }, 'parent' + element.id))) }) })), _jsx(CcfBox, Object.assign({ display: "flex", sx: styles.sendButton }, { children: _jsx(CcfButton, Object.assign({ primary: true, size: "small", onClick: onSendButtonClick }, { children: translate('send') })) }))] })));
}
export default CcfOutboundTemplatePreview;
/**
 * Function to parse the text field variable
 * @param templateEditableContent -  template content with string key-value pairs
 * @param elementId -  element id
 * @param elementVariables -  set of variable that may be used in the template
 * @param styles -  style theme
 * @example -
 * ```
 * TextFieldVariableParser(templateEditableContent,elementId,elementVariables,styles)
 * ```
 */
const TextFieldVariableParser = ({ templateEditableContent, elementId, elementVariables, styles }) => {
    /**
     * Function to return text field component
     * @param domNode - domnode structure
     * @example -
     * ```
     * replaceVariable(domNode)
     * ```
     */
    const replaceVariable = (domNode) => {
        var _a, _b, _c;
        if (domNode instanceof Element && domNode.name === 'textfield') {
            const variableKey = (_b = (_a = domNode === null || domNode === void 0 ? void 0 : domNode.attribs) === null || _a === void 0 ? void 0 : _a.placeholder) === null || _b === void 0 ? void 0 : _b.replace(/[{}]/g, '');
            return (_jsx(CcfBox, Object.assign({ component: "div", sx: styles.editableVarFieldContainer }, { children: _jsx(CcfTextField, { className: "editableVar", size: "small", variant: "outlined", id: "outlined-basic", value: elementVariables ? elementVariables[variableKey] : '', disabled: true, placeholder: (_c = domNode === null || domNode === void 0 ? void 0 : domNode.attribs) === null || _c === void 0 ? void 0 : _c.placeholder }) })));
        }
        return undefined; // Explicitly return undefined for other cases
    };
    return _jsx(CcfBox, { children: Object.keys(templateEditableContent || {}).length > 0 && (() => {
            var _a;
            const parsedContent = (_a = templateEditableContent[elementId]) === null || _a === void 0 ? void 0 : _a.replace(/\n/g, '<br/>');
            return parse(parsedContent, { replace: replaceVariable });
        })() });
};
//# sourceMappingURL=ccf-outbound-template-preview.js.map