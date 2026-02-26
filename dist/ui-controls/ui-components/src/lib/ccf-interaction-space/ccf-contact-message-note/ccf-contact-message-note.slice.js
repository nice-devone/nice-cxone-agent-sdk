import { __awaiter } from "tslib";
import { CcfLogger } from '@nice-devone/agent-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CcfAssignmentAction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
const cxoneDigitalClient = CXoneDigitalClient.instance;
const logger = new CcfLogger('App.interaction-space', 'contact-message-note-slice');
export const createMessageNote = createAsyncThunk('', (messageNotePayload, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId, content, interactionId, caseId } = messageNotePayload;
    try {
        yield cxoneDigitalClient.digitalMessageNoteService.createMessageNote(messageId, content || '');
        dispatch(CcfAssignmentAction.updateContactMessageNoteErrorState({ interactionId, caseId, hasError: false }));
    }
    catch (error) {
        dispatch(CcfAssignmentAction.updateContactMessageNoteErrorState({ interactionId, caseId, hasError: true }));
        logger.error('createMessageNote', `error while creating message note - ${JSON.stringify(error)}`);
    }
}));
export const updateMessageNote = createAsyncThunk('', (messageNotePayload, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId, content, noteId, interactionId, caseId } = messageNotePayload;
    try {
        yield cxoneDigitalClient.digitalMessageNoteService.updateMessageNote(messageId, content || '', noteId || '');
        dispatch(CcfAssignmentAction.updateContactMessageNoteErrorState({ interactionId, caseId, hasError: false }));
    }
    catch (error) {
        dispatch(CcfAssignmentAction.updateContactMessageNoteErrorState({ interactionId, caseId, hasError: true }));
        logger.error('updateMessageNote', `error while updating message note - ${JSON.stringify(error)}`);
    }
}));
export const deleteMessageNote = createAsyncThunk('', (messageNotePayload, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId, noteId, interactionId, caseId } = messageNotePayload;
    try {
        yield cxoneDigitalClient.digitalMessageNoteService.deleteMessageNote(messageId, noteId || '');
        dispatch(CcfAssignmentAction.updateContactMessageNoteErrorState({ interactionId, caseId, hasError: false }));
    }
    catch (error) {
        dispatch(CcfAssignmentAction.updateContactMessageNoteErrorState({ interactionId, caseId, hasError: true }));
        logger.error('deleteMessageNote', `error while deleting message note - ${JSON.stringify(error)}`);
    }
}));
//# sourceMappingURL=ccf-contact-message-note.slice.js.map