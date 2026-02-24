export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["TRACE"] = 0] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 5] = "FATAL";
    LogLevel[LogLevel["OFF"] = 6] = "OFF";
})(LogLevel || (LogLevel = {}));
export var GrafanaConsoleLogLevel;
(function (GrafanaConsoleLogLevel) {
    GrafanaConsoleLogLevel["Log"] = "log";
    GrafanaConsoleLogLevel["Info"] = "info";
    GrafanaConsoleLogLevel["Debug"] = "debug";
    GrafanaConsoleLogLevel["Error"] = "error";
    GrafanaConsoleLogLevel["Warn"] = "warn";
    GrafanaConsoleLogLevel["Trace"] = "trace";
})(GrafanaConsoleLogLevel || (GrafanaConsoleLogLevel = {}));
//# sourceMappingURL=log-level.js.map