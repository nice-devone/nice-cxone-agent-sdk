import { Dayjs } from 'dayjs';
import { CcfTranslationKey } from '@nice-devone/i18n';
export interface CcfDatePickerProps {
    label?: CcfTranslationKey;
    disablePast?: boolean;
    maxDate?: Dayjs | null;
    minDate?: Dayjs | null;
    setSelectedDate?: (arg: Dayjs | null, type: string) => void;
    dateChangeArrow?: boolean;
    disableUpArrow?: boolean;
    disableDownArrow?: boolean;
    dateTime: Dayjs | null;
    fieldName: string;
    dateLabelStyles?: object;
    locale?: string;
    placeholder?: string;
    autoFocus?: boolean | false;
    applyStylesToDate?: boolean | false;
}
/**
 * Function is set as wrapper for material UI datepicker component
 * @param param -CcfDatePickerProps
 * @returns material ui date picker component
 * @example <CcfDatePicker/>
 */
export declare function CcfDatePicker(props: CcfDatePickerProps): JSX.Element;
export default CcfDatePicker;
