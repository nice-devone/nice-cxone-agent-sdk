import React from 'react';
interface CcfCustomPopoverProps {
    id: string;
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    popoverMaxWidth?: number | string;
    children: React.ReactNode;
    ariaLabelledBy?: string;
    isMobile?: boolean;
}
/**
 * component to display any children component in popover
 * @param param0 - CcfPopOverWrapperProps
 * @example <CcfCustomPopOver>
 */
export declare function CcfCustomPopOver({ id, open, anchorEl, onClose, popoverMaxWidth, children, ariaLabelledBy, isMobile, }: CcfCustomPopoverProps): JSX.Element;
export {};
