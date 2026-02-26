/// <reference types="react" />
/**
 * Interface for defining props of CcfDigitalWAOBContact component
 */
export interface CcfDigitalWaOBContactProps {
    id: string;
    /**
     * @remarks - status of the selected contact
     */
    status: string;
    /**
     * @remarks - customer name of the selected contact
     */
    customerName: string;
    /**
     * @remarks - caseId of the selected contact
     */
    caseId: string;
    /**
     * @remarks - interactionId of the selected contact
     */
    interactionId: string;
    /**
    * @remarks - contactId of the selected contact
    */
    contactId: string;
    closeTab: ((tabNumber: string) => void) | undefined;
    isDraftOBDigitalContact: boolean | undefined;
}
declare const _default: import("react").MemoExoticComponent<(props: CcfDigitalWaOBContactProps) => JSX.Element>;
export default _default;
