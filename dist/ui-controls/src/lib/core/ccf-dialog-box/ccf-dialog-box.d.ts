/// <reference types="react" />
import { ButtonProps, TypographyProps, DialogProps } from '@mui/material';
export interface CcfDialogBoxProps {
    isOpen: boolean;
    handleOnClickOfHeaderCloseButton?: React.MouseEventHandler;
    handleOnClose?: DialogProps['onClose'];
    children?: React.ReactNode;
    title: string;
    primaryButtonText: string;
    secondaryButtonText?: string;
    primaryButtonProps?: ButtonProps;
    secondaryButtonProps?: ButtonProps;
    dialogTitleProps?: TypographyProps;
    dialogContentProps?: TypographyProps;
    component?: React.ReactElement;
    dividers?: boolean;
    showTitle?: boolean;
    showCloseButton?: boolean;
}
/**
 * Component used to display dialog box
 * @param param0 - CcfDialogBoxProps
 * @example <CCfDialogBox />
 * @returns dialog box
 */
export declare function CcfDialogBox({ isOpen, handleOnClickOfHeaderCloseButton, handleOnClose, children, title, primaryButtonText, secondaryButtonText, primaryButtonProps, secondaryButtonProps, dialogTitleProps, dialogContentProps, component, dividers, showTitle, showCloseButton, }: CcfDialogBoxProps): JSX.Element;
export default CcfDialogBox;
