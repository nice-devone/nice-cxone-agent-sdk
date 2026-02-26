import { Dispatch, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { isFeatureEnabled } from '../../../../util/featureToggleUtils';
import * as CcfCustomerCardSlice from '../ccf-customer-card.slice';
import * as CcfCustomerCardCreate from '../ccf-customer-card-create';
export interface IExtra {
    Logger: typeof Logger;
    CcfCustomerCardSlice: typeof CcfCustomerCardSlice;
    CcfCustomerCardCreate: typeof CcfCustomerCardCreate;
    toast: typeof toast;
    CXoneClient: typeof CXoneClient;
    LocalStorageHelper: typeof LocalStorageHelper;
    StorageKeys: typeof StorageKeys;
    isFeatureEnabled: typeof isFeatureEnabled;
    window: any;
}
declare enum CreateEntityHandleMouseEventReturnCodes {
    NO_POPOVER_REFERENCE = -1,
    CLICK_INSIDE_OF_POPOVER = -2,
    CONFIRMING = -3,
    SUCCESS = 0
}
declare type CreateEntityHandleMouseEventReturnType = Promise<CreateEntityHandleMouseEventReturnCodes>;
declare type CreateEntityHandleMouseEventPayloadType = {
    referenceForPopover: {
        current: any;
    };
    elementTargetFromClick: unknown;
};
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example CreateEntityhandleMouseEvent()
 */
export declare const handleMouseEvent: import("@reduxjs/toolkit").AsyncThunk<CreateEntityHandleMouseEventReturnType, CreateEntityHandleMouseEventPayloadType, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type CreateEntityOnClickOfFeatureReturnType = Promise<void>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example onClick()
 */
export declare const onClickOfFeature: import("@reduxjs/toolkit").AsyncThunk<CreateEntityOnClickOfFeatureReturnType, any, {
    dispatch: ThunkDispatch<unknown, IExtra, AnyAction>;
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type CreateEntityOnClickOfEntityReturnType = Promise<void>;
/**
 * Function for when an entity is clicked in popover.
 * @example onClick()
 */
export declare const onClickOfEntity: import("@reduxjs/toolkit").AsyncThunk<CreateEntityOnClickOfEntityReturnType, any, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type CreateEntityRequestReturnType = Promise<void>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example CreateEntityRequest()
 */
export declare const request: import("@reduxjs/toolkit").AsyncThunk<CreateEntityRequestReturnType, any, {
    dispatch: Dispatch<any>;
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type CreateEntitySearchReturnType = Promise<void>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example search()
 */
export declare const search: import("@reduxjs/toolkit").AsyncThunk<CreateEntitySearchReturnType, any, {
    dispatch: Dispatch<any>;
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type CreateEntityScreenPopReturnType = Promise<void>;
/**
 * Function to handle logic for when a screen pop is needed.
 * @example screenPop()
 */
export declare const screenPop: import("@reduxjs/toolkit").AsyncThunk<CreateEntityScreenPopReturnType, any, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type CreateEntityAddPinRecordToLSReturnType = Promise<void>;
/**
 * Function to handle logic to add newly created record to pinRecord local storage if configured to do so.
 * @example addPinRecordToLS()
 */
export declare const addPinRecordToLS: import("@reduxjs/toolkit").AsyncThunk<CreateEntityAddPinRecordToLSReturnType, any, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const POPOVER_OFFSET_Y = 5;
export declare const POPOVER_OFFSET_X = 123;
declare enum SetPopoverPositionReturnCodes {
    UNABLE_TO_SOURCE_DOCUMENT = -1,
    UNABLE_TO_SOURCE_BUTTON = -2,
    UNABLE_TO_SOURCE_CONTAINER = -3,
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
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    dispatch: Dispatch<AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare enum SetPopoverListReturnCodes {
    UNABLE_TO_SOURCE_SELECTED_INTERACTION_ID = -1,
    SUCCESS = 0
}
declare type SetPopoverListReturnType = Promise<void | SetPopoverListReturnCodes>;
/**
 * Thunk action creator to make sure button state is in the correct state when api errors out.
 * @param args - targetId
 * @example
 * ```
 * dispatch(setPopoverList())
 * ```
 */
export declare const setPopoverList: import("@reduxjs/toolkit").AsyncThunk<SetPopoverListReturnType, void, {
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    dispatch: ThunkDispatch<unknown, IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare enum HandleEventReturnCodes {
    UNABLE_TO_SOURCE_LIST = -3,
    UNABLE_TO_SOURCE_INTERACTION_ID = -2,
    FAILURE = -1,
    SUCCESS = 0
}
declare type HandleEventReturnType = Promise<void | HandleEventReturnCodes>;
declare type HandleEventPayloadType = {
    data: string;
};
/**
 * Thunk action creator to make sure button state is in the correct state when api errors out.
 * @param args - targetId
 * @example
 * ```
 * dispatch(handleEvent())
 * ```
 */
export declare const handleEvent: import("@reduxjs/toolkit").AsyncThunk<HandleEventReturnType, HandleEventPayloadType, {
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    dispatch: ThunkDispatch<unknown, IExtra, AnyAction>;
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
    getState: CcfCustomerCardSlice.CcfCustomerCardState;
    extra: IExtra;
    dispatch: ThunkDispatch<unknown, IExtra, AnyAction>;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export {};
