import { CollapseProps, ListItemAvatarProps, ListItemIconProps, ListItemProps, ListItemSecondaryActionProps, ListItemTextProps, ListProps, ListSubheaderProps, ListItemButtonProps } from '@mui/material';
/**
 * Component displays List like ul
 * @param props -ListProps
 * @example <CcfList/>
 */
export declare function CcfList({ children, ...other }: ListProps): JSX.Element;
export interface CcfListItemProps extends ListItemProps {
    button?: boolean;
}
/**
 * Component displays ListItem like li
 * @param props -CcfListItemProps
 * @example <CcfListItem/>
 */
export declare function CcfListItem({ children, button, ...other }: CcfListItemProps): JSX.Element;
/**
 * Component displays List item icon
 * @param props -ListItemIconProps
 * @example <CcfListItemIcon/>
 */
export declare function CcfListItemIcon({ children, ...other }: ListItemIconProps): JSX.Element;
/**
 * Component displays ListItemSecondaryAction
 * @param props -ListItemSecondaryActionProps
 * @example <CcfListItemSecondaryAction/>
 */
export declare function CcfListItemSecondaryAction({ children, ...other }: ListItemSecondaryActionProps): JSX.Element;
/**
 * Component displays ListItemText
 * @example <CcfListItemText />
 */
export declare function CcfListItemText({ children, ...other }: ListItemTextProps): JSX.Element;
/**
 * Component displays ListItemText
 * @param props -ListSubheaderProps
 * @example <CcfListItemText />
 */
export declare function CcfListSubheader({ children, ...other }: ListSubheaderProps): JSX.Element;
/**
 * Component displays ListItemText
 * @param props -CollapseProps
 * @example <CcfListItemText />
 */
export declare function CcfCollapse({ children, ...other }: CollapseProps): JSX.Element;
/**
 * Component displays ListItemText
 * @param props -CcfListItemTextProps
 * @example <CcfListItemText />
 */
export declare function CcfListItemAvatar({ children, ...other }: ListItemAvatarProps): JSX.Element;
/**
 * Component displays ListItemButton
 * @param props - CcfListItemButton
 * @example <CcfListItemButton />
 */
export declare function CcfListItemButton({ children, ...other }: ListItemButtonProps): JSX.Element;
