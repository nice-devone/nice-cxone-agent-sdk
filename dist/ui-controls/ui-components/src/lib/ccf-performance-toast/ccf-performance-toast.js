import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslator, CcfBox } from '@nice-devone/ui-controls';
/**
  * Used to show  heap performance reload toast message
 * @example `<CcfPerformanceToast />`
 */
export const CcfPerformanceToast = () => {
    const [translate] = useTranslator();
    return (_jsx(CcfBox, { children: translate('memoryIsHigh') }));
};
//# sourceMappingURL=ccf-performance-toast.js.map