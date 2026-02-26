import { CcfBadgeProps } from './ccf-badge';
/**
 * @example styles for badge component
 */
declare const ccfBadgeStyle: (props: CcfBadgeProps) => {
    badgeColor: {
        '& .MuiBadge-badge': {
            backgroundColor: "primary" | "secondary" | "default" | "error" | "info" | "success" | "warning";
        };
    };
};
export default ccfBadgeStyle;
