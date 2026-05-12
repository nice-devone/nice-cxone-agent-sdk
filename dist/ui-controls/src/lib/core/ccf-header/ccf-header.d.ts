import React from 'react';
import { SxProps, Theme } from '@mui/material';
export interface CcfHeaderProps {
    children?: React.ReactElement[];
    HeaderWithTab?: React.ReactElement;
    HeaderWithBookmark?: React.ReactElement;
    tabList?: string[];
    headerText?: string | number;
    headerTextClassess?: string;
    LeftIcon?: React.ReactElement;
    showDragIcon?: boolean;
    RightIcon?: boolean;
    PopoverContent?: React.ReactElement;
    PopoverContentProps?: {
        dismissable: boolean;
    };
    direction?: 'ltr' | 'rtl';
    handleRightIconClick?: () => void;
    id?: string;
    sx?: SxProps<Theme>;
    isappspace?: boolean;
    ariaLive?: 'off' | 'assertive' | 'polite' | undefined;
    /**this variant will be used to display markdown, expected values h1 to h6 */
    headerVariantMapping?: string;
}
/**
 *
 * @param headerText - Text to be displayed inside the Header Title
 * @param RightIcon - Icon to be displayed in the left side of the Header
 * @param PopoverContent - Content to be displayed inside the
 * @param headerTextClassess - Classes to be applied on the Header Text
 * @example <CCfHeader />
 * @returns CcfHeader Component
 */
export declare function CcfHeader({ children, headerText, HeaderWithTab, HeaderWithBookmark, tabList, LeftIcon, showDragIcon, RightIcon, PopoverContent, PopoverContentProps, headerTextClassess, direction, headerVariantMapping, sx, isappspace, ...rest }: CcfHeaderProps): JSX.Element;
export declare namespace CcfHeader {
    var defaultProps: {
        headerTextClassess: string;
    };
}
declare const _default: React.MemoExoticComponent<typeof CcfHeader>;
export default _default;
