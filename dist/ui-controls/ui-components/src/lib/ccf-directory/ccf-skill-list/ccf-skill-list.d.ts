import { SkillActivityEvent } from '@nice-devone/agent-sdk';
import { SkillEvent } from '@nice-devone/common-sdk';
/**
 * Component to be used for directory item
 * @param props - Skill
 * @example <DirectorySkills />
 * @returns
 */
declare const DirectorySkills: (props: {
    skill: SkillActivityEvent | SkillEvent;
}) => JSX.Element;
export default DirectorySkills;
