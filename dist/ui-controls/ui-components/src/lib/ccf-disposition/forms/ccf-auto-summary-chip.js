import { jsx as _jsx } from "react/jsx-runtime";
import { Chip, useTheme } from '@mui/material';
import { useTranslator } from '@nice-devone/ui-controls';
import DoneIcon from '@mui/icons-material/Done';
import WarningIcon from '@mui/icons-material/Warning';
import { AutoSummaryErrorCode } from '@nice-devone/common-sdk';
/**
 * Function to return the AutoSummaryStatus chip
 * @param activeDisposition - current active disposition object
 * @returns - AutoSummaryStatus chip UX
 * @example - AutoSummaryStatusChip(activeDisposition)
 */
export const CcfAutoSummaryChip = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const activeDisposition = props.activeDisposition;
    const isFinalSummaryGenerated = props.isFinalSummaryGenerated || false;
    const theme = useTheme();
    const [translate] = useTranslator();
    let styles = {};
    let isShowChip = false;
    let labelText = '';
    let avatar;
    if (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasAutoSummaryTimedOut) {
        isShowChip = true;
        styles = { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.main, backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper };
        labelText = translate('autoSummaryError');
        avatar = _jsx(WarningIcon, { sx: { fill: 'none', stroke: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.main } });
    }
    else if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage) === AutoSummaryErrorCode.noError || isFinalSummaryGenerated) {
        isShowChip = true;
        styles = { color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.success) === null || _h === void 0 ? void 0 : _h.main, backgroundColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.paper };
        labelText = translate('autoSummaryCompleted');
        avatar = _jsx(DoneIcon, { sx: { stroke: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.success) === null || _m === void 0 ? void 0 : _m.main } });
    }
    else if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage) === AutoSummaryErrorCode.callTooShort) {
        isShowChip = true;
        styles = { backgroundColor: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.paper };
        labelText = translate('autoSummaryTooShort');
    }
    else if ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.autoSummaryErrorMessage) === AutoSummaryErrorCode.failedToGenerate || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.hasFinalSummaryTimedout)) {
        isShowChip = true;
        styles = { backgroundColor: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.paper };
        labelText = translate('autoSummaryNotAvailable');
    }
    return isShowChip ? (_jsx(Chip, { sx: Object.assign(Object.assign({}, styles), { [theme.breakpoints.down('md')]: {
                '.MuiChip-label': {
                    minWidth: 160,
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word',
                },
            } }), label: labelText, avatar: avatar })) : null;
};
export default CcfAutoSummaryChip;
//# sourceMappingURL=ccf-auto-summary-chip.js.map