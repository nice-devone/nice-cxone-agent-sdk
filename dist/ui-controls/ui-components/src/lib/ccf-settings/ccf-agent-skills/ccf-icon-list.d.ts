import { SvgIconProps } from '@mui/material';
interface IconListType {
    [mediatype: number]: (size: string, isOutbound?: boolean, svgProp?: SvgIconProps) => JSX.Element;
}
export declare const MediaTypeIds: Record<number, string>;
export declare const iconList: IconListType;
export {};
