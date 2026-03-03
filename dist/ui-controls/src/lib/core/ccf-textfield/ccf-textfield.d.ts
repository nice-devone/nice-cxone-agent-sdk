import { TextFieldProps } from '@mui/material';
interface CcfCustomTextFieldProps {
    id: string;
}
export declare type CcfTextFieldProps = TextFieldProps & CcfCustomTextFieldProps;
/**
 * CcfTextField used to display react text input
 * @param param - CcfTextField
 * @example <CcfTextField />
 */
export declare function CcfTextField({ ...rest }: CcfTextFieldProps): JSX.Element;
export default CcfTextFieldProps;
