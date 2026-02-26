import React from 'react';
import { CcfTranslationKey } from '@nice-devone/i18n';
import { Dayjs } from 'dayjs';
export declare type DateFormat = Dayjs | null;
/**
 * @remarks "ProductivityReportFilter " is for custom start date and end date from calender
 */
export interface ProductivityReportFilter {
    startDate: DateFormat;
    endDate: DateFormat;
}
/**
 * @remarks "ProductivityReportFilter " is for custom start date and end date from calender
 */
export interface CcfReportingHeaderProps {
    agentOverallPercentage: number | null;
    type: CcfTranslationKey;
}
/**
 * Component for ccf reporting header
 *
 * @example - <CcfReportingHeader />
 * @returns
 */
declare function CcfReportingHeader(props: CcfReportingHeaderProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfReportingHeader>;
export default _default;
