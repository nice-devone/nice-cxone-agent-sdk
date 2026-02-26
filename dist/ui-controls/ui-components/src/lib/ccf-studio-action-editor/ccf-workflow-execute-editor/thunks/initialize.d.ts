import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import * as CcfWorkflowExecuteEditorSlice from '../../ccf-workflow-execute-editor/ccf-workflow-execute-editor.slice';
declare type InitializeWorkflowExecuteEditorReturnType = Promise<-1 | -2 | -3 | -4 | -5 | 0>;
/**
 * initialize the workflow execute editor
 */
declare const _default: import("@reduxjs/toolkit").AsyncThunk<InitializeWorkflowExecuteEditorReturnType, void, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export default _default;
