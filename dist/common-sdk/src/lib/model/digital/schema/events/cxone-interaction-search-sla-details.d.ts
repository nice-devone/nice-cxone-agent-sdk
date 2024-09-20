export declare const CXoneSLADetailsSchema: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * Raw time in seconds
     */
    raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     * Flag to check whether response timer has already some value
     */
    alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * Raw time in seconds
     */
    raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     * Flag to check whether response timer has already some value
     */
    alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * Raw time in seconds
     */
    raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     * Flag to check whether response timer has already some value
     */
    alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>>>;
export declare const CXoneInteractionSearchSLASchema: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     *  first response time from SLA details
     */
    firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>>;
    /**
     *  Solution time from SLA details
     */
    solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     *  first response time from SLA details
     */
    firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>>;
    /**
     *  Solution time from SLA details
     */
    solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     *  first response time from SLA details
     */
    firstResponseTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>>;
    /**
     *  Solution time from SLA details
     */
    solutionTime: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        [x: string]: import("yup").AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>;
        /**
         * Raw time in seconds
         */
        raw: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        /**
         * Flag to check whether response timer has already some value
         */
        alreadyHasValue: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>>;
}>>>;
