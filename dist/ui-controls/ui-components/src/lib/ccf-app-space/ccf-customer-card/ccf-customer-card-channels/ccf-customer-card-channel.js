import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';
import { CcfBox, useTranslator, } from '@nice-devone/ui-controls';
import customerCardChannelStyles from './ccf-customer-card-channel.styles';
import { useSelector } from 'react-redux';
import { cxoneCustomerCardIdentities } from '../ccf-customer-card.slice';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../../ccf-icon/ccf-icon';
import GetDigitalChannelProperties from '../../../ccf-interaction-space/ccf-digital-channel-properties';
/**
 * CcfCustomerCardChannel - Is used to display the channels information of customer under customer card.
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCardChannel />
 */
export function CcfCustomerCardChannel(props) {
    const { customerID, setIsChannelsDisabled } = props;
    const CCFIdendities = useSelector(cxoneCustomerCardIdentities);
    const [translate] = useTranslator();
    const theme = useTheme();
    const style = customerCardChannelStyles(theme);
    useEffect(() => {
        setIsChannelsDisabled && setIsChannelsDisabled(!customerID || (CCFIdendities === null || CCFIdendities === void 0 ? void 0 : CCFIdendities.length) === 0);
    }, [CCFIdendities, customerID]);
    // TODO- We will add other icons in next sprint.
    return (_jsx(CcfBox, { children: customerID && (CCFIdendities === null || CCFIdendities === void 0 ? void 0 : CCFIdendities.length) > 0 ? (CCFIdendities === null || CCFIdendities === void 0 ? void 0 : CCFIdendities.map((fields) => {
            var _a;
            return (_jsxs(CcfBox, Object.assign({ className: 'identity', sx: style.bottomPad15 }, { children: [_jsx(CcfBox, Object.assign({ component: "div", sx: style.flexSpaceBetween }, { children: _jsx(CcfBox, Object.assign({ component: "div", sx: style.detailsCustomFieldLabel }, { children: _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfIcon, { iconName: fields.externalPlatformId, size: CHANNEL_ICON_SIZE.SMALL }) })), _jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfBox, Object.assign({ sx: style.channelText }, { children: ((_a = GetDigitalChannelProperties(fields === null || fields === void 0 ? void 0 : fields.externalPlatformId)) === null || _a === void 0 ? void 0 : _a.displayName) || '' })) }))] })) })) })), _jsx(CcfBox, Object.assign({ className: 'idOnExternalPlatform', component: "div", sx: style.detailsCustomFieldData }, { children: fields.idOnExternalPlatform }))] }), fields === null || fields === void 0 ? void 0 : fields.id));
        })) : (_jsx(CcfBox, Object.assign({ className: 'no-record', sx: style.noInformation }, { children: translate('noInformationAvailable') }))) }));
}
export default CcfCustomerCardChannel;
//# sourceMappingURL=ccf-customer-card-channel.js.map