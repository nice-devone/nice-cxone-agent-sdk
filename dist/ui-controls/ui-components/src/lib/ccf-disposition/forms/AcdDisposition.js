import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Autocomplete, Box, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { AgentAssistCommand, AgentAssistConfigACPParamsKeys, DispositionConstants } from '@nice-devone/common-sdk';
import { CallType } from '@nice-devone/agent-sdk';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useDispatch, useSelector } from 'react-redux';
import { dispositionInteractionActions, getDispositionData } from '../ccf-disposition-slice';
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getTimeZones } from '../../ccf-commitment/ccf-commitment.slice';
import { getUtcTimezoneOffset } from '../../../util/common';
import CcfAutoSummaryProgressBar from '../../ccf-autosummary-progress-bar/ccf-autosummary-progress-bar';
import CcfAutoSummaryChip from './ccf-auto-summary-chip';
import CcfDispositionStyles from '../ccf-disposition.styles';
import { getFinalSummaryNotes, getIsFinalSummaryGenerated, selectHasCopilotConfig } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { getApplicationLocale } from '../../global.app.slice';
const DefaultDispositionOption = { dispositionName: '' }; // used to set the empty value for the disposition drop down
/**
 * Component displays Acd Disposition
 * @param props -CcfDispositionInteractionAccordionDetailsProps
 * @returns displays accordion details for disposition
 * @example <CcfDispositionInteractionAccordionDetails/>
 */
const AcdDisposition = ({ contactId, formData, handleChange, isResolved, voiceContact }) => {
    var _a, _b, _c, _d, _f, _g, _h, _j, _k, _l, _m;
    const dispatch = useDispatch();
    const [isDispositionVisible, _setIsDispositionVisible] = useState(false);
    const theme = useTheme();
    const dispositionStyles = CcfDispositionStyles(theme, isDispositionVisible);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const dispositionData = useSelector(getDispositionData);
    const [translate] = useTranslator();
    const containerRef = useRef(null);
    const defaultDateTime = (formData === null || formData === void 0 ? void 0 : formData.retryDateTime) ? dayjs(formData === null || formData === void 0 ? void 0 : formData.retryDateTime) : dayjs(new Date()).add(1, 'hour');
    const [dateTime, setDateTime] = useState(defaultDateTime);
    const timeZones = useSelector(getTimeZones);
    let showAutoSummaryProgressBar = false;
    let numberOfRowsForNotes = 4;
    const isMdView = useMediaQuery(theme.breakpoints.down('md'));
    const textAreaRef = useRef(null);
    const locale = useSelector(getApplicationLocale);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    let activeDisposition = null;
    let timeZoneOptions = [];
    const tagOptions = (_a = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactId]) === null || _a === void 0 ? void 0 : _a.tagList;
    const dispositionOptions = (_b = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactId]) === null || _b === void 0 ? void 0 : _b.dispositionList;
    const { copilotEnabled, copilotConfig } = useSelector(selectHasCopilotConfig(contactId));
    const { Params } = copilotConfig || {};
    const isFinalSummaryEnabled = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.FINAL_SUMMARY];
    const generateFinalSummaryEnabled = isFinalSummaryEnabled && ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL]) !== false || (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.SHOW_AUTOSUMMARY_CARD]) !== false);
    const shouldAutoSummaryMapToOutcomePanel = copilotEnabled && (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL]) !== false;
    const isFinalSummaryGenerated = useSelector(getIsFinalSummaryGenerated(contactId)) || false;
    const finalSummaryNotes = useSelector(getFinalSummaryNotes(contactId || '', copilotEnabled));
    const setValueInRedux = useCallback((field, value) => {
        if ((dispositionOptions === null || dispositionOptions === void 0 ? void 0 : dispositionOptions.length) || (tagOptions === null || tagOptions === void 0 ? void 0 : tagOptions.length)) {
            dispatch(dispositionInteractionActions.setFormInput({ contactId: contactId, formInput: field, value: value }));
        }
    }, [contactId, dispatch]);
    const FOCUSABLE_CSS_SELECTOR = 'input:not([disabled]), select:not([disabled]), textarea:not([disabled])';
    useEffect(() => {
        if (containerRef.current) {
            const firstFocusableElement = containerRef.current.querySelector(FOCUSABLE_CSS_SELECTOR);
            firstFocusableElement === null || firstFocusableElement === void 0 ? void 0 : firstFocusableElement.focus();
        }
    }, []);
    useEffect(() => {
        setValueInRedux('retryDateTime', dateTime.format('YYYY-MM-DDTHH:mm:ss'));
    }, [dateTime, dispatch, setValueInRedux]);
    const autoSummaryEnabledForCurrentContact = !!(contactId && ((_c = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.autoSummaryEnabledContacts) === null || _c === void 0 ? void 0 : _c.includes(contactId)));
    if (nonIncomingActiveContactInSelectedInteraction && dispositionData.dispositions[contactId]) {
        activeDisposition = dispositionData.dispositions[contactId];
        let agentTimeZoneOffsetInhhmm = getUtcTimezoneOffset();
        timeZoneOptions = [];
        if ((timeZones === null || timeZones === void 0 ? void 0 : timeZones.length) > 0) {
            let customerTimeZone;
            if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.timeZones) && (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.callType) === CallType.NATURAL_CALLING) {
                customerTimeZone = timeZones.find(timeZone => timeZone.standardName.indexOf(voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.timeZones) > -1);
            }
            timeZoneOptions = timeZones.filter(timeZone => timeZone.offset === agentTimeZoneOffsetInhhmm
                || timeZone.displayName === (customerTimeZone === null || customerTimeZone === void 0 ? void 0 : customerTimeZone.displayName));
        }
        else {
            const agentTimeZone = {
                displayName: '',
                offset: agentTimeZoneOffsetInhhmm,
                standardName: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };
            if (!agentTimeZoneOffsetInhhmm.includes('-'))
                agentTimeZoneOffsetInhhmm = '+' + agentTimeZoneOffsetInhhmm;
            agentTimeZone.displayName = '(GMT' + agentTimeZoneOffsetInhhmm + ') ' + agentTimeZone.standardName;
            timeZoneOptions.push(agentTimeZone);
        }
        if (autoSummaryEnabledForCurrentContact) {
            numberOfRowsForNotes = 8;
            showAutoSummaryProgressBar = (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryStatus) === AgentAssistCommand.subscribed && !(activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasAutoSummaryTimedOut);
        }
    }
    if (generateFinalSummaryEnabled) {
        showAutoSummaryProgressBar = !(isFinalSummaryGenerated || ((_d = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout) !== null && _d !== void 0 ? _d : false));
    }
    useEffect(() => {
        if (shouldAutoSummaryMapToOutcomePanel) {
            if (isFinalSummaryGenerated && !(formData === null || formData === void 0 ? void 0 : formData.notes)) {
                dispatch(dispositionInteractionActions.setFormInput({ contactId, formInput: DispositionConstants.NOTES, value: finalSummaryNotes === null || finalSummaryNotes === void 0 ? void 0 : finalSummaryNotes.summary }));
            }
        }
        else if ((formData === null || formData === void 0 ? void 0 : formData.notes) === (finalSummaryNotes === null || finalSummaryNotes === void 0 ? void 0 : finalSummaryNotes.summary)) {
            dispatch(dispositionInteractionActions.setFormInput({ contactId, formInput: DispositionConstants.NOTES, value: '' }));
        }
    }, [isFinalSummaryGenerated]);
    /**
       * Function to return field from ACD disposition form
       * @param acdForm - ACD Disposition Form
       * @param field - field in our form
       * @returns - input value for dropdown
       * @example - getAcdInputValue(formData, notes)
       */
    const getAcdInputValue = (acdForm, field) => {
        if (field === 'notes' || field === 'retryNumber') {
            return acdForm[field];
        }
        console.error('We shouldnt be using this func for dispositions');
        return;
    };
    const [timeZone, setTimeZone] = useState((formData === null || formData === void 0 ? void 0 : formData.retryTimeZone) || timeZoneOptions[0]);
    useEffect(() => {
        setValueInRedux('retryTimeZone', timeZone);
    }, [dispatch, setValueInRedux, timeZone]);
    /**
     * Function to handle when the selected date changes
     * @param field - field that we are saving values too
     * @param passedVal - value that we are saving to passed in field
     * @example - handleDateChange
     */
    const handleDateTimeChange = (field, passedVal) => {
        if (field === 'retryDateTime') {
            const newValue = dayjs(passedVal);
            if (newValue) {
                setDateTime(newValue);
            }
        }
        else if (field === 'retryTimeZone') {
            setTimeZone(passedVal);
        }
    };
    // Memoize the disposition value to prevent unnecessary re-renders
    const dispositionValue = useMemo(() => {
        var _a;
        return ((_a = formData === null || formData === void 0 ? void 0 : formData.disposition) === null || _a === void 0 ? void 0 : _a.dispositionName) ? formData === null || formData === void 0 ? void 0 : formData.disposition : DefaultDispositionOption;
    }, [(_f = formData === null || formData === void 0 ? void 0 : formData.disposition) === null || _f === void 0 ? void 0 : _f.dispositionName, formData === null || formData === void 0 ? void 0 : formData.disposition]);
    return (_jsxs("div", Object.assign({ ref: containerRef }, { children: [(dispositionOptions === null || dispositionOptions === void 0 ? void 0 : dispositionOptions.length) > 0 && (_jsxs(Box, { children: [_jsx(Box, Object.assign({ sx: dispositionStyles.autoCompleteLabel }, { children: translate('disposition') })), _jsx(Autocomplete, { disablePortal: true, disableClearable: true, disabled: isResolved, id: 'disposition', "data-testid": 'disposition', options: dispositionOptions, getOptionLabel: (opt) => opt.dispositionName, onChange: (e, value) => handleChange(e, 'disposition', value), sx: Object.assign(Object.assign({}, dispositionStyles.autoCompleteWidth), { '& .MuiOutlinedInput-root': { padding: '0', marginBottom: '0.25rem' } }), renderInput: (params) => _jsx(TextField, Object.assign({}, params, { inputProps: Object.assign(Object.assign({}, params.inputProps), { maxLength: 25, 'aria-label': `${translate('select')} ${translate('disposition')}` }) })), value: dispositionValue })] })), (tagOptions === null || tagOptions === void 0 ? void 0 : tagOptions.length) > 0 &&
                _jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ sx: dispositionStyles.autoCompleteLabel }, { children: translate('dispositionTags') })), _jsx(Autocomplete, { disablePortal: true, disableClearable: true, disabled: isResolved, id: "tags", "data-testid": 'tags', options: tagOptions, limitTags: 1, multiple: true, getOptionLabel: (opt) => opt.tagName, onChange: (e, value) => handleChange(e, 'tags', value), renderInput: (params) => _jsx(TextField, Object.assign({}, params, { inputProps: Object.assign(Object.assign({}, params.inputProps), { 'aria-controls': 'tags-listbox', maxLength: 25, 'aria-label': `${translate('select')} ${translate('tags')}` }), maxRows: 0 })), value: formData.tags, sx: Object.assign(Object.assign({}, dispositionStyles.autoCompleteWidth), { '& .MuiOutlinedInput-root': { padding: '0', marginBottom: '0.25rem' }, '& .MuiAutocomplete-inputRoot': {
                                    '&:not(.Mui-focused)': {
                                        flexWrap: 'nowrap', overflow: 'hidden',
                                    },
                                }, '&  .MuiAutocomplete-tag': { maxWidth: isMdView ? '200px' : 'auto' } }) })] }), ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.callType) === CallType.NATURAL_CALLING
                && ((_h = (_g = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _g === void 0 ? void 0 : _g.disposition) === null || _h === void 0 ? void 0 : _h.requireCommitmentAmount))
                &&
                    _jsx(TextField, { id: 'amount', "data-testid": 'amount', "aria-label": translate('amount'), onChange: (e) => handleChange(e, 'amount'), disabled: isResolved, type: 'number', label: translate('amount'), size: 'small', margin: 'normal', sx: { backgroundColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.paper }, value: formData === null || formData === void 0 ? void 0 : formData.amount }), ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.callType) === CallType.NATURAL_CALLING
                && ((_m = (_l = activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.formInputs) === null || _l === void 0 ? void 0 : _l.disposition) === null || _m === void 0 ? void 0 : _m.requireRescheduleDate))
                &&
                    _jsxs(_Fragment, { children: [_jsx(LocalizationProvider, Object.assign({ dateAdapter: AdapterDayjs, adapterLocale: locale }, { children: _jsx(DateTimePicker, { viewRenderers: {
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }, "aria-label": translate('dateTime'), "data-testid": 'dateTime', onChange: (newDate) => handleDateTimeChange('retryDateTime', newDate), value: dateTime, disablePast: true, slotProps: {
                                        textField: {
                                            id: 'date-picker-input',
                                            size: 'small',
                                            label: translate('dateTime'),
                                            sx: { marginTop: '10px' },
                                            inputProps: {
                                                disabled: isResolved,
                                            },
                                        },
                                        popper: { disablePortal: true },
                                    }, slots: {
                                        textField: TextField,
                                    } }) })), _jsx(Autocomplete, { "aria-label": translate('timezone'), disablePortal: true, disableClearable: true, disabled: isResolved, id: "retryTimezone", "data-testid": 'retryTimezone', options: timeZoneOptions, getOptionLabel: (opt) => opt.displayName, onChange: (_e, value) => handleDateTimeChange('retryTimeZone', value), renderInput: (params) => _jsx(TextField, Object.assign({}, params, { inputProps: Object.assign(Object.assign({}, params.inputProps), { maxLength: 25 }), label: translate('timezone') })), value: formData.retryTimeZone, sx: { marginTop: '10px' } }), _jsx(TextField, { "aria-label": translate('phoneNumber'), "data-testid": 'retryPhoneNumber', onChange: (e) => handleChange(e, 'retryNumber'), disabled: isResolved, value: getAcdInputValue(formData, 'retryNumber'), label: translate('phoneNumber'), sx: { marginTop: '10px' }, type: 'text' })] }), (dispositionOptions === null || dispositionOptions === void 0 ? void 0 : dispositionOptions.length) > 0 && (_jsxs(Box, Object.assign({ margin: 0 }, { children: [_jsxs(Stack, Object.assign({ direction: 'row', margin: '.5rem 0 0', justifyContent: 'space-between' }, { children: [_jsx(CcfTypography, Object.assign({ className: 'captionForDropdown', sx: dispositionStyles.outcomePanelLabels }, { children: translate('dispositionNotes') })), ((autoSummaryEnabledForCurrentContact &&
                                ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryStatus) === AgentAssistCommand.message ||
                                    (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasAutoSummaryTimedOut))) ||
                                (generateFinalSummaryEnabled && shouldAutoSummaryMapToOutcomePanel && (isFinalSummaryGenerated || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout))))
                                && (_jsx(CcfAutoSummaryChip, { activeDisposition: activeDisposition, isFinalSummaryGenerated: isFinalSummaryGenerated || false }))] })), _jsxs(Box, Object.assign({ sx: {
                            position: 'relative',
                            margin: '0.5rem 0',
                        } }, { children: [showAutoSummaryProgressBar && (shouldAutoSummaryMapToOutcomePanel || autoSummaryEnabledForCurrentContact) && !isResolved &&
                                _jsx(CcfAutoSummaryProgressBar, {}), _jsx("textarea", { ref: textAreaRef, style: (isMdView) ? Object.assign(Object.assign({}, dispositionStyles.dispositionTextarea), { width: '16.316rem' }) : Object.assign({}, dispositionStyles.dispositionTextarea), onChange: (e) => handleChange(e, 'notes'), disabled: showAutoSummaryProgressBar || isResolved, value: getAcdInputValue(formData, 'notes'), rows: numberOfRowsForNotes, "aria-label": `${translate('enter')} ${translate('dispositionNotes')}` })] }))] })))] })));
};
export default AcdDisposition;
//# sourceMappingURL=AcdDisposition.js.map