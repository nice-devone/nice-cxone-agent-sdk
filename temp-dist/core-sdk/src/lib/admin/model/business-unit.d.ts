import { BusinessUnitProduct } from './business-unit-product';
/**
 * Declare Business Unit Details
 */
export interface BusinessUnit {
    features: Array<BusinessUnitProduct>;
    maxConference: number;
    fileExtList: Array<string>;
    isMultiContactHandling: boolean;
    isUnifiedRoutingEnabled: boolean;
}
