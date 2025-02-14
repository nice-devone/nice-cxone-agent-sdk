import { InferType } from 'yup';
export declare const ExternalPlatformTemplatesMessageContentPayloadElements: import("yup/lib/object").OptionalObjectSchema<{
    /**
     * @remarks template identifier
     */
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template type
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template text
     */
    text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template name
     */
    template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template variables if any
     */
    variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     * @remarks template identifier
     */
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template type
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template text
     */
    text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template name
     */
    template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template variables if any
     */
    variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
}>>;
export declare const ExternalPlatformTemplatesMessageContentPayload: import("yup/lib/object").OptionalObjectSchema<{
    postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template identifier
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template text
         */
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template name
         */
        template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template variables if any
         */
        variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template identifier
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template text
         */
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template name
         */
        template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template variables if any
         */
        variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template identifier
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template text
         */
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template name
         */
        template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template variables if any
         */
        variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template identifier
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template text
         */
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template name
         */
        template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template variables if any
         */
        variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template identifier
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template text
         */
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template name
         */
        template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template variables if any
         */
        variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>[]>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template identifier
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template text
         */
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template name
         */
        template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template variables if any
         */
        variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template identifier
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template text
         */
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template name
         */
        template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template variables if any
         */
        variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template identifier
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template text
         */
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template name
         */
        template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template variables if any
         */
        variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template identifier
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template text
         */
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template name
         */
        template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template variables if any
         */
        variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template identifier
         */
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template text
         */
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template name
         */
        template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks template variables if any
         */
        variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>[]>;
}>>;
export declare const ExternalPlatformTemplatesMessageContent: import("yup/lib/object").OptionalObjectSchema<{
    /**
     * @remarks template message content type
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks actual payload data
     */
    payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
    }>>>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     * @remarks template message content type
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks actual payload data
     */
    payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * @remarks template identifier
             */
            id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template type
             */
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template text
             */
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template name
             */
            template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            /**
             * @remarks template variables if any
             */
            variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        }>>[]>;
    }>>>;
}>>;
export declare const ExternalPlatformTemplates: import("yup/lib/object").OptionalObjectSchema<{
    /**
     * @remarks template name
     */
    template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template category defined in external platform like meta
     */
    category: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks Message content in template
     */
    messageContent: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     * @remarks template name
     */
    template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template category defined in external platform like meta
     */
    category: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks Message content in template
     */
    messageContent: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>>;
}>>;
export declare type ExternalPlatformTemplatesSchema = InferType<typeof ExternalPlatformTemplates>;
export declare const ExternalPlatformTemplatesResponse: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks template name
     */
    template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template category defined in external platform like meta
     */
    category: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks Message content in template
     */
    messageContent: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks template name
     */
    template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template category defined in external platform like meta
     */
    category: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks Message content in template
     */
    messageContent: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks template name
     */
    template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template category defined in external platform like meta
     */
    category: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks Message content in template
     */
    messageContent: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>>;
}>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks template name
     */
    template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template category defined in external platform like meta
     */
    category: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks Message content in template
     */
    messageContent: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>>;
}>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks template name
     */
    template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks template category defined in external platform like meta
     */
    category: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks Message content in template
     */
    messageContent: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * @remarks template message content type
         */
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @remarks actual payload data
         */
        payload: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            postback: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            elements: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
                /**
                 * @remarks template identifier
                 */
                id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template type
                 */
                type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template text
                 */
                text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template name
                 */
                template: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
                /**
                 * @remarks template variables if any
                 */
                variables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            }>>[]>;
        }>>>;
    }>>>;
}>>[]>;
/**
 * Interface for external platform template element
 */
export interface ExternalPlatformTemplateElement {
    /**
     * @remarks template id
     */
    id: string;
    /**
    * @remarks template name
    */
    template: string;
    /**
     * @remarks template type
     */
    type: string;
    /**
     * @remarks template variables
     */
    variables?: Record<string, string>;
    /**
     * @remarks template elements
     */
    elements?: Array<ExternalPlatformTemplateElement>;
    /**
     * @remarks file name
     */
    filename?: string;
    /**
     * @remarks file url
     */
    url?: string;
    /**
     * @remarks file mime type
     */
    mimeType?: string;
}
/**
 * Interface for external platform message template
 */
export interface ExternalPlatformTemplate {
    /**
     * @remarks template category
     */
    category: string | null;
    /**
     * @remarks actual messageContent
     */
    messageContent: ExternalPlatformTemplateMessageContent;
    /**
     * @remarks template data
     */
    template: string;
}
/**
 * Interface for external platform message Message content
 */
export interface ExternalPlatformTemplateMessageContent {
    /**
     * @remarks message content type
     */
    type: string;
    /**
   * @remarks actual payload data
   */
    payload: {
        elements: Array<ExternalPlatformTemplateElement>;
    };
}
