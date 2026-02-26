import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { CcfBox } from '@nice-devone/ui-controls';
import * as CcfCustomerCardRelatesTo from '../ccf-customer-card-relates-to';
import { MAX_WIDTH_FOR_POPOVER_LIST_BADGE } from './controller/constants';
/**
 * CcfRelatesToPopoverListItemBadge - A component to display a single entity's badge.
 * @example <CcfRelatesToPopoverListItemBadge />
 */
export function CcfRelatesToPopoverListItemBadge({ label, url, entityId, entityType, crm, name }) {
    const [isSmallView, setIsSmallView] = useState(window.innerWidth <= MAX_WIDTH_FOR_POPOVER_LIST_BADGE);
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${MAX_WIDTH_FOR_POPOVER_LIST_BADGE}px)`);
        /**
         * Function to handle logic on change of media-query.
         * @example handleMediaQueryChange(event)
         */
        const handleMediaQueryChange = (event) => {
            setIsSmallView(event === null || event === void 0 ? void 0 : event.matches);
        };
        mediaQuery.addListener(handleMediaQueryChange);
        if (mediaQuery.matches) {
            setIsSmallView(true);
        }
        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);
    /**
     * Handles screen pop functionality with structured data
     * @example handleScreenPop()
     */
    const handleScreenPop = () => {
        // If we have structured data, create ScreenPopData object
        if (entityId && entityType && crm) {
            const screenPopData = {
                crm,
                id: entityId,
                display: name || label,
                label,
                type: entityType,
                url,
            };
            CcfCustomerCardRelatesTo.controller.service.screenPop(screenPopData);
        }
    };
    return (_jsxs(CcfBox, Object.assign({ className: "relatesToBadgeContainer", onClick: handleScreenPop, title: isSmallView ? label : '' }, { children: [_jsx(CcfBox, { className: "relatesToBadge" }), _jsx(CcfBox, Object.assign({ className: "relatesToBadgeName" }, { children: label }))] })));
}
export default CcfRelatesToPopoverListItemBadge;
//# sourceMappingURL=badge.js.map