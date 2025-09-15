export interface TenantLicenses {
    applicationId: string;
    productId: string;
    featureIds: Array<number>;
    settings?: Record<string, string>;
}
