import { __awaiter } from "tslib";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { isMimeType, mediaFileReader } from '@lexical/utils';
import { COMMAND_PRIORITY_LOW, COPY_COMMAND, PASTE_COMMAND } from 'lexical';
import { updateInlineImageToBeUploaded } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfLogger } from '@nice-devone/agent-sdk';
/**
 * List of acceptable image MIME types.
 */
export const ACCEPTABLE_INLINE_IMAGE_TYPES = [
    'image/',
    'image/heic',
    'image/heif',
    'image/gif',
    'image/webp'
];
/**
 * CcfPasteInlineImage - Main component for handling drag and drop paste in the lexical editor.
 * @returns null
 * @example - <CcfPasteInlineImage />
 */
export default function CcfPasteInlineImage() {
    const [editor] = useLexicalComposerContext();
    const dispatch = useDispatch();
    const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-paste-inline-image');
    /**
       * Handles the paste event for files, reading the files and dispatching an action
       * to update the inline image to be uploaded if the files are of acceptable MIME types.
       *
       * @param files - The list of files to handle.
       * @returns Always returns true.
       * @example handleFilePaste(files)
      */
    const handleFilePaste = (files) => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const filesList = Array.from(files);
            const filesResult = yield mediaFileReader(filesList, [ACCEPTABLE_INLINE_IMAGE_TYPES].flatMap((imageType) => imageType));
            const validFilesToPaste = [];
            for (const { file } of filesResult) {
                if (isMimeType(file, ACCEPTABLE_INLINE_IMAGE_TYPES)) {
                    validFilesToPaste.push(file);
                }
            }
            try {
                if ((validFilesToPaste === null || validFilesToPaste === void 0 ? void 0 : validFilesToPaste.length) > 0) {
                    // convert validFiles back to a FileList type as parseFileListAndUpload requires a FileList
                    const dataTransfer = new DataTransfer();
                    validFilesToPaste.forEach((file) => { var _a; return (_a = dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.items) === null || _a === void 0 ? void 0 : _a.add(file); });
                    dispatch(updateInlineImageToBeUploaded(dataTransfer.files));
                }
            }
            catch (error) {
                ccfLogger.error('handleFilePaste', `Error processing valid files while pasting- ${JSON.stringify(error)}`);
            }
        }))();
        return true;
    };
    useEffect(() => {
        /**
         * Registers the paste command to handle the paste event.
         */
        const registerPasteCommand = editor.registerCommand(PASTE_COMMAND, (event) => {
            var _a;
            const clipboardData = event.clipboardData;
            const htmlData = (_a = event === null || event === void 0 ? void 0 : event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('text/html'); //get the clipboard data and check if it is copied from excel
            if (clipboardData && !htmlData) {
                const files = clipboardData.files;
                if ((files === null || files === void 0 ? void 0 : files.length) > 0) {
                    return handleFilePaste(files);
                }
            }
            return false;
        }, COMMAND_PRIORITY_LOW);
        /**
         * Registers the copy command to handle the copy event.
         */
        const registerCopyCommand = editor.registerCommand(COPY_COMMAND, (clipBoardEvent) => {
            const clipboardData = clipBoardEvent.clipboardData;
            if (clipboardData) {
                const files = clipboardData.files;
                if ((files === null || files === void 0 ? void 0 : files.length) > 0) {
                    return handleFilePaste(files);
                }
            }
            return false;
        }, COMMAND_PRIORITY_LOW);
        // Unregister the commands on cleanup
        return () => {
            registerPasteCommand();
            registerCopyCommand();
        };
    }, [editor]);
    return null;
}
//# sourceMappingURL=ccf-paste-inline-image.js.map