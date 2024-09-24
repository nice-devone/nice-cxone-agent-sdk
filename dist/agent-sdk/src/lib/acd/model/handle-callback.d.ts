import { CXoneContact } from './cxone-contact';
export interface HandleCallback {
    (data: CXoneContact): void;
}
