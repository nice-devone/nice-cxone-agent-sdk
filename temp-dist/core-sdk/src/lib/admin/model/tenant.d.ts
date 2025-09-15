import { TenantFlowCheck } from './tenant-flow-check';
import { TenantLicenses } from './tenant-licenses';
export interface Tenant {
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
    metaData: Record<string, string>;
    licenses: Array<TenantLicenses>;
    userSoftLimit: number;
    brandingProfileId?: string;
    presenceSyncEnabled: boolean;
    directorySyncEnabled: boolean;
    platformVersion?: string;
    presenceSyncVersionDetails?: {
        key: string;
    };
    presenceSyncSettingDetails?: {
        key: string;
    };
    availableForDeletion: boolean;
    tenantDeletionInfo?: {
        key: string;
    };
    errorCode?: string;
    tenantFlowCheck: TenantFlowCheck;
    markedForDeletion: boolean;
    applicationUserDetails: [];
    hasProcessRights: boolean;
    processingStartDate?: string;
    systemType: string;
    partnerName?: string;
    templateId?: string;
    templateVersion: number;
    disableImpersonateAndSupport: boolean;
    disableImpersonateAndConfigure: boolean;
    converted: boolean;
    modificationDate: string;
    tenantBusinessOwner: string;
    lineOfBusiness: string;
    owner: Record<string, string>;
    segmentationEnabled: string;
    adjustViewsLimitEnabled: boolean;
}
