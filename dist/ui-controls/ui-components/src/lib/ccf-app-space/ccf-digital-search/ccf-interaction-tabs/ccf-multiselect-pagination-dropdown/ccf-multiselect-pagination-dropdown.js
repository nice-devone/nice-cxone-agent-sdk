import { __rest } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, Divider, Box } from '@mui/material';
import { useTranslator, CcfTypography } from '@nice-devone/ui-controls';
import CcfDigitalSearchStyle from '../../ccf-digital-search-styles';
import { getDigitalMessageTagsByName, getDigitalMessageTagsCount, getDigitalMessageTagsCurrentPage, getDigitalMessageTagsByPageNumber, CcfAssignmentAction } from '../../../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * @returns displays multiselect dropdown options
 * @example <CcfMultiSelectPaginationDropdown/>
 */
export default function CcfMultiSelectPaginationDropdown(props) {
    const { children } = props, other = __rest(props, ["children"]);
    const dispatch = useDispatch();
    const theme = useTheme();
    const digitalMessageTagsCount = useSelector(getDigitalMessageTagsCount);
    let currentPageIndex = useSelector(getDigitalMessageTagsCurrentPage);
    const [translate] = useTranslator();
    const styles = CcfDigitalSearchStyle(theme);
    const searchedDigitalTags = useSelector(getDigitalMessageTagsByName);
    const searchedDigitalTagsCount = searchedDigitalTags === null || searchedDigitalTags === void 0 ? void 0 : searchedDigitalTags.length;
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const recordsPerPage = 50;
        let totalPages = Math.floor(digitalMessageTagsCount / recordsPerPage);
        totalPages = digitalMessageTagsCount % recordsPerPage === 0 ? totalPages : totalPages + 1;
        setTotalPages(totalPages);
    }, [digitalMessageTagsCount]);
    /**
       * handle loadmore event
       * @example handlePageScroll()
       */
    function handlePageScroll() {
        currentPageIndex = currentPageIndex + 1;
        dispatch(CcfAssignmentAction.setCurrentDigitalTagsPage(currentPageIndex));
        dispatch(getDigitalMessageTagsByPageNumber(currentPageIndex));
    }
    return (_jsxs(_Fragment, { children: [_jsx("ul", Object.assign({}, other, { style: { minHeight: 'auto' }, "data-testid": "render-options-list" }, { children: _jsx("li", { children: children }) })), (currentPageIndex <= totalPages && searchedDigitalTagsCount <= 0) && _jsx(Box, Object.assign({ onMouseDown: (event) => event.preventDefault() }, { children: _jsx(CcfTypography, Object.assign({ variant: "button", sx: styles.loadMoreButton, onClick: () => handlePageScroll(), "data-testid": 'load-more-button' }, { children: translate('loadMoreOptions') })) })), _jsx(Divider, { variant: "fullWidth" }), _jsx(CcfTypography, { sx: styles.dropdownOptionsCount, translationKey: "filterOptionsCount", extraArgs: { format: [searchedDigitalTagsCount ? searchedDigitalTagsCount : children === null || children === void 0 ? void 0 : children.length, searchedDigitalTagsCount ? searchedDigitalTagsCount : digitalMessageTagsCount] } })] }));
}
//# sourceMappingURL=ccf-multiselect-pagination-dropdown.js.map