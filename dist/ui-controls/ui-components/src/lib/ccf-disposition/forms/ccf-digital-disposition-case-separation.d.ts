/// <reference types="react" />
import { DigitalDispositionForm } from '../ccf-disposition-slice';
interface DigitalDispositionProps {
    formData: DigitalDispositionForm;
    isResolved: boolean;
    onClickSaveButton: () => void;
    isSaveDisabled: boolean;
}
declare const _default: import("react").MemoExoticComponent<({ formData, isResolved, onClickSaveButton, isSaveDisabled }: DigitalDispositionProps) => JSX.Element>;
export default _default;
