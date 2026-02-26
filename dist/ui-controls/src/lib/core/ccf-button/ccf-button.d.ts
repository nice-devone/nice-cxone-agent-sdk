import { ButtonProps } from '@mui/material';
import '../style/Ccf.Palette.Module';
export interface CcfButtonProps extends Omit<ButtonProps, ''> {
    primary?: boolean;
    /**
     * If `true`, applies a focus to the button. Defaults to `false`.
     */
    isFocused?: boolean;
}
/**
 * Component used to display Button
 * @param param0 - CcfButtonProps
 * @example <CcfButton />
 * @returns  Button
 */
export declare function CcfButton({ children, primary, isFocused, sx, ...rest }: CcfButtonProps): JSX.Element;
export default CcfButton;
