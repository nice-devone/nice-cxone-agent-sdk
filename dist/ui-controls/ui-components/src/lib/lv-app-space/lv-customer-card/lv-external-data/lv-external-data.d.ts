import { SxProps } from '@mui/material/styles';
export declare type LvExternalDataProps = {
    sx?: SxProps;
};
export declare const dataTestId: string;
/**
 * Extracts the Customer Card External Data component from the CCF Customer Card, so it can be used
 * in LV App Space.
 * Referenced from:
 *   libs/react/ui-components/src/lib/ccf-app-space/ccf-customer-card/ccf-customer-card.tsx:146
 * @example
 * ```
 * <LvExternalData />
 * ```
 */
export declare function LvExternalData(props: LvExternalDataProps): JSX.Element;
export default LvExternalData;
