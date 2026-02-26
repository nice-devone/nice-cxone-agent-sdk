import { DispositionData } from '../ccf-disposition-slice';
interface CcfSaveAndRedialButtonProps {
    isSaveRedialDisabled: boolean;
    isDisplayRedialPanel: boolean;
    selectedOBSkill: number;
    setIsDisplayRedialPanel: (value: boolean) => void;
    setupPendingRedial: () => void;
    onClickSaveButton: (value: boolean) => void;
    activeDisposition: DispositionData | null;
}
/**
 * Component to display save and redial button for outcomes panel and redial panel
 * @returns save and redial button
 * @example - <CcfSaveAndRedialButton />
 */
declare const CCFSaveRedialButton: ({ isSaveRedialDisabled, isDisplayRedialPanel, setIsDisplayRedialPanel, setupPendingRedial, onClickSaveButton, activeDisposition, }: CcfSaveAndRedialButtonProps) => JSX.Element;
export default CCFSaveRedialButton;
