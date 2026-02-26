import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfBox, CcfButton, CcfTextField, CcfTypography, useTranslator, } from '@nice-devone/ui-controls';
import { Box, useTheme } from '@mui/material';
import customerCardNoteStyles from './ccf-customer-card-notes.styles';
import { DateTimeUtilService } from '@nice-devone/core-sdk';
import { addNewCustomerNoteThunk, CcfCustomerCardActions, editCustomerNoteByIdThunk, selectCurrentCaseId, selectCurrentCaseNoteObj, } from '../ccf-customer-card.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
/**
 * CcfCustomerCardNewNote - used to display Ui for putting up a new note
 * @param props -?-CcfCustomerNewNoteProps
 * @example <CcfCustomerCardNewNote />
 */
export function CcfCustomerCardNewNote(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentCaseNoteObj = useSelector(selectCurrentCaseNoteObj);
    const currentCaseId = useSelector(selectCurrentCaseId);
    const [translate] = useTranslator();
    const [saveNoteContent, setSaveNoteContent] = useState({
        id: (_a = props.noteContent) === null || _a === void 0 ? void 0 : _a.id,
        content: (_b = props.noteContent) === null || _b === void 0 ? void 0 : _b.content,
        user: (_c = props.noteContent) === null || _c === void 0 ? void 0 : _c.user,
        updatedAt: (_d = props.noteContent) === null || _d === void 0 ? void 0 : _d.updatedAt,
        editMode: (_e = props.noteContent) === null || _e === void 0 ? void 0 : _e.editMode,
        noteCRUDState: (_f = props.noteContent) === null || _f === void 0 ? void 0 : _f.noteCRUDState,
    });
    const styles = customerCardNoteStyles(theme);
    useEffect(() => {
        if ((currentCaseNoteObj === null || currentCaseNoteObj === void 0 ? void 0 : currentCaseNoteObj.caseId) === currentCaseId) {
            setSaveNoteContent({
                id: currentCaseNoteObj === null || currentCaseNoteObj === void 0 ? void 0 : currentCaseNoteObj.id,
                content: currentCaseNoteObj === null || currentCaseNoteObj === void 0 ? void 0 : currentCaseNoteObj.content,
                user: currentCaseNoteObj === null || currentCaseNoteObj === void 0 ? void 0 : currentCaseNoteObj.user,
                updatedAt: currentCaseNoteObj === null || currentCaseNoteObj === void 0 ? void 0 : currentCaseNoteObj.updatedAt,
                editMode: currentCaseNoteObj === null || currentCaseNoteObj === void 0 ? void 0 : currentCaseNoteObj.editMode,
                noteCRUDState: currentCaseNoteObj === null || currentCaseNoteObj === void 0 ? void 0 : currentCaseNoteObj.noteCRUDState,
            });
        }
    }, [currentCaseNoteObj]);
    /**
     * Function to update the content of note
     * @param trigger - onChangeEvent
     * @example - noteInputHandler()
     */
    const noteInputHandler = (evt) => {
        setSaveNoteContent(Object.assign(Object.assign({}, saveNoteContent), { content: evt.target.value, editMode: true }));
        //update content prop in Map object againts selected case id
        dispatch(CcfCustomerCardActions.updateCustomerNotesUsingCaseIdMap([
            Object.assign(Object.assign({}, saveNoteContent), { content: evt.target.value, editMode: true }),
            true,
            undefined,
            props.customerId
        ]));
    };
    /**
     * Function to update the content of note
     * @param trigger - onClickEvent
     * @example - saveNoteButtonHandler()
     */
    const saveNoteButtonHandler = () => {
        if (!saveNoteContent.id)
            dispatch(addNewCustomerNoteThunk({ customerId: props.customerId, note: saveNoteContent.content ? saveNoteContent.content : '' }));
        else
            dispatch(editCustomerNoteByIdThunk({ customerId: props.customerId, noteId: saveNoteContent.id, note: saveNoteContent.content ? saveNoteContent.content : '' }));
    };
    /**
     * Function to discard the note
     * @param trigger - onClickEvent
     * @example - cancelNoteBtnHandler()
     */
    const cancelNoteBtnHandler = () => {
        props.enableNewNoteBtn(false);
        //remove obj props in Map on cancel(empty):
        dispatch(CcfCustomerCardActions.updateCustomerNotesUsingCaseIdMap([
            {},
            false,
            undefined,
            props.customerId
        ]));
    };
    return (_jsxs(CcfBox, Object.assign({ sx: styles.noteBottomSeperator }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.agentNameStyle }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'h6', sx: styles.agentNameLabel }, { children: (props.noteContent && props.noteContent.user) ? (((_g = props.noteContent.user) === null || _g === void 0 ? void 0 : _g.firstName) + ' ' + ((_h = props.noteContent.user) === null || _h === void 0 ? void 0 : _h.surname)) : '' })), _jsx(CcfTypography, Object.assign({ variant: 'h6', sx: props.noteContent && props.noteContent.createdAt && new Date(props.noteContent.createdAt) < new Date(props.noteContent.updatedAt) ? Object.assign(Object.assign({}, styles.dateLabel), styles.italicFont) : styles.dateLabel }, { children: `${props.noteContent && props.noteContent.createdAt && (new Date(props.noteContent.createdAt) < new Date(props.noteContent.updatedAt)) ? translate('edited') : ''} ${DateTimeUtilService.getRequiredDateFormat(props.noteContent.updatedAt)}` }))] })), _jsx(CcfTextField, { autoFocus: true, sx: styles.newEditNoteTextBox, id: 'newNoteTextBox', "data-testid": 'newNoteTestId', multiline: true, inputProps: {
                    maxLength: 2000,
                    style: styles.newEditNoteTextBox,
                    'aria-label': `${translate('enterNotes')}`,
                }, value: saveNoteContent.content, onChange: noteInputHandler }), _jsxs(Box, Object.assign({ sx: styles.newNoteSaveBtnLayout }, { children: [_jsx(CcfButton, Object.assign({ id: 'saveBtnId', primary: true, sx: styles.saveBtn, disabled: ((_j = props.noteContent.content) === null || _j === void 0 ? void 0 : _j.trim().length) === 0, "data-testid": 'saveBtnId', onClick: saveNoteButtonHandler }, { children: _jsx(CcfTypography, { translationKey: "save" }) })), _jsx(CcfButton, Object.assign({ id: 'cancelBtnId', "data-testid": 'cancelBtnTestId', onClick: cancelNoteBtnHandler }, { children: _jsx(CcfTypography, { translationKey: "cancel" }) }))] }))] })));
}
export default CcfCustomerCardNewNote;
//# sourceMappingURL=ccf-customer-card-new-note.js.map