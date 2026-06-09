export interface TenantFlowCheck {
    uhAccountCreated: boolean;
    roleSyncFinished?: boolean;
    roleSynced: boolean;
    userCreateFinished?: boolean;
    userCreated: boolean;
    syncWithACDFinished: boolean;
    syncedWithACD: boolean;
    lacreateFinished?: boolean;
    lacreated: boolean;
}
