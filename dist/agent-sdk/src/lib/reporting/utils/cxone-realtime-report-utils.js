import { calculatePercentage, getMillisecondsFrom8601DurationString, getTimeStringFromMS } from '@nice-devone/common-sdk';
import { AgentStateId } from '../../agent-state/enum/agent-states-id';
/**
   * Used to calculate the productivity time and percentage of team and agent based on the provided data
   * @param teamPerformance - TeamPerformanceResponse
   * @param agentStateHistory - AgentPerformanceResponse
   * @param agentStateHistory - AgentStateHistoryResponse
   * @returns - Productivity Report
   * @example -
   * ```
   * generateProductivityReport(teamPerformance,agentPerformance,agentStateHistory);
   * ```
   */
export const generateProductivityReport = 
//####// reqStartDate/reqEndDate added ONLY for boundary-clamping: the selected report window
//####// must reach the state-history aggregation so out-of-window time can be trimmed.
(productivityResponse, reqStartDate, reqEndDate) => {
    const [agentPerformance, teamPerformance, agentStateHistory] = productivityResponse;
    const teamData = Object.assign({}, Array.isArray(teamPerformance.teamPerformanceTotal) && teamPerformance.teamPerformanceTotal[0]);
    const agentData = Object.assign({}, Array.isArray(agentPerformance.agentPerformance) && agentPerformance.agentPerformance[0]);
    const agentStateHistoryData = Object.assign({}, agentStateHistory);
    //####// Boundary-clamping: convert the selected interval to epoch ms so each state-history
    //####// record can be trimmed to the portion that actually falls inside [start, end].
    const windowStartMs = reqStartDate ? Date.parse(reqStartDate) : undefined;
    const windowEndMs = reqEndDate ? Date.parse(reqEndDate) : undefined;
    const productivityStates = updateOutstateDetails(agentStateHistoryData, agentData, windowStartMs, windowEndMs);
    /**Agent Productivity Attributes */
    let productivityAgentAvailablePercentage = 0;
    let productivityAgentUnavailablePercentage = 0;
    let productivityAgentAvailableMilliseconds = 0;
    let productivityAgentWorkingInboundMilliseconds = 0;
    let productivityAgentWorkingOutboundMilliseconds = 0;
    let productivityAgentWorkingConsultingMiliseconds = 0;
    let productivityAgentWorkingMilliseconds = 0;
    let productivityAgentUnavailableMilliseconds = 0;
    let productivityAgentTotalMilliseconds = 0;
    let productivityAgentWorkingPercentage = 0;
    /**Team Productivity Attributes */
    let productivityTeamAvailablePercentage = 0;
    let productivityTeamWorkingPercentage = 0;
    let productivityTeamUnavailablePercentage = 0;
    let productivityTeamAvailableMilliseconds = 0;
    let productivityTeamWorkingInboundMilliseconds = 0;
    let productivityTeamWorkingOutboundMilliseconds = 0;
    let productivityTeamWorkingMilliseconds = 0;
    let productivityTeamUnavailableMilliseconds = 0;
    let productivityTeamTotalMilliseconds = 0;
    let productivityAgentAvailableDuration = '00:00:00';
    let productivityAgentUnavailableDuration = '00:00:00';
    let productivityAgentWorkingDuration = '00:00:00';
    //Agent attributes calculations
    if (agentData) {
        productivityAgentAvailableMilliseconds = getMillisecondsFrom8601DurationString(agentData.availableTime);
        productivityAgentAvailableDuration = getTimeStringFromMS(productivityAgentAvailableMilliseconds);
        productivityAgentWorkingInboundMilliseconds = getMillisecondsFrom8601DurationString(agentData.inboundTime);
        productivityAgentWorkingOutboundMilliseconds = getMillisecondsFrom8601DurationString(agentData.outboundTime);
        productivityAgentWorkingConsultingMiliseconds = getMillisecondsFrom8601DurationString(agentData.consultTime);
        productivityAgentWorkingMilliseconds =
            productivityAgentWorkingInboundMilliseconds +
                productivityAgentWorkingOutboundMilliseconds +
                productivityAgentWorkingConsultingMiliseconds;
        productivityAgentWorkingDuration = getTimeStringFromMS(productivityAgentWorkingMilliseconds);
        productivityAgentUnavailableMilliseconds = getMillisecondsFrom8601DurationString(agentData.unavailableTime);
        productivityAgentUnavailableDuration = getTimeStringFromMS(productivityAgentUnavailableMilliseconds);
        productivityAgentTotalMilliseconds = getMillisecondsFrom8601DurationString(agentData.loginTime);
    }
    if (productivityAgentTotalMilliseconds !== 0) {
        productivityAgentAvailablePercentage = calculatePercentage(productivityAgentAvailableMilliseconds, productivityAgentTotalMilliseconds);
        productivityAgentUnavailablePercentage = calculatePercentage(productivityAgentUnavailableMilliseconds, productivityAgentTotalMilliseconds);
        productivityAgentWorkingPercentage = calculatePercentage(productivityAgentWorkingMilliseconds, productivityAgentTotalMilliseconds);
    }
    //Team productivity attributes calculations
    let productivityTeamAvailableDuration = '00:00:00';
    let productivityTeamUnavailableDuration = '00:00:00';
    let productivityTeamWorkingDuration = '00:00:00';
    if (teamData) {
        productivityTeamAvailableMilliseconds = getMillisecondsFrom8601DurationString(teamData.availableTime);
        //Total available time for team
        productivityTeamAvailableDuration = getTimeStringFromMS(productivityTeamAvailableMilliseconds);
        productivityTeamWorkingInboundMilliseconds = getMillisecondsFrom8601DurationString(teamData.inboundTime);
        productivityTeamWorkingOutboundMilliseconds = getMillisecondsFrom8601DurationString(teamData.outboundTime);
        productivityTeamWorkingMilliseconds =
            productivityTeamWorkingInboundMilliseconds + productivityTeamWorkingOutboundMilliseconds;
        //Total working time for team
        productivityTeamWorkingDuration = getTimeStringFromMS(productivityTeamWorkingMilliseconds);
        productivityTeamUnavailableMilliseconds = getMillisecondsFrom8601DurationString(teamData.unavailableTime);
        //total unavailable time for team
        productivityTeamUnavailableDuration = getTimeStringFromMS(productivityTeamUnavailableMilliseconds);
        productivityTeamTotalMilliseconds = getMillisecondsFrom8601DurationString(teamData.loginTime);
        if (productivityTeamTotalMilliseconds !== 0) {
            productivityTeamAvailablePercentage = calculatePercentage(productivityTeamAvailableMilliseconds, productivityTeamTotalMilliseconds);
            productivityTeamWorkingPercentage = calculatePercentage(productivityTeamWorkingMilliseconds, productivityTeamTotalMilliseconds);
            productivityTeamUnavailablePercentage = calculatePercentage(productivityTeamUnavailableMilliseconds, productivityTeamTotalMilliseconds);
        }
    }
    const productivityReport = [
        {
            stateName: 'Available',
            stateAgentPercentage: productivityAgentAvailablePercentage,
            stateTeamPercentage: productivityTeamAvailablePercentage,
            stateTeamDuration: productivityTeamAvailableDuration,
            stateAgentDuration: productivityAgentAvailableDuration,
            subStates: productivityStates.availableStates,
        },
        {
            stateName: 'Working',
            stateTeamDuration: productivityTeamWorkingDuration,
            stateAgentDuration: productivityAgentWorkingDuration,
            stateAgentPercentage: productivityAgentWorkingPercentage,
            stateTeamPercentage: productivityTeamWorkingPercentage,
            subStates: productivityStates.workingStates,
        },
        {
            stateName: 'Unavailable',
            stateTeamDuration: productivityTeamUnavailableDuration,
            stateAgentDuration: productivityAgentUnavailableDuration,
            stateAgentPercentage: productivityAgentUnavailablePercentage,
            stateTeamPercentage: productivityTeamUnavailablePercentage,
            subStates: productivityStates.unavailableStates,
        }
    ];
    return productivityReport;
};
export const timeUnits = {
    millisecond: 1,
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * (60 * 1000),
    day: 24 * (60 * (60 * 1000)),
    week: 7 * (24 * (60 * (60 * 1000))),
    year: 365 * (24 * (60 * (60 * 1000))),
    //Timers and time stamps patterns
    underMinute: 59 * 1000,
    underHour: 59 * (60 * 1000),
    underDay: 23 * (60 * (60 * 1000)),
    underSixDays: 6 * (24 * (60 * (60 * 1000))),
    underOneYear: 365 * (24 * (60 * (60 * 1000))),
};
/**
   * Used to calculate the productivity time and percentage of team and agent based on the provided data
   * @param teamPerformance - TeamPerformanceResponse
   * @param agentPerformance - AgentPerformanceResponse
   * @returns - Performance Report
   * @example -
   * ```
   * generatePerformanceReport(teamPerformance,agentPerformance);
   * ```
   */
export const generatePerformanceReport = (performanceResponse) => {
    const [agentPerformance, teamPerformance] = performanceResponse;
    const teamData = Object.assign({}, Array.isArray(teamPerformance.teamPerformanceTotal) && teamPerformance.teamPerformanceTotal[0]);
    const agentData = Object.assign({}, Array.isArray(agentPerformance.agentPerformance) && agentPerformance.agentPerformance[0]);
    const youInboundCell = agentData.inboundHandled || '0';
    const youOutboundCell = agentData.outboundHandled || '0';
    const youOverallCell = agentData.totalHandled || '0';
    const teamInboundCell = teamData.inboundHandled || '0';
    const teamOutboundCell = teamData.outboundHandled || '0';
    const teamOverallCell = teamData.totalHandled || '0';
    const percentageInboundCell = parseInt(teamInboundCell, 10) ? Math.round((parseInt(youInboundCell, 10) / parseInt(teamInboundCell, 10)) * 100) : 0;
    const percentageOutboundCell = parseInt(teamOutboundCell, 10) ? Math.round((parseInt(youOutboundCell, 10) / parseInt(teamOutboundCell, 10)) * 100) : 0;
    const percentageOverallCell = parseInt(teamOverallCell, 10) ? Math.round((parseInt(youOverallCell, 10) / parseInt(teamOverallCell, 10)) * 100) : 0;
    return [
        {
            channelType: 'inbound',
            yourCount: youInboundCell,
            teamCount: teamInboundCell,
            percentage: percentageInboundCell,
        },
        {
            channelType: 'outbound',
            yourCount: youOutboundCell,
            teamCount: teamOutboundCell,
            percentage: percentageOutboundCell,
        },
        {
            channelType: 'overall',
            yourCount: youOverallCell,
            teamCount: teamOverallCell,
            percentage: percentageOverallCell,
        }
    ];
};
/**
   *  Used to check aggregate the substate of agent/teams state and calculate duration to display agent and team's productive time
   * @example - aggegrateOutStateData( obejct, AgentStateHistory)
   */
const aggegrateOutStateData = (list, element) => {
    if (element.agentStateId in list) {
        list[element.agentStateId].duration = Number(list[element.agentStateId].duration) + Number(element.duration);
    }
    else {
        list[element.agentStateId] = element;
    }
};
/**
 *  Used to populate states agent and team data and convert total ms duration to time string for the respective state
 * @param outStateList - AgentStateHistory
 * @returns - outStateName: string, outStateDuration: string
 * @example - populateOutStates
 */
const populateOutStates = (outStateList, totalMSDuration) => {
    let element = null;
    const outState = [];
    // (5 / 20) x 100 = 25%
    for (element in outStateList) {
        if (outStateList && outStateList[element] !== undefined) {
            //####// boundary-clamping: durations now arrive in ms (see updateOutstateDetails), so the
            //####// previous "* timeUnits.second" conversion is removed here to keep units consistent.
            const outStatePercentage = calculatePercentage(Number(outStateList[element].duration), totalMSDuration);
            outStateList[element].duration = getTimeStringFromMS(Number(outStateList[element].duration));
            if (outStateList[element].outStateDescription) {
                outState.push({
                    outStateName: outStateList[element].outStateDescription,
                    outStateDuration: outStateList[element].duration,
                    outStateBarPercentage: outStatePercentage,
                });
            }
            else {
                outState.push({
                    outStateName: outStateList[element].agentStateName,
                    outStateDuration: outStateList[element].duration,
                    outStateBarPercentage: outStatePercentage,
                });
            }
        }
    }
    return outState;
};
/**
 * //####// BOUNDARY-CLAMPING HELPER (the actual fix for the "Available overflows its parent" bug).
 * //####// WHY: the /state-history API returns each state's FULL duration even when the state started
 * //####// before startDate or continued past endDate. Long "Available" states that straddle the
 * //####// interval boundary were therefore counted in full, making the Available substate exceed the
 * //####// interval-clamped agent-performance total (283h vs 274h, causing bar overflow). This trims
 * //####// each record to only the slice inside [windowStartMs, windowEndMs]. No window means full duration.
 * @param record - a single AgentStateHistory entry
 * @param windowStartMs - selected interval start (epoch ms), optional
 * @param windowEndMs - selected interval end (epoch ms), optional
 * @returns milliseconds of the record that fall inside the selected window
 * @example - clampDurationToWindow(record, startMs, endMs)
 */
const clampDurationToWindow = (record, windowStartMs, windowEndMs) => {
    const fullMs = getMillisecondsFrom8601DurationString(record.duration);
    if (windowStartMs === undefined && windowEndMs === undefined) {
        return fullMs; //####// no window supplied -> behave exactly as before (backward compatible)
    }
    const recordStartMs = Date.parse(record.startDate);
    if (Number.isNaN(recordStartMs)) {
        return fullMs; //####// unpar. startDate -> cannot clamp, fall back to full duration
    }
    const recordEndMs = recordStartMs + fullMs;
    //####// keep only the overlap of [recordStart, recordEnd] with [windowStart, windowEnd]
    const clampedStart = Math.max(recordStartMs, windowStartMs !== null && windowStartMs !== void 0 ? windowStartMs : Number.NEGATIVE_INFINITY);
    const clampedEnd = Math.min(recordEndMs, windowEndMs !== null && windowEndMs !== void 0 ? windowEndMs : Number.POSITIVE_INFINITY);
    return Math.max(0, clampedEnd - clampedStart);
};
/**
   *  method to handle AgentStateHistoryResponse and filter the state and substates based on the agentStateId
   * @param data - AgentStateHistoryResponse
   * @returns - agen and team's productivity report
   * @example - updateOutstateDetails
   */
export const updateOutstateDetails = (agentStateHistoryData, agentPerformanceData, windowStartMs, //####// boundary-clamping: interval start (epoch ms), optional
windowEndMs //####// boundary-clamping: interval end (epoch ms), optional
) => {
    const historyStateData = Object.assign({}, agentStateHistoryData);
    const availableList = {};
    const unavailalbleList = {};
    const workingList = {};
    const stateData = historyStateData.agentStateHistory;
    let element;
    if (stateData) {
        Array.isArray(stateData) &&
            stateData.forEach((itm) => {
                element = Object.assign({}, itm);
                //####// boundary-clamping: aggregate the in-window portion, in milliseconds (dropping the
                //####// old per-record Math.round(/second) which both lost sub-second rows and pre-rounded
                //####// every record before summing). Summing raw ms and rounding once at display is exact.
                element.duration = clampDurationToWindow(itm, windowStartMs, windowEndMs) + '';
                switch (element.agentStateId.toString()) {
                    case AgentStateId.Available:
                        aggegrateOutStateData(availableList, element);
                        break;
                    case AgentStateId.Unavailable:
                        if (element.outStateDescription) {
                            element.agentStateId = element.outStateDescription;
                        }
                        else
                            element.agentStateId = 'Unavailable';
                        aggegrateOutStateData(unavailalbleList, element);
                        break;
                    case AgentStateId.InboundConsult:
                    case AgentStateId.InboundContact:
                    case AgentStateId.OutboundConsult:
                    case AgentStateId.OutboundContact:
                    case AgentStateId.Dialer:
                        aggegrateOutStateData(workingList, element);
                        break;
                }
            });
    }
    const availableSubState = populateOutStates(availableList, getMillisecondsFrom8601DurationString(agentPerformanceData.loginTime));
    const unavailableSubState = populateOutStates(unavailalbleList, getMillisecondsFrom8601DurationString(agentPerformanceData.loginTime));
    const workingSubstate = populateOutStates(workingList, getMillisecondsFrom8601DurationString(agentPerformanceData.loginTime));
    return {
        availableStates: availableSubState,
        unavailableStates: unavailableSubState,
        workingStates: workingSubstate,
    };
};
//# sourceMappingURL=cxone-realtime-report-utils.js.map