import { CircuitState, Policy, SamplingBreaker, } from 'cockatiel';
import { Logger } from '../../logger/logger';
const CircuitBreakerConfig = {
    coolingPeriod: 10 * 1000,
    threshold: 0.2,
    samplingDuration: 10 * 1000,
    minimumRPS: 2,
};
/**
 * CircuitBreaker class to handle the circuit breaker logic using cockatiel library
 */
export class CircuitBreaker {
    /**
     * Constructor for circuit breaker class where we will initialize the circuitBreaker instance
     * @example -
     * ```
     * new CircuitBreaker();
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK', 'CircuitBreaker');
        this.breaker = Policy.handleAll().circuitBreaker(CircuitBreakerConfig.coolingPeriod, new SamplingBreaker({
            threshold: CircuitBreakerConfig.threshold,
            duration: CircuitBreakerConfig.samplingDuration,
            minimumRps: CircuitBreakerConfig.minimumRPS,
        }));
        this.breaker.onStateChange((state) => {
            if (state === CircuitState.Closed) {
                this.logger.info('onStateChange', 'Circuit breaker is in Closed state');
            }
            if (state === CircuitState.HalfOpen) {
                this.logger.info('onStateChange', 'Circuit breaker is in HalfOpen state');
            }
            if (state === CircuitState.Open) {
                this.logger.info('onStateChange', 'Circuit breaker is in Open state');
            }
        });
    }
}
//# sourceMappingURL=circuit-breaker.js.map