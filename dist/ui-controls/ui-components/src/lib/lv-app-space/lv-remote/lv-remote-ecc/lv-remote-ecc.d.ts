import React from 'react';
import { SxProps } from '@mui/material/styles';
import { LvCustomerType, LvCustomerSearchCriteriaType, TabProps, CxOneInteractionDataType } from '../../lv-app-space-types';
export declare type LvEccProps = {
    allowCreate?: boolean;
    allowSearch?: boolean;
    customerId?: LvCustomerType['account'];
    extraTabs?: TabProps[];
    onClose?: () => void;
    onCreated?: (record: LvCustomerType) => void;
    onMounted?: () => void;
    onSearch?: (searchCriteria: LvCustomerSearchCriteriaType | undefined) => void;
    onSelect?: (record: LvCustomerType, updateCustomerIdInInteraction?: boolean) => void;
    searchCriteria?: LvCustomerSearchCriteriaType;
    shouldRefresh?: boolean;
    sx?: SxProps;
} & CxOneInteractionDataType;
export declare const dataTestId: string;
/**
 * LvEcc is the wrapper that imports LV Enhanced Customer Card into CXone
 * Notes:
 * - If allowFilter & allowSearch is not provided, it will pick the setting from the designer desktop
 * - Currently we have to instances of this component, each intance has its own variantion
 *   of the LVCustomer
 *   1) LVCustomerCard: Shown when an interaction is active
 *   2) LVSearchCustomers: Shown on the search section, customer tab
 * @example
 * ```
 *  <LvEcc />
 * ```
 */
export declare function LvRemoteEcc(props: LvEccProps): JSX.Element;
/**
 * Preloads the LV Enhanced Customer Card (ECC) module federation in the DOM without displaying the component.
 * The component mounts `LvEcc` with `display: 'none'` to trigger module federation loading,
 * then removes itself from the DOM after a short delay.
 *
 * @example
 * // Usage: Place <LvEccPreloader /> somewhere in your app to preload ECC in the background.
 * <LvEccPreloader />
 */
export declare const LvEccPreloader: React.NamedExoticComponent<object>;
export default LvRemoteEcc;
