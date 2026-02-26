import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { CcfAccordion, CcfAccordionDetails, CcfAccordionSummary, CcfBackIcon, CcfBox, CcfCallMergeIcon, CcfTypography } from '@nice-devone/ui-controls';
import { IconButton, useTheme } from '@mui/material';
import customerCardTitleStyles from '../ccf-customer-card-search.styles';
import CcfCustomerCardSearchResultDetail from './ccf-customer-card-search-result-detail';
import { getChannelSVG } from '../../ccf-customer-card-contact-history/ccf-channel-svg';
import { CHANNEL_ICON_SIZE } from '../../../../ccf-icon/ccf-icon';
import { CHANNEL_ICON_NAME } from '../../../../ccf-icon/ccf-icon-list';
import GetDigitalChannelProperties from '../../../../ccf-interaction-space/ccf-digital-channel-properties';
import { useDispatch, useSelector } from 'react-redux';
import { cxoneCustomerCardIdentities, isCustomerCardMergedSelector, mergeCustomerCard } from '../../ccf-customer-card.slice';
/**
 * CcfCustomerCardSearchResult - used to display the single search result
 * @param props -?-CcfCustomerCardSearchResultProps
 * @example <CcfCustomerCardSearchResult />
 */
export function CcfCustomerCardSearchResult(props) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = customerCardTitleStyles(theme);
    const selectedCustomerDetail = props;
    const cxoneIdentity = useSelector(cxoneCustomerCardIdentities);
    const ccMergeResponse = useSelector(isCustomerCardMergedSelector);
    const [isExpanded, setIsExpanded] = useState(false);
    const channelType = props.customer.id.split('_')[0] &&
        CHANNEL_ICON_NAME[props.customer.id.split('_')[0].toUpperCase()];
    const digitalChannelProperties = channelType
        ? GetDigitalChannelProperties(channelType)
        : null;
    useEffect(() => {
        if (ccMergeResponse.isCustomerCardMergedStatus) {
            props.returnToMainScreen(ccMergeResponse);
        }
    }, [ccMergeResponse]);
    /**
     * Handles the change event for accordion
     * @example - handleChange(event)
     */
    const handleChange = () => {
        setIsExpanded(!isExpanded);
    };
    /**
     * Merges the current customer with the specified customer
     * @example - mergeCustomerCardHandler()
     */
    const mergeCustomerCardHandler = () => {
        const currentCustomerId = (cxoneIdentity === null || cxoneIdentity === void 0 ? void 0 : cxoneIdentity.length) > 0 ? cxoneIdentity[0].id : '';
        dispatch(mergeCustomerCard({ currentCustomerId, customerToMergeId: selectedCustomerDetail.customer.id }));
    };
    return (_jsxs(CcfAccordion, Object.assign({ square: true, expanded: isExpanded, onChange: handleChange, sx: styles.customerDetailAccordion, "data-testid": "customerDetailsAccordion" }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfBackIcon, { sx: styles.accordionIcon, "data-testid": "customerDetailsAccordionExpand" }), "aria-controls": "customer-content", id: "customer-header" }, { children: _jsxs(CcfBox, Object.assign({ component: "div", display: 'flex', justifyContent: 'space-between', sx: isExpanded ? { margin: 0, width: '100%' } : {} }, { children: [_jsxs(CcfBox, Object.assign({ display: 'flex', flexDirection: 'column' }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'h4', sx: styles.customerNameTitle }, { children: props.customer.fullName })), _jsxs(CcfBox, Object.assign({ component: "div", sx: styles.customDetailField }, { children: [getChannelSVG(channelType, CHANNEL_ICON_SIZE.EXTRA_SMALL), _jsx(CcfBox, Object.assign({ component: "span", sx: styles.leftPad10 }, { children: digitalChannelProperties === null || digitalChannelProperties === void 0 ? void 0 : digitalChannelProperties.displayName }))] }))] })), isExpanded && _jsx(IconButton, Object.assign({ onClick: mergeCustomerCardHandler, sx: { p: 0 }, "data-testid": 'iconButton' }, { children: _jsx(CcfCallMergeIcon, {}) }))] })) })), _jsx(CcfAccordionDetails, { children: _jsx(CcfBox, Object.assign({ component: "div" }, { children: _jsx(CcfBox, { children: _jsx(CcfCustomerCardSearchResultDetail, { customer: props.customer }) }) })) })] })));
}
export default CcfCustomerCardSearchResult;
//# sourceMappingURL=ccf-customer-card-search-result.js.map