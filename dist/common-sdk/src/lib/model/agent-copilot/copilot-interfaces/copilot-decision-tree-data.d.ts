/**
 * model interface for Decision Tree question
 */
export interface DecisionTreeQuestion {
    /**
     * The unique identifier for the question.
     */
    questionId: string;
    /**
     * The text of the question.
     */
    questionText: string;
    /**
     * Indicates whether the question is mandatory.
     */
    mandatory: boolean;
}
/**
 * model interface for Decision Tree question with response
 */
export interface CapturedQuestion extends DecisionTreeQuestion {
    /**
     * The response provided for the question.
     */
    questionResponse: DecisionTreeInputValue;
    /**
     * The data type of the question response.
     */
    dataType: QuestionType;
    /**
     * The options available for multiple choice questions.
     */
    options?: string[];
}
/**
 * model interface for Suggested Questions Section
 */
export interface SuggestedQuestionSection {
    /**
     * The unique identifier for the section.
     */
    sectionId: string;
    /**
     * The name of the section.
     */
    sectionName: string;
    /**
     * The list of questions in the section.
     */
    questions: DecisionTreeQuestion[];
}
/**
 * model interface for Captured Responses Section
 */
export interface CapturedSection {
    /**
     * The unique identifier for the section.
     */
    sectionId: string;
    /**
     * The name of the section.
     */
    sectionName: string;
    /**
     * The list of questions responded to in the section.
     */
    questionsResponded: CapturedQuestion[];
}
export interface BaseSection {
    /**
     * The unique identifier for the section.
     */
    sectionId: string;
    /**
     * The name of the section.
     */
    sectionName: string;
}
/**
 * model interface for Suggested Questions Section
 */
export interface SuggestedQuestionSection extends BaseSection {
    /**
     * The list of questions in the section.
     */
    questions: DecisionTreeQuestion[];
}
/**
 * model interface for Captured Responses Section
 */
export interface CapturedSection extends BaseSection {
    /**
     * The list of questions responded to in the section.
     */
    questionsResponded: CapturedQuestion[];
}
/**
 * model interface for Decision Tree data
 */
export interface DecisionTreeData {
    /**
     * The unique identifier for the task session associated with this decision tree.
     */
    taskSessionUid: string;
    /**
     * The unique identifier for the contact associated with this decision tree.
     */
    contactId: string;
    /**
     * The unique identifier for the decision tree.
     */
    decisionTreeId: string;
    /**
     * The title of the decision tree.
     */
    title: string;
    /**
     * The icon representing the decision tree.
     */
    icon: string;
    /**
     * The number of questions answered so far.
     */
    answeredQuestions: number;
    /**
     * The total number of questions in the decision tree.
     */
    totalNoOfQuestions: number;
    /**
     * The Current section ID being interacted with in the decision tree.
     */
    currentSectionId: string;
    /**
     * The list of suggested questions for the decision tree.
     */
    suggestedQuestions: SuggestedQuestionSection[];
    /**
     * The list of captured responses for the decision tree.
     */
    capturedResponses: CapturedSection[];
    /**
     * Indicates whether the submit button should be shown.
     */
    showSubmit: boolean;
    /**
     * Indicates the ID of the previous section for navigation purposes.
     */
    previousSection?: string;
    sections: DecisionTreeSection[];
    visitedSections: BaseSection[];
    error: string | null;
    completeBtnTitle: string;
}
/**
 * Enumeration of supported decision tree question primitive types.
 */
export declare type QuestionType = 'Date' | 'String' | 'Number' | 'Boolean';
/**
 * Props for Decision Tree Capture Details component
 */
export interface DecisionTreeCaptureDetailsProps {
    payload: DecisionTreeData;
}
/**
 * Primitive values supported by decision tree inputs.
 */
export declare type DecisionTreeInputValue = string | number | boolean | Date;
/**
 * Represents the root element of a decision tree definition returned from the API.
 *
 * This is the top-level payload containing metadata about the decision tree
 * (such as its name, type, and status) along with its full configuration.
 */
export interface DecisionTreeElement {
    name: string;
    type: string;
    description: string;
    notes: string | null;
    status: string;
    division: number;
    config: DecisionTreeConfig;
}
/**
 * Decision Tree config block
 */
export interface DecisionTreeConfig {
    title: string;
    icon: string;
    mode: string;
    shouldAutoFill: boolean;
    interviewTreeNavigationStrategy: string;
    selectedBot: Record<string, string>;
    selectedIntent: Record<string, string>;
    completeBtnTitle: string;
    sections: DecisionTreeSection[];
}
/**
 * A single section
 */
export interface DecisionTreeSection {
    sectionId: string;
    sectionTitle: string;
    sectionDescription: string;
    preCondition: SectionPreCondition;
    fields: DecisionTreeField[];
}
/**
 * Condition applied at section level
 */
export interface SectionPreCondition {
    conditionType: 'Display always' | 'Display if' | 'Do not display if';
    conditionValue?: CriteriaSelector;
}
/**
 * Individual question/field
 */
export interface DecisionTreeField {
    fieldId: string;
    label: string;
    dataType: 'String' | 'Number' | 'Boolean' | 'Date' | 'MultipleChoice' | 'SingleChoice' | string;
    mandatory: boolean;
    value: DecisionTreeInputValue;
    options?: string[];
}
/**
 * Supported comparison operators.
 */
export declare type ComparisonOperator = 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte';
/**
 * A single comparison criterion against a field.
 */
export interface ComparisonCriteria {
    kind: 'comparison';
    /**
     * Field identifier to compare.
     */
    field: string;
    /**
     * Operator used for comparison.
     */
    operator: ComparisonOperator;
    /**
     * Value compared against. Supports primitive scalar types.
     */
    value: string | number | boolean;
}
/**
 * A logical grouping (AND / OR) of child criteria.
 */
export interface LogicalCriteria {
    kind: 'group';
    /**
     * Logical gate combining the child criteria.
     */
    gate: 'AND' | 'OR';
    /**
     * Nested criteria (can be comparisons or further groups).
     */
    criteria: Array<CriteriaSelector>;
}
/**
 * Recursive criteria selector allowing compound logical expressions like:
 *` a = 4 AND b != 6 OR c > 7`
 */
export declare type CriteriaSelector = ComparisonCriteria | LogicalCriteria;
