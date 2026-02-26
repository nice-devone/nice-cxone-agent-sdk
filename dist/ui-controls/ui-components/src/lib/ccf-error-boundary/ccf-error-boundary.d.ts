import React, { ReactNode } from 'react';
export interface CcfErrorBoundaryProps {
    children?: ReactNode;
    componentName: string;
    richFallbackText?: ReactNode;
}
export interface CcfErrorBoundaryState {
    error: boolean;
}
/**
 *
 * @returns CcfErrorBoundary -  to handle unhandled exceptions from components
 * @param props - ? - CcfErrorBoundaryProps
 * @example `<CcfErrorBoundary componentName='CcfCustomerCardContactHistory'><CcfCustomerCardContactHistory /></CcfErrorBoundary>`
 */
declare class CcfErrorBoundary extends React.Component<CcfErrorBoundaryProps, CcfErrorBoundaryState> {
    /**
     *
     * @returns set state for CcfErrorBoundary class component
     * @param props - ? - CcfErrorBoundaryProps
     * @example
     */
    constructor(props: CcfErrorBoundaryProps);
    /**
     *
     * @returns set state
     * @param props - ? - error
     * @example
     */
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    /**
     *
     * @returns Log the error
     * @param props - ? - error, errorInfo
     * @example
     */
    componentDidCatch(error: Error): void;
    /**
     *
     * @returns JSX element
     * @param props -
     * @example
     */
    render(): string | number | boolean | React.ReactFragment | JSX.Element | null | undefined;
}
export default CcfErrorBoundary;
