import { VoiceMailContactEvent } from '@nice-devone/common-sdk';
import { CallControlButton } from './call-control-button';
import { CXoneContact } from './cxone-contact';
export interface VoiceMailContact extends CXoneContact {
    callControlButton: CallControlButton;
    contact: VoiceMailContactEvent;
}
