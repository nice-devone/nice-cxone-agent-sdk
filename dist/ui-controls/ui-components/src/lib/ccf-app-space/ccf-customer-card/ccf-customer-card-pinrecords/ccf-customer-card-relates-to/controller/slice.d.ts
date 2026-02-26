import * as interfaces from './interfaces';
export declare const CcfCustomerCardRelatesToSlice: import("@reduxjs/toolkit").Slice<interfaces.slice.IState, interfaces.slice.IReducers, string>;
export declare const actions: import("@reduxjs/toolkit").CaseReducerActions<interfaces.slice.IReducers, string>;
export declare const reducer: import("redux").Reducer<interfaces.slice.IState, import("redux").AnyAction>;
/**
 * Used for providing to CcfCustomerCardRelatesTo selectors, for targeting specific slice state.
 * @param rootState - AppSpace state
 * @example - const state: interfaces.slice.IState = getState(rootState)
 */
export declare const getState: (rootState: {
    CcfCustomerCardRelatesTo: interfaces.slice.IState;
}) => interfaces.slice.IState;
export declare const selectors: {
    getTarget: ((state: {
        CcfCustomerCardRelatesTo: interfaces.slice.IState;
    }) => {
        id: string | null;
        type: string | null;
        crm: string | null;
        list: any[];
        relationships: interfaces.relationships.IEntity;
        configurationId: string | null;
        workflowId: string | null;
    }) & import("reselect").OutputSelectorFields<(args_0: interfaces.slice.IState) => {
        id: string | null;
        type: string | null;
        crm: string | null;
        list: any[];
        relationships: interfaces.relationships.IEntity;
        configurationId: string | null;
        workflowId: string | null;
    } & {
        clearCache: () => void;
    }> & {
        clearCache: () => void;
    };
    getPinnedRecords: ((state: {
        CcfCustomerCardRelatesTo: interfaces.slice.IState;
    }) => {
        [key: string]: {
            isVisible: boolean;
            elementAttributeOfID: string;
            crm: string;
        };
    }) & import("reselect").OutputSelectorFields<(args_0: interfaces.slice.IState) => {
        [key: string]: {
            isVisible: boolean;
            elementAttributeOfID: string;
            crm: string;
        };
    } & {
        clearCache: () => void;
    }> & {
        clearCache: () => void;
    };
    getEnableRowOpenURL: ((state: {
        CcfCustomerCardRelatesTo: interfaces.slice.IState;
    }) => boolean) & import("reselect").OutputSelectorFields<(args_0: interfaces.slice.IState) => boolean & {
        clearCache: () => void;
    }> & {
        clearCache: () => void;
    };
    getPopoverOpen: ((state: {
        CcfCustomerCardRelatesTo: interfaces.slice.IState;
    }) => boolean) & import("reselect").OutputSelectorFields<(args_0: interfaces.slice.IState) => boolean & {
        clearCache: () => void;
    }> & {
        clearCache: () => void;
    };
    getPopoverList: ((state: {
        CcfCustomerCardRelatesTo: interfaces.slice.IState;
    }) => any[]) & import("reselect").OutputSelectorFields<(args_0: interfaces.slice.IState) => any[] & {
        clearCache: () => void;
    }> & {
        clearCache: () => void;
    };
    getPopoverPosition: ((state: {
        CcfCustomerCardRelatesTo: interfaces.slice.IState;
    }) => {
        top: number;
        left: number;
    }) & import("reselect").OutputSelectorFields<(args_0: interfaces.slice.IState) => {
        top: number;
        left: number;
    } & {
        clearCache: () => void;
    }> & {
        clearCache: () => void;
    };
    getPopoverContainer: ((state: {
        CcfCustomerCardRelatesTo: interfaces.slice.IState;
    }) => unknown) & import("reselect").OutputSelectorFields<(args_0: interfaces.slice.IState) => {
        clearCache: () => void;
    }> & {
        clearCache: () => void;
    };
};
