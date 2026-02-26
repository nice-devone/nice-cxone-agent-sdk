import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslator } from '../../ccf-translator/ccf-translator';
import CcfBox from '../ccf-box/ccf-box';
import ccfNoResultStyles from './ccf-no-result.style';
/**
 * The component is used to display a custom message when there is no data to be displayed.
 * @example
 * ```
 * <CustomNoResultComponent/>
 * ```
 */
export const CustomNoResultComponent = () => {
    const [translate] = useTranslator();
    const noResultStyles = ccfNoResultStyles();
    return _jsx(CcfBox, Object.assign({ sx: noResultStyles.resultNotFound }, { children: translate('noResultsFound') }));
};
export default CustomNoResultComponent;
//# sourceMappingURL=ccf-no-result.js.map