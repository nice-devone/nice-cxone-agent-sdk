import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import * as CcfCustomerCardRelatesTo from '../ccf-customer-card-relates-to';
import { selectInboxCollapsedState } from '../../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfBox } from '@nice-devone/ui-controls';
import CcfCustomerCardRelatesToPopoverListItem from './list-item';
import generateStyles from './popover.style';
import CcfNameRelatesTo from './nameRelates';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CcfCustomerCardSlice, getSFCRMNavigationData } from '../../ccf-customer-card.slice';
import { Crm } from '@nice-devone/common-sdk';
/**
 * CcfCustomerCardRelatesToPopover - A popover used for the "Relates To" feature.
 * @example <CcfCustomerCardRelatesToPopover />
 */
export const CcfCustomerCardRelatesToPopover = ({ iconString, crm, contactId }) => {
    var _a, _b, _c, _d, _e, _f;
    const theme = useTheme();
    const dispatch = useDispatch();
    const referenceForContainer = useRef(null);
    const position = (_a = useSelector(CcfCustomerCardRelatesTo.controller.slice.selectors.getPopoverPosition)) !== null && _a !== void 0 ? _a : {};
    const container = useSelector(CcfCustomerCardRelatesTo.controller.slice.selectors.getPopoverContainer);
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const isRelatesToPopoverOpen = useSelector(CcfCustomerCardRelatesTo.controller.slice.selectors.getPopoverOpen);
    const relatesToPopoverList = (_b = useSelector(CcfCustomerCardRelatesTo.controller.slice.selectors.getPopoverList)) !== null && _b !== void 0 ? _b : [];
    const shouldOverflow = relatesToPopoverList.length > 5;
    const sFCRMNavigationData = useSelector(getSFCRMNavigationData);
    const sFCRMNavigationDataFromLocalStorage = LocalStorageHelper.getItem(StorageKeys.SFCRM_NAVIGATION_DATA, true);
    if (!sFCRMNavigationData[contactId] && sFCRMNavigationDataFromLocalStorage[contactId]) {
        //sFCRMNavigationData[contactId] = sFCRMNavigationDataFromLocalStorage[contactId];
        const data = {
            navigationData: sFCRMNavigationDataFromLocalStorage[contactId],
            contactId: contactId,
        };
        dispatch(CcfCustomerCardSlice.actions.bulkLoadSFCRMNavigationDataOnRefresh(data));
    }
    const name = (_d = (_c = sFCRMNavigationData[contactId]) === null || _c === void 0 ? void 0 : _c.whoid) !== null && _d !== void 0 ? _d : [];
    const relatesTo = (_f = (_e = sFCRMNavigationData[contactId]) === null || _e === void 0 ? void 0 : _e.whatid) !== null && _f !== void 0 ? _f : [];
    const styles = generateStyles(position, isRelatesToPopoverOpen, shouldOverflow, theme, iconString);
    /**
     * A function for executing logic on re-size.
     * @example handleMouseDownEvent(event)
     */
    const handleResize = () => {
        dispatch(CcfCustomerCardRelatesTo.controller.thunks.handleResize());
    };
    /**
     * A function for executing logic on mouse-down.
     * @example handleMouseDownEvent(event)
     */
    const handleMouseDownEvent = (event) => {
        dispatch(CcfCustomerCardRelatesTo.controller.thunks.handleMouseDownEvent({
            event,
        }));
    };
    // NOTE : REGISTER POPOVER INTO STATE
    useEffect(() => {
        if (referenceForContainer === null || referenceForContainer === void 0 ? void 0 : referenceForContainer.current) {
            const element = referenceForContainer.current;
            dispatch(CcfCustomerCardRelatesTo.controller.slice.actions.setPopoverElement({
                element,
            }));
        }
    }, [dispatch, referenceForContainer, container]);
    useEffect(() => {
        if (!isInboxCollapsed) {
            dispatch(CcfCustomerCardRelatesTo.controller.slice.actions.hidePopover());
            dispatch(CcfCustomerCardRelatesTo.controller.slice.actions.resetTarget());
        }
    }, [isInboxCollapsed]);
    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDownEvent);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('mousedown', handleMouseDownEvent);
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    if (!container)
        return null;
    return ReactDOM.createPortal(_jsxs(CcfBox, Object.assign({ className: "relates-to_popover_container", ref: referenceForContainer }, { children: [_jsx("style", { children: styles }), crm.toLowerCase() === Crm.SALESFORCE ?
                (_jsx(CcfBox, Object.assign({ className: "relates-to_popover_body" }, { children: _jsx(CcfNameRelatesTo, { nameList: name, relatesToList: relatesTo, selectedContactId: contactId }) }))) : (_jsx(CcfBox, Object.assign({ className: "relates-to_popover_body" }, { children: relatesToPopoverList.map(({ entityId, entityType, entityTypeLabel, screenPopURL, isRelated, name, }, index) => (_jsx(CcfCustomerCardRelatesToPopoverListItem, { entityId: entityId, entityType: entityType, entityTypeLabel: entityTypeLabel, name: name, screenPopURL: screenPopURL, isRelated: isRelated, iconString: iconString }, index))) })))] })), container);
};
export default React.memo(CcfCustomerCardRelatesToPopover);
//# sourceMappingURL=popover.js.map