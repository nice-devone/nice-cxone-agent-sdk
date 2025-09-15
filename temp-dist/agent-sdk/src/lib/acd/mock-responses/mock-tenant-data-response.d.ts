import { CXoneTenant } from '../cxone-tenant/cxone-tenant';
export declare const mockTenantDataResponse: CXoneTenant & {
    tenantId: string;
    tenantName: string;
    schemaName: string;
    parentId: string;
    partnerId: string;
    source: string;
    creationDate: string;
    expirationDate: string;
    status: string;
    type: string;
    timezone: string;
    customerType: string;
    clusterId: string;
    billingId: string;
    billingCycle: number;
    billingTelephoneNumber: string;
    metaData: {
        licenses: string;
    };
    licenses: ({
        applicationId: string;
        productId: string;
        featureIds: number[];
        settings: {
            smartReachClientCode: string;
            smartReachBaseURL: string;
            smartReachBaseUrl: string;
            wfm_acd_integration?: undefined;
        };
    } | {
        applicationId: string;
        productId: string;
        featureIds: number[];
        settings: {
            wfm_acd_integration: string;
            smartReachClientCode?: undefined;
            smartReachBaseURL?: undefined;
            smartReachBaseUrl?: undefined;
        };
    })[];
    userSoftLimit: number;
    presenceSyncEnabled: boolean;
    directorySyncEnabled: boolean;
    availableForDeletion: boolean;
    tenantFlowCheck: {
        uhAccountCreated: boolean;
        roleSynced: boolean;
        userCreated: boolean;
        syncWithACDFinished: boolean;
        syncedWithACD: boolean;
        lacreated: boolean;
    };
    markedForDeletion: boolean;
    applicationUserDetails: any[];
    hasProcessRights: boolean;
    systemType: string;
    templateVersion: number;
    disableImpersonateAndSupport: boolean;
    disableImpersonateAndConfigure: boolean;
    converted: boolean;
    modificationDate: string;
    tenantBusinessOwner: string;
    lineOfBusiness: string;
    owner: {};
    segmentationEnabled: string;
    adjustViewsLimitEnabled: boolean;
};
