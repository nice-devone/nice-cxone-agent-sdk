import { DigitalChannelType } from '@nice-devone/common-sdk';
import { useTranslator } from '@nice-devone/ui-controls';
/**
 * Returns contact mode for digital channel.
 *
 *
 * @param inputText - channel name.
 * @example useContactModeMap()
 * @returns contact mode for the channel.
 *
 */
export function useContactModeMap() {
    const [translate] = useTranslator();
    const contactModeMap = new Map([
        [
            DigitalChannelType.INSTAGRAM.toString(),
            translate('post')
        ],
        [
            DigitalChannelType.TWITTER.toString(),
            translate('tweet')
        ],
        [
            DigitalChannelType.FACEBOOK.toString(),
            translate('post')
        ],
        [
            DigitalChannelType.LINKEDIN.toString(),
            translate('post')
        ],
        [
            DigitalChannelType.CHAT.toString(),
            translate('chatContactMode')
        ],
        [
            DigitalChannelType.EMAIL.toString(),
            translate('mail')
        ],
        [
            DigitalChannelType.SMS.toString(),
            translate('smsContactMode')
        ],
        [
            DigitalChannelType.WHATSAPP.toString(),
            translate('message')
        ]
    ]);
    /**
     *
     * @param channelName - string
     * @example
     * @returns contact mode from map
     */
    const getContactMode = (channelName) => {
        return contactModeMap.get(channelName);
    };
    return [getContactMode];
}
//# sourceMappingURL=ccf-contactModeMap.js.map