import { TextFieldProps } from '@mui/material';
export interface CcfDeboucedInputProps {
    delay: number;
    trim?: boolean;
    onDebounceChange?: (value: string | null) => any;
    id?: string;
}
/**
 * Component to provide debounced input
 * @param props - CcfDeboucedInputProps
 * @example <CcfDeboucedInput />
 * @returns debounced input
 */
export declare function CcfDeboucedInput(props: CcfDeboucedInputProps & TextFieldProps): JSX.Element;
export default CcfDeboucedInput;
