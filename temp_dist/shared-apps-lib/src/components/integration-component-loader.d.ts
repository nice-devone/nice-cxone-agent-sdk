import React from 'react';
import { IntegrationComponentProps } from '../interfaces/integration-component-props';
/**
 * This component will act as middleman to load integration component as per the AppType
 * @param props - IntegrationComponentProps type
 * @returns - Either integration component or empty jsx fragment
 * @example - IntegrationComponentLoader
 */
export declare const IntegrationComponentLoader: React.MemoExoticComponent<(props: IntegrationComponentProps) => JSX.Element>;
