import { Tabs } from '@nice-devone/common-sdk';
interface PropTypes extends Tabs {
    closeTab: (tabNumber: string) => void;
}
/**
 * Component to displays digital outbound contact tab
 * @returns digital ob contact
 * @example
 * ```
 * <CcfDigitalOutboundContact />
 * ```
 */
export default function CcfDigitalOutboundContact(props: PropTypes): JSX.Element;
export {};
