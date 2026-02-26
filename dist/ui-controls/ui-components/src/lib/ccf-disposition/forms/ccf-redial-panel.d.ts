export interface CcfRedialPanelProps {
    setIsDisplayRedialPanel: (isDisplayRedialPanel: boolean) => void;
    selectedOBSkill: number;
    setSelectedOBSkill: (skill: number) => void;
}
/**
 * Component displays ACD save and redial panel in outcomes panel
 * @param props - React properties
 * @returns ACD save and redial panel in outcomes panel
 * @example <CCFRedialPanel />
 */
declare const CCFRedialPanel: ({ setIsDisplayRedialPanel, selectedOBSkill, setSelectedOBSkill }: CcfRedialPanelProps) => JSX.Element;
export default CCFRedialPanel;
