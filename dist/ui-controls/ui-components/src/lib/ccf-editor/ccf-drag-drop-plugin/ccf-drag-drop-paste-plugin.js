import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { useTranslator } from '@nice-devone/ui-controls';
import { CcfContactEditorAction, getUploadDialogBox } from '../ccf-contact-editor.slice';
import { ACCEPTABLE_INLINE_IMAGE_TYPES } from '../ccf-inline-image-plugin/ccf-paste-inline-image';
var EVENT_TYPES;
(function (EVENT_TYPES) {
    EVENT_TYPES["DRAG_ENTER"] = "dragenter";
    EVENT_TYPES["DRAG_OVER"] = "dragover";
    EVENT_TYPES["DRAG_LEAVE"] = "dragleave";
    EVENT_TYPES["DROP"] = "drop";
    EVENT_TYPES["PASTE"] = "paste";
})(EVENT_TYPES || (EVENT_TYPES = {}));
var ATTRIBUTE_NAME;
(function (ATTRIBUTE_NAME) {
    ATTRIBUTE_NAME["DRAG_HIGHLIGHT"] = "drag-highlight";
    ATTRIBUTE_NAME["DROPZONE_ID"] = "dropzone";
})(ATTRIBUTE_NAME || (ATTRIBUTE_NAME = {}));
/**
 * Component to show drop dialog message
 * @returns text 'Drop your files here'
 * ```
 * @example
 * <CcfDragDropPastePlugin/>
 * ```
 */
export const CcfDragDropPastePlugin = ({ caseId, style, onUploadAttachment, isRichTextEditor }) => {
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const showDropMessageDilog = useSelector(getUploadDialogBox(caseId));
    useEffect(() => {
        const dropzone = document.getElementById(ATTRIBUTE_NAME.DROPZONE_ID);
        /**
         * method handling ondrag event when mouse enter the area
         * @param e - mouse DragEvent
         * @example
         * dropzone?.removeEventListener(EVENT_TYPES.DRAG_ENTER, handleDragEnter as EventListener);
         */
        const handleDragEnter = (e) => {
            e.preventDefault();
            if (!(dropzone === null || dropzone === void 0 ? void 0 : dropzone.classList.contains(ATTRIBUTE_NAME.DRAG_HIGHLIGHT))) {
                dispatch(CcfContactEditorAction.updateUploadDialogBox({ caseId, isUploadDialogEnabled: true }));
                dropzone === null || dropzone === void 0 ? void 0 : dropzone.classList.add(ATTRIBUTE_NAME.DRAG_HIGHLIGHT);
            }
        };
        /**
         * method handling ondrag event when mouse leave the area
         * @param e - mouse DragEvent
         * @example
         * dropzone?.addEventListener(EVENT_TYPES.DRAG_LEAVE, handleDragLeave as EventListener);
         */
        const handleDragLeave = (e) => {
            e.preventDefault();
            if (!(dropzone === null || dropzone === void 0 ? void 0 : dropzone.contains(e.relatedTarget))) {
                dispatch(CcfContactEditorAction.updateUploadDialogBox({ caseId, isUploadDialogEnabled: false }));
                dropzone === null || dropzone === void 0 ? void 0 : dropzone.classList.remove(ATTRIBUTE_NAME.DRAG_HIGHLIGHT);
            }
        };
        /**
         * method for handling mouse drag-over the editor.
         * @param e - mouse DragEvent
         * @example
         * dropzone?.addEventListener(EVENT_TYPES.DRAG_OVER, handleDragOver as EventListener);
         */
        const handleDragOver = (e) => {
            e.preventDefault();
        };
        /**
         * method for handling file drops onto the editor.
         * @param file - mouse DragEvent
         * @example
         * dropzone?.addEventListener(EVENT_TYPES.DROP, handleDrop as EventListener);
         */
        const handleDrop = (file) => {
            var _a, _b;
            file.preventDefault();
            const files = (_b = (_a = file === null || file === void 0 ? void 0 : file.dataTransfer) === null || _a === void 0 ? void 0 : _a.files) !== null && _b !== void 0 ? _b : new DataTransfer().files;
            onUploadAttachment(files);
            dispatch(CcfContactEditorAction.updateUploadDialogBox({ caseId, isUploadDialogEnabled: false }));
        };
        /**
         * method for handling file paste onto the editor.
         * @param event - mouse/keyboard ClipboardEvent
         * @example
         * dropzone?.addEventListener(EVENT_TYPES.PASTE, handlePaste as EventListener);
         */
        const handlePaste = (event) => {
            var _a, _b;
            event.preventDefault();
            const files = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.files;
            if (files === null || files === void 0 ? void 0 : files.length) {
                // Check if any file in the list is image type
                const containsImageFiles = Array.from(files).some(file => ACCEPTABLE_INLINE_IMAGE_TYPES.some(acceptableType => file.type.startsWith(acceptableType)));
                const htmlData = (_b = event === null || event === void 0 ? void 0 : event.clipboardData) === null || _b === void 0 ? void 0 : _b.getData('text/html');
                // Check if rich text editor is not available or there are not any inline image
                if (!htmlData && (!isRichTextEditor || !containsImageFiles)) {
                    onUploadAttachment(files);
                }
            }
        };
        /**
         * method to prevent opening file on new tab when we drop file outside of editor.
         * @param e - mouse DragEvent
         * @example
         * document.addEventListener(EVENT_TYPES.DRAG_OVER, handleDragOver as EventListener);
         */
        const handlePreventNewTab = (e) => {
            e.preventDefault();
        };
        document.addEventListener(EVENT_TYPES.DRAG_OVER, handlePreventNewTab);
        document.addEventListener(EVENT_TYPES.DROP, handlePreventNewTab);
        dropzone === null || dropzone === void 0 ? void 0 : dropzone.addEventListener(EVENT_TYPES.DRAG_ENTER, handleDragEnter);
        dropzone === null || dropzone === void 0 ? void 0 : dropzone.addEventListener(EVENT_TYPES.DRAG_LEAVE, handleDragLeave);
        dropzone === null || dropzone === void 0 ? void 0 : dropzone.addEventListener(EVENT_TYPES.DRAG_OVER, handleDragOver);
        dropzone === null || dropzone === void 0 ? void 0 : dropzone.addEventListener(EVENT_TYPES.DROP, handleDrop);
        dropzone === null || dropzone === void 0 ? void 0 : dropzone.addEventListener(EVENT_TYPES.PASTE, handlePaste);
        return () => {
            dropzone === null || dropzone === void 0 ? void 0 : dropzone.removeEventListener(EVENT_TYPES.DRAG_ENTER, handleDragEnter);
            dropzone === null || dropzone === void 0 ? void 0 : dropzone.removeEventListener(EVENT_TYPES.DRAG_LEAVE, handleDragLeave);
            dropzone === null || dropzone === void 0 ? void 0 : dropzone.removeEventListener(EVENT_TYPES.DRAG_OVER, handleDragOver);
            dropzone === null || dropzone === void 0 ? void 0 : dropzone.removeEventListener(EVENT_TYPES.DROP, handleDrop);
            dropzone === null || dropzone === void 0 ? void 0 : dropzone.removeEventListener(EVENT_TYPES.PASTE, handlePaste);
            document.removeEventListener(EVENT_TYPES.DROP, handlePreventNewTab);
            document.removeEventListener(EVENT_TYPES.DRAG_OVER, handlePreventNewTab);
        };
    }, []);
    if (showDropMessageDilog) {
        return _jsx(Box, Object.assign({ sx: style }, { children: translate('dropFiles') }));
    }
    return null;
};
//# sourceMappingURL=ccf-drag-drop-paste-plugin.js.map