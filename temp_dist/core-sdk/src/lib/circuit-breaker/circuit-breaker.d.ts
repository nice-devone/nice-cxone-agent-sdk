import { CircuitBreakerPolicy } from 'cockatiel';
/**
 * CircuitBreaker class to handle the circuit breaker logic using cockatiel library
 */
export declare class CircuitBreaker {
    breaker: CircuitBreakerPolicy;
    private logger;
    /**
     * Constructor for circuit breaker class where we will initialize the circuitBreaker instance
     * @example -
     * ```
     * new CircuitBreaker();
     * ```
     */
    constructor();
}
