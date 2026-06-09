import { AgentLog, ContactLog, SkillLog } from '@nice-devone/common-sdk';
export interface LogMessage {
    functionName: string;
    text: string;
    data?: ContactLog | AgentLog | SkillLog;
}
