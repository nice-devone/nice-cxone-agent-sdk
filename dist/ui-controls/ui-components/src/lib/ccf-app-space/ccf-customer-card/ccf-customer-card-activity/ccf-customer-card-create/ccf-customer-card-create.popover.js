import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { CcfBox } from '@nice-devone/ui-controls';
import * as CcfCustomerCardSlice from '../../ccf-customer-card.slice';
import generateStyles from './ccf-customer-card-create-popover.style';
import { selectInboxCollapsedState } from '../../../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * CcfCustomerCardCreatePopover - A popover component for the "Create Entity" feature.
 * @example <CcfCustomerCardCreatePopover />
 */
export const CcfCustomerCardCreatePopover = ({ containerRef, list = [], }) => {
    var _a, _b, _c;
    const dispatch = useDispatch();
    const theme = useTheme();
    const position = (_a = useSelector(CcfCustomerCardSlice.getCreateEntityPopoverPosition)) !== null && _a !== void 0 ? _a : {};
    const isOpen = useSelector(CcfCustomerCardSlice.getCreateEntityPopoverOpen);
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const referenceForPopover = useRef(null);
    const shouldOverflow = ((_b = list === null || list === void 0 ? void 0 : list.length) !== null && _b !== void 0 ? _b : []) >= 5;
    const styles = generateStyles(theme, shouldOverflow, position);
    /**
     * A function for executing logic on re-size.
     * @example handleMouseDownEvent(event)
     */
    const handleResize = () => {
        dispatch(CcfCustomerCardSlice.thunks.createEntity.handleResize());
    };
    /**
     * A function for executing logic on mouse-down.
     * @example handleMouseDownEvent(event)
     */
    const handleMouseDownEvent = (event) => {
        dispatch(CcfCustomerCardSlice.thunks.createEntity.handleMouseEvent({
            referenceForPopover,
            elementTargetFromClick: event === null || event === void 0 ? void 0 : event.target,
        }));
    };
    useEffect(() => {
        if (!isInboxCollapsed) {
            dispatch(CcfCustomerCardSlice.CcfCustomerCardActions.setCreateEntityPopoverIsOpen({
                isOpen: false,
            }));
        }
        ;
        dispatch(CcfCustomerCardSlice.CcfCustomerCardActions.resetCreateEntityTarget());
    }, [isInboxCollapsed]);
    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDownEvent);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('mousedown', handleMouseDownEvent);
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    if (!isOpen) {
        return null;
    }
    return ReactDOM.createPortal(_jsxs(CcfBox, Object.assign({ ref: referenceForPopover, className: "createPopoverContainer" }, { children: [_jsx("style", { children: styles }), (list !== null && list !== void 0 ? list : []).map((item, index) => {
                var _a;
                return ((_a = item.display) === null || _a === void 0 ? void 0 : _a.trim().length) > 0 && (_jsx(CcfBox, Object.assign({ className: "createPopoverContainerItem", "data-testid": `createEntity_option-${index}`, title: item === null || item === void 0 ? void 0 : item.display, onClick: () => {
                        dispatch(CcfCustomerCardSlice.thunks.createEntity.onClickOfEntity({
                            workflowInput: item === null || item === void 0 ? void 0 : item.workflowInput,
                            configurationId: item === null || item === void 0 ? void 0 : item.configurationId,
                            workflowId: item === null || item === void 0 ? void 0 : item.workflowId,
                            display: item === null || item === void 0 ? void 0 : item.display,
                        }));
                    } }, { children: item.display }), `createEntity_option-${index}`));
            })] })), (_c = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) !== null && _c !== void 0 ? _c : document.body);
};
export default React.memo(CcfCustomerCardCreatePopover);
//# sourceMappingURL=ccf-customer-card-create.popover.js.map