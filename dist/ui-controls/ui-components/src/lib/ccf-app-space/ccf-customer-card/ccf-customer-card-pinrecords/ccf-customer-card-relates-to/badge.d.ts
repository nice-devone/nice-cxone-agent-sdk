interface CcfRelatesToPopoverListItemBadgeProps {
    label: string;
    url: string;
    entityId?: string;
    entityType?: string;
    crm?: string;
    name?: string;
}
/**
 * CcfRelatesToPopoverListItemBadge - A component to display a single entity's badge.
 * @example <CcfRelatesToPopoverListItemBadge />
 */
export declare function CcfRelatesToPopoverListItemBadge({ label, url, entityId, entityType, crm, name }: CcfRelatesToPopoverListItemBadgeProps): JSX.Element;
export default CcfRelatesToPopoverListItemBadge;
