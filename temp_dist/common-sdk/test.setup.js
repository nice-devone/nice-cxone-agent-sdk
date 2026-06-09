"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/jest-dom");
// Added mock for faro globally
jest.mock('@grafana/faro-web-sdk', () => ({
    initializeFaro: jest.fn(() => ({ api: { pushLog: jest.fn(), pushError: jest.fn() } })),
    faro: { api: { pushLog: jest.fn(), pushError: jest.fn() } },
}));
jest.mock('@grafana/faro-web-tracing', () => ({
    TracingInstrumentation: jest.fn(),
}));
//# sourceMappingURL=test.setup.js.map