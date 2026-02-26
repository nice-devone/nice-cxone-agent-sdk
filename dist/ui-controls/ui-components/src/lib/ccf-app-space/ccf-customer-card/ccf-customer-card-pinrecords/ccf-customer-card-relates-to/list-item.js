import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CcfAppToastMessage, CcfBox } from '@nice-devone/ui-controls';
import * as CcfCustomerCardRelatesTo from '../ccf-customer-card-relates-to';
import CcfRelatesToPopoverListItemBadge from './badge';
import { voiceContactSelector } from '../../../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * CcfRelatesToPopoverListItem - A component to display a single entity.
 * @example <CcfRelatesToPopoverListItem />
 */
export function CcfRelatesToPopoverListItem({ entityId, entityType, entityTypeLabel, screenPopURL, name, isRelated,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
 }) {
    const text = name ? name : entityId;
    const dispatch = useDispatch();
    const [isOverflowing, setIsOverflowing] = useState(false);
    const referenceForText = useRef(null);
    const targetSlice = useSelector(CcfCustomerCardRelatesTo.controller.slice.selectors.getTarget);
    const crm = targetSlice.crm;
    const voiceContact = useSelector(voiceContactSelector);
    const isInboundCall = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.isInbound;
    useEffect(() => {
        var _a, _b;
        setIsOverflowing(CcfCustomerCardRelatesTo.controller.service.checkIfListItemTextIsOverflowing((_a = referenceForText === null || referenceForText === void 0 ? void 0 : referenceForText.current) === null || _a === void 0 ? void 0 : _a.scrollWidth, (_b = referenceForText === null || referenceForText === void 0 ? void 0 : referenceForText.current) === null || _b === void 0 ? void 0 : _b.clientWidth));
        // NOTE : CHECK FOR OVERFLOW ON RE-SIZE
        window.addEventListener('resize', () => {
            var _a, _b;
            return setIsOverflowing(CcfCustomerCardRelatesTo.controller.service.checkIfListItemTextIsOverflowing((_a = referenceForText === null || referenceForText === void 0 ? void 0 : referenceForText.current) === null || _a === void 0 ? void 0 : _a.scrollWidth, (_b = referenceForText === null || referenceForText === void 0 ? void 0 : referenceForText.current) === null || _b === void 0 ? void 0 : _b.clientWidth));
        });
        return () => {
            window.removeEventListener('resize', () => {
                var _a, _b;
                return setIsOverflowing(CcfCustomerCardRelatesTo.controller.service.checkIfListItemTextIsOverflowing((_a = referenceForText === null || referenceForText === void 0 ? void 0 : referenceForText.current) === null || _a === void 0 ? void 0 : _a.scrollWidth, 
                // eslint-disable-next-line react-hooks/exhaustive-deps
                (_b = referenceForText === null || referenceForText === void 0 ? void 0 : referenceForText.current) === null || _b === void 0 ? void 0 : _b.clientWidth));
            });
        };
    }, []);
    return (_jsxs(CcfBox, Object.assign({ component: "div", className: "relatesToPopoverListItem" }, { children: [_jsx(CcfBox, { component: "label", "data-testid": "relatesToButton", className: `relatesToPopoverListItemStatusBase ${isRelated ? 'relatesToPopoverListItemStatusTicked' : 'relatesToPopoverListItemStatusUnticked'}`, onClick: () => dispatch(CcfCustomerCardRelatesTo.controller.thunks.onClickOfEntity({
                    relateToEntityId: entityId,
                    relateToEntityType: entityType,
                    crm,
                    isInboundCall,
                    toastComponentForErrorOfUnableToRelate: (_jsx(CcfAppToastMessage, { type: "error", messageKey: "relatesToUnableToRelate", titleMessage: "relatesToUnableToRelate" })),
                    toastComponentForErrorOfUnableToUnrelate: (_jsx(CcfAppToastMessage, { type: "error", messageKey: "relatesToUnableToUnrelate", titleMessage: "relatesToUnableToUnrelate" })),
                })) }), _jsx(CcfBox, Object.assign({ className: "relatesToPopoverListItemName", ref: referenceForText, title: isOverflowing ? text : '' }, { children: text })), _jsx(CcfRelatesToPopoverListItemBadge, { label: entityTypeLabel, url: screenPopURL, entityId: entityId, entityType: entityType, crm: crm || undefined, name: name })] })));
}
export default CcfRelatesToPopoverListItem;
//# sourceMappingURL=list-item.js.map