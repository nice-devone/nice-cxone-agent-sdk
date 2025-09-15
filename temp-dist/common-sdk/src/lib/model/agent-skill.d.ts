/**
 * Declare all the agent skills details
 */
export interface AgentSkill {
    /**
     * @remarks - flag to identify outbound skill
     */
    isOutbound: boolean;
    /**
     * @remarks - The value that indentify whether the outbound skill is 'Manual' or 'PersonalConnection'
     */
    strategy: string;
    /**
     * @remarks - Unique identifier for the type of media
     */
    typeId: number;
    /**
     * @remarks - Unique identifier for skill
     */
    skillId: number;
    /**
     * @remarks - Name of the skill
     */
    skillName: string;
    /**
     * @remarks - flag to identify the skill has ACW state
     */
    useACW: boolean;
    /**
     * @remarks -
     */
    isNaturalCallingRunning: boolean;
    /**
     * @remarks -
     */
    isPriorityBlending: boolean;
}
