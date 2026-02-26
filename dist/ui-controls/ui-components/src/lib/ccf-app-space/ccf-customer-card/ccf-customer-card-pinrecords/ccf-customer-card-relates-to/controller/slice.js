import { createSelector, createSlice, } from '@reduxjs/toolkit';
import * as constants from './constants';
export const CcfCustomerCardRelatesToSlice = createSlice({
    name: constants.slice.key,
    initialState: constants.slice.initialState,
    reducers: {
        resetTarget: (state) => (Object.assign(Object.assign({}, state), { target: {
                id: null,
                type: null,
                crm: null,
                list: [],
                relationships: {
                    relatableEntities: [],
                    relateableEntityFields: {},
                },
                configurationId: null,
                workflowId: null,
            } })),
        setTarget: (state, action) => (Object.assign(Object.assign({}, state), { target: Object.assign(Object.assign({}, state.target), { id: action.payload.id, type: action.payload.type, crm: action.payload.crm, relationships: action.payload.relationships, configurationId: action.payload.configurationId, workflowId: action.payload.workflowId }) })),
        setPinnedRecords: (state, action) => (Object.assign(Object.assign({}, state), { pinnedRecords: action.payload.pinnedRecords })),
        setEnableRowOpenURL: (state, action) => {
            var _a;
            return (Object.assign(Object.assign({}, state), { enableRowOpenURL: (_a = action.payload.enableRowOpenURL) !== null && _a !== void 0 ? _a : false }));
        },
        updatePinnedRecordElementAttributeOfID: (state, action) => {
            const { pinnedRecordEntityId, elementAttributeOfID } = action.payload;
            const pinnedRecords = Object.assign({}, state.pinnedRecords);
            if (Object.keys(pinnedRecords).includes(pinnedRecordEntityId)) {
                pinnedRecords[pinnedRecordEntityId] = Object.assign(Object.assign({}, state.pinnedRecords[pinnedRecordEntityId]), { elementAttributeOfID });
            }
            return Object.assign(Object.assign({}, state), { pinnedRecords });
        },
        hidePopover: (state) => (Object.assign(Object.assign({}, state), { popover: Object.assign(Object.assign({}, state.popover), { isOpen: false }) })),
        showPopover: (state) => (Object.assign(Object.assign({}, state), { popover: Object.assign(Object.assign({}, state.popover), { isOpen: true }) })),
        setPopoverList: (state, action) => (Object.assign(Object.assign({}, state), { popover: Object.assign(Object.assign({}, state.popover), { list: action.payload.list }) })),
        setPopoverPosition: (state, action) => (Object.assign(Object.assign({}, state), { popover: Object.assign(Object.assign({}, state.popover), { position: {
                    top: action.payload.top,
                    left: action.payload.left,
                } }) })),
        setPopoverElement: (state, action) => (Object.assign(Object.assign({}, state), { popover: Object.assign(Object.assign({}, state.popover), { element: action.payload.element }) })),
        setPopoverContainerElement: (state, action) => (Object.assign(Object.assign({}, state), { popover: Object.assign(Object.assign({}, state.popover), { container: Object.assign(Object.assign({}, state.popover.container), { element: action.payload.element }) }) })),
    },
});
export const actions = CcfCustomerCardRelatesToSlice.actions;
export const reducer = CcfCustomerCardRelatesToSlice.reducer;
/**
 * Used for providing to CcfCustomerCardRelatesTo selectors, for targeting specific slice state.
 * @param rootState - AppSpace state
 * @example - const state: interfaces.slice.IState = getState(rootState)
 */
export const getState = (rootState) => rootState[constants.slice.key];
export const selectors = {
    getTarget: createSelector(getState, (state) => state.target),
    getPinnedRecords: createSelector(getState, (state) => state.pinnedRecords),
    getEnableRowOpenURL: createSelector(getState, (state) => state.enableRowOpenURL),
    getPopoverOpen: createSelector(getState, (state) => state.popover.isOpen),
    getPopoverList: createSelector(getState, (state) => state.popover.list),
    getPopoverPosition: createSelector(getState, (state) => state.popover.position),
    getPopoverContainer: createSelector(getState, (state) => state.popover.container.element),
};
//# sourceMappingURL=slice.js.map