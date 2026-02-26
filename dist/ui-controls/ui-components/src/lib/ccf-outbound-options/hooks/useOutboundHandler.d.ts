import { CXoneDigitalChannel, ElevatedFrom } from '@nice-devone/common-sdk';
import { OBChannels } from '../ccf-outbound-options';
import { CXoneContact } from '@nice-devone/agent-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
export declare type PhoneOutboundProps = {
    contactId?: CXoneContact['contactID'];
    customerId?: string;
    interactionId?: CXoneContact['interactionId'];
    phone: string | number;
    skillId?: number;
    triggerType?: string;
};
export declare type CreateDigitalContactProps = {
    channel: CXoneDigitalChannel;
    customerId?: string;
    customerName?: string;
    fromProvider?: ElevatedFrom;
    interactionId?: CXoneContact['interactionId'];
    receiverTo: string | number;
    digitalSkillId?: number;
};
export declare type DigitalOutboundProps = {
    channelType: OBChannels;
    channelId: CXoneDigitalChannel['channelId'];
} & Omit<CreateDigitalContactProps, 'channel'>;
/**
 * Creates the CXone digital contact used for outbound operations
 * Notes:
 * - If you notice, The CXoneDigitalContact is expecting recipientTo/number on the customerName
 *   and not the real customerName, being recipientTo/number, the destination
 *   ie. emailAddress/phoneNumber.
 *   Meanwhile, I was doing the refactor, I noticed the same so I tried to clarify that a
 *   little and by decision I left both, with the idea of having handy the
 *   real customer name in the future in case it is needed
 * @example
 * ```
 * const digitalContact = createCXoneDigitalContact()
 * ```
 */
export declare function createCXoneDigitalContact(props: CreateDigitalContactProps): CXoneDigitalContact;
/**
 * Stores in Local Storage a CXoneDigital Contact
 * @example
 * ```
 * setObDigitalContactInLocalStorage(CXoneDigitalContact)
 * ```
 */
export declare function setObDigitalContactInLocalStorage(obDigitalContact: CXoneDigitalContact): void;
/**
 * The idea is to encapsulate in just one place all of the outbound communication
 * - This hook supports Elevations as well
 * Definition:
 * - Elevation: And Outbound with interactionId and/or contactId
 * Returns:
 * - triggerOutboundDigital: Method that can be used to triggerOutboundDigital from any place
 * - triggerOutboundCall: Method that can be used to triggerOutboundCall from any place
 * Ref:
 * - libs/react/ui-components/src/lib/ccf-outbound-options/ccf-outbound-options.tsx:1
 * - libs/react/ui-components/src/lib/ccf-add-channel-options/ccf-add-channel-options.tsx:107
 * @example
 * ```
 * const outboundHandler = useOutboundHandler()
 * ```
 */
export default function useOutboundHandler(): {
    triggerOutboundCall: (props: PhoneOutboundProps) => void;
    triggerOutboundDigital: (props: DigitalOutboundProps) => void;
};
