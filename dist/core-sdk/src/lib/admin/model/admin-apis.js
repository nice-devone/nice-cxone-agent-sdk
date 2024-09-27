/**
 * Declare all the Admin API's
 */
export class AdminApis {
}
AdminApis.getPermissionsUri = '/InContactAPI/services/v23.0/permissions?agentId={agentId}';
AdminApis.getAgentSettingsUri = '/InContactAPI/services/v30.0/agents/{agentId}/agent-settings';
AdminApis.getBusinessUnitUri = '/InContactAPI/services/v23.0/business-unit';
AdminApis.getClientDataUri = '/InContactAPI/services/v23.0/agents/client-data?agentId={agentId}';
AdminApis.putClientDataUri = '/InContactAPI/services/v23.0/agents/client-data';
AdminApis.getCentralBrandingProfileUri = '/InContactAPI/services/v23.0/branding-profiles?businessUnitId={businessUnitId}';
AdminApis.getUHBrandingProfileUri = '/branding-profiles/current';
AdminApis.getScriptData = '/InContactAPI/services/v23.0/scripts/';
AdminApis.spawnScriptUri = '/InContactAPI/services/v23.0/scripts/{scriptId}/start';
AdminApis.signalScriptUri = '/InContactAPI/services/v23.0/interactions/{contactId}/signal';
AdminApis.getAllIndicatorsUri = '/InContactAPI/services/v23.0/agents/{agentId}/indicators';
AdminApis.resizeEventQueueUri = '/InContactAPI/services/v31.0/agent-sessions/{sessionId}/event-queue-resize';
AdminApis.getTenantDataUri = '/tenants/v2/current';
//# sourceMappingURL=admin-apis.js.map