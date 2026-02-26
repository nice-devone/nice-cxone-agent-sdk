import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { useTranslator, CcfBox, CcfTypography, CcfButton, CcfPopOver, CcfDeboucedInput, CcfOverflowIcon } from '@nice-devone/ui-controls';
import { CcfAssignmentAction, getDraftMessageNoteForSelectedCase, getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfContactMessageNoteStyles from './ccf-contact-message-note.styles';
import { createMessageNote, deleteMessageNote, updateMessageNote } from './ccf-contact-message-note.slice';
import { useEffect, useRef, useState } from 'react';
import CcfContactMessageTimeStamp from '../../ccf-digital/ccf-contact-message-container/ccf-contact-message-timestamp';
import Linkify from 'react-linkify';
/**
 * Enum for popover item selection action
 */
var PopoverItemActionEnum;
(function (PopoverItemActionEnum) {
    PopoverItemActionEnum["EDIT"] = "edit";
    PopoverItemActionEnum["DELETE"] = "delete";
})(PopoverItemActionEnum || (PopoverItemActionEnum = {}));
/**
   * displays the UI for message note to put the note in chat
   * @param props -ContactMessageNoteProps
   * @returns - UI for message note
   * @example `<CcfContactMessageNote />`
   **/
export const CcfContactMessageNote = (props) => {
    const { messageId, userDetails, noteContent, isReadOnly, direction, noteId, updatedAt, isPreviousConversationNote, isEmailNote, scrollContainerRef, scrollToLastNote, isNextConversationNote } = props;
    const theme = useTheme();
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const styles = CcfContactMessageNoteStyles(theme, isPreviousConversationNote, isNextConversationNote, isEmailNote);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const conversationNote = useSelector(getDraftMessageNoteForSelectedCase(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const [isEditMode, setIsEditMode] = useState(conversationNote ? conversationNote.status && conversationNote.noteId === noteId : false);
    const activeContactInteractionData = {
        interactionId: (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) || '',
        caseId: (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) || '',
    };
    const inputRef = useRef(null);
    const noteScrollRef = useRef(null);
    useEffect(() => {
        setIsEditMode(conversationNote ? conversationNote.status && conversationNote.noteId === noteId : false);
        if (inputRef.current && isEditMode) {
            inputRef.current.focus();
        }
    }, [conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.noteId]);
    /**
    * Dev Comment - for the new email revamp,upon adding the new note it is not getting auto scroll to bottom. The following code handles it manually for email cases.
    * For the new note initially the noteId is ''. This check is the only identifier to conclude whether the note is new or existing.
    */
    useEffect(() => {
        if (isEmailNote && (conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.status) && (conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.noteId) === '') {
            scrollToNotesSection();
        }
    }, [conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.status, conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.noteId]);
    /**
    * Dev Comment - note should be readonly if it is shown for previous cases.
    * isPreviousConversationNote flag used to identify previous or current case.
    */
    const shouldShowReadOnlyBox = (isPreviousConversationNote || isNextConversationNote) ? true : !((conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.status) && (conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.noteId) === noteId) && isReadOnly;
    const updatedNoteContent = shouldShowReadOnlyBox ? noteContent : conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.content;
    useEffect(() => {
        if (inputRef.current && !shouldShowReadOnlyBox) {
            inputRef.current.focus();
        }
    }, [shouldShowReadOnlyBox]);
    /**
     * dropdownOptions - dropdown menu for popover in
     * message note
     * @example dropdownOptions()
     */
    const dropdownOptions = {
        menuItems: [
            {
                items: [
                    {
                        label: translate('edit'),
                        closeOnSelection: true,
                        id: 'editActionBtn',
                        type: 'edit',
                    },
                    {
                        label: translate('delete'),
                        closeOnSelection: true,
                        type: 'delete',
                        id: 'deleteActionBtn',
                    }
                ],
            }
        ],
    };
    /**
       * Returns the style of the topmost container based on isEmail Note or not.
       * @example - getContainerStyles()
       */
    const getContainerStyles = () => {
        let containerStyles = styles.contactMessageNoteWrapper;
        ;
        if (isEmailNote) {
            if (shouldShowReadOnlyBox) {
                containerStyles = styles.emailNoteWrapper;
            }
            else {
                containerStyles = Object.assign(Object.assign({}, styles.emailNoteWrapper), styles.emailAddNoteWrapper);
            }
        }
        return containerStyles;
    };
    /**
       * function to scroll down to notes section as email-v2 is having different behaviour.
       * @example - scrollToNotesSection()
       */
    const scrollToNotesSection = () => {
        if (isEmailNote && (conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.status) && noteScrollRef.current && (scrollContainerRef === null || scrollContainerRef === void 0 ? void 0 : scrollContainerRef.current)) {
            scrollContainerRef.current.scrollTo({
                top: noteScrollRef.current.offsetTop - scrollContainerRef.current.offsetTop,
                behavior: 'smooth',
            });
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };
    /**
       * Function to on selecting popover item selection in message note
       * @param menuItem -PopOverMenuItem
       * @param event -React.MouseEvent<HTMLElement>
       * @example - onPopOverItemSelection(item, e)
       */
    const onPopOverItemSelection = (menuItem) => () => {
        switch (menuItem.type) {
            case PopoverItemActionEnum.EDIT:
                handleEditNote();
                break;
            case PopoverItemActionEnum.DELETE:
                handleDeleteNote();
                break;
        }
    };
    /**
     * event handler to handle click of Edit Button
     * @example - handleEditNote()
     */
    const handleEditNote = () => {
        var _a;
        dispatch(CcfAssignmentAction.updateContactMessageNoteStatus(Object.assign(Object.assign({}, activeContactInteractionData), { content: noteContent, isNoteOpen: true, noteId })));
        setIsEditMode(true);
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    /**
     * event handler to handle click of Delete Button
     * @example - handleDeleteNote()
     */
    const handleDeleteNote = () => {
        if (messageId && noteId) {
            dispatch(deleteMessageNote(Object.assign(Object.assign({}, activeContactInteractionData), { messageId, noteId })));
        }
    };
    /**
     * event handler to handle click of Save Button
     * @example - handleNoteSave()
     */
    const handleNoteSave = (noteContent) => {
        if (messageId && conversationNote) {
            if (!isEditMode) {
                dispatch(createMessageNote(Object.assign(Object.assign({}, activeContactInteractionData), { messageId, content: conversationNote.content })));
            }
            else {
                if (messageId && noteContent && noteId) {
                    dispatch(updateMessageNote(Object.assign(Object.assign({}, activeContactInteractionData), { messageId, content: conversationNote.content, noteId })));
                }
            }
            handleNoteClose();
            if ((conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.noteId) === '' && scrollToLastNote) {
                scrollToLastNote();
            }
        }
    };
    /**
     * event handler to handle click of Close Button
     * @example - handleClose()
     */
    const handleNoteClose = () => {
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId)) {
            setIsEditMode(false);
            dispatch(CcfAssignmentAction.updateContactMessageNoteStatus(Object.assign(Object.assign({}, activeContactInteractionData), { isNoteOpen: false, content: '' })));
        }
    };
    /**
     * event handler to handle change of input box
     * @example - handleNoteChange()
     */
    const handleNoteChange = (event) => {
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId)) {
            dispatch(CcfAssignmentAction.updateContactMessageNoteContent(Object.assign(Object.assign({}, activeContactInteractionData), { content: event.target.value })));
        }
    };
    return (_jsx(CcfBox, Object.assign({ ref: noteScrollRef }, { children: shouldShowReadOnlyBox ?
            _jsxs(CcfBox, Object.assign({ sx: getContainerStyles(), paddingRight: '0.5rem' }, { children: [!isEmailNote ? _jsxs(CcfBox, Object.assign({ sx: styles.interactionAgentLabelName }, { children: [" ", userDetails ? `${userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName} ${(userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName) || (userDetails === null || userDetails === void 0 ? void 0 : userDetails.surname)}` : ''] })) :
                        _jsxs(CcfBox, Object.assign({ sx: styles.emailNoteAgentAndTimeStampContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.emailAgentLabelName }, { children: [" ", userDetails ? `${userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName} ${(userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName) || (userDetails === null || userDetails === void 0 ? void 0 : userDetails.surname)}` : ''] })), _jsx(CcfContactMessageTimeStamp, { createdAt: updatedAt || '', direction: direction || '', styles: {
                                        inboundMessageTimeStamp: styles.emailNoteTimestamp,
                                        outboundMessageTimeStamp: styles.emailNoteTimestamp,
                                    } })] })), _jsxs(CcfBox, Object.assign({ sx: !isEmailNote ? styles.interactionSpaceNoteContainer : styles.emailSpaceNoteContainer, minWidth: 'unset' }, { children: [_jsxs(CcfBox, Object.assign({ sx: !isEmailNote ? styles.interactionMessageNoteLabelHeader : styles.emailNoteLabelHeader }, { children: [_jsx(CcfTypography, { sx: !isEmailNote ? styles.interactionMessageNoteLabel : styles.emailNoteLabel, variant: 'h6', translationKey: "noteLabel" }), (!isPreviousConversationNote && !isNextConversationNote) && _jsx(CcfPopOver, { disableTooltip: true, optionList: dropdownOptions, onPopOverItemSelection: onPopOverItemSelection, popOverRightIconStyles: { height: '24px' }, iconComponent: _jsx(CcfOverflowIcon, { fontSize: 'small' }) })] })), !isEditMode ? _jsx(CcfBox, Object.assign({ sx: styles.interactionMessageNoteContentContainer }, { children: _jsx(CcfTypography, Object.assign({ variant: "h6", sx: !isEmailNote ? styles.interactionMessageNoteContent : styles.emailNoteContent, title: noteContent }, { children: _jsx(Linkify, Object.assign({ componentDecorator: (decoratedHref, decoratedText) => (_jsx("a", Object.assign({ href: decoratedHref, target: '_blank', rel: "noreferrer" }, { children: decoratedText }))) }, { children: noteContent })) })) })) : _jsxs(_Fragment, { children: [_jsx(CcfDeboucedInput, { delay: !isEmailNote ? 100 : 500, autoFocus: true, sx: !isEmailNote ? styles.interactionSpaceNoteInput : styles.emailNoteInput, id: 'newMessageNoteTextArea', "data-testid": 'newNoteTextAreaTestId', multiline: true, rows: !isEmailNote ? 3 : 1.5, inputProps: { sx: !isEmailNote ? styles.messageNoteTextAreaFontSize : styles.emailNoteTextAreaFontSize, maxLength: 2000 }, value: updatedNoteContent, onChange: handleNoteChange, onFocus: (e) => {
                                            const val = e.target.value;
                                            e.target.value = '';
                                            e.target.value = val;
                                        } }), !isEmailNote ? _jsxs(CcfBox, Object.assign({ sx: styles.interactionNoteBtnLayout }, { children: [_jsx(CcfButton, Object.assign({ id: 'messageNoteSaveBtnId', primary: true, sx: styles.interactionBtn, disabled: updatedNoteContent === '', onClick: () => handleNoteSave(conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.content), "data-testid": 'messageNoteSaveBtnTestId' }, { children: _jsx(CcfTypography, { translationKey: "save", variant: "h6" }) })), _jsx(CcfButton, Object.assign({ sx: styles.cancelBtn, id: 'messageNoteCancelBtnId', "data-testid": 'messageNoteCancelBtnTestId', onClick: handleNoteClose }, { children: _jsx(CcfTypography, { translationKey: "cancel", variant: "h6" }) }))] })) : _jsxs(CcfBox, Object.assign({ sx: styles.emailNoteActionBtnLayout }, { children: [_jsx(CcfButton, Object.assign({ disableRipple: true, sx: Object.assign(Object.assign({}, styles.emailNoteActionBtn), styles.emailNoteCancelBtn), id: 'emailNoteCancelBtnId', "data-testid": 'emailNoteCancelBtnTestId', onClick: handleNoteClose, "aria-label": translate('cancel') }, { children: _jsx(CcfTypography, { translationKey: "cancel", variant: "h6" }) })), _jsx(CcfButton, Object.assign({ disableRipple: true, id: 'emailNoteSaveBtnId', primary: true, sx: styles.emailNoteActionBtn, disabled: updatedNoteContent === '', onClick: () => handleNoteSave(conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.content), "data-testid": 'emailNoteSaveBtnTestId', "aria-label": translate('save') }, { children: _jsx(CcfTypography, { translationKey: "save", variant: "h6" }) }))] }))] })] })), !isEmailNote ? _jsx(CcfContactMessageTimeStamp, { createdAt: updatedAt || '', direction: direction || '', styles: {
                            inboundMessageTimeStamp: styles.contactMessageNoteTimestamp,
                            outboundMessageTimeStamp: styles.contactMessageNoteTimestamp,
                        } }) : null] }))
            : (conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.status) && ((conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.noteId) === '' || isEditMode) &&
                _jsxs(CcfBox, Object.assign({ sx: getContainerStyles(), paddingRight: theme.spacing(1) }, { children: [!isEmailNote ? _jsxs(CcfBox, Object.assign({ sx: styles.interactionAgentLabelName }, { children: [" ", userDetails ? `${userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName} ${(userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName) || (userDetails === null || userDetails === void 0 ? void 0 : userDetails.surname)}` : ''] })) :
                            _jsx(CcfBox, Object.assign({ sx: styles.emailNoteAgentAndTimeStampContainer }, { children: _jsxs(CcfBox, Object.assign({ sx: styles.emailAgentLabelName }, { children: [" ", userDetails ? `${userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName} ${(userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName) || (userDetails === null || userDetails === void 0 ? void 0 : userDetails.surname)}` : ''] })) })), _jsxs(CcfBox, Object.assign({ sx: !isEmailNote ? styles.interactionSpaceNoteContainer : styles.emailSpaceNoteContainer, minWidth: shouldShowReadOnlyBox ? 'unset' : '70%' }, { children: [_jsx(CcfBox, Object.assign({ sx: !isEmailNote ? styles.interactionMessageNoteLabelHeader : styles.emailNoteLabelHeader }, { children: _jsx(CcfTypography, { sx: !isEmailNote ? styles.interactionMessageNoteLabel : styles.emailNoteLabel, variant: 'h6', translationKey: "noteLabel" }) })), _jsx(CcfDeboucedInput, { delay: !isEmailNote ? 100 : 500, sx: !isEmailNote ? styles.interactionSpaceNoteInput : styles.emailNoteInput, id: 'newMessageNoteTextArea', inputRef: inputRef, "data-testid": 'newNoteTextAreaTestId', multiline: true, rows: !isEmailNote ? 3 : 1.5, inputProps: { sx: !isEmailNote ? styles.messageNoteTextAreaFontSize : styles.emailNoteTextAreaFontSize, maxLength: 2000 }, value: updatedNoteContent, onChange: handleNoteChange, onFocus: (e) => {
                                        const val = e.target.value;
                                        e.target.value = '';
                                        e.target.value = val;
                                    } }), !isEmailNote ? _jsxs(CcfBox, Object.assign({ sx: styles.interactionNoteBtnLayout }, { children: [_jsx(CcfButton, Object.assign({ id: 'messageNoteSaveBtnId', primary: true, sx: styles.interactionBtn, disabled: updatedNoteContent === '', onClick: () => handleNoteSave(conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.content), "data-testid": 'messageNoteSaveBtnTestId' }, { children: _jsx(CcfTypography, { translationKey: "save", variant: "h6" }) })), _jsx(CcfButton, Object.assign({ sx: styles.cancelBtn, id: 'messageNoteCancelBtnId', "data-testid": 'messageNoteCancelBtnTestId', onClick: handleNoteClose }, { children: _jsx(CcfTypography, { translationKey: "cancel", variant: "h6" }) }))] })) : _jsxs(CcfBox, Object.assign({ sx: styles.emailNoteActionBtnLayout }, { children: [_jsx(CcfButton, Object.assign({ disableRipple: true, sx: Object.assign(Object.assign({}, styles.emailNoteActionBtn), styles.emailNoteCancelBtn), id: 'emailNoteCancelBtnId', "data-testid": 'emailNoteCancelBtnTestId', onClick: handleNoteClose, "aria-label": translate('cancel') }, { children: _jsx(CcfTypography, { translationKey: "cancel", variant: "h6" }) })), _jsx(CcfButton, Object.assign({ disableRipple: true, id: 'emailNoteSaveBtnId', primary: true, sx: styles.emailNoteActionBtn, disabled: updatedNoteContent === '', onClick: () => handleNoteSave(conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.content), "data-testid": 'emailNoteSaveBtnTestId', "aria-label": translate('save') }, { children: _jsx(CcfTypography, { translationKey: "save", variant: "h6" }) }))] }))] }))] })) })));
};
export default CcfContactMessageNote;
//# sourceMappingURL=ccf-contact-message-note.js.map