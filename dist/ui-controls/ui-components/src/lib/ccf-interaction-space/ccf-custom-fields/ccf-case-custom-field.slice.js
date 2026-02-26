import { __awaiter } from "tslib";
import { CcfLogger } from '@nice-devone/agent-sdk';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { ToastMessageType } from '../../../enums/toast-message-type';
/**
  * Initial state assigment
*/
const CcfCustomerCardInitialState = {
    customFieldValues: [],
    customFieldUpdated: false,
    customFieldDefs: [],
    updatedCustomField: [],
    invalidCustomFields: [],
    toastMsg: '',
};
export const CCF_CASE_CUSTOM_FIELD_KEY = 'CcfCaseCustomField';
const logger = new CcfLogger('App.interaction-space', 'case-custom-filed-slice');
export const updateCaseCustomFields = createAsyncThunk('', (customFieldsData, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CXoneDigitalClient.instance.digitalService.updateCaseCustomFields(customFieldsData).then(() => {
            dispatch(CcfCaseCustomFieldAction.storeCaseCustomField(customFieldsData));
            dispatch(CcfCaseCustomFieldAction.storeToastMsgFlag(ToastMessageType.SUCCESS));
        }).catch((error) => {
            var _a, _b, _c, _d;
            const errorResponse = error;
            if (((_b = (_a = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.status) === 400 /* HttpStatusCode.BAD_REQUEST */) {
                dispatch(CcfCaseCustomFieldAction.storeInvalidCustomFields((_d = (_c = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.body));
                dispatch(CcfCaseCustomFieldAction.storeToastMsgFlag(ToastMessageType.INVALID_VALUE));
                logger.error('updateCustomFields', `error while updating custom field - ${JSON.stringify(error)}`);
            }
            else {
                dispatch(CcfCaseCustomFieldAction.storeToastMsgFlag(ToastMessageType.FAILURE));
            }
        });
    }
    catch (error) {
        logger.error('updateCustomFields', `error while updating custom field - ${JSON.stringify(error)}`);
    }
}));
const CcfCustomerCardSlice = createSlice({
    name: CCF_CASE_CUSTOM_FIELD_KEY,
    initialState: CcfCustomerCardInitialState,
    reducers: {
        /**
         * used to storeCaseCustomField
         * @param rootState - AppSpace state
         * @example - storeCaseCustomField(state)
         */
        storeCaseCustomField(state, action) {
            const updatedActivity = JSON.parse(JSON.stringify(state.updatedCustomField));
            if (!updatedActivity.find((item) => item.id === action.payload.id)) {
                if (updatedActivity !== undefined) {
                    updatedActivity.push(action.payload);
                }
            }
            else {
                updatedActivity.map((item) => {
                    if (item.id === action.payload.id) {
                        item.customFields = action.payload.customFields;
                    }
                    return item;
                });
            }
            return Object.assign(Object.assign({}, state), { updatedCustomField: updatedActivity });
        },
        /**
         * used to derive and store invalid custom fields
         * @param rootState - AppSpace state
         * @example - storeInvalidCustomFields(state)
         */
        storeInvalidCustomFields(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state, action) {
            var _a;
            const invalidFields = [];
            (_a = action.payload) === null || _a === void 0 ? void 0 : _a.errors.forEach((error) => {
                var _a, _b;
                if ((error === null || error === void 0 ? void 0 : error.errorCode) === 'invalidValue' && ((_a = error === null || error === void 0 ? void 0 : error.parameters) === null || _a === void 0 ? void 0 : _a.ident)) {
                    invalidFields.push((_b = error === null || error === void 0 ? void 0 : error.parameters) === null || _b === void 0 ? void 0 : _b.ident);
                }
            });
            return Object.assign(Object.assign({}, state), { invalidCustomFields: invalidFields });
        },
        /**
         * used to storeCustomField
         * @param rootState - AppSpace state
         * @example - storeCustomField(state)
         */
        storeToastMsgFlag(state, action) {
            return Object.assign(Object.assign({}, state), { toastMsg: action.payload });
        },
    }
});
export const CcfCaseCustomFieldAction = CcfCustomerCardSlice.actions;
export const CcfCaseCustomFieldReducer = CcfCustomerCardSlice.reducer;
/**
 * used to getInboxState
 * @param rootState - AppSpace state
 * @example - const appSpaceState = getInboxState(state)
 */
const getCustomerCardState = (rootState) => {
    return rootState[CCF_CASE_CUSTOM_FIELD_KEY];
};
export const cxoneCaseCustomFieldsUpdated = createSelector(getCustomerCardState, (state) => state.updatedCustomField);
export const cxoneCustomFieldUpdateFlag = createSelector(getCustomerCardState, (state) => state.toastMsg);
export const cxoneCustomInvalidFieldValues = createSelector(getCustomerCardState, (state) => state.invalidCustomFields);
//# sourceMappingURL=ccf-case-custom-field.slice.js.map