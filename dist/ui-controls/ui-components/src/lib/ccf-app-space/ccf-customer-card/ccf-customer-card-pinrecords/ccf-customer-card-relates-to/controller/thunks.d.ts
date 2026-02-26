import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import * as interfaces from './interfaces';
declare type initializeRelatesToReturnType = Promise<void>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example initializeRelatesTo()
 */
export declare const initializeRelatesTo: import("@reduxjs/toolkit").AsyncThunk<initializeRelatesToReturnType, any, {
    getState: interfaces.slice.IState;
    extra: interfaces.slice.IExtra;
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare enum OnClickOfRelatesToButtonReturnCodes {
    RELATES_TO_IS_NOT_ENABLED = -1,
    BUTTON_STATE_NON_COMPLIANT = -2,
    BUTTON_RECLICKED = -3,
    SUCCESS = 0
}
declare type OnClickOfRelatesToButtonReturnType = Promise<void | OnClickOfRelatesToButtonReturnCodes>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example onClickOfRelatesToButton()
 */
export declare const onClickOfRelatesToButton: import("@reduxjs/toolkit").AsyncThunk<OnClickOfRelatesToButtonReturnType, any, {
    getState: interfaces.slice.IState;
    extra: interfaces.slice.IExtra;
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type RelatesToForServiceNowReturnType = Promise<void>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example relatesToForServiceNow()
 */
export declare const relatesToForServiceNow: import("@reduxjs/toolkit").AsyncThunk<RelatesToForServiceNowReturnType, any, {
    getState: interfaces.slice.IState;
    extra: interfaces.slice.IExtra;
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type RelatesToForSalesforceReturnType = Promise<void>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example relatesToForSalesforce()
 */
export declare const relatesToForSalesforce: import("@reduxjs/toolkit").AsyncThunk<RelatesToForSalesforceReturnType, any, {
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    getState: interfaces.slice.IState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type RelatesToForMsdReturnType = Promise<void>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example relatesToForMsd()
 */
export declare const relatesToForMsd: import("@reduxjs/toolkit").AsyncThunk<RelatesToForMsdReturnType, any, {
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    getState: interfaces.slice.IState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare enum HandleMouseDownEventReturnCodes {
    NO_TARGET_ELEMENT = -1,
    NO_PINNED_RECORD_ID = -2,
    NO_POPOVER_ELEMENT = -3,
    SUCCESS = 0,
    CLICKED_INSIDE_OF_POPOVER = 1,
    CLICKED_BUTTON_FOR_TARGET = 2
}
declare type HandleMouseDownEventReturnType = Promise<void | HandleMouseDownEventReturnCodes>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example handleMouseDownEvent()
 */
export declare const handleMouseDownEvent: import("@reduxjs/toolkit").AsyncThunk<HandleMouseDownEventReturnType, any, {
    getState: interfaces.slice.IState;
    extra: interfaces.slice.IExtra;
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type GenerateListOfRelatableEntitiesReturnType = Promise<void>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example generateListOfRelatableEntities()
 */
export declare const generateListOfRelatableEntities: import("@reduxjs/toolkit").AsyncThunk<GenerateListOfRelatableEntitiesReturnType, any, {
    getState: interfaces.slice.IState;
    extra: interfaces.slice.IExtra;
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk action creator to relate entity to another entity
 * @param args - relatedEntityName, relatedEntityValue
 * @example
 * ```
 * dispatch(relateEntity('sys_customer','123112312-141241214-1412312'))
 * ```
 */
declare type OnClickOfEntityReturnType = Promise<void>;
export declare const onClickOfEntity: import("@reduxjs/toolkit").AsyncThunk<OnClickOfEntityReturnType, any, {
    getState: interfaces.slice.IState;
    extra: interfaces.slice.IExtra;
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type ResetRelatesToPinnedRecordElementAttributeOfIDReturnType = Promise<void>;
/**
 * Thunk action creator to make sure button state is in the correct state when api errors out.
 * @param args - targetId
 * @example
 * ```
 * dispatch(resetRelatesToPinnedRecordElementAttributeOfID({targetId: '123112312-141241214-1412312'}))
 * ```
 */
export declare const resetRelatesToPinnedRecordElementAttributeOfID: import("@reduxjs/toolkit").AsyncThunk<ResetRelatesToPinnedRecordElementAttributeOfIDReturnType, any, {
    getState: interfaces.slice.IState;
    extra: interfaces.slice.IExtra;
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare enum SetPopoverPositionReturnCodes {
    NO_PINNED_RECORD_ID = -1,
    NO_POPOVER_CONTAINER_ELEMENT = -2,
    NO_POPOVER_ELEMENT = -3,
    BUTTON_ELEMENT_COULD_NOT_BE_FOUND = -4,
    SUCCESS = 0
}
declare type SetPopoverPositionReturnType = Promise<void | SetPopoverPositionReturnCodes>;
/**
 * Thunk action creator to make sure button state is in the correct state when api errors out.
 * @param args - targetId
 * @example
 * ```
 * dispatch(SetPopoverPosition({targetId: '123112312-141241214-1412312'}))
 * ```
 */
export declare const setPopoverPosition: import("@reduxjs/toolkit").AsyncThunk<SetPopoverPositionReturnType, void, {
    getState: interfaces.slice.IState;
    extra: interfaces.slice.IExtra;
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare enum HandleResizeReturnCodes {
    POPOVER_IS_NOT_OPEN = -1,
    SUCCESS = 0
}
declare type HandleResizeReturnType = Promise<HandleResizeReturnCodes>;
/**
 * Thunk action for resize handler, governs how the popover should behave on window resize.
 * @param args - targetId
 * @example
 * ```
 * dispatch(handleResize())
 * ```
 */
export declare const handleResize: import("@reduxjs/toolkit").AsyncThunk<HandleResizeReturnType, void, {
    getState: interfaces.slice.IState;
    extra: interfaces.slice.IExtra;
    dispatch: ThunkDispatch<unknown, interfaces.slice.IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export {};
