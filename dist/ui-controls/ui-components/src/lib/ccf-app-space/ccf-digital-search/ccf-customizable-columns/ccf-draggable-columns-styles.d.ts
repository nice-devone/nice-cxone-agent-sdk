import { Theme } from '@mui/material';
import { DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
/**
 * used to over-ride the styles on drag and drop event
 * @param style - applied drag and drop styles
 * @param snapshot - snapshot of current drag status
 * @example - getStyle
 */
export declare const getStyle: (snapshot: DraggableStateSnapshot, style: DraggingStyle | NotDraggingStyle | undefined, theme: Theme) => {
    backgroundColor: string;
    cursor: string;
} | {
    backgroundColor: string;
    cursor: string;
    position: "fixed";
    top: number;
    left: number;
    boxSizing: "border-box";
    width: number;
    height: number;
    transition: string;
    transform: string | undefined;
    zIndex: number;
    opacity: number | undefined;
    pointerEvents: "none";
} | {
    backgroundColor: string;
    cursor: string;
    transform: string | undefined;
    transition: "none" | undefined;
} | {
    transitionDuration: string;
} | {
    transitionDuration: string;
    position: "fixed";
    top: number;
    left: number;
    boxSizing: "border-box";
    width: number;
    height: number;
    transition: string;
    transform: string | undefined;
    zIndex: number;
    opacity: number | undefined;
    pointerEvents: "none";
} | {
    transitionDuration: string;
    transform: string | undefined;
    transition: "none" | undefined;
};
