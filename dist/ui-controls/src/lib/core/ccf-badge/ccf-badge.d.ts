import { BadgeProps } from '@mui/material';
export interface CcfBadgeProps extends Omit<BadgeProps, ''> {
    label: string;
    badgeStyles?: {
        [key: string]: string;
    };
}
/**
 * Badge generates a small badge to the top-right of its child(ren).
 * @param color - To add color to the badge
 * @param label - To define the aria-label
 * @param overlap - Wrapped shape the badge should overlap.
 * @param anchorOrigin - The anchor of the badge.
 * @example <CcfBadge label='example'/>
 */
export declare const CcfBadge: ({ label, children, color, sx, badgeStyles, ...rest }: CcfBadgeProps) => JSX.Element;
