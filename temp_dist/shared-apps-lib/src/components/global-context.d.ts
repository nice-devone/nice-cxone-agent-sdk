import { ReactNode } from 'react';
declare type GlobalContextType = {
    tpiVersion: string;
    setTPIVersion: (version: string) => void;
};
/**
 * Custom hook to access the version context.
 * Throws an error if used outside of the GlobalContextProvider.
 * @example
 * ```
 * const { tpiVersion, setTPIVersion } = useGlobalContext();
 * ```
 */
export declare const useGlobalContext: () => GlobalContextType;
/**
 * Provides the version context to its child components.
 * @param children - The child React nodes that will have access to the version context.
 * @returns A context provider for version state.
 * @example
 * ```
 *  <GlobalContextProvider>
 *    <Component />
 *  </GlobalContextProvider>
 * ```
 */
export declare const GlobalContextProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export {};
