import { CallContactEvent } from '@nice-devone/common-sdk';
import { CallControlButton } from './call-control-button';
import { CXoneContact } from './cxone-contact';
export interface CallContact extends CXoneContact {
    callControlButton: CallControlButton;
    contact: CallContactEvent;
}
