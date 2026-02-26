import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import { useState, useEffect } from 'react';
import CcfCustomerCardActivity from '../../../ccf-app-space/ccf-customer-card/ccf-customer-card-activity/ccf-customer-card-activity';
import CcfCustomerCardPinRecords from '../../../ccf-app-space/ccf-customer-card/ccf-customer-card-pinrecords/ccf-customer-card-pinrecords';
import { useSelector } from 'react-redux';
import { CcfBox, CcfTypography } from '@nice-devone/ui-controls';
import { getActiveContactInSelectedInteraction, getNonIncomingActiveContactInSelectedInteraction, } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfErrorBoundary from '../../../ccf-error-boundary/ccf-error-boundary';
import LvContainer from '../../lv-container/lv-container';
import { cxoneCCActivity } from '../../../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { DATA_TEST_ID } from '../../lv-app-space-utility';
import { useTheme } from '@mui/material';
export const dataTestId = `${DATA_TEST_ID}-external-data`;
/**
 * Extracts the Customer Card External Data component from the CCF Customer Card, so it can be used
 * in LV App Space.
 * Referenced from:
 *   libs/react/ui-components/src/lib/ccf-app-space/ccf-customer-card/ccf-customer-card.tsx:146
 * @example
 * ```
 * <LvExternalData />
 * ```
 */
export function LvExternalData(props) {
    const { sx } = props;
    const [DNIS] = useState('');
    const theme = useTheme();
    // Referenced from:
    // libs/react/ui-components/src/lib/ccf-app-space/ccf-customer-card/ccf-customer-card.tsx:146
    const [isCurrentInteractionDisabled, setIsCurrentInteractionDisabled] = useState(true);
    const [isActivityDisabled, setIsActivityDisabled] = useState(true);
    const [isPinRecordsAvailable, isSetPinRecordsAvailable] = useState(false);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const activityData = useSelector(cxoneCCActivity);
    const isInComingStatus = (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactStatus) === 'incoming';
    /**
     * Referenced from:
     * - libs/react/ui-components/src/lib/ccf-app-space/ccf-customer-card/ccf-customer-card.tsx:158
     */
    useEffect(() => {
        var _a;
        const selectedActivityData = activityData === null || activityData === void 0 ? void 0 : activityData.find((item) => item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) ||
            item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
        const activityResult = (selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result) && (selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result[0]);
        isSetPinRecordsAvailable(((_a = activityResult === null || activityResult === void 0 ? void 0 : activityResult.pinRecords) === null || _a === void 0 ? void 0 : _a.length) > 0);
    }, [activityData]);
    return (_jsxs(LvContainer, Object.assign({ dataTestId: dataTestId, sx: [
            {
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                gap: 1,
                height: 1,
                p: 1,
                '& #relatedHeaderContainer': {
                    position: 'inherit',
                    mb: '0 !important', // CXDSK-68
                },
                '& #ccfAppSpaceActivityContainer': {
                    px: `${theme.spacing(0.5)} !important`, // CXDSK-72
                },
            },
            ...(Array.isArray(sx) ? sx : [sx])
        ] }, { children: [_jsxs(CcfBox, Object.assign({ component: "div", sx: Object.assign({}, (isCurrentInteractionDisabled || !isPinRecordsAvailable ? { display: 'none' } : {})) }, { children: [_jsx(CcfTypography, { variant: 'overline', translationKey: 'currentInteraction' }), _jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfCustomerCardPinRecords" }, { children: _jsx(CcfCustomerCardPinRecords, { dnis: DNIS, setIsCurrentInteractionDisabled: setIsCurrentInteractionDisabled }) }))] })), _jsxs(CcfBox, Object.assign({ component: "div", sx: Object.assign({}, (isInComingStatus || isActivityDisabled ? { display: 'none' } : { flex: 1 })) }, { children: [_jsx(CcfTypography, { variant: 'overline', translationKey: 'relatedInteractions' }), _jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfCustomerCardActivity" }, { children: _jsx(CcfCustomerCardActivity, { dnis: DNIS, setIsActivityDisabled: setIsActivityDisabled }) }))] }))] })));
}
export default LvExternalData;
//# sourceMappingURL=lv-external-data.js.map