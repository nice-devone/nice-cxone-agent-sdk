import { Store } from '@reduxjs/toolkit';
export declare const rootEpic: import("redux-observable").Epic<import("redux").Action<any>, {
    payload: undefined;
    type: "global/default";
}, any, {
    store: Store<any, import("redux").AnyAction>;
}>;
declare const store: Store;
export default store;
