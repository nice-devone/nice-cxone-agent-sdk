import { ContactData } from './contact-data';
export interface WorkItemContactCard extends ContactData {
    payload?: string;
    workItemType?: string;
}
