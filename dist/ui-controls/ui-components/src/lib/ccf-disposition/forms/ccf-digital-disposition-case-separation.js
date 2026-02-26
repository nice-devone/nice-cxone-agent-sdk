import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, TextField, Stack, Box, useTheme, Tooltip, } from '@mui/material';
import { DigitalContactStatus, AgentAssistCommand, DispositionConstants, AgentAssistConfigACPParamsKeys, AutoSummaryErrorCode } from '@nice-devone/common-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { getDispositionData, dispositionInteractionActions } from '../ccf-disposition-slice';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfButton, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import CcfDispositionStyles from '../ccf-disposition.styles';
import CcfAutoSummaryProgressBar from '../../ccf-autosummary-progress-bar/ccf-autosummary-progress-bar';
import CcfAutoSummaryChip from './ccf-auto-summary-chip';
import { useEffect, useRef, memo, useState, useMemo } from 'react';
import { getFinalSummaryNotes, getIsFinalSummaryGenerated, isCopilotEnabledForContact, isAgentAssistConfigParamsEnabledForContact } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { CcfDigitalStatusShared } from './../shared/ccf-digital-status-shared';
import { ValidationUtils } from '@nice-devone/core-sdk';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { useAutoSummary } from './useAutoSummary';
const cxoneClientInstance = CXoneClient.instance;
const DefaultDispositionOption = { dispositionName: '' }; // used to set the empty value for the disposition drop down
// Todo: need to highlight what the previous status was until we have clicked save button
/**
 * Component displays Digital Disposition
 * @param formData - formData of currently selected status
 * @param isResolved - boolean to disable dropdown if dispostion is already concluded
 * @returns displays digital disposition status dropdown
 * @example <CcfDigitalDispositionCaseSeparation />
 */
const CcfDigitalDispositionCaseSeparation = ({ formData, isResolved, onClickSaveButton, isSaveDisabled }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const dispositionData = useSelector(getDispositionData);
    const [translate] = useTranslator();
    let dispositionOptions = [];
    const theme = useTheme();
    const digitalStatusRef = useRef(null);
    const dispositionStyles = CcfDispositionStyles(theme);
    const textAreaRef = useRef(null);
    const selectedCaseId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId;
    const autoSummaryEnabledForCurrentContact = !!(selectedCaseId && ((_a = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts) === null || _a === void 0 ? void 0 : _a.includes(selectedCaseId)));
    const formInputs = selectedCaseId ? (_b = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions) === null || _b === void 0 ? void 0 : _b[selectedCaseId].formInputs : null;
    const activeContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const isDigitalContactClosed = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactStatus) === DigitalContactStatus.CLOSED;
    const [isShortWindow, setIsShortWindow] = useState(false);
    let activeDisposition = {};
    let showAutoSummaryProgressBar = false;
    let numberOfRowsForNotes = 4;
    const { setFormInput } = dispositionInteractionActions;
    const [userDeletedNotes, setUserDeletedNotes] = useState(false);
    const validationUtils = new ValidationUtils();
    // hook for auto summary retry functionality
    const { handleRetry, isCoolingDown, attemptCount, retryCountdown, maxRetryCount } = useAutoSummary(activeContact);
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const aahConfiguration = getAgentAssistConfig === null || getAgentAssistConfig === void 0 ? void 0 : getAgentAssistConfig(`${activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId}`, true);
    const { Params } = aahConfiguration || {};
    const autoSummaryToOutcomePanel = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL));
    useEffect(() => {
        if (digitalStatusRef.current) {
            digitalStatusRef.current.focus();
        }
    }, []);
    useEffect(() => {
        /**
       * Function to allow styling changes when window height is short.
       * @example - handleTextAreaResize
       */
        const handleResize = () => {
            const { innerHeight: height } = window;
            setIsShortWindow(height <= 650);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });
    if (nonIncomingActiveContactInSelectedInteraction !== undefined && selectedCaseId &&
        dispositionData.dispositions[selectedCaseId] !== undefined &&
        nonIncomingActiveContactInSelectedInteraction.skillOrQueueName !== undefined) {
        dispositionOptions =
            dispositionData.dispositions[selectedCaseId].dispositionData;
        activeDisposition = dispositionData.dispositions[selectedCaseId];
        if (autoSummaryEnabledForCurrentContact) {
            showAutoSummaryProgressBar = ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryStatus) === AgentAssistCommand.subscribed || ((_c = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent) !== null && _c !== void 0 ? _c : true))
                && !(activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasAutoSummaryTimedOut) && (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryStatus) !== AgentAssistCommand.message;
            numberOfRowsForNotes = 8;
            dispositionStyles.dispositionTextarea.height = '160px';
        }
    }
    const statusFormParams = {
        activeContact: activeContact || undefined,
        activeDisposition: activeDisposition,
        autoSummaryEnabledForCurrentContact,
        digitalStatusRef,
        formData,
        isDigitalContactClosed,
        isResolved,
    };
    /**
     * "showMandatoryIndication" flag will decide when to show Disposition mandatory message with red border on the disposition dropdown
     * the condition will be true when the disposition is required and disposition in not selected in the dropdown
     * for Preview contacts, it will not be shown because Disposition is restricted for this flow
     **/
    const showMandatoryIndication = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.isAssignedToAgentInbox) && (formInputs && formInputs.requireDisposition && !(Object.keys((formInputs === null || formInputs === void 0 ? void 0 : formInputs.disposition) || {}).length > 0));
    // based on showMandatoryIndication flag we will update the style for disposition dropdown
    const mandatoryStyles = showMandatoryIndication ? dispositionStyles.autoCompleteValidationError : {};
    const { copilotEnabled } = useSelector(isCopilotEnabledForContact);
    const isFinalSummaryEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.FINAL_SUMMARY));
    const generateFinalSummaryEnabled = isFinalSummaryEnabled && ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL]) !== false || (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.SHOW_AUTOSUMMARY_CARD]) !== false);
    const shouldAutoSummaryMapToOutcomePanel = copilotEnabled && (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL]) !== false;
    const isFinalSummaryGenerated = useSelector(getIsFinalSummaryGenerated(activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId)) || false;
    const finalSummaryNotes = useSelector(getFinalSummaryNotes((activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId) || '', copilotEnabled));
    const dispatch = useDispatch();
    if (generateFinalSummaryEnabled) {
        showAutoSummaryProgressBar = !(isFinalSummaryGenerated || ((_d = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout) !== null && _d !== void 0 ? _d : false));
    }
    useEffect(() => {
        var _a;
        if (isFinalSummaryGenerated && shouldAutoSummaryMapToOutcomePanel && (finalSummaryNotes === null || finalSummaryNotes === void 0 ? void 0 : finalSummaryNotes.summary) && !((_a = formData === null || formData === void 0 ? void 0 : formData.notes) === null || _a === void 0 ? void 0 : _a.includes(finalSummaryNotes === null || finalSummaryNotes === void 0 ? void 0 : finalSummaryNotes.summary))) {
            dispatch(dispositionInteractionActions.setFormInput({ contactId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, formInput: DispositionConstants.NOTES, value: finalSummaryNotes === null || finalSummaryNotes === void 0 ? void 0 : finalSummaryNotes.summary }));
        }
    }, [isFinalSummaryGenerated]);
    useEffect(() => {
        if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage) === AutoSummaryErrorCode.callTooShort) {
            const value = translate('autoSummaryTooShort');
            dispatch(dispositionInteractionActions.setFormInput({ contactId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, formInput: DispositionConstants.NOTES, value: value }));
        }
    }, [activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage]);
    /**
     * Handles the change event for disposition case separation.
     *
     * @param event - The synthetic event triggered by the change.
     * @param tabType - The type of tab where the change occurred.
     * @param field - Optional field indicating the disposition or notes.
     * @example handleChange();
     *
     * This function updates the form input based on the event and field provided.
     * Finally, it dispatches an action to update the form input with the new value.
     */
    const handleChange = (event, field, passedVal) => {
        const target = event.target;
        const value = passedVal !== undefined ? passedVal : target.value;
        if (field === 'notes' && value === '') {
            setUserDeletedNotes(true);
        }
        else {
            setUserDeletedNotes(false);
        }
        dispatch(setFormInput({ contactId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId, formInput: field, value: validationUtils.isNotNullOrUndefined(value) ? value : '' }));
    };
    /**
     * Function to get the notes value based on userDeletedNotes and shouldAutoSummaryMapToOutcomePanel flags.
     * @returns notes value as a string
     * @example getNotesValue();
     */
    const getNotesValue = () => {
        if (userDeletedNotes)
            return '';
        const notes = formData === null || formData === void 0 ? void 0 : formData.notes;
        if (notes)
            return notes;
        return shouldAutoSummaryMapToOutcomePanel ? (finalSummaryNotes === null || finalSummaryNotes === void 0 ? void 0 : finalSummaryNotes.summary) || '' : '';
    };
    // Memoize the disposition value to prevent unnecessary re-renders
    const dispositionValue = useMemo(() => {
        var _a;
        return ((_a = formData === null || formData === void 0 ? void 0 : formData.disposition) === null || _a === void 0 ? void 0 : _a.dispositionName) ? formData === null || formData === void 0 ? void 0 : formData.disposition : DefaultDispositionOption;
    }, [(_e = formData === null || formData === void 0 ? void 0 : formData.disposition) === null || _e === void 0 ? void 0 : _e.dispositionName, formData === null || formData === void 0 ? void 0 : formData.disposition]);
    const isContactResolved = ((_f = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _f === void 0 ? void 0 : _f.status) === DigitalContactStatus.RESOLVED || ((_g = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _g === void 0 ? void 0 : _g.status) === DigitalContactStatus.CLOSED; //TOD0 : need to move to useAutoSummary hook
    const canRetry = autoSummaryToOutcomePanel && !showAutoSummaryProgressBar && !isFinalSummaryGenerated && isContactResolved && (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout) && attemptCount < maxRetryCount;
    return (_jsxs(Stack, Object.assign({ style: Object.assign(Object.assign({}, dispositionStyles.digitalAutocompleteWrapper), { padding: 0 }), gap: isShortWindow ? 0 : 2 }, { children: [_jsxs(Stack, Object.assign({ sx: Object.assign(Object.assign({}, dispositionStyles.outcomesMenuWrapper), { marginBottom: '4px' }) }, { children: [_jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, dispositionStyles.outcomePanelLabels), { marginBottom: '0.25rem' }) }, { children: translate('status') })), activeContact !== null && _jsx(CcfDigitalStatusShared, Object.assign({}, statusFormParams, { renderedInOutcomesPanel: true, isShortWindow: isShortWindow }))] })), dispositionOptions && dispositionOptions.length > 0 &&
                _jsxs(Stack, Object.assign({ sx: dispositionStyles.outcomesMenuWrapper }, { children: [_jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, dispositionStyles.outcomePanelLabels), { marginBottom: '0.25rem' }) }, { children: [translate('disposition'), showMandatoryIndication && _jsx("span", Object.assign({ style: { fontSize: '11px', color: theme.palette.error.main, marginLeft: '0.25rem' } }, { children: "*" }))] })), _jsx(Autocomplete, { disablePortal: true, disableClearable: true, disabled: isResolved || !(activeContact === null || activeContact === void 0 ? void 0 : activeContact.isAssignedToAgentInbox), id: "disposition", "data-testid": 'disposition', options: dispositionOptions, getOptionLabel: (option) => option.dispositionName, onChange: (e, val) => handleChange(e, 'disposition', val), sx: Object.assign(Object.assign({}, mandatoryStyles), { '& .MuiOutlinedInput-root': { padding: '0', marginBottom: '0.25rem', background: '#ffffff' } }), renderInput: (params) => _jsx(TextField, Object.assign({}, params, { inputProps: Object.assign(Object.assign({}, params.inputProps), { maxLength: 25 }), variant: "outlined" })), value: dispositionValue, ListboxProps: { style: Object.assign({}, dispositionStyles.menuList) } }), showMandatoryIndication && _jsx("span", Object.assign({ style: { fontSize: '11px', color: theme.palette.error.main } }, { children: "Disposition is Mandatory" })), _jsxs(Stack, Object.assign({ direction: 'row', margin: '.5rem 0', justifyContent: 'space-between' }, { children: [_jsx(CcfTypography, Object.assign({ className: 'captionForDropdown', sx: Object.assign(Object.assign({}, dispositionStyles.outcomePanelLabels), { marginBottom: 0 }) }, { children: translate('dispositionNotes') })), ((autoSummaryEnabledForCurrentContact &&
                                    ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryStatus) === AgentAssistCommand.message ||
                                        (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasAutoSummaryTimedOut))) ||
                                    (generateFinalSummaryEnabled && shouldAutoSummaryMapToOutcomePanel && (isFinalSummaryGenerated || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout))))
                                    && (_jsx(CcfAutoSummaryChip, { activeDisposition: activeDisposition, isFinalSummaryGenerated: isFinalSummaryGenerated || false }))] })), _jsxs(Box, Object.assign({ sx: {
                                position: 'relative',
                                height: 'auto',
                                margin: '0.5rem 0',
                            } }, { children: [showAutoSummaryProgressBar && (shouldAutoSummaryMapToOutcomePanel || autoSummaryEnabledForCurrentContact) && !isResolved &&
                                    _jsx(CcfAutoSummaryProgressBar, { activeDisposition: activeDisposition, mediaType: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media }), _jsx("textarea", { ref: textAreaRef, "aria-label": translate('enterNotes'), style: Object.assign({}, dispositionStyles.dispositionTextAreaCaseSeparation), onChange: (e) => handleChange(e, 'notes'), disabled: isResolved || !formData.disposition || showAutoSummaryProgressBar || !(activeContact === null || activeContact === void 0 ? void 0 : activeContact.isAssignedToAgentInbox), value: getNotesValue(), rows: numberOfRowsForNotes })] })), _jsxs(Stack, Object.assign({ direction: 'row-reverse', marginTop: isShortWindow ? 0 : '1rem' }, { children: [_jsx(CcfButton, Object.assign({ sx: isSaveDisabled || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved)
                                        ? Object.assign(Object.assign({}, dispositionStyles.disabledButton), { marginRight: 0 }) : Object.assign(Object.assign({}, dispositionStyles.markAsResolvedButton), { marginRight: 0 }), variant: "contained", color: "inherit", onClick: () => onClickSaveButton(), disabled: isSaveDisabled || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved) || (showMandatoryIndication && aahConfiguration), "data-testid": "dispositions-save-button", primary: !isSaveDisabled }, { children: _jsx(CcfTypography, { variant: "inherit", sx: isSaveDisabled || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved)
                                            ? {}
                                            : dispositionStyles.markAsResolvedText, translationKey: "save" }) })), 
                                // Only show retry button if the final summary is not generated successfully
                                // (if auto summary timed out or has error message)
                                canRetry && (_jsx(Tooltip, Object.assign({ title: isCoolingDown ? `${translate('youCanRetryAfter')} ${retryCountdown} ${translate('seconds')}` : '', arrow: true }, { children: _jsx("span", { children: _jsx(CcfButton, Object.assign({ sx: dispositionStyles.retryButton, variant: "contained", color: "inherit", onClick: handleRetry, disabled: isCoolingDown || attemptCount >= maxRetryCount, "data-testid": "retry-autosummary-button", "aria-label": translate('retryAutoSummary') }, { children: _jsx(CcfTypography, { variant: "inherit", translationKey: "retryAutoSummary" }) })) }) })))] }))] }))] })));
};
export default memo(CcfDigitalDispositionCaseSeparation, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
//# sourceMappingURL=ccf-digital-disposition-case-separation.js.map