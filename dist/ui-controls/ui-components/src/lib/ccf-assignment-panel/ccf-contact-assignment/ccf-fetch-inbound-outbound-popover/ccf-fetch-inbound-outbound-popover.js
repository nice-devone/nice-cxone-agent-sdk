import { jsx as _jsx } from "react/jsx-runtime";
import { CcfPopOver, useTranslator } from '@nice-devone/ui-controls';
import { useSelector } from 'react-redux';
import { isOutboundSkillSelector } from '../../../ccf-agent-skill/ccf-agent-skill-details-slice';
import { getmchSettings } from '../../../ccf-agent-setting/ccf-agent-setting-slice';
import { Box } from '@mui/material';
/**
 * Function is used to display popup component on assignemnt section
 * @param props -CcfFetchInboundOutboundPopoverProps
 * @returns Popup component displaying fetching interaction and initiate outbound options
 * ```
 * @example <CcfFetchInboundOutboundPopover iconComponent={<CcfNewInteractionIcon />} initiateOutbound={outboundCallInitiate} fetchInteraction={fetchInteraction}/>
 * ```
 */
export function CcfFetchInboundOutboundPopover(props) {
    const [translate] = useTranslator();
    const isOutboundSkillAssigned = useSelector(isOutboundSkillSelector);
    const isRequestInteractionEnabled = useSelector(getmchSettings).requestContact;
    const dropdownOptions = {
        menuItems: [
            {
                items: [],
            }
        ],
    };
    if (isOutboundSkillAssigned || props.userHaveObChannel) {
        dropdownOptions.menuItems[0].items.push({
            label: translate('newOutbound'),
            closeOnSelection: true,
        });
    }
    if (isRequestInteractionEnabled) {
        dropdownOptions.menuItems[0].items.push({
            label: translate('requestInteraction'),
            closeOnSelection: true,
        });
    }
    /**
     * Function is helps in calling function when button is clicked on popup
     * @param item -String
     * @returns Function
     * @example onPopOverItemSelections('fetchingInteractions')
     */
    const onPopOverItemSelection = (item) => () => {
        switch (item.label) {
            case translate('requestInteraction'):
                return props.fetchInteraction();
            case translate('newOutbound'):
                return props.initiateOutbound();
            default:
                return console.log('Please select correct option');
        }
    };
    return (_jsx(Box, Object.assign({ component: 'div', sx: { height: '1.5rem', marginBottom: '5px' } }, { children: dropdownOptions.menuItems[0].items.length > 0 && (_jsx(CcfPopOver, { onPopOverItemSelection: onPopOverItemSelection, optionList: dropdownOptions, iconComponent: props.iconComponent, tooltipTitle: 'startAnotherInteraction', tooltipArrow: true })) })));
}
export default CcfFetchInboundOutboundPopover;
//# sourceMappingURL=ccf-fetch-inbound-outbound-popover.js.map