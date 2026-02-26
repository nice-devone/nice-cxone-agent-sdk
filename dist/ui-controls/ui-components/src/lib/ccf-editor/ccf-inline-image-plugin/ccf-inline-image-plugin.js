import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils';
import { $createParagraphNode, $insertNodes, $isRootOrShadowRoot, COMMAND_PRIORITY_EDITOR, createCommand, } from 'lexical';
import { forwardRef, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { $createInlineImageNode, InlineImageNode } from './ccf-inline-image-node';
import { CcfAppToastMessage, CcfImageIcon, CcfBox } from '@nice-devone/ui-controls';
import { CcfAssignmentAction, getIsImageNotSupported, getNonIncomingActiveContactInSelectedInteraction, updateInlineImageToBeUploaded } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useDispatch, useSelector } from 'react-redux';
import { CcfLogger } from '@nice-devone/agent-sdk';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import { $generateHtmlFromNodes } from '@lexical/html';
import useComponentDidUpdate from '../../../hooks/useComponentDidUpdate';
// Command for inserting inline image
export const INSERT_INLINE_IMAGE_COMMAND = createCommand('INSERT_INLINE_IMAGE_COMMAND');
/**
 * Forwarding ref for CcfInsertInlineImageButton component.
 * @param ref - Reference to the component.
 * @example - CcfInsertInlineImageButton
 */
export const CcfInsertInlineImageButton = forwardRef(({ activeEditor }, ref) => {
    const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-inline-image-plugin');
    const hasModifier = useRef(false);
    const dispatch = useDispatch();
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const lexicalString = useRef(null);
    // Ref to keep track of current inline images in the editor
    // This is used to avoid inserting the same image multiple times into editor
    const currentImageRef = useRef([]);
    // Update the lexicalString ref with the HTML representation of the editor content.
    activeEditor.update(() => {
        lexicalString.current = $generateHtmlFromNodes(activeEditor, null);
    });
    const isImageNotSupported = useSelector(getIsImageNotSupported(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
    useComponentDidUpdate(() => {
        var _a;
        if (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.inlineImages) {
            (_a = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.inlineImages) === null || _a === void 0 ? void 0 : _a.forEach((currentInlineImage) => {
                var _a, _b;
                // Check if the current inline image Id is already present in the currentImageRef
                const isImageIdPresent = (currentInlineImage === null || currentInlineImage === void 0 ? void 0 : currentInlineImage.imageId) ? (_a = currentImageRef === null || currentImageRef === void 0 ? void 0 : currentImageRef.current) === null || _a === void 0 ? void 0 : _a.includes(currentInlineImage.imageId) : false;
                // If the current inline image is uploaded and its Id is not already present, then only insert it into the editor
                if ((currentInlineImage === null || currentInlineImage === void 0 ? void 0 : currentInlineImage.uploaded) && !isImageIdPresent) {
                    if (currentInlineImage === null || currentInlineImage === void 0 ? void 0 : currentInlineImage.imageId) {
                        (_b = currentImageRef === null || currentImageRef === void 0 ? void 0 : currentImageRef.current) === null || _b === void 0 ? void 0 : _b.push(currentInlineImage.imageId);
                    }
                    const altText = '';
                    const showCaption = false;
                    const position = 'left';
                    const src = currentInlineImage.url;
                    // below imageId we get after we call the temporary upload API
                    const uploadedImageId = (currentInlineImage === null || currentInlineImage === void 0 ? void 0 : currentInlineImage.imageId) || '';
                    const payload = { altText, src, showCaption, position, uploadedImageId };
                    activeEditor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, payload);
                }
            });
        }
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.inlineImages]);
    // In case of contact switch or component destruction we will update the currentImageRef
    useEffect(() => {
        var _a;
        if (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.inlineImages) {
            (_a = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.inlineImages) === null || _a === void 0 ? void 0 : _a.forEach((currentInlineImage) => {
                var _a;
                if ((currentInlineImage === null || currentInlineImage === void 0 ? void 0 : currentInlineImage.uploaded) && (currentInlineImage === null || currentInlineImage === void 0 ? void 0 : currentInlineImage.imageId)) {
                    (_a = currentImageRef === null || currentImageRef === void 0 ? void 0 : currentImageRef.current) === null || _a === void 0 ? void 0 : _a.push(currentInlineImage.imageId);
                }
            });
        }
    }, []);
    useEffect(() => {
        if (isImageNotSupported) {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "unsupportedImageTypeErrorMessage" }), {
                autoClose: 2000,
                containerId: 'AppToastContainer',
                onClose: () => dispatch(CcfAssignmentAction.updateImageTypeNotSupported(false)),
            });
        }
    }, [isImageNotSupported]);
    /**
     * Function to load and insert image into the editor.
     * @param files - Image files to be loaded.
     * @example - loadInlineImage
     */
    const loadInlineImage = (files) => {
        const reader = new FileReader();
        try {
            reader.onload = function () {
                // we will first updoad image to get uploaded temorary url and once we get url then we will call activeEditor.dispatchCommand
                // to insert in editor 
                if (files.length > 0) {
                    dispatch(updateInlineImageToBeUploaded(files));
                }
                const fileInput = document.getElementById('ccf-inline-images');
                // Reset the files property
                if (fileInput instanceof HTMLInputElement) {
                    fileInput.value = '';
                    fileInput.files = null;
                }
                return '';
            };
            if (files !== null) {
                reader.readAsDataURL(files[0]);
            }
        }
        catch (error) {
            // Handle any errors that might occur during file reading
            ccfLogger.error('loadInlineImage', `error while reading file - ${JSON.stringify(error)}`);
        }
    };
    useEffect(() => {
        hasModifier.current = false;
        /**
         * Effect to handle the alt key modifier.
         * @param e - Keyboard event.
         * @example - handler
         */
        const handler = (e) => {
            hasModifier.current = e.altKey;
        };
        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [activeEditor]);
    return (_jsxs(CcfErrorBoundary, Object.assign({ componentName: 'CcfInsertInlineImageButton' }, { children: [_jsx("input", { hidden: true, multiple: true, type: "file", accept: "image/*", "data-testid": 'inline-files', onChange: (event) => { var _a; return loadInlineImage((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.files); }, ref: ref }), _jsx("section", { children: _jsx(CcfBox, Object.assign({ style: { width: 'max-content', display: 'flex' } }, { children: _jsx(CcfImageIcon, { style: Object.assign({ color: '#526b7a', cursor: 'hand' }) }) })) })] })));
});
/**
 * Main CcfInlineImagePlugin component.
 * @param captionsEnabled - Flag to determine if captions are enabled.
 * @example - CcfInlineImagePlugin
 */
export default function CcfInlineImagePlugin({ captionsEnabled, }) {
    // Using LexicalComposerContext hook to get the editor instance
    const [editor] = useLexicalComposerContext();
    const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-inline-image-plugin');
    useEffect(() => {
        // Checking if InlineImageNode is registered on the editor
        if (!editor.hasNodes([InlineImageNode])) {
            ccfLogger.error('CcfInlineImagePlugin', 'ImageNode not registered on editor');
        }
        // Registering the command for inserting inline image
        return mergeRegister(editor.registerCommand(INSERT_INLINE_IMAGE_COMMAND, (payload) => {
            const imageNode = $createInlineImageNode(payload);
            $insertNodes([imageNode]);
            // Wrapping the image node in a paragraph if it's at the root or shadow root
            if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
            }
            return true;
        }, COMMAND_PRIORITY_EDITOR));
    }, [captionsEnabled, editor]);
    return null;
}
//# sourceMappingURL=ccf-inline-image-plugin.js.map