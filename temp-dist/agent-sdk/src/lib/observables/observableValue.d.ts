import { Subject, Observer, Observable } from 'rxjs';
export interface ObservableValueOptions<T, TInitial = T, TError = any> {
    key?: string;
    setter?: (newValue: T | TInitial, instance: ObservableValue<T, TInitial, TError>) => T;
}
/**
     * ObservableValue class stores a value and notifies interested
     * parties when the value changes.
     *
     * This is often used as a property on a class that other classes
     * may be interested in.
     *
     * Because this is used as a complex property of sorts. It would
     * need some of the functionality of getters and setters, namely:
     * public get,
     * public set,
     * or
     * public get,
     * private set,
     *
     * The default behavior of ObservableValues gives you the public
     * getter and public setter.
     *
     * ```ts
     *
     * const name = new Observable("John", "MY_SECRET_KEY");
     * name.setValue("Jared"); // Notifies parties the value changed
     *
     * ```
     *
     * If you want to make the setter private you can supply the key at
     * construction, and this will make the setter need a key to set the
     * value or the error.
     *
     * ```ts
     *
     * const name = new Observable("John", "MY_SECRET_KEY");
     * name.setValue("Jared"); // throw error
     * name.setValue("Jared", "MY_SECRET_KEY"); // Notifies parties the value changed
     *
     * ```
     */
export declare class ObservableValue<T, TInitial = T, TError = any> {
    protected setter: (newValue: T | TInitial, instance: ObservableValue<T, TInitial, TError>) => T;
    protected key: string | undefined;
    readonly valueSubject: Subject<T>;
    protected _value: T | TInitial;
    readonly errorSubject: Subject<TError>;
    protected _error: TError | null;
    private readonly _observer;
    constructor(initialState: T | TInitial, options?: ObservableValueOptions<T, TInitial, TError>);
    getValue(): T | TInitial;
    setValue(value: T, key?: string): void;
    transformValue(cb: (val: T | TInitial) => T, key?: string): void;
    setError(e: TError | null, key?: string): void;
    private isSecure;
    private isCorrectKey;
    getError(): TError;
    onError(callback: (e: TError | null) => void): import("rxjs").Subscription;
    onChange(callback: (value: T) => void): import("rxjs").Subscription;
    /**
     * ADVANCED FEATURE
     * Use this when piping values to another existing `ObservableValue` like:
     *
     * ```ts
     * getUserRunner = new AsyncActionRunner<User, null>(null);
     * userName = new ObservableValue<string, null>(null);
     *
     * constructor() {
     *    this.getUserRunner.valueSubject
     *      .pipe(map(user => user.name))

     *      .subscribe(this.userName.getObserver());  <----- You can pipe values to another ObservableValue.
     * }
     * ```
     */
    getObserver(): Observer<T>;
    dispose(): void;
    /**
     * Easier way to pipe from one ObservableValue to another through rxjs operators.
     *
     * Example (inside a mediator/class):
     * ```typescript
     *  readonly elapsedThrottledSeconds = ObservableValue.from(
     *    this.elapsedSeconds.valueSubject.pipe(throttleTime(200)),
     *    this.elapsedSeconds.getValue()
     *  );
     * ```
     * @param observable - any Observable (generally from a rxjs pipe though)
     * @param initialValue -
     */
    static from<T, TInitial>(/* eslint-disable-line @nice-cxone/ccf/required-tsdoc */ observable: Observable<T | TInitial>, initialValue: T | TInitial): ObservableValue<T | TInitial, T | TInitial, any>;
}
export default ObservableValue;
