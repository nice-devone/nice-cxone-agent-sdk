import { CaseReducer, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { Logger } from '@nice-devone/core-sdk';
import * as CcfCustomerCardRelatesTo from '../../../ccf-customer-card-relates-to';
import * as relationships from './relationships';
export interface IState {
    target: {
        id: string | null;
        type: string | null;
        crm: string | null;
        list: any[];
        relationships: relationships.IEntity;
        configurationId: string | null;
        workflowId: string | null;
    };
    pinnedRecords: {
        [key: string]: {
            isVisible: boolean;
            elementAttributeOfID: string;
            crm: string;
        };
    };
    enableRowOpenURL: boolean;
    popover: {
        element: unknown;
        isOpen: boolean;
        list: any[];
        boundingClientRect: object;
        position: {
            top: number;
            left: number;
        };
        container: {
            element: unknown;
        };
    };
}
export interface IExtra {
    Logger: typeof Logger;
    CXoneClient: typeof CXoneClient;
    toast: typeof toast;
    CcfCustomerCardRelatesTo: typeof CcfCustomerCardRelatesTo;
}
export interface IReducers extends SliceCaseReducers<IState> {
    resetTarget: CaseReducer<IState>;
    setTarget: CaseReducer<IState, PayloadAction<{
        id: string | null;
        type: string | null;
        crm: string | null;
        relationships: relationships.IEntity;
        configurationId: string | null;
        workflowId: string | null;
    }>>;
    setPinnedRecords: CaseReducer<IState, PayloadAction<{
        pinnedRecords: {
            [key: string]: {
                isVisible: boolean;
                elementAttributeOfID: string;
                crm: string;
            };
        };
    }>>;
    setEnableRowOpenURL: CaseReducer<IState, PayloadAction<{
        enableRowOpenURL: boolean;
    }>>;
    updatePinnedRecordElementAttributeOfID: CaseReducer<IState, PayloadAction<{
        pinnedRecordEntityId: string;
        elementAttributeOfID: string;
    }>>;
    hidePopover: CaseReducer<IState>;
    showPopover: CaseReducer<IState>;
    setPopoverList: CaseReducer<IState, PayloadAction<{
        list: unknown[];
    }>>;
    setPopoverPosition: CaseReducer<IState, PayloadAction<{
        top: number;
        left: number;
    }>>;
    setPopoverElement: CaseReducer<IState, PayloadAction<{
        element: unknown;
    }>>;
    setPopoverContainerElement: CaseReducer<IState, PayloadAction<{
        element: unknown;
    }>>;
}
