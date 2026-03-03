import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Grid, Box, useTheme } from '@mui/material';
import CcfBox from '../ccf-box/ccf-box';
import { CcfTooltip } from '../ccf-tooltip/ccf-tooltip';
import { CcfTypography } from '../ccf-typography/ccf-typography';
import CcfGridSelectionBannerStyle from './ccf-grid-selection-banner-styles';
/**
 * @example `<CcfGridSelectionBanner gridSelectionDetails={gridSelectionDetails} handleActionButtonClick={handleActionButtonClick} />`
 *
 * @returns Selection Banner component for ccf grid
 *
 */
export const CcfGridSelectionBanner = (props) => {
    const { gridSelectionDetails, handleActionButtonClick, isTwoColumnDesign } = props;
    const theme = useTheme();
    const styles = CcfGridSelectionBannerStyle(theme, isTwoColumnDesign);
    /**
     * Function to handle click of Assign to someone else button
     * @example handleActionButtonClickHandler(clickEvent, buttonId)
    */
    const handleActionButtonClickHandler = (event, actionButtonId) => {
        handleActionButtonClick(event, actionButtonId);
    };
    return (_jsx(Grid, Object.assign({ container: true, flexDirection: 'column' }, { children: _jsx(Grid, Object.assign({ item: true, sx: styles.gridItems }, { children: _jsxs(CcfBox, Object.assign({ sx: styles.gridSelectionContainer }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.gridSelectionLabel }, { children: gridSelectionDetails.headerTitle })), _jsx(Box, Object.assign({ sx: styles.actionButtonContainer }, { children: gridSelectionDetails.actionButtons.map((currentItem) => (_jsx(CcfTooltip, Object.assign({ title: currentItem.buttonLabel, arrow: true }, { children: _jsx(Button, Object.assign({ variant: "outlined", size: "small", sx: Object.assign({}, styles.actionButton), onClick: (event) => handleActionButtonClickHandler(event, currentItem.buttonId) }, { children: currentItem.buttonLabel }), currentItem.buttonId) })))) }))] })) })) })));
};
export default CcfGridSelectionBanner;
//# sourceMappingURL=ccf-grid-selection-banner.js.map