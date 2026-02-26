import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { InputAdornment, Popover, TextField, useTheme, MenuItem, Button, } from '@mui/material';
import { CcfBox, CcfSearchIcon, useTranslator, CcfFilterIcon, CcfTextField, CcfButton, CcfTypography, CcfCloseIcon, CcfTooltip, } from '@nice-devone/ui-controls';
import CcfAgentSkillsStyle from './ccf-agent-skills.styles';
import { MediaTypeIds } from './ccf-icon-list';
/**
 * @example CcfAgentSkillsSearch()
 * @returns
 */
export function CcfAgentSkillsSearch(props) {
    var _a;
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfAgentSkillsStyle(theme);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mediaTypeValue, setMediaTypeValue] = useState(0);
    const open = Boolean(anchorEl);
    const id = open ? 'filter-skill-popover' : undefined;
    const mediaTypeNames = (_a = props.setMediaTypeIds) === null || _a === void 0 ? void 0 : _a.map((item) => {
        return MediaTypeIds[item];
    });
    const mediaTypeIdArray = mediaTypeNames === null || mediaTypeNames === void 0 ? void 0 : mediaTypeNames.sort().map((item) => {
        return Number(Object.keys(MediaTypeIds).find((key) => MediaTypeIds[Number(key)] === item));
    });
    const mediaTypeFromChip = props.mediaTypeFromChip;
    useEffect(() => {
        setMediaTypeValue(mediaTypeFromChip);
    }, [mediaTypeFromChip]);
    /**
     * Function to close the popover
     * @example handleClosePopover()
     */
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    /**
     *
     * @param e - event
     * @example handleChange
     */
    const handleChange = (event) => {
        const MediaType = event.target.value;
        const Id = Object.keys(MediaTypeIds).find((key) => MediaTypeIds[Number(key)] === MediaType);
        setMediaTypeValue(Number(Id));
    };
    /**
     * @example clearSelectedMediaType
     */
    const clearSelectedMediaType = () => {
        setMediaTypeValue(0);
        props.filterSelectedMediaType(0);
    };
    return (_jsxs("div", { children: [_jsx(CcfBox, Object.assign({ sx: { padding: { xs: '0px 0px 0.5rem 0px', xl: '0.5rem', lg: '0px 0px 0.5rem 0px' } } }, { children: _jsx(TextField, { type: "search", size: 'small', placeholder: translate('search'), InputProps: {
                        startAdornment: (_jsx(InputAdornment, Object.assign({ position: 'start' }, { children: _jsx(CcfSearchIcon, { fontSize: 'small' }) }))),
                        endAdornment: (_jsx(InputAdornment, Object.assign({ position: "end" }, { children: mediaTypeIdArray.length > 0 &&
                                _jsx(CcfTooltip, Object.assign({ role: "button", title: translate('filterOptions'), "aria-label": translate('filterOptions'), arrow: true }, { children: _jsx(Button, Object.assign({ "data-testid": "filter-icon", onClick: (e) => setAnchorEl(e.currentTarget), sx: [{ minWidth: '1rem', width: '1rem' }, styles === null || styles === void 0 ? void 0 : styles.focusedElement], disableRipple: true, "aria-controls": id, "aria-expanded": open }, { children: _jsx(CcfFilterIcon, { svgIconProps: { sx: styles.filterIcon }, isFilterSelected: true }) })) })) }))),
                    }, onChange: (event) => props.setSearchText(event.target.value), variant: 'outlined', role: 'search', sx: { width: { xs: '100%', xl: '100%', lg: '255px' }, height: '40px' } }) })), _jsxs(Popover, Object.assign({ id: id, "data-testid": "popover-filter", open: open, anchorEl: anchorEl, onClose: handleClosePopover, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, PaperProps: {
                    style: {
                        width: '16.875rem',
                        height: '194px',
                        borderRadius: '0.5rem',
                    },
                } }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.contentDiv }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'h5', variantMapping: { h5: 'h2' }, sx: styles.filtersText }, { children: translate('filterOptions') })), _jsx(CcfButton, Object.assign({ type: "button", onClick: handleClosePopover, onKeyDown: (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleClosePopover();
                                    }
                                }, "aria-label": translate('close'), sx: Object.assign(Object.assign({}, styles.closebutton), styles.focusedElement), "data-testid": "CloseIcon", disableRipple: true }, { children: _jsx(CcfCloseIcon, { viewBox: "-8 -4 32 32", sx: styles.closeIcon, "aria-hidden": "true", focusable: "false" }) }))] })), _jsxs(CcfBox, Object.assign({ sx: styles.boxDropdown }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.helperText }, { children: translate('mediaType') })), _jsxs(CcfTextField, Object.assign({ id: 'ccfTextFieldSelectMediaTypes', size: "small", sx: styles.selectedTxt, value: MediaTypeIds[mediaTypeValue], onChange: handleChange, select: true, variant: "outlined", defaultValue: MediaTypeIds[0], inputProps: {
                                    'data-testid': 'mediatype-list',
                                    'aria-label': `${translate('select')} ${translate('mediaType')}`,
                                } }, { children: [_jsx(MenuItem, Object.assign({ value: MediaTypeIds[0], "data-testid": "mediaTypeValue", sx: styles === null || styles === void 0 ? void 0 : styles.selectedMenuItem }, { children: translate('allMediaTypes') })), mediaTypeIdArray.map(item => _jsx(MenuItem, Object.assign({ value: MediaTypeIds[item], sx: styles === null || styles === void 0 ? void 0 : styles.selectedMenuItem }, { children: translate(MediaTypeIds[item]) }), item))] }), "ccfSelectText")] })), _jsxs(CcfBox, Object.assign({ sx: styles.boxBtn }, { children: [_jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.secondaryButton), styles.focusedElement), onClick: clearSelectedMediaType, variant: "contained", size: "small", "data-testid": "agent-skills-search-secondary-btn", disableRipple: true }, { children: _jsx(CcfTypography, { sx: styles.btnText, translationKey: 'clear' }) }), "ccfSecondarybtn"), _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.applyBtn), styles.focusedElement), onClick: () => {
                                    props.filterSelectedMediaType(mediaTypeValue);
                                    handleClosePopover();
                                }, variant: "contained", size: "small", disableRipple: true, primary: true, "data-testid": "agent-skills-search-primary-btn" }, { children: _jsx(CcfTypography, { sx: styles.btnText, translationKey: 'apply' }) }), "ccfPrimarybtn")] }))] }))] }));
}
export default React.memo(CcfAgentSkillsSearch);
//# sourceMappingURL=ccf-agent-skills-search.js.map