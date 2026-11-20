/**
 * Apply the captured-text ceiling shared by the fetch and XHR patches.
 * Bodies within `maxBodyBytes` pass through; longer ones are cut and marked
 * with the original length so triage can distinguish a clipped payload from
 * a genuinely short one.
 *
 * The returned `size` is always the **original** length, never the retained
 * one — a HAR whose `content.size` shrank to match the truncation would
 * misrepresent the response.
 *
 * @param body - the decoded response text.
 * @param maxBodyBytes - ceiling for retained text.
 * @returns the body (possibly truncated) plus the original size.
 *
 * @example
 * ```
 * capText('hello world', 5); // { body: 'hello\n[truncated — 11 bytes]', size: 11 }
 * ```
 */
export declare function capText(body: string, maxBodyBytes: number): {
    body: string;
    size: number;
};
