import React from 'react';
import type { AgentContactHistory } from './ccf-agent-card-contact-history';
export interface DispositionModalProps {
    modalData: AgentContactHistory;
    setModalData: React.Dispatch<React.SetStateAction<AgentContactHistory | null>>;
}
/**
 * Disposition Modal component to show dispositon notes and tags for contact histories.
 * @param modalData - data passed to modal
 * @param setModalData - set the data passed to the modal, making it a controlled component
 * @example <DispositionModal />
 */
export declare function DispositionModal({ modalData, setModalData }: DispositionModalProps): JSX.Element;
export default DispositionModal;
