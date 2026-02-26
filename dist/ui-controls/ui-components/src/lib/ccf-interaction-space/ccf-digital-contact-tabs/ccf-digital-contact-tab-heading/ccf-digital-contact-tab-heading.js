import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Badge, useTheme } from '@mui/material';
import CcfDigitalContactTabHeadingStyles from './ccf-digital-contact.tab-heading.style';
import { getAllInteractions, getDigitalContactDetailsByCaseId, getNonIncomingActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { DigitalChannelType, MediaType } from '@nice-devone/common-sdk';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../../ccf-icon/ccf-icon';
import { CHANNEL_TYPE } from '../../../ccf-icon/ccf-icon-list';
import { CcfBox, CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import GetDigitalChannelProperties from './ccf-digital-channel-properties';
import { getIntegratedAgent } from '../../../global.app.slice';
import { useIsVoiceTranscriptEnabled } from '../../../../hooks/useVoiceTranscriptEnabled';
/**
 * @returns - Diital contacts tab heading
 * @example - CcfDigitalContactsTabHeading()
 */
export const CcfDigitalContactsTabHeading = (props) => {
    var _a;
    const { caseId, interactionId, contactId } = props;
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const allInteractions = useSelector(getAllInteractions);
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfDigitalContactTabHeadingStyles(theme);
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(caseId, interactionId));
    const isWorkItem = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.WORKITEM;
    let iconName;
    if (selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) {
        const { realExternalPlatformId } = selectedDigitalContactDetails.channel;
        iconName = selectedDigitalContactDetails.case.direction
            ? `${realExternalPlatformId}_${selectedDigitalContactDetails.case.direction}`
            : realExternalPlatformId;
    }
    let channelType = isWorkItem ? MediaType.WORKITEM.toLowerCase() : iconName;
    //Show transcription component when voice and permissions are enabled
    const isVoiceTranscriptEnabled = useIsVoiceTranscriptEnabled();
    const isActiveVoiceAndTranscriptionToggleOn = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.VOICE && isVoiceTranscriptEnabled;
    if (isActiveVoiceAndTranscriptionToggleOn) {
        channelType = MediaType.VOICE.toLowerCase() + '_';
        if (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound)
            channelType += 'outbound';
        else
            channelType += 'inbound';
    }
    //TODO: Remove this once ccf-channel-icon is in place
    const digitalChannelProperties = channelType
        ? GetDigitalChannelProperties(channelType.replace(/ /g, '')) || GetDigitalChannelProperties((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.realExternalPlatformId)
        : null;
    const isIntegratedAgent = useSelector(getIntegratedAgent);
    /**
     * method to display tabs
     * @returns - React Component
     * @example
     * ```
     * renderTabs()
     * ```
     */
    const renderTabs = useCallback(() => {
        var _a, _b, _c, _d;
        return (_jsx(CcfTooltip, Object.assign({ title: props.isTabsOverflowing ? translate(digitalChannelProperties === null || digitalChannelProperties === void 0 ? void 0 : digitalChannelProperties.displayName) : '', arrow: true, placement: 'top' }, { children: _jsx("div", Object.assign({ style: Object.assign({}, styles.container) }, { children: _jsxs("div", Object.assign({ style: Object.assign({}, styles.header) }, { children: [!((_a = selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.isPrivate)
                            && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) !== DigitalChannelType.EMAIL
                            && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL
                            && _jsx(CcfBox, Object.assign({ "data-test": 'line52', sx: styles.globeIconWrapper }, { children: _jsx(CcfIcon, { iconName: CHANNEL_TYPE.PUBLIC, size: CHANNEL_ICON_SIZE.EXTRA_SMALL, svgIconStyles: { htmlColor: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.black, sx: styles.globeIcon } }) })), _jsxs(CcfBox, Object.assign({ component: 'div', "data-test": 'line58', sx: isIntegratedAgent ? Object.assign({}, styles.integratedAgentTab) : Object.assign(Object.assign({}, styles.nonIntegratedTab), styles.active) }, { children: [interactionId && caseId && ((_d = allInteractions[interactionId].digitalContacts[caseId]) === null || _d === void 0 ? void 0 : _d.showBadge) ? _jsx(Badge, Object.assign({ overlap: "circular", sx: styles.notificationBadge, variant: "dot" }, { children: _jsx(CcfIcon, { iconName: digitalChannelProperties === null || digitalChannelProperties === void 0 ? void 0 : digitalChannelProperties.icon, size: CHANNEL_ICON_SIZE.SMALL, customStyle: styles.channelIcon }) })) : _jsx(CcfIcon, { iconName: digitalChannelProperties === null || digitalChannelProperties === void 0 ? void 0 : digitalChannelProperties.icon, size: CHANNEL_ICON_SIZE.SMALL, customStyle: styles.channelIcon }), _jsx(CcfBox, Object.assign({ "aria-hidden": "true", component: 'div', sx: !isIntegratedAgent ? Object.assign({}, styles.tabContent) : Object.assign({}, styles.tabContentSmallView) }, { children: translate(digitalChannelProperties === null || digitalChannelProperties === void 0 ? void 0 : digitalChannelProperties.displayName) }))] }), nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName)] })) })) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        );
    }, [digitalChannelProperties]);
    return (_jsx(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.headerContainer), styles.headerTabBackground), tabIndex: 0 }, { children: _jsx(CcfBox, Object.assign({ sx: styles.renderTabsContainer }, { children: contactId && renderTabs() })) })));
};
//# sourceMappingURL=ccf-digital-contact-tab-heading.js.map