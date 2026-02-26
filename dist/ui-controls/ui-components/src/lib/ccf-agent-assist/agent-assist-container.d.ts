/// <reference types="react" />
/**
 * Agent Assist Container component
 * @example - <AgentAssistContainer />
 */
export declare function AgentAssistContainer(): JSX.Element;
/**
 * Interface for Tab Panel properties
 */
interface TabPanelProps {
    children?: React.ReactNode;
    value: number;
    index: number;
}
/**
 * TabPanel component
 * @example - <TabPanel />
 */
export declare function TabPanel({ children, value, index }: TabPanelProps): JSX.Element;
export {};
