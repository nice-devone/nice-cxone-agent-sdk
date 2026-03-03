import { CheckboxProps } from '@mui/material';
import React, { KeyboardEvent } from 'react';
/**
 * Interface for defining props of CcfCheckbox component
*/
export interface CcfCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
    onCheckboxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string | number | React.ReactElement;
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom' | undefined;
    onKeyButtonPress?: (e: KeyboardEvent<HTMLButtonElement>) => void;
    id?: string;
}
/**
 * Component used to display checkbox
 * @param props - CcfCheckboxProps
 * @example <CcfCheckbox />
 * @returns checkbox
 */
export declare function CcfCheckbox(props: CcfCheckboxProps): JSX.Element;
export default CcfCheckbox;
