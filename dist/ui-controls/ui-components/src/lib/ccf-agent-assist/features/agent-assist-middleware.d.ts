import { StateObservable } from 'redux-observable';
import { RootStateOrAny } from 'react-redux';
import { EnlightenModel, Metric, RangeOfMetric, TypeMetric } from '@nice-devone/common-sdk';
/**
 * Middleware for agent assist app
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export declare const agentAssistMiddleware: (actions$: any, _state$: StateObservable<RootStateOrAny>, { store }: {
    store: any;
}) => any;
/**
 * multiply the metric score by a factor of 100
 * @param score - score of metric
 * @param typeMetric - type of metric
 * @example -
 *```
 * const metricVal = multiplyByHundred(score, typeMetric);
 * ```
 */
export declare function multiplyByHundred(score: number, typeMetric: TypeMetric): number;
/**
 * load the RTIG metric configurations
 * @param metaDataRtig - metadata of RTIG
 * @param processedRTIGMetricsList - list of processed RTIG metrics
 * ```
 * @example - loadRTIGMetricConfigs(metaDataRtig, processedRTIGMetricsList);
 * ```
 */
export declare function loadRTIGMetricConfigs(metaDataRtig: any, processedRTIGMetricsList: Metric[]): void;
/**
 * get metric by Enlighten Model
 * @param enlighten - enlighten model
 * @example -
 *```
 * const metric = getMetricByEnlightenModel(enlightenModel);
 * ```
 */
export declare function getMetricByEnlightenModel(enlighten: EnlightenModel): Metric;
/**
 * function to clone an array
 * @param array - array to clone
 * @example -
 *```
 * cloneArray(dataArray);
 * ```
 */
export declare function cloneArray(array: any[]): any[];
/**
 * get range of metric by score
 * @param score - score of metric
 * @param metric - metric object
 * @example -
 *```
 * getRangeOfMetricByScore(score, metric);
 * ```
 */
export declare function getRangeOfMetricByScore(score: number, metric?: Metric): RangeOfMetric;
/**
 * get metric disable color
 * @example -
 *```
 * const disbaleColor = getDisableMetricColor();
 * ```
 */
export declare function getDisableMetricColor(): string;
/**
 * get metric by tag
 * @param tag - tag of the metric
 * @example -
 *```
 * const metric = getMetricByTag(tagName);
 * ```
 */
export declare function getMetricByTag(tag: string): Metric;
