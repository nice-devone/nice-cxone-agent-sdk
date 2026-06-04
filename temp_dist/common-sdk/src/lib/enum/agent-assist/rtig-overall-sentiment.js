"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtigOverallSentimentMetric = exports.RtigOverallSentimentModel = void 0;
/**
 * Enum for RTIG Overall Sentiment Model
 */
var RtigOverallSentimentModel;
(function (RtigOverallSentimentModel) {
    /**
    * RTIG Customer Satisfaction model
    */
    RtigOverallSentimentModel["CSAT"] = "csat";
    /**
     * RTIG Sales model
     */
    RtigOverallSentimentModel["SALES"] = "sales";
})(RtigOverallSentimentModel = exports.RtigOverallSentimentModel || (exports.RtigOverallSentimentModel = {}));
/**
 * Enum for RTIG Overall Sentiment Metric
 */
var RtigOverallSentimentMetric;
(function (RtigOverallSentimentMetric) {
    /**
     * RTIG Customer Sentiment metric
     */
    RtigOverallSentimentMetric["SENTIMENT"] = "sentiment";
    /**
     * RTIG Sales Likelihood to Buy metric
     */
    RtigOverallSentimentMetric["LIKELIHOOD_TO_BUY"] = "likelihoodtobuy";
})(RtigOverallSentimentMetric = exports.RtigOverallSentimentMetric || (exports.RtigOverallSentimentMetric = {}));
//# sourceMappingURL=rtig-overall-sentiment.js.map