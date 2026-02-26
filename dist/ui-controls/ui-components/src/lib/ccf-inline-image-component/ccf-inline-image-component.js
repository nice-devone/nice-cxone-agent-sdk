import { jsx as _jsx } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import { $getNodeByKey, $getSelection, $isNodeSelection, $setSelection, CLICK_COMMAND, COMMAND_PRIORITY_LOW, DRAGSTART_COMMAND, KEY_BACKSPACE_COMMAND, KEY_DELETE_COMMAND, KEY_ENTER_COMMAND, KEY_ESCAPE_COMMAND, SELECTION_CHANGE_COMMAND, $isRangeSelection, $isTextNode, $isElementNode, CUT_COMMAND, } from 'lexical';
import { useDispatch } from 'react-redux';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { $isInlineImageNode, InlineImageNode } from '../ccf-editor/ccf-inline-image-plugin/ccf-inline-image-node';
import CcfErrorBoundary from '../ccf-error-boundary/ccf-error-boundary';
import { CcfAssignmentAction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
// Image cache to track loaded images
const imageCache = new Set();
/**
 * Custom hook for handling image loading with suspense.
 * @param src - Source of the image.
 * @example - useSuspenseImage
 */
export function useSuspenseImage(src) {
    if (!imageCache.has(src)) {
        throw new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imageCache.add(src);
                resolve();
            };
        });
    }
}
/**
 * Lazy-loaded image component with suspense.
 * @param altText - Alternative text for the image.
 * @param className - CSS class for the image.
 * @param imageRef - Reference to the image element.
 * @param src - Source of the image.
 * @param width - Width of the image.
 * @param height - Height of the image.
 * @param position - Position of the image.
 * @example - LazyImage
 */
function LazyImage({ altText, className, imageRef, src, width, height, position, uploadedImageId, }) {
    // Using custom hook to handle image loading with suspense
    useSuspenseImage(src);
    return (_jsx("img", { className: className || undefined, src: src, alt: altText, ref: imageRef, "data-position": position, style: {
            height,
            width,
            display: 'block',
        }, draggable: "false", "data-uploaded-image-id": uploadedImageId || undefined }));
}
/**
 * Inline image component for the CCF Editor Toolbar Plugin.
 * @param src - Source of the image.
 * @param altText - Alternative text for the image.
 * @param nodeKey - Key of the node.
 * @param width - Width of the image.
 * @param height - Height of the image.
 * @param showCaption - Whether to show the caption.
 * @param caption - LexicalEditor for the caption.
 * @param position - Position of the image.
 * @param uploadedImageId - ID of the uploaded image.
 * @example - InlineImageComponent
 */
export default function CcfInlineImageComponent({ src, altText, nodeKey, width, height, showCaption, caption, uploadedImageId, position, }) {
    const imageRef = useRef(null);
    const buttonRef = useRef(null);
    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
    const [editor] = useLexicalComposerContext();
    const [selection, setSelection] = useState(null);
    const dispatch = useDispatch();
    const activeEditorRef = useRef(null);
    /**
     * Handler for handling delete key press.
     * @param payload - Keyboard event.
     * @example - handleDelete
     * @returns Whether the delete key press is handled.
     */
    const handleDelete = useCallback((payload) => {
        const selection = $getSelection();
        const selectedNodes = selection ? selection === null || selection === void 0 ? void 0 : selection.getNodes() : [];
        // When a backspace/delete event occurs, we check if an selected range contains inline image or not.
        if ($isRangeSelection(selection)) {
            // the anchor node is the node where the cursor is placed.
            const anchorNode = selection.anchor.getNode();
            // the anchor offset is the position of the cursor in the anchor node.
            const anchorOffset = selection.anchor.offset;
            // Case 1: Cursor at start of text node (check previous sibling) for inline image node. 
            // It checks if image is placed in betewen text nodes.
            if ($isTextNode(anchorNode) && anchorOffset === 0) {
                const prevSibling = anchorNode.getPreviousSibling();
                if (prevSibling instanceof InlineImageNode) {
                    const imageId = prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.__uploadedImageId;
                    if (imageId) {
                        dispatch(CcfAssignmentAction.removeInlineImage(imageId));
                    }
                }
            }
            // Case 2: InlineImageNode is the last node or only node in editor and no text after
            else if ($isElementNode(anchorNode) && anchorOffset > 0) {
                const childBeforeCursor = anchorNode.getChildAtIndex(anchorOffset - 1);
                if (childBeforeCursor instanceof InlineImageNode) {
                    const imageId = childBeforeCursor === null || childBeforeCursor === void 0 ? void 0 : childBeforeCursor.__uploadedImageId;
                    if (imageId) {
                        dispatch(CcfAssignmentAction.removeInlineImage(imageId));
                    }
                }
            }
            // case 3: Multiple inline images selected without text nodes in between
            if ((selectedNodes === null || selectedNodes === void 0 ? void 0 : selectedNodes.length) > 1) {
                for (const node of selectedNodes) {
                    if (node instanceof InlineImageNode) {
                        const imageId = node.__uploadedImageId;
                        if (imageId) {
                            dispatch(CcfAssignmentAction.removeInlineImage(imageId));
                        }
                        node === null || node === void 0 ? void 0 : node.remove();
                    }
                }
            }
        }
        if (isSelected && $isNodeSelection($getSelection())) {
            const event = payload;
            event.preventDefault();
            const node = $getNodeByKey(nodeKey);
            if ($isInlineImageNode(node)) {
                // If image is selected by clicking on it, and then delete key is pressed
                const imageId = node.__uploadedImageId;
                if (imageId) {
                    // Dispatch action to remove the inline image
                    dispatch(CcfAssignmentAction.removeInlineImage(imageId));
                }
                node === null || node === void 0 ? void 0 : node.remove();
            }
            setSelected(false);
            return true;
        }
        return false;
    }, [isSelected, nodeKey, setSelected]);
    /**
   * Handler for handling enter key press.
   * @param event - Keyboard event.
   * @example - handleEnter
   * @returns Whether the enter key press is handled.
   */
    const handleEnter = useCallback((event) => {
        const latestSelection = $getSelection();
        const buttonElem = buttonRef.current;
        if (isSelected &&
            $isNodeSelection(latestSelection) &&
            latestSelection.getNodes().length === 1) {
            if (showCaption) {
                // Move focus into nested editor
                $setSelection(null);
                event.preventDefault();
                caption.focus();
                return true;
            }
            else if (buttonElem !== null && buttonElem !== document.activeElement) {
                event.preventDefault();
                buttonElem.focus();
                return true;
            }
        }
        return false;
    }, [caption, isSelected, showCaption]);
    /**
   * Handler for handling escape key press.
   * @param event - Keyboard event.
   * @example - handleEscape
   * @returns Whether the escape key press is handled.
   */
    const handleEscape = useCallback((event) => {
        if (activeEditorRef.current === caption ||
            buttonRef.current === event.target) {
            $setSelection(null);
            editor.update(() => {
                setSelected(true);
                const parentRootElement = editor.getRootElement();
                if (parentRootElement !== null) {
                    parentRootElement.focus();
                }
            });
            return true;
        }
        return false;
    }, [caption, editor, setSelected]);
    /**
   * Function to register editor commands.
   * @example - registerEditorCommands
   * @returns Merged command registrations.
   */
    const registerEditorCommands = useCallback(() => {
        return mergeRegister(editor.registerCommand(SELECTION_CHANGE_COMMAND, (_, activeEditor) => {
            activeEditorRef.current = activeEditor;
            return false;
        }, COMMAND_PRIORITY_LOW), editor.registerCommand(CLICK_COMMAND, (payload) => {
            const event = payload;
            if (event.target === imageRef.current) {
                if (event.shiftKey) {
                    setSelected(!isSelected);
                }
                else {
                    clearSelection();
                    setSelected(true);
                }
                return true;
            }
            return false;
        }, COMMAND_PRIORITY_LOW), editor.registerCommand(DRAGSTART_COMMAND, (event) => {
            if (event.target === imageRef.current) {
                event.preventDefault();
                return true;
            }
            return false;
        }, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_DELETE_COMMAND, handleDelete, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_BACKSPACE_COMMAND, handleDelete, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_ENTER_COMMAND, handleEnter, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_ESCAPE_COMMAND, handleEscape, COMMAND_PRIORITY_LOW), editor.registerCommand(CUT_COMMAND, handleDelete, COMMAND_PRIORITY_LOW));
    }, [clearSelection, editor, handleDelete, handleEnter, handleEscape, isSelected, setSelected]);
    // Effect hook for setting up listeners and cleanup
    useEffect(() => {
        let isMounted = true;
        const unregister = registerEditorCommands();
        const updateListener = editor.registerUpdateListener(({ editorState }) => {
            if (isMounted) {
                setSelection(editorState.read(() => $getSelection()));
            }
        });
        return () => {
            isMounted = false;
            unregister();
            updateListener();
        };
    }, [registerEditorCommands, editor, setSelection, isSelected, nodeKey, setSelected]);
    const draggable = isSelected && $isNodeSelection(selection);
    const isFocused = isSelected;
    return (_jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfInlineImageComponent' }, { children: _jsx(Suspense, Object.assign({ fallback: null }, { children: _jsx("div", Object.assign({ draggable: draggable, "data-testid": 'lazy-image' }, { children: _jsx(LazyImage, { className: isFocused
                        ? `focused ${$isNodeSelection(selection) ? 'draggable' : ''}`
                        : null, src: src, altText: altText, imageRef: imageRef, width: width, height: height, position: position, uploadedImageId: uploadedImageId }) })) })) })));
}
//# sourceMappingURL=ccf-inline-image-component.js.map