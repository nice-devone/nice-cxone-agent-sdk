export interface feedbackCategoriedAndPrioritiesResponse {
    CategoriesAndPriorities: {
        feedbackCategories: feedbackCategories[];
        feedbackPriorities: feedbackPriorities[];
    };
}
export interface feedbackCategories {
    id: string;
    name: string;
}
export interface feedbackPriorities {
    name: string;
    translatedName?: string;
}
