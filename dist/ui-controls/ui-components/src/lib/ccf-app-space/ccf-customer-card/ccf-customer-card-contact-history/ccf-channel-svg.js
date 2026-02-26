import { CHANNEL_ICON_NAME, iconList } from '../../../ccf-icon/ccf-icon-list';
/**
 * @param channel - name of channel
 * @param size - of icon
 * @returns - returns HTML template for icon
 * @example - 'chat'.'voice'
 */
export const getChannelSVG = (channel, size) => {
    if (Object.values(CHANNEL_ICON_NAME).includes(channel)) {
        return iconList[channel](size);
    }
};
//# sourceMappingURL=ccf-channel-svg.js.map