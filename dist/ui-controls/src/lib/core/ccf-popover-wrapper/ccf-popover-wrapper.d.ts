/// <reference types="react" />
export interface CcfPopOverWrapperProps {
    id: string;
    anchorReference?: 'anchorEl' | 'anchorPosition';
    anchorPosition?: {
        left: number;
        top: number;
    };
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
    };
    transformOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
    };
    open: boolean;
    anchorEl?: HTMLElement | null;
    handleClose: () => void;
    style?: {
        [key: string]: string;
    };
    children: React.ReactNode;
}
/**
 * component to display any children component in popover
 * @param param0 - CcfPopOverWrapperProps
 * @example <CcfPopOverWrapper><Box></Box></CcfPopOverWrapper>
 */
export declare function CcfPopOverWrapper({ id, anchorReference, anchorPosition, anchorOrigin, transformOrigin, open, anchorEl, handleClose, children, ...rest }: CcfPopOverWrapperProps): JSX.Element;
export default CcfPopOverWrapper;
