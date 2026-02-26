import { TabProps } from '../../lv-app-space-types';
/**
 * Creates extra tabs to be injected in LVCustomerCard
 * @example
 * ```
 * const tabs = useTabsFactory()
 * ```
 */
export default function useTabsFactory(): {
    tabs: TabProps[];
};
