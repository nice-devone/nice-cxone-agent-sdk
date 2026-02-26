/// <reference types="react" />
/**
 * interface for UpdatePlugin
 */
export interface UpdateEditorContentPluginProps {
    /**
     * @remarks  selected digital contact case Id
     */
    caseId: string;
    /**
    * @remarks  selected digital contact case wysiwygEnabled
    */
    wysiwygEnabled: boolean;
    /**
     * @remarks Restrict focus on editor on digitalContactUserSavedProeprties update
     */
    focusEditor: boolean;
}
/**
 * Component enables the edior draft space to be updated by external action
 * @returns no jsx
 * ```
 * @example
 * <UpdatePlugin/>
 * ```
 */
export declare const UpdateEditorContentPlugin: import("react").MemoExoticComponent<({ caseId, wysiwygEnabled, focusEditor }: UpdateEditorContentPluginProps) => null>;
