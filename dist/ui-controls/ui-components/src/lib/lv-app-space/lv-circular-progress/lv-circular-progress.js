import { jsx as _jsx } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import MuiCircularProgress from '@mui/material/CircularProgress';
import { CcfBox } from '@nice-devone/ui-controls';
import { DATA_TEST_ID } from '../lv-app-space-utility';
export const dataTestId = `${DATA_TEST_ID}-circular-progress`;
/**
 * CircularProgress that is centered to the container
 * @example
 * ```
 *  <LvCircularProgress />
 * ```
 */
export function LvCircularProgress() {
    return (_jsx(CcfBox, Object.assign({ "data-testid": dataTestId, sx: {
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
        } }, { children: _jsx(MuiCircularProgress, {}) })));
}
export default LvCircularProgress;
//# sourceMappingURL=lv-circular-progress.js.map