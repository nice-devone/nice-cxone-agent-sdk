import { Theme } from '@mui/material';
/**
 * return styles used for agent leg component
 * @example styles = agentLegStyle(theme)
 * @returns styles
 */
export declare const agentLegStyle: (theme: Theme) => {
    agentLeg: {
        display: string;
        flexDirection: string;
        padding: string;
        color: string;
        ':disabled': {
            pointerEvents: string;
            cursor: string;
        };
    };
};
export default agentLegStyle;
