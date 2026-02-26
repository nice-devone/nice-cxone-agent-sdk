import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../ccf-enhanced-workflow-execute-editor.slice';
declare type InitializeenhancedWorkflowExecuteEditorReturnType = Promise<void>;
/**
 * initialize the enhanced workflow execute editor
 */
declare const _default: import("@reduxjs/toolkit").AsyncThunk<InitializeenhancedWorkflowExecuteEditorReturnType, void, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfEnhancedWorkflowExecuteEditorSlice.enhancedWorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export default _default;
