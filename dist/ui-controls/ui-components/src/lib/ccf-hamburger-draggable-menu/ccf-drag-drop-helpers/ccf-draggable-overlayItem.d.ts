import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import CcfDigitalSearchDraggableStyles from '../../ccf-app-space/ccf-digital-search/ccf-digital-search-draggable/ccf-digital-search-draggable-styles';
export interface DraggableOverlayConfig<T> {
    getLabel: (item: T) => string;
    getActive: (item: T) => boolean | undefined;
    getTestId: (item: T) => string;
    getIcon?: (item: T) => ReactNode;
    getRightSlot?: (item: T) => ReactNode;
    labelStyle?: SxProps<Theme>;
    containerStyle?: SxProps<Theme>;
}
interface DraggableOverlayItemProps<T> {
    activeItem: T | null;
    styles: ReturnType<typeof CcfDigitalSearchDraggableStyles>;
    config: DraggableOverlayConfig<T>;
}
declare const CcfDraggableOverlayItem: <T>(props: DraggableOverlayItemProps<T>) => JSX.Element | null;
export default CcfDraggableOverlayItem;
