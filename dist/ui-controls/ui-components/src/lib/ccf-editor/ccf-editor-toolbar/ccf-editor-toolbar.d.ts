/// <reference types="react" />
import { RICH_TOOLBAR_BUTTONS } from '../ccf-editor-toolbar-plugin/ccf-editor-toolbar-plugin.style';
import { ElementFormatType } from 'lexical';
export interface CcfEditorToolbarProps {
    styles: {
        toolbar: object;
        button: object;
        revampedButton?: object;
        buttonActive?: object;
        focussedElement?: object;
    };
    changeFontFamily: (e: any) => void;
    changeFontSize: (e: any) => void;
    onBoldClick: (e: any) => void;
    onItalicClick: (e: any) => void;
    onUnderLineClick: (e: any) => void;
    onOrderedListClick: () => void;
    onUnOrderedListClick: () => void;
    onLeftAlignClick?: () => void;
    onRightAlignClick?: () => void;
    onCenterAlignClick?: () => void;
    onColorSelect: (id: string | null, group: string) => void;
    hightlightBtn?: any;
    hightlightUnderlineBtn?: any;
    hightlightItalicBtn?: any;
    hightlightBulletedListBtn?: any;
    hightlightNumberedListBtn?: any;
    hightlightAlignBtn?: any;
    highlightDirectionBtn?: string;
    applyDirection?: (direction: RICH_TOOLBAR_BUTTONS.LTR | RICH_TOOLBAR_BUTTONS.RTL, alignmentStyle: ElementFormatType) => void;
    displayNewEmailButtons?: boolean;
    toggleTextFormatBar?: (e: React.KeyboardEvent<HTMLSpanElement>) => void;
    setIsColorpickerOpen?: () => void;
}
/**
 * Component displays Rich text Editor controls
 * @returns Rich text Editor controls
 * ```
 * @example
 * <CcfEditorToolbar/>
 * ```
 */
export declare function CcfEditorToolbar(props: CcfEditorToolbarProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfEditorToolbar>;
export default _default;
