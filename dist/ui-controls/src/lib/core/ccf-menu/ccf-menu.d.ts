import React from 'react';
interface CcfMenuProps {
    options: CcfMenuOptions[];
    handleMenuSelection: (name: string, buttonRef: React.RefObject<HTMLButtonElement>) => void;
    menuItemStyles?: object;
    menuTextStyles?: object;
    moreIconStyles?: object;
    menuIconStyles?: object;
    menuStyles?: object;
    /**
     * linkStyles - styles for the download link
     */
    linkStyles?: object;
    /**
     * moreButtonAriaLabel - accessible label for the more/kebab button
     */
    moreButtonAriaLabel?: string;
}
export interface CcfMenuOptions {
    name: string;
    icon?: JSX.Element;
    isActive?: boolean;
    addBreakLine?: boolean;
    menuIconStyles?: object;
    menuTextContainerStyles?: object;
}
/**
 * Menu control used to display list of items and action can be triggered on clicking them
 * @returns
 * @example
 * ```
 * <CcfMenu
    options={options}
    handleMenuSelection={handleMenuSelection}
    menuItemStyles={menuItemStyles.menuItemContent}
    menuTextStyles={menuItemStyles.menuItemNameBold}
    />
 * ```
 */
export declare const CcfMenu: ({ options, handleMenuSelection, menuItemStyles, menuTextStyles, moreIconStyles, menuStyles, moreButtonAriaLabel, }: CcfMenuProps) => JSX.Element;
export {};
