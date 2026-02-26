import type { DecisionTreeData } from '@nice-devone/common-sdk';
/**
 * Hook encapsulating layout + derived state for the Copilot Decision Tree panel.
 * Responsibilities:
 * - Resolves MUI theme & computes style object via factory
 * - Tracks responsive breakpoint (compact mode) using ResizeObserver
 * - Derives header metadata (title, icon, answered/total counts)
 * - Exposes icon map for rendering header icon safely
 *
 * @param decisionTreeData - Decision tree data object (may be null during initial load)
 * @returns Object with layout refs, derived display data and computed styles
 * @example
 * ```tsx
 * const {
 *   containerRef,
 *   styles,
 *   headerIcon,
 *   title,
 *   icon,
 *   showQuestionsCount,
 *   answeredQuestions,
 *   totalNoOfQuestions,
 * } = useCopilotDecisionTree(decisionTreeData);
 * ```
 */
export declare function useCopilotDecisionTree(decisionTreeData: DecisionTreeData | null): {
    containerRef: import("react").MutableRefObject<HTMLDivElement | null>;
    styles: {
        container: {
            display: string;
            top: string;
            flexDirection: string;
            paddingBottom: string;
            paddingRight: string;
            paddingLeft: string;
            overflow: string;
            height: string;
            position: string;
            width: string;
            boxSizing: string;
        };
        header: {
            justifyContent: string;
            flexShrink: number;
            minHeight: string;
            position: string;
            top: number;
            backgroundColor: string;
            zIndex: number;
            paddingTop: string;
            paddingBottom: string;
            display: string;
            alignItems: string;
        };
        headerContent: {
            display: string;
            alignItems: string;
        };
        title: {
            fontWeight: import("csstype").Property.FontWeight | undefined;
            color: string;
        };
        headerAction: {
            gap: number;
            color: string;
            display: string;
            alignItems: string;
        };
        contentWrapper: {
            display: string;
            gap: string;
            marginTop: string;
            alignItems: string;
            flexDirection: string;
        };
        divider: {
            width: string;
            height: string;
            backgroundColor: string;
            mx: string | number;
            my: string | number;
            alignSelf: string;
        };
        sections: {
            flex: number;
            display: string;
            flexDirection: string;
            justifyContent: string;
            alignItems: string;
            overflow: string;
            minHeight: number;
        };
        dropdownContainer: {
            maxHeight: string;
            minHeight: string;
            width: string;
        };
        sqSection: {
            maxHeight: string;
            flex: string;
            overflowY: string;
        } | {
            maxHeight?: undefined;
            flex?: undefined;
            overflowY?: undefined;
        };
        cdSection: {
            flex: string;
            overflowY: string;
        } | {
            flex?: undefined;
            overflowY?: undefined;
        };
    };
    headerIcon: {
        [key: string]: string | JSX.Element;
    };
    title: string;
    icon: string;
    showQuestionsCount: boolean;
    answeredQuestions: number | undefined;
    totalNoOfQuestions: number | undefined;
    isCompact: boolean;
    showCloseConfirmation: boolean;
    handleCloseDecisionTree: () => void;
    confirmCloseDecisionTree: () => Promise<void>;
    cancelCloseDecisionTree: () => void;
};
