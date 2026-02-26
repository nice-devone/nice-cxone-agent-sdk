import { SxProps } from '@mui/material';
import { CcfTranslationKey } from '@nice-devone/i18n';
export declare enum AddressType {
    CITY = "city",
    STATE = "state"
}
export declare enum ProfileType {
    PHONE = "phone",
    EMAIL = "email",
    JOB_TITLE = "job title",
    DEPARTMENT = "department",
    COMPANY = "company",
    ADDRESS = "address"
}
export declare enum FieldType {
    PRESENCE = "presence",
    OFFICE_LOCATION = "officelocation",
    CITY = "city",
    STATE = "state",
    POSTAL_CODE = "postalcode"
}
/**
 * Function to getStatusIcon
 * @param getStatusIcon -status: string
 * @returns icon
 * @example getStatusIcon
 */
export declare const getStatusIcon: (status: string, style?: SxProps) => JSX.Element;
/**
 * Function to getStateName
 * @param getStateName -agentStateName: string
 * @example getStateName('available')
 * returns localized state
 */
export declare const getStateName: (state: string, translate?: ((translationKey: CcfTranslationKey) => string) | undefined) => string;
/**
 * Function to getUnifiedStateName
 * @param getUnifiedStateName - agentStateName: string
 * @example getUnifiedStateName(UnifiedDirectoryAgentStates.)
 * returns localized state
 */
export declare const getUnifiedStateName: (state: string, translate?: ((translationKey: CcfTranslationKey) => string) | undefined) => string;
