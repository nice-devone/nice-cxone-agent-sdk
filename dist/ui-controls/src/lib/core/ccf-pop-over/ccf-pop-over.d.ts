import React from 'react';
import { SxProps, Theme } from '@mui/material';
import { IndicatorActionType } from '@nice-devone/common-sdk';
import { CcfTranslationKey } from '@nice-devone/i18n';
export interface PopOverData {
    popOverHeader?: string;
    menuItems: Array<PopOverMenuItems>;
}
export interface PopOverMenuItems {
    items: Array<PopOverMenuItem>;
}
export interface PopOverMenuItem {
    label?: string;
    translationKey?: CcfTranslationKey;
    icon?: React.ReactElement | string;
    type?: string | IndicatorActionType;
    closeOnSelection?: boolean;
    toolTip?: string;
    url?: string;
    disabled?: boolean;
    id?: string;
    isDividerEnabled?: boolean;
}
export declare type ToolTipPlacement = 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
export interface CcfPopOverProps {
    buttonSx?: SxProps<Theme>;
    disableTooltip?: boolean;
    optionList: PopOverData;
    onPopOverItemSelection(item: PopOverMenuItem, e: React.MouseEvent<HTMLElement>, anchorEl: React.MouseEvent<HTMLButtonElement> | null): React.MouseEventHandler;
    navigateToInitialPopOverState?: React.MouseEventHandler;
    endIconComponent?: React.ReactNode;
    PaperProps?: {
        style?: {
            [key: string]: string;
        };
    };
    iconComponent?: React.ReactNode;
    labelComponent?: React.ReactNode;
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
    };
    transformOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
    };
    showHoverBackground?: boolean;
    style?: {
        [key: string]: string;
    };
    itemToolTips?: boolean;
    tooltipTitle?: CcfTranslationKey;
    tooltipArrow?: boolean;
    setShowTooltip?: React.Dispatch<React.SetStateAction<boolean>>;
    tooltipPlacement?: ToolTipPlacement;
    popOverRightIconStyles?: SxProps;
    isQuickAppLaunchMenu?: boolean;
    focusLaunchButton?: boolean;
    setLaunchButtonClickStatus?: (args: boolean) => void;
    popOverMenuItemExtraStyles?: object;
    disableChildTab?: boolean;
    propogateOnClickEvent?: boolean;
}
/**
 * component to display popover
 * @param param0 - CcfPopOverProps
 * @example <CcfPopOver />
 */
export declare function CcfPopOver({ buttonSx, disableTooltip, optionList, onPopOverItemSelection, navigateToInitialPopOverState, iconComponent, endIconComponent, labelComponent, anchorOrigin, transformOrigin, style, itemToolTips, tooltipTitle, disableChildTab, setShowTooltip, tooltipPlacement, popOverRightIconStyles, showHoverBackground, tooltipArrow, isQuickAppLaunchMenu, focusLaunchButton, setLaunchButtonClickStatus, popOverMenuItemExtraStyles, propogateOnClickEvent, ...rest }: CcfPopOverProps): JSX.Element;
export default CcfPopOver;
