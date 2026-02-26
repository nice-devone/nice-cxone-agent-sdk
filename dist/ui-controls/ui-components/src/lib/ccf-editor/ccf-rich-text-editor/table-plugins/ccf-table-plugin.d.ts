import { EditorThemeClasses, Klass, LexicalEditor, LexicalNode } from 'lexical';
import * as React from 'react';
export declare type CellContextShape = {
    cellEditorConfig: null | CellEditorConfig;
    cellEditorPlugins: null | JSX.Element | Array<JSX.Element>;
    set: (cellEditorConfig: null | CellEditorConfig, cellEditorPlugins: null | JSX.Element | Array<JSX.Element>) => void;
};
export declare type CellEditorConfig = Readonly<{
    namespace: string;
    nodes?: ReadonlyArray<Klass<LexicalNode>>;
    onError: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    theme?: EditorThemeClasses;
}>;
export declare const CellContext: React.Context<CellContextShape>;
/**
 * Compoenet to return the context of selected cell
 * @example <TableContext/>
 * @returns selected cell context
 */
export declare function TableContext({ children }: {
    children: JSX.Element;
}): JSX.Element;
