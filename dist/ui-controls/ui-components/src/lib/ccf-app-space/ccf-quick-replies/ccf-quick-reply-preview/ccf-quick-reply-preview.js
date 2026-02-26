import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, useTheme, useMediaQuery, CircularProgress, InputLabel, TextField } from '@mui/material';
import parse, { Element } from 'html-react-parser';
import { CcfBackIcon, CcfBox, CcfButton, CcfFavouriteIcon, CcfTypography, useTranslator, CCfToggleIconButton, CcfUnfavoredIcon, isFeatureEnabled, } from '@nice-devone/ui-controls';
import { getSelectedQReply, updateIsQReplySent, updatePreviewQuickReply, updateSentQReply, getVarReplacedContent, resetVarReplacedContent, updateSelectedQReply, getLoadingStatus, setFavQuickReplies, getFavQReplies, sendDirectMessageFromPreview, } from '../../ccf-app-space.slice';
import { DigitalMessageContentTypes, MediaType } from '@nice-devone/common-sdk';
import { globalActions } from '../../../global.app.slice';
import { Navigation } from '../../../../enums/navigation-menus';
import ccfQuickRepliesPreviewStyles from './ccf-quick-reply-preview.styles';
import CcfQuickReplyRichTimePickerPreview from './ccf-qr-rich-time-picker-preview';
import { getActiveContactInSelectedInteraction, getDigitalContactDetailsByCaseId } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { toggleFavoriteQuickReply } from '../ccf-quick-replies.util';
/**
 * CcfQuickReplyPreview - used to display selected reply card
 * @example - <CcfQuickReplyPreview />
 */
const CcfQuickReplyPreview = () => {
    var _a, _b, _c;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const selectedReply = useSelector(getSelectedQReply);
    // Used below selection logic as it is followed from Elevation Refactoring implementation
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const selectedDigitalContact = activeContactInSelectedInteraction && activeContactInSelectedInteraction.media === MediaType.DIGITAL ? activeContactInSelectedInteraction : undefined;
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(selectedDigitalContact === null || selectedDigitalContact === void 0 ? void 0 : selectedDigitalContact.caseId, selectedDigitalContact === null || selectedDigitalContact === void 0 ? void 0 : selectedDigitalContact.interactionId));
    const isTimePickerReply = ((_a = selectedReply === null || selectedReply === void 0 ? void 0 : selectedReply.messageContent) === null || _a === void 0 ? void 0 : _a.type) === DigitalMessageContentTypes.TIME_PICKER;
    const isSecureFormRichMessage = ((_b = selectedReply === null || selectedReply === void 0 ? void 0 : selectedReply.messageContent) === null || _b === void 0 ? void 0 : _b.type) === DigitalMessageContentTypes.FORM;
    const isVarReplaced = !useSelector(getLoadingStatus);
    const favQuickReplies = useSelector(getFavQReplies);
    const [variableFieldState, setVariableFieldState] = React.useState({});
    const [error, setError] = React.useState(true);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const autoVarReplacedContent = useSelector(getVarReplacedContent);
    const [editableVarContent, setEditableVarContent] = useState('');
    const [placeHolderArray, setPlaceHolderArray] = useState([]);
    const [isSelectedReplyFav, setIsSelectedReplyFav] = useState(false);
    const { setSelectedMenu } = globalActions;
    const isFirstRender = useRef(true);
    const previewStyles = ccfQuickRepliesPreviewStyles(theme, placeHolderArray === null || placeHolderArray === void 0 ? void 0 : placeHolderArray.length);
    const isUnifiedQRFeatureEnabled = isFeatureEnabled("release-cx-agent-quick-response-unification-AW-28770" /* FeatureToggles.QUICK_RESPONSE_UNIFICATION_FEATURE_TOGGLE */);
    const backBtnRef = useRef(null);
    /**
     * goToAllReplies - go back to all replies from preview reply panel
     * @example - goToAllReplies(e)
     */
    const goToAllReplies = (goToHome = true) => {
        dispatch(updatePreviewQuickReply(false));
        isSmView && goToHome && dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
        dispatch(resetVarReplacedContent());
    };
    /**
     * eventHandler to call onReplySend when 'Enter' button is clicked
     * @param e -?- React.KeyboardEvent
     * @example -  handleEnter(e)
     */
    const handleEnter = (e) => {
        if (e.nativeEvent.key === 'Enter' && e.nativeEvent.keyCode === 13) {
            !error && onReplySend();
        }
    };
    /**
     * eventHandler to update the variableField state on event chnage
     * @param e -?- React.SyntheticEvent
     * @example -  handleFieldChange(e)
     */
    const handleFieldChange = (e, placeholder) => {
        e.preventDefault();
        if (e.target.value) {
            setVariableFieldState((prevState) => {
                return Object.assign(Object.assign({}, prevState), { [placeholder]: {
                        value: e.target.value,
                        isError: false,
                    } });
            });
        }
        else {
            setVariableFieldState((prevState) => {
                return Object.assign(Object.assign({}, prevState), { [placeholder]: {
                        value: e.target.value,
                        isError: true,
                    } });
            });
        }
        return;
    };
    /**
    * Used to send selected reply to respective media interaction
    * @param event -? -React.SyntheticEvent
    * @example - onReplySend()
    */
    const onReplySend = () => {
        const qReplyContent = selectedReply.content;
        const temp = [];
        temp[0] = qReplyContent;
        const qReplyContentArr = qReplyContent.match(/{(.*?)}/g);
        if (qReplyContentArr) {
            qReplyContentArr.forEach((str, i) => {
                temp[i + 1] = temp[i].replace(str, variableFieldState[str.replace(/\s/g, '')].value);
            });
        }
        if (qReplyContent) {
            dispatch(updateSentQReply(temp[temp.length - 1]));
            dispatch(updateIsQReplySent(true));
            goToAllReplies();
            setTimeout(() => {
                dispatch(updateIsQReplySent(false));
            }, 250);
        }
    };
    useEffect(() => {
        if (favQuickReplies.length) {
            const match = favQuickReplies.filter(qr => qr.id === selectedReply.id);
            match.length ? setIsSelectedReplyFav(true) : setIsSelectedReplyFav(false);
        }
        else {
            setIsSelectedReplyFav(false);
        }
    }, [favQuickReplies.length]);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setError(Object.values(variableFieldState).some((elem) => !elem.value));
    }, [variableFieldState]);
    useEffect(() => {
        requestAnimationFrame(() => {
            var _a;
            (_a = backBtnRef === null || backBtnRef === void 0 ? void 0 : backBtnRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        });
    }, []);
    useEffect(() => {
        if (editableVarContent) {
            const nodeList = document.querySelectorAll('.editableVar');
            let temp = {};
            if ((placeHolderArray === null || placeHolderArray === void 0 ? void 0 : placeHolderArray.length) && nodeList.length) {
                for (let i = 0; i < nodeList.length; i++) {
                    if (placeHolderArray[i]) {
                        nodeList[i].getElementsByTagName('input')[0].setAttribute('placeholder', placeHolderArray[i].replace(/[{}]/g, ''));
                        const placeholderKey = placeHolderArray[i].replace(/\s/g, ''); //regex to replace white spaces
                        temp = Object.assign(Object.assign({}, temp), { [placeholderKey]: {
                                value: '',
                                isError: false,
                            } });
                    }
                }
            }
            setVariableFieldState(temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editableVarContent]);
    useEffect(() => {
        const temp = [];
        temp[0] = autoVarReplacedContent === null || autoVarReplacedContent === void 0 ? void 0 : autoVarReplacedContent.content;
        if (placeHolderArray && placeHolderArray.length) {
            [...new Set(placeHolderArray)].forEach((str, i) => {
                temp[i + 1] = temp[i]
                    .split(str)
                    .join(`<div className="placeholder"><TextField placeholder=${str.replace(/\s/g, '')} /></div>`);
            });
        }
        setEditableVarContent(temp[temp.length - 1]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placeHolderArray]);
    useEffect(() => {
        if (autoVarReplacedContent === null || autoVarReplacedContent === void 0 ? void 0 : autoVarReplacedContent.content) {
            dispatch(updateSelectedQReply(Object.assign(Object.assign({}, selectedReply), { content: autoVarReplacedContent.content })));
            setPlaceHolderArray(autoVarReplacedContent.content.match(/{(.*?)}/g));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoVarReplacedContent]);
    /**
     * Function to get quick reply template when  isTimePickerReply is false
     
     * ```
     * @example
     * getQuickReplyFields
     * ```
     */
    const getQuickReplyFields = () => {
        return !isVarReplaced
            ? _jsx(CcfBox, Object.assign({ sx: previewStyles.loader }, { children: _jsx(CircularProgress, {}) }))
            : _jsxs(CcfBox, Object.assign({ sx: previewStyles.replyBodySection }, { children: [_jsx(CcfTypography, Object.assign({ sx: previewStyles.replyContentBody }, { children: _jsx(VariableParser, { editableVarContent: editableVarContent, variableFieldState: variableFieldState, previewStyles: previewStyles }) })), _jsx(CcfBox, Object.assign({ sx: previewStyles.inputContainer }, { children: (placeHolderArray === null || placeHolderArray === void 0 ? void 0 : placeHolderArray.length) > 0 &&
                            [...new Set(placeHolderArray)].map((placeholder, index) => {
                                var _a, _b;
                                // constant for the custom text input field label
                                const customFieldLabel = placeholder.replace(/[{}]/g, '');
                                return (_jsxs(_Fragment, { children: [_jsx(InputLabel, Object.assign({ sx: previewStyles.label }, { children: customFieldLabel })), _jsx(TextField, { className: "editableVar", size: "small", variant: "outlined", value: (_a = variableFieldState[placeholder]) === null || _a === void 0 ? void 0 : _a.value, required: true, "data-testid": `handle-field-${index}`, onChange: (e) => handleFieldChange(e, placeholder), onBlur: (e) => handleFieldChange(e, placeholder), onKeyUp: (e) => handleEnter(e), error: (_b = variableFieldState[placeholder]) === null || _b === void 0 ? void 0 : _b.isError, sx: previewStyles.input, inputProps: {
                                                maxLength: 255,
                                                'aria-label': `${translate('insert')} ${customFieldLabel}`,
                                            } })] }));
                            }) }))] }));
    };
    /**
     * Function to send the quick reply directly without inserting into editor input box
     * @example - directSendWithoutInsert()
     */
    const directSendWithoutInsert = () => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const directQuickResponseReply = {
            contactDetails: selectedDigitalContactDetails,
            richMessageDetails: { messageContent: selectedReply === null || selectedReply === void 0 ? void 0 : selectedReply.messageContent },
            customerName: (_d = selectedDigitalContact === null || selectedDigitalContact === void 0 ? void 0 : selectedDigitalContact.customerName) !== null && _d !== void 0 ? _d : selectedDigitalContactDetails.customerName,
        };
        yield dispatch(sendDirectMessageFromPreview(directQuickResponseReply));
        goToAllReplies();
    });
    /**
     * Function to narrate favorite option for selected quick response card
     * @example narrationForFavorite()
     */
    const narrationForFavoriteQR = () => {
        return (selectedReply === null || selectedReply === void 0 ? void 0 : selectedReply.isFavorite) ? `${translate('remove')} ${selectedReply.title} ${translate('card')} ${translate('from')} ${translate('favorites')}` : `${translate('add')} ${selectedReply.title} ${translate('card')} ${translate('to')} ${translate('favorites')}`;
    };
    return (_jsxs(CcfBox, Object.assign({ sx: previewStyles.replyCardWrapper }, { children: [_jsxs(CcfBox, Object.assign({ sx: previewStyles.backSection, "data-testid": "on-Reply-Send", onClick: () => goToAllReplies(false) }, { children: [_jsx(IconButton, Object.assign({ ref: backBtnRef, "aria-label": translate('goBackToQRMenu'), disableRipple: true, sx: Object.assign(Object.assign(Object.assign({}, previewStyles === null || previewStyles === void 0 ? void 0 : previewStyles.focussedElement), previewStyles === null || previewStyles === void 0 ? void 0 : previewStyles.hoveredElement), previewStyles.backBtn) }, { children: _jsx(CcfBackIcon, { sx: previewStyles.backIcon }) })), _jsx(CcfTypography, Object.assign({ sx: previewStyles.breadcrumbLabel }, { children: translate('allQReplies') }))] })), _jsxs(CcfBox, Object.assign({ sx: previewStyles.replyCardInfo }, { children: [_jsx(CcfTypography, Object.assign({ sx: previewStyles.replyTitle }, { children: selectedReply.title })), _jsx(CCfToggleIconButton, { sx: Object.assign(Object.assign({}, previewStyles === null || previewStyles === void 0 ? void 0 : previewStyles.focussedElement), previewStyles === null || previewStyles === void 0 ? void 0 : previewStyles.hoveredElement), "data-testid": "toggle-icon", onClick: () => {
                            if (isUnifiedQRFeatureEnabled) {
                                dispatch(toggleFavoriteQuickReply({
                                    quickReplyId: selectedReply.id,
                                    markAsFavorite: (selectedReply === null || selectedReply === void 0 ? void 0 : selectedReply.isFavorite) ? false : true,
                                    selectedReply,
                                }));
                            }
                            else {
                                dispatch(setFavQuickReplies(Object.assign(Object.assign({}, selectedReply), { isfavorite: isSelectedReplyFav })));
                            }
                        }, icon: _jsx(CcfFavouriteIcon, { id: 'quickReplyFavoriteIcon', sx: previewStyles.favReply }), toggleIcon: _jsx(CcfUnfavoredIcon, { id: 'quickReplyToggleFavoriteIcon' }), isToggled: isUnifiedQRFeatureEnabled ? selectedReply === null || selectedReply === void 0 ? void 0 : selectedReply.isFavorite : isSelectedReplyFav, size: "small", "aria-label": narrationForFavoriteQR(), disableRipple: true })] })), isTimePickerReply &&
                _jsx(CcfQuickReplyRichTimePickerPreview, { goToAllReplies: goToAllReplies, selectedReply: selectedReply }), isSecureFormRichMessage &&
                _jsx(CcfBox, Object.assign({ "data-testid": "secure-form-link" }, { children: _jsx(CcfTypography, Object.assign({ sx: previewStyles.secureFormLinkText }, { children: (_c = selectedReply === null || selectedReply === void 0 ? void 0 : selectedReply.messageContent) === null || _c === void 0 ? void 0 : _c.fallbackText })) })), !isTimePickerReply
                ?
                    getQuickReplyFields()
                : _jsx(_Fragment, {}), !isTimePickerReply && !isSecureFormRichMessage &&
                _jsx(CcfBox, Object.assign({ display: "flex", sx: previewStyles.sendButtonBox }, { children: _jsx(CcfButton, Object.assign({ primary: true, disabled: error, "data-testid": "on-Reply-Send-insert", onClick: onReplySend, disableRipple: true, sx: Object.assign({}, previewStyles === null || previewStyles === void 0 ? void 0 : previewStyles.focussedElement) }, { children: translate('insert') })) })), isSecureFormRichMessage &&
                _jsx(CcfBox, Object.assign({ display: "flex", sx: previewStyles.formSendButtonBox }, { children: _jsx(CcfButton, Object.assign({ primary: true, disableRipple: true, "data-testid": "direct-send-no-insert", onClick: directSendWithoutInsert }, { children: translate('send') })) }))] })));
};
export default CcfQuickReplyPreview;
/**
 * Function to parse the text field variable
 * @param editableVarContent -  editable variable content with string value
 * @param variableFieldState -  variable field state with string key-value pairs
 * @param previewStyles -  style theme
 * @example -
 * ```
 * VariableParser(editableVarContent,variableFieldState,previewStyles)
 * ```
 */
const VariableParser = ({ editableVarContent, variableFieldState, previewStyles }) => {
    /**
     * Function to return text field component
     * @param domNode - domnode structure
     * @example -
     * ```
     * replaceVariable(domNode)
     * ```
     */
    const replaceVariable = (domNode) => {
        var _a;
        if (domNode instanceof Element && domNode.name === 'textfield') {
            return (_jsx(CcfBox, Object.assign({ component: "div", sx: previewStyles.editableVarFieldContainer }, { children: _jsx(TextField, { className: "editableVar", size: "small", variant: "outlined", value: (_a = variableFieldState[domNode.attribs.placeholder]) === null || _a === void 0 ? void 0 : _a.value, disabled: true }) })));
        }
        return undefined; // Explicitly return undefined for other cases
    };
    return _jsx(CcfBox, { children: parse(editableVarContent, { replace: replaceVariable }) });
};
//# sourceMappingURL=ccf-quick-reply-preview.js.map