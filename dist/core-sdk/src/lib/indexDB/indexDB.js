import { __awaiter } from "tslib";
import { openDB, deleteDB } from 'idb';
import { IndexDBStoreNames } from './enum/indexDB-store-names';
let db;
const DB_NAME = 'nice-cxone-ccf', DB_VERSION = Number(1 + '.' + Object.keys(IndexDBStoreNames).length); //Dynamic version number to update the DB everytime new objectSTore is introduced
/**
 * Used to get the indexDB instance
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