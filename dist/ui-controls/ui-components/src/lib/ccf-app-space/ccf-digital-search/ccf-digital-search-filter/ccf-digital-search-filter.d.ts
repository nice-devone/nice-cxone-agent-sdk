import { PopoverOrigin } from '@mui/material';
import { dropdownOptions, SelectAllField } from '@nice-devone/ui-controls';
import { Dayjs } from 'dayjs';
export declare type DateFormat = Dayjs | null;
export declare const selectAllMenuItem: {
    id: SelectAllField;
    name: SelectAllField;
};
/**
 * Props for the component ccf Interaction search filter
 */
export interface CcfInteractionSearchProps {
    filterOptions: dropdownOptions[];
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    /**
     * Component passed as props for rendering and handling load more of dropdown filters.
     */
    MultiSelectPaginationDropdown?: any;
}
/**
 * Interface for the start and end Date
 */
export interface DateTime {
    /**
   * start date
   */
    startDate: DateFormat;
    /**
   * end date
   */
    endDate: DateFormat;
}
/** Component to render Interaction Search Filters
 * @example CcfDigitalSearchFilter()
 */
export declare const CcfDigitalSearchFilter: (props: CcfInteractionSearchProps) => JSX.Element;
