export const initialState = {
    target: {
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
    },
    pinnedRecords: {},
    enableRowOpenURL: false,
    popover: {
        element: null,
        isOpen: false,
        list: [],
        boundingClientRect: {},
        position: {
            top: 0,
            left: 0,
        },
        container: {
            element: null,
        },
    },
};
export const key = 'CcfCustomerCardRelatesTo';
//# sourceMappingURL=slice.js.map