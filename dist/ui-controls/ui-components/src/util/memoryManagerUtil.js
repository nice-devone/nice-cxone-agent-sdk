import { LocalStorageHelper } from '@nice-devone/core-sdk';
;
const memoryThresholds = {
    normal: 200,
    moderate: 400,
    high: 800,
    critical: 1000,
    maxMemoryReadings: 5, // Max number of readings to keep in state
};
const memoryReadings = [];
let memoryUsage;
const memoryCriticalOffset = 200; // Critical threshold is set to MEMORY_LIMIT + offset
let memoryReloadLimit = Number(LocalStorageHelper.getItem('MEMORY_LIMIT', false)) || 800;
/**
 * Reload the application
 * @example reloadApplication() // Reloads the current page
 */
const reloadApplication = () => {
    setTimeout(() => {
        window.location.reload();
    }, 5000);
};
/**
 * Evaluate if application reload is needed based on memory readings
 * @example evaluateReloadNeed() // Prompts user to reload if memory is consistently high
 */
const evaluateReloadNeed = (memoryReadings, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
allInteractions) => {
    let isCriticalMemoryReached = false;
    memoryReloadLimit = Number(LocalStorageHelper.getItem('MEMORY_LIMIT', false)) || 800;
    if (memoryReloadLimit === 1) {
        return false; // Reload disabled.  Memory Limit set to None.
    }
    if (memoryReloadLimit >= memoryThresholds.critical) {
        memoryThresholds.critical = memoryReloadLimit + memoryCriticalOffset;
    }
    // Check if memory readings indicate a need for reload
    if (memoryReadings.length >= memoryThresholds.maxMemoryReadings) {
        const activeInteractionCount = Object.keys(allInteractions).length;
        const anyCritical = memoryReadings.some((reading) => reading >= memoryThresholds.critical);
        const allHigh = memoryReadings.every((reading) => reading >= memoryReloadLimit);
        // if any critical memory usage detected, set flag to true to show toast
        // else if just high memory and no active interactions, reload
        if (anyCritical) {
            isCriticalMemoryReached = true;
            reloadApplication();
        }
        else if (allHigh && activeInteractionCount === 0) {
            isCriticalMemoryReached = false;
            reloadApplication();
        }
    }
    return isCriticalMemoryReached;
};
/**
 * Utility functions for managing memory status and reload evaluations.
 * This module helps in tracking memory usage and determining when a reload is necessary.
 * @example
 * ```
 * evaluateMemoryStatus(allInteractions);
 * ```
 */
export const evaluateMemoryStatus = (allInteractions) => {
    const performanceMemory = performance.memory;
    if (performanceMemory) {
        memoryUsage = Math.round(performanceMemory.usedJSHeapSize / 1024 / 1024);
        memoryReadings.push(memoryUsage);
        if (memoryReadings.length > memoryThresholds.maxMemoryReadings) {
            memoryReadings.shift();
        }
        return evaluateReloadNeed(memoryReadings, allInteractions);
    }
    return false;
};
//# sourceMappingURL=memoryManagerUtil.js.map