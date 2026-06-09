import { __awaiter } from "tslib";
import { openDB, deleteDB } from 'idb';
import { IndexDBStoreNames } from './enum/indexDB-store-names';
let db;
const DB_NAME = 'nice-cxone-ccf';
//If changes made to IndexDB store is not reflecting, make sure that DB_VERSION is updated to a higher version than that of the previous one.
//https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest/upgradeneeded_event
const DB_VERSION = Number(Object.keys(IndexDBStoreNames).length);
/**
 * Used to get the indexDB instance.
 * When we create new instance of 'dbInstance', the "upgrade" callback is only called when DB_VERSION is higher than the previous one.
 * @example -
 * ```
 * const db = dbInstance();
 * ```
 */
export const dbInstance = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!db) {
        db = yield openDB(DB_NAME, DB_VERSION, {
            /**
             * callback to upgrade the db once instantiated
             * @param db - db instance
             * @example -
             */
            upgrade(db) {
                Object.values(IndexDBStoreNames).forEach((storeName) => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName);
                    }
                });
            },
        });
    }
    return db;
});
/**
 * Used to delete the index db instance
 * @example
 * ```
 * deleteDbInstance();
 * ```
 */
export const deleteDbInstance = () => __awaiter(void 0, void 0, void 0, function* () {
    yield deleteDB(DB_NAME);
});
/**
 * Used to clear the particular store from the indexDB
 * @param indexDBstoreName - store name which needs to be cleared out
 * @example -
 * ```
 * await clearIndexDbStore("Directory");
 * ```
 */
export const clearIndexDbStore = (indexDBstoreName) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDb = db || (yield dbInstance());
    yield currentDb.clear(indexDBstoreName);
});
/**
 * Used to clear the particular key from the indexDB store
 * @param indexDBstoreName - store name
 * @param key - key name which needs to be cleared out
 * @example -
 * ```
 * await clearIndexDbKey("Directory", "allSkills");
 * ```
 */
export const clearIndexDbKey = (indexDBstoreName, key) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDb = db || (yield dbInstance());
    yield currentDb.delete(indexDBstoreName, key);
});
//# sourceMappingURL=indexDB.js.map