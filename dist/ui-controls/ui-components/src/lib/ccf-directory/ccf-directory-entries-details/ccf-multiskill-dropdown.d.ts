/// <reference types="react" />
interface AgentMultiSkillHoverDropDownViewProps {
    data: {
        skillId: number;
        skillName: string;
    }[];
    handleTrigger: (event: React.MouseEvent<HTMLElement>) => void;
}
/**
 * renders the select skills dropdown
 * @param props - AgentMultiSkillHoverDropDownViewProps
 * @example agentMultiSkillHoverDropDownView
 * @returns
 */
export declare const AgentMultiSkillHoverDropDownView: (props: AgentMultiSkillHoverDropDownViewProps) => JSX.Element;
export default AgentMultiSkillHoverDropDownView;
