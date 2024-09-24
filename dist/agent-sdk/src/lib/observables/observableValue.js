import { Subject } from 'rxjs';
// eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
const defaultSetter = (value) => {
    return value;
};
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
export class ObservableValue {
    // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
    constructor(initialState, options) {
        this.valueSubject = new Subject();
        this.errorSubject = new Subject();
        this._error = null;
        this._observer = {
            next: (value) => this.setValue(value),
            error: (error) => this.setError(error),
            complete: () => null,
        };
        this._value = initialState;
        this.key = options === null || options === void 0 ? void 0 : options.key;
        this.setter =
            typeof (options === null || options === void 0 ? void 0 : options.setter) === 'function' ? options.setter : defaultSetter;
    }
    // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
    getValue() {
        return this._value;
    }
    // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
    setValue(value, key) {
        // If we aren't secure then set the value.
        if (!this.isSecure()) {
            try {
                this._value = this.setter(value, this);
                this.valueSubject.next(value);
            }
            catch (e) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.setError(e);
            }
            return;
        }
        // If we are secure and the key is correct then set the value.
        // Otherwise notify the developer they are trying to set a value
        // they need a key for.
        if (this.isSecure() && this.isCorrectKey(key)) {
            try {
                this._value = this.setter(value, this);
                this.valueSubject.next(value);
            }
            catch (e) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.setError(e);
            }
            return;
        }
        else {
            throw new Error('You cannot set the value of a secure observable value without the correct key.');
        }
    }
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    transformValue(cb, key) {
        const value = cb(this._value);
        this.setValue(value, key);
    }
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    setError(e, key) {
        if (!this.isSecure()) {
            this._error = e;
            this.errorSubject.next(e);
            return;
        }
        if (this.isSecure() && this.isCorrectKey(key)) {
            this._error = e;
            this.errorSubject.next(e);
            return;
        }
        else {
            throw new Error('You cannot set the error of a secure observable value without the correct key.');
        }
    }
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc-private */
    isSecure() {
        return typeof this.key === 'string';
    }
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc-private */
    isCorrectKey(key) {
        return this.key === key;
    }
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    getError() {
        return this._error;
    }
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    onError(callback) {
        return this.errorSubject.subscribe({ next: callback });
    }
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    onChange(callback) {
        return this.valueSubject.subscribe({ next: callback });
    }
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
    getObserver() {
        return this._observer;
    }
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    dispose() {
        this.valueSubject.complete();
        this.errorSubject.complete();
    }
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
    static from(/* eslint-disable-line @nice-cxone/ccf/required-tsdoc */ observable, initialValue) {
        const observableValue = new ObservableValue(initialValue);
        observable.subscribe(observableValue.getObserver());
        return observableValue;
    }
}
export default ObservableValue;
//# sourceMappingURL=observableValue.js.map