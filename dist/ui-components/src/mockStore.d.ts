import { AnyAction, Reducer } from '@reduxjs/toolkit';
/**
 * Method to combine the reducers
 * @example
 */
export declare const rootReducer: Reducer;
export declare const mockStore: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<any, AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<any, AnyAction, undefined>]>;
