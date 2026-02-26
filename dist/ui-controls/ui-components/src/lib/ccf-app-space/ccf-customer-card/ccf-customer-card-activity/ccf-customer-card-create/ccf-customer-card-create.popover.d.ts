import React from 'react';
interface ListItem {
    display: string;
    workflowInput: unknown;
    configurationId: string;
    workflowId: string;
}
export interface CcfCustomerCardCreatePopoverProps {
    containerRef: {
        current: Element | DocumentFragment | undefined | null;
    };
    list: ListItem[];
}
/**
 * CcfCustomerCardCreatePopover - A popover component for the "Create Entity" feature.
 * @example <CcfCustomerCardCreatePopover />
 */
export declare const CcfCustomerCardCreatePopover: (props: CcfCustomerCardCreatePopoverProps) => React.ReactPortal | null;
declare const _default: React.MemoExoticComponent<(props: CcfCustomerCardCreatePopoverProps) => React.ReactPortal | null>;
export default _default;
