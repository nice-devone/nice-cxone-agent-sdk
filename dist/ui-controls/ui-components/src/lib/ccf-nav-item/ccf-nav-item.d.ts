import React from 'react';
import { NavigationItem } from '../ccf-navigation/useNavigationItems';
/**
 * Used to add navigation item to CcfAppNavigation
 * @example `<CcfNavItem />`
 * @param menuName - menuName must be listed in the CcfTranslationKey object and in lowercase
 * @param showBadge - This is an optional parameter that will add a Badge to an icon
 * @param className - optional className wrapping the icon after the tooltip
 * @param onClick - this parameter will override the existing onClick functionality
 * @param toolTipPlacement - 'A string to determine placement for tooltip'
 */
export declare const CcfNavItem: React.FC<NavigationItem>;
