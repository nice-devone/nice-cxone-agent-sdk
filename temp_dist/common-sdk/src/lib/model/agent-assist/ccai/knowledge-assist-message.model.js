"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeArticleSuggestion = exports.KnowledgeArticle = void 0;
const uuid_1 = require("uuid");
/**
 * Knowledge article
 * @example -
 * ```
 * this.KnowledgeArticle(data);
 * ```
 */
class KnowledgeArticle {
    /**
     * constructor for KnowledgeArticle
     * @example -
     * ```
     * const knowledgeArticle = KnowledgeArticle();
     * ```
     */
    constructor(data) {
        this.id = data.id || (0, uuid_1.v4)();
        this.type = data.type;
        this.title = data.title || '';
        this.descriptions = data.descriptions || [];
        this.confidence = data.confidence;
        this.uri = data.uri || '';
    }
}
exports.KnowledgeArticle = KnowledgeArticle;
/**
 * Knowledge article suggestion
 */
class KnowledgeArticleSuggestion {
    constructor() {
        this.articles = [];
        this.timestamp = new Date();
    }
}
exports.KnowledgeArticleSuggestion = KnowledgeArticleSuggestion;
//# sourceMappingURL=knowledge-assist-message.model.js.map