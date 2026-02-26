import { LvEccProps } from '../lv-remote/lv-remote-ecc/lv-remote-ecc';
export declare type LvCustomerCardProps = Pick<LvEccProps, 'allowSearch' | 'allowCreate' | 'onClose' | 'onSelect'>;
/**
 * LVCustomer instance displayed when there is an active interactions
 * @example
 * ```
 * <LvCustomerCard />
 * ```
 */
export declare function LvCustomerCard(props: LvCustomerCardProps): JSX.Element;
/**
 * Wrapper of LV Customer Card to be used in the popper
 * Used in: .../ccf-app-space/ccf-digital-search/ccf-interaction-contact-info.tsx:32
 * @example
 * ```
 * <LvCustomerCardPopper />
 * ```
 */
export declare function LvCustomerCardPopper(): JSX.Element;
export default LvCustomerCard;
