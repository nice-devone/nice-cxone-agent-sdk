import { jsx as _jsx } from "react/jsx-runtime";
import { Chip } from '@mui/material';
/**
 * renders the chip
 * @param props - CcfMessageActionChipProps
 * @example <CcfMessageActionChip />
 * @returns
 */
export const CcfMessageActionChip = (props) => {
    const { size, label, style } = props;
    return _jsx(Chip, { variant: "outlined", size: size, label: label, sx: Object.assign({}, style) });
};
//# sourceMappingURL=ccf-message-action-chip.js.map