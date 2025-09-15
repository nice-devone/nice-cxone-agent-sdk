/**
 * Shared interface for Integration Component properties
 */
export interface IntegrationComponentProps {
    /**
     * Defines type of the container where the CXA is loaded.
     */
    appType: string;
    /**
     * Defines the query string params of the CRM application.
     */
    queryString?: string;
}
