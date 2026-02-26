import { Theme } from '@mui/material';
import { DigitalContactDirection } from '@nice-devone/common-sdk';
/**
 * style object for ccf-digital-email-v2-header component
 * @returns CcfDigitalEmailV2Header styles object
 * ```
 * @example
 * <CcfDigitalEmailV2HeaderStyles/>
 * ```
 */
declare const CcfDigitalEmailV2HeaderStyles: (theme: Theme, isMobile?: boolean, messageDirection?: DigitalContactDirection, isAuthorNameRemoved?: boolean) => {
    avatar: {
        bgcolor: string;
        fontWeight: number;
        color: string;
        width: string;
        height: string;
        fontSize: string;
        transform: string;
    };
    displayName: {
        fontWeight: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
        maxWidth: string;
        marginRight: string;
        lineHeight: string;
        fontSize: string;
        marginTop: string;
        fontStyle: string;
        color: string;
    };
    displayNameContainer: {
        height: string;
    };
    toField: {
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
        fontSize: string;
        fontWeight: number;
    };
    toContainer: {
        display: string;
        alignItems: string;
        lineHeight: string;
    };
    downArrowIconStyle: {
        fontSize: string;
        cursor: string;
        color: string;
    };
    addressContainer: {
        [x: string]: string | number | {
            width: string;
        };
        lineHeight: string;
        display: string;
        alignItems: string;
        gap: number;
        justifyContent: string;
    };
    iconContainer: {
        [x: string]: string | {
            width: string;
            fonSize: string;
        };
        display: string;
        flexDirection: string;
        alignItems: string;
        transform: string;
    };
    dateTimeStyle: {
        color: string;
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
    };
    buttonContainer: {
        display: string;
        height: string;
        marginTop: string;
    };
    toFieldContainer: {
        textOverflow: string;
        overflow: string;
        display: string;
        width: string;
    };
    popOverStyles: {
        minWidth: string;
        transform: string;
        borderRadius: string;
        boxShadow: string;
    };
    dateStyles: {
        fontSize: string;
        transform: string;
        marginRight: string;
    };
    tagsStyle: {
        transform: string;
    };
};
export default CcfDigitalEmailV2HeaderStyles;
