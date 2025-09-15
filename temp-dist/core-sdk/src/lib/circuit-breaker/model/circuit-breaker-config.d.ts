/**
 * CircuitBreaker configuration interface
 */
export interface CircuitBreakerConfiguration {
    /**
     * time duration after which the circuit will go to half open state, in milliseconds
     */
    coolingPeriod: number;
    /**
     * failure threshold ratio during sampling duration
     */
    threshold: number;
    /**
     * sampling time for failure threshold measure duration, in milliseconds
     */
    samplingDuration: number;
    /**
     * minimum number of requests per second while sampling duration before circuit breaks and goes to open state
     */
    minimumRPS: number;
}
