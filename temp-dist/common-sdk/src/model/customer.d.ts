import { CustomerHistory } from './customer-history';
export interface Customer {
    customerName: string;
    customerAddress?: string;
    customerHistory: CustomerHistory[];
    phoneNo: string;
    emailId: string;
    twitterId: string;
    filteredHistory?: CustomerHistory[];
    filteredHistoryCount: number;
    totalHistoryCount?: number;
    nextPage?: number;
    ibHistoryCount?: number;
    obHistoryCount?: number;
    otherHistoryCount?: number;
}
