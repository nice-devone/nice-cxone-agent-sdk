export interface IControllerLocalStorage {
    LocalStorageHelper: unknown;
    StorageKeys: unknown;
    getListsFromLocalStorage(): unknown;
    setListByInteraction(id: string, list: unknown[]): void;
    removeListByInteraction(data: unknown): void;
}
