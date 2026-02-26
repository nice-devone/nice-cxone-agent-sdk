import { PayloadAction } from '@reduxjs/toolkit';
import { CXoneDigitalContactSearchData, ECCRequest } from '@nice-devone/common-sdk';
export declare type EccReduxInteractionData = {
    customerId: string;
    customerPoc: string;
    externalAgentId: string;
    externalInteractionId: string;
    externalThreadId: string;
};
export declare type lvAppSpaceState = {
    clientId?: number;
    clientSettings?: Record<string, string>;
    currentInteraction?: CXoneDigitalContactSearchData;
    isLvInteractionsSyncEnabled?: boolean;
    lvVersion?: string;
};
export declare const SMART_REACH_KEY = "lvAppSpace";
export declare const initialLvAppSpaceState: lvAppSpaceState;
export declare const syncExperienceRecord: import("@reduxjs/toolkit").AsyncThunk<{
    uuid: string | undefined;
    data: {
        customerId: string;
        customerPoc: string;
        externalAgentId: string;
        externalInteractionId: string;
        externalThreadId: string;
    };
} | undefined, ECCRequest, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const lvAppSpaceSlice: import("@reduxjs/toolkit").Slice<lvAppSpaceState, {
    /**
     * Stores to get the current selected interaction, this interaction refers to the
     * selected ccf-search-interaction row
     * @param state - lv space state
     * @param action - `PayloadAction<LvCustomerType['currentInteraction']>`
     * @example
     * ```
     * dispatch(setLvCurrentInteraction({ caseId: '1234', contactId: '1234', ... }))
     * ```
     */
    setLvCurrentInteraction(state: import("immer/dist/internal").WritableDraft<lvAppSpaceState>, action: PayloadAction<lvAppSpaceState['currentInteraction']>): void;
    /**
     * clear current active interaction for lv customer card
     * @param state - lv space state
     * @example
     * ```
     * dispatch(clearLvCurrentInteraction())
     * ```
     */
    clearLvCurrentInteraction(state: import("immer/dist/internal").WritableDraft<lvAppSpaceState>): void;
    /**
     * Set client settings for lv app space
     * @param state - lv space state
     * @param action - `PayloadAction<LvCustomerType['clientSettings']>`
     * @example
     * ```
     * dispatch(setLvClientSettings({
     *    smartReachBaseUrl: 'https://tst2.livevox.net',
     *    smartReachClientCode: 'QAE_SGC_MANUAL_27_TST2'
     * }))
     * ```
     */
    setLvClientSettings(state: import("immer/dist/internal").WritableDraft<lvAppSpaceState>, action: PayloadAction<lvAppSpaceState['clientSettings']>): void;
    /**
     * Set the LV clientId for lv app space
     * @param state - lv space state
     * @param action - `PayloadAction<LvCustomerType['clientSettings']>`
     * @example
     * ```
     * dispatch(setLvClientId(12345))
     * ```
     */
    setLvClientId(state: import("immer/dist/internal").WritableDraft<lvAppSpaceState>, action: PayloadAction<lvAppSpaceState['clientId']>): void;
    /**
     * clear client settings for lv customer card
     * @param state - lv space state
     * @example
     * ```
     * dispatch(clearLvClientSettings())
     * ```
     */
    clearLvClientSettings(state: import("immer/dist/internal").WritableDraft<lvAppSpaceState>): void;
    /**
     * Sets the lvVersion
     * @param state - lv space state
     * @param action - `PayloadAction<string>`
     * @example
     * ```
     * dispatch(setLvVersion('26.1'))
     * ```
     */
    setLvVersion(state: import("immer/dist/internal").WritableDraft<lvAppSpaceState>, action: PayloadAction<lvAppSpaceState['lvVersion']>): void;
    /**
     * Enables or disables LV interactions synchronization through Lambda.
     * @param state - lv app space state
     * @param action - `PayloadAction<boolean | undefined>`
     * @example
     * ```
     * dispatch(setIsLvInteractionsSyncEnabled(false))
     * ```
     */
    setIsLvInteractionsSyncEnabled(state: import("immer/dist/internal").WritableDraft<lvAppSpaceState>, action: PayloadAction<lvAppSpaceState['isLvInteractionsSyncEnabled']>): void;
}, "lvAppSpace">;
/**
 * used to get the LvClientSettings
 * @param rootState - AppSpace state
 * @example
 * ```
 * const { smartReachBaseUrl, smartReachClientCode } = useSelector(selectLvClientSettings);
 * ```
 */
export declare const selectLvClientSettings: ((state: {
    lvAppSpace: lvAppSpaceState;
}) => Record<string, string>) & import("reselect").OutputSelectorFields<(args_0: lvAppSpaceState) => Record<string, string> & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get the current selected interaction, this interaction refers to the
 * selected ccf-search-interaction row
 * @param rootState - AppSpace state
 * @example
 * ```
 * const currentInteraction = useSelector(selectLvCurrentInteraction);
 * ```
 */
export declare const selectLvCurrentInteraction: ((state: {
    lvAppSpace: lvAppSpaceState;
}) => import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>>;
    preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    interactionId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    inboxAssignee: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    inboxAssigneeUser: any;
    threadIdOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    authorEndUserIdentity: any;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    inboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    outboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    ownerAssigneeUser: any;
    routingQueueId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUser: any;
    statusUpdatedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    inboxAssigneeLastAssignedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[]>;
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>> | undefined) & import("reselect").OutputSelectorFields<(args_0: lvAppSpaceState) => import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>>;
    preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    interactionId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    inboxAssignee: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    inboxAssigneeUser: any;
    threadIdOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    authorEndUserIdentity: any;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    inboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    outboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    ownerAssigneeUser: any;
    routingQueueId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUser: any;
    statusUpdatedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    inboxAssigneeLastAssignedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[]>;
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>> & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get the current livevox version
 * @param rootState - AppSpace state
 * @example
 * ```
 * const lvVersion = useSelector(selectLvVersion);
 * ```
 */
export declare const selectLvVersion: ((state: {
    lvAppSpace: lvAppSpaceState;
}) => string | undefined) & import("reselect").OutputSelectorFields<(args_0: lvAppSpaceState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get the current livevox client id
 * @param rootState - AppSpace state
 * @example
 * ```
 * const lvVersion = useSelector(selectLvClientId);
 * ```
 */
export declare const selectLvClientId: ((state: {
    lvAppSpace: lvAppSpaceState;
}) => number | undefined) & import("reselect").OutputSelectorFields<(args_0: lvAppSpaceState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get the current Mayor livevox version
 * @param rootState - AppSpace state
 * @example
 * ```
 * const lvVersion = useSelector(selectLvMayorVersion);
 * ```
 */
export declare const selectLvMayorVersion: ((state: {
    lvAppSpace: lvAppSpaceState;
}) => string | undefined) & import("reselect").OutputSelectorFields<(args_0: lvAppSpaceState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Selector to get the flag indicating if LV interactions sync through Lambda is enabled.
 * @param rootState - AppSpace state
 * @example
 * ```
 * const isLvInteractionsSyncEnabled = useSelector(selectIsLvInteractionsSyncEnabled);
 * ```
 */
export declare const selectIsLvInteractionsSyncEnabled: ((state: {
    lvAppSpace: lvAppSpaceState;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: lvAppSpaceState) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const lvAppSpaceReducer: import("redux").Reducer<lvAppSpaceState, import("redux").AnyAction>;
export declare const clearLvClientSettings: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"lvAppSpace/clearLvClientSettings">, clearLvCurrentInteraction: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"lvAppSpace/clearLvCurrentInteraction">, setIsLvInteractionsSyncEnabled: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<boolean | undefined, "lvAppSpace/setIsLvInteractionsSyncEnabled">, setLvClientId: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<number | undefined, "lvAppSpace/setLvClientId">, setLvClientSettings: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Record<string, string> | undefined, "lvAppSpace/setLvClientSettings">, setLvCurrentInteraction: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    routingQueuePriority: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isPrivateChannel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    sla: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
        firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
        solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Lazy").default<any, any> | import("yup/lib/Reference").default<unknown>;
            raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>>;
    }>>>;
    preview: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    interactionId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
        selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    inboxAssignee: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    inboxAssigneeUser: any;
    threadIdOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    authorEndUserIdentity: any;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    inboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    outboundCount: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    ownerAssigneeUser: any;
    routingQueueId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    endUser: any;
    statusUpdatedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    inboxAssigneeLastAssignedAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[]>;
    endUserRecipients: any;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>> | undefined, "lvAppSpace/setLvCurrentInteraction">, setLvVersion: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string | undefined, "lvAppSpace/setLvVersion">;
declare const _default: import("redux").Reducer<lvAppSpaceState, import("redux").AnyAction>;
export default _default;
