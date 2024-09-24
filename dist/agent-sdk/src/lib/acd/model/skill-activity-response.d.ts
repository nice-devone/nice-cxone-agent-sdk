import { SkillActivityEvent } from './skill-activity-event';
export interface SkillActivityResponse {
    skillActivityData: SkillActivityEvent[];
    totalRecords?: number;
    totalSearchResultCount?: number;
}
