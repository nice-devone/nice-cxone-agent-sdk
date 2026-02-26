import { Theme } from '@mui/material';
import { CcfGridSelectionModel } from '@nice-devone/ui-controls';
/**
 * Represents the options for styling a digital search grid.
 */
export interface CcfDigitalSearchGridStyleOptions {
    /**
     * The theme to apply to the grid
    */
    theme: Theme;
    /**
     * The selection model for the grid
    */
    selections: CcfGridSelectionModel;
    /**
     * Indicates whether the grid is in a loading state
    */
    isLoading: boolean;
    /**
     * The translation for the maximum row selection
    */
    maximumRowSelection: string;
    /**
     * The maximum number of rows allowed to be selected
    */
    maxRowSelectionAllowed?: number;
    /**
     * Indicates whether row cursor is enabled
    */
    enableRowCursor?: boolean;
    isKebabMenuPinned?: boolean;
}
/**
 * style object for ccf-digital-grid
 * @returns CcfDigitalGridStyle object
 * @example CcfDigitalGridStyle()
 */
declare const CcfDigitalSearchGridStyle: ({ theme, selections, isLoading, maximumRowSelection, maxRowSelectionAllowed, enableRowCursor, isKebabMenuPinned }: CcfDigitalSearchGridStyleOptions) => {
    dataGridContainer: {
        display: string;
        flexDirection: string;
        height: string;
        padding: string;
        background: string;
        position: string;
    };
    dataGridStyles: {
        '& .MuiDataGrid-row:hover, & .MuiDataGrid-row:hover .MuiDataGrid-cell.sticky-right-column'?: {
            backgroundColor: string | undefined;
        } | undefined;
        '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected .MuiDataGrid-cell.sticky-right-column'?: {
            backgroundColor: string | undefined;
        } | undefined;
        '& .MuiDataGrid-row.Mui-selected:hover, & .MuiDataGrid-row.Mui-selected:hover .MuiDataGrid-cell.sticky-right-column'?: {
            backgroundColor: string | undefined;
        } | undefined;
        '& .MuiDataGrid-cell.sticky-right-column'?: {
            position: string;
            right: number;
            zIndex: number;
            padding: string;
            borderBottom: string;
            backgroundColor: string;
        } | undefined;
        background: string;
        minHeight: string;
        '.columnColor': {
            color: string;
        };
        '.columnCapitalize': {
            textTransform: string;
        };
        '.MuiDataGrid-columnHeaders': {
            color: string;
            borderBottom: string;
            fontWeight: string;
            boxShadow: string;
            '.MuiDataGrid-columnHeaderTitle': {
                fontWeight: number;
                fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            };
            '.MuiDataGrid-columnHeader': {
                '.MuiDataGrid-columnSeparator': {
                    display: string;
                };
            };
        };
        '.MuiDataGrid-footerContainer': {
            button: {
                pointerEvents: string;
                opacity: number;
                '.MuiTouchRipple-root': {
                    display: string;
                };
            };
            '.MuiTouchRipple-root': {
                display: string;
            };
            '.MuiIconButton-root:not(.Mui-disabled)': {
                color: string;
                '&:hover': {
                    backgroundColor: string;
                };
                '&:focus': {
                    backgroundColor: string;
                };
                '&:focus-visible': {
                    backgroundColor: string;
                    outline: string;
                };
            };
        };
        '.MuiDataGrid-root .MuiDataGrid-row .MuiDataGrid-cell': {
            overflow: string;
        } | {
            overflow?: undefined;
        };
        '.MuiDataGrid-row': {
            borderTop: string;
            borderBottom: string;
            color: string;
            fontWeight: string;
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            lineHeight: string;
            cursor: string;
            '&:hover,.Mui-hovered': {
                backgroundColor: string;
            };
            '.MuiCheckbox-colorPrimary:not(.Mui-checked) ': {
                cursor: string;
                '.MuiSvgIcon-root': {
                    opacity: number;
                };
                ':hover::after': {
                    content: string;
                    position: string;
                    top: string;
                    left: string;
                    padding: string;
                    background: string;
                    color: string | undefined;
                    fontSize: string;
                    opacity: number;
                };
            } | {
                cursor?: undefined;
                '.MuiSvgIcon-root'?: undefined;
                ':hover::after'?: undefined;
            };
        };
        '.MuiDataGrid-cell:focus-within': {
            outline: string;
            border: string;
        };
    };
};
export default CcfDigitalSearchGridStyle;
