import { jsx as _jsx } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import { useMemo, lazy, Suspense } from 'react';
import { useTranslator } from '@nice-devone/ui-controls';
import { shallowEqual, useSelector } from 'react-redux';
import { getSelectedInteractionInfo } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getcurrentCustomerContactInfo } from '../../../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import useLVAppSpacePermission from '../../hooks/useLVAppSpacePermission';
import LvCircularProgress from '../../lv-circular-progress/lv-circular-progress';
const LvExternalData = lazy(() => import('../lv-external-data/lv-external-data'));
const TABS = {
    externalData: 'externalData',
};
/**
 * Creates extra tabs to be injected in LVCustomerCard
 * @example
 * ```
 * const tabs = useTabsFactory()
 * ```
 */
export default function useTabsFactory() {
    var _a;
    const [translate] = useTranslator();
    // Referenced from:
    // libs/react/ui-components/src/lib/ccf-app-space/ccf-customer-card/ccf-customer-card.tsx:146
    const { isAgentIntegrationsEnabled } = useLVAppSpacePermission();
    const selectedInteraction = useSelector(getSelectedInteractionInfo, shallowEqual);
    const customerContactIdFromSearch = (_a = useSelector(getcurrentCustomerContactInfo)) === null || _a === void 0 ? void 0 : _a.customerId;
    const tabs = useMemo(() => {
        return [
            ...(selectedInteraction && isAgentIntegrationsEnabled && !customerContactIdFromSearch
                ? [
                    {
                        element: (_jsx(Suspense, Object.assign({ fallback: _jsx(LvCircularProgress, {}) }, { children: _jsx(LvExternalData, {}) }))),
                        label: translate('externalData'),
                        path: TABS.externalData,
                        sx: {
                            height: 1,
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            p: 0,
                        },
                    }
                ]
                : [])
        ];
    }, [isAgentIntegrationsEnabled, selectedInteraction, customerContactIdFromSearch, translate]);
    return { tabs };
}
//# sourceMappingURL=useTabsFactory.js.map