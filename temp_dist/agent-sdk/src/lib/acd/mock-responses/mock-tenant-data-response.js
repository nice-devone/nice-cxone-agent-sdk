import { CXoneTenant } from '../cxone-tenant/cxone-tenant';
const tenant = new CXoneTenant();
const tenantDataResponse = {
    tenantId: '11ef1287-04bf-8540-8a7e-0242ac110004',
    tenantName: 'perm_lvox_pmi_2',
    schemaName: 'perm_lvox_pmi_233304239',
    parentId: '11e70887-e9a2-feb0-88e0-0242ac110004',
    partnerId: '11e70887-e9a2-feb0-88e0-0242ac110004',
    source: 'tm-webapp',
    creationDate: '2024-05-15T06:47:38.140+00:00',
    expirationDate: '3000-01-01T00:00:00.000+00:00',
    status: 'ACTIVE',
    type: 'INTERNAL_TEST',
    timezone: 'America/Los_Angeles',
    customerType: 'BASIC',
    clusterId: 'DO38',
    billingId: '1386874304',
    billingCycle: 1,
    billingTelephoneNumber: '5645654654',
    metaData: {
        licenses: '25',
    },
    licenses: [
        {
            applicationId: 'SMARTREACH',
            productId: 'EVOLVE',
            featureIds: [3500],
            settings: {
                smartReachClientCode: 'QAE_SGC_Manual_25_STG4',
                smartReachBaseURL: '',
                smartReachBaseUrl: 'stg4.livevox.com',
            },
        },
        {
            applicationId: 'WFM',
            productId: 'EVOLVE',
            featureIds: [101, 102],
            settings: {
                wfm_acd_integration: 'IC',
            },
        }
    ],
    userSoftLimit: 500,
    presenceSyncEnabled: false,
    directorySyncEnabled: false,
    availableForDeletion: false,
    tenantFlowCheck: {
        uhAccountCreated: true,
        roleSynced: true,
        userCreated: true,
        syncWithACDFinished: true,
        syncedWithACD: true,
        lacreated: true,
    },
    markedForDeletion: false,
    applicationUserDetails: [],
    hasProcessRights: false,
    systemType: 'CXONE',
    templateVersion: 0,
    disableImpersonateAndSupport: false,
    disableImpersonateAndConfigure: false,
    converted: false,
    modificationDate: '2024-09-09T21:57:25.277+00:00',
    tenantBusinessOwner: 'Demo - Product',
    lineOfBusiness: 'CXone',
    owner: {},
    segmentationEnabled: 'INACTIVE',
    adjustViewsLimitEnabled: false,
};
export const mockTenantDataResponse = Object.assign(tenant, tenantDataResponse);
//# sourceMappingURL=mock-tenant-data-response.js.map