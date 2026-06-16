/* ---------------------------------------------------------
   NICE CMA SDK — FAQ
   Simple in-place search + accordion. No fetch, no card jumps.
--------------------------------------------------------- */

(function () {
    'use strict';

    /* --------- Icon library --------- */
    const ICONS = {
        phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>',
        users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
        chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
        microphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
        puzzle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.47 1.229 0 1.698l-2.039 2.039c-.47.47-1.229.47-1.698 0l-1.568-1.568a1.026 1.026 0 0 0-.878-.29c-.62.107-1.25.107-1.87 0a1.026 1.026 0 0 0-.878.29l-1.568 1.568c-.47.47-1.229.47-1.698 0l-2.04-2.04c-.47-.47-.47-1.229 0-1.698l1.568-1.568c.23-.23.338-.556.29-.878a4.998 4.998 0 0 1 0-1.87 1.026 1.026 0 0 0-.29-.878L4.86 4.84c-.47-.47-.47-1.229 0-1.698L6.9 1.103c.47-.47 1.229-.47 1.698 0l1.568 1.568c.23.23.556.338.878.29.62-.107 1.25-.107 1.87 0a1.026 1.026 0 0 0 .878-.29l1.568-1.568c.47-.47 1.229-.47 1.698 0l2.04 2.04c.47.47.47 1.229 0 1.698L17.53 6.41c-.23.23-.338.556-.29.878.107.62.107 1.25 0 1.87 0 .226-.107.452-.29.692"/></svg>',
        cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
        link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
        code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.121 2.121 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
        plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
    };

    /* --------- DOM helpers --------- */
    const el = (sel) => document.querySelector(sel);
    const els = (sel) => Array.from(document.querySelectorAll(sel));

    /* --------- Init --------- */
    document.addEventListener('DOMContentLoaded', () => {
        const DATA = window.__FAQ_DATA__;
        if (!DATA || !DATA.categories) {
            el('#faq-content').innerHTML = '<p class="no-results">FAQ data is unavailable.</p>';
            return;
        }
        renderAllFaqs(DATA);
        wireAccordion();
        wireSearch();
        updateFooterMeta(DATA);
    });

    /* --------- Render all FAQ sections --------- */
    function renderAllFaqs(DATA) {
        const container = el('#faq-content');
        container.innerHTML = DATA.categories.map((cat) => `
            <section class="faq-section" data-section-id="${cat.id}" style="--card-color: ${cat.color}">
                <header class="faq-section-header">
                    <span class="faq-section-icon" aria-hidden="true">${ICONS[cat.icon] || ICONS.cube}</span>
                    <div>
                        <h2>${escapeHtml(cat.name)}</h2>
                        <p class="faq-section-desc">${escapeHtml(cat.description)}</p>
                    </div>
                </header>
                <div class="accordion">
                    ${cat.faqs.map((f, idx) => {
                        const id = `${cat.id}-${idx}`;
                        const qHtml = formatInline(f.q);
                        const aHtml = formatInline(f.a);
                        return `
                        <div class="accordion-item"
                             data-item
                             data-q="${escapeAttr(f.q.toLowerCase())}"
                             data-a="${escapeAttr(f.a.toLowerCase())}"
                             id="${id}">
                            <button type="button" class="accordion-trigger" aria-expanded="false" aria-controls="panel-${id}">
                                <span class="accordion-question"
                                      data-question-text
                                      data-original="${escapeAttr(qHtml)}">${qHtml}</span>
                                <span class="accordion-icon" aria-hidden="true">${ICONS.plus}</span>
                            </button>
                            <div class="accordion-panel" id="panel-${id}" role="region">
                                <div class="accordion-panel-inner"
                                     data-answer-text
                                     data-original="${escapeAttr(aHtml)}">${aHtml}</div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </section>
        `).join('');
    }

    /* --------- Accordion (event delegation) --------- */
    function wireAccordion() {
        el('#faq-content').addEventListener('click', (e) => {
            const trigger = e.target.closest('.accordion-trigger');
            if (trigger) toggleAccordion(trigger);
        });
    }

    function toggleAccordion(trigger, forceOpen) {
        const item = trigger.closest('.accordion-item');
        const panel = item.querySelector('.accordion-panel');
        const isOpen = item.classList.contains('is-open');
        const shouldOpen = forceOpen === true ? true : forceOpen === false ? false : !isOpen;

        if (shouldOpen) {
            const inner = panel.querySelector('.accordion-panel-inner');
            panel.style.maxHeight = inner.scrollHeight + 24 + 'px';
            item.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
        } else {
            panel.style.maxHeight = '0px';
            item.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
        }
    }

    /* --------- Search: filter accordion items in-place --------- */
    function wireSearch() {
        const input = el('#search-input');
        const clearBtn = el('#clear-search');
        const status = el('#search-status');
        const noResults = el('#no-results');
        if (!input) return;

        const apply = debounce(() => {
            const q = input.value.trim();
            clearBtn.hidden = q.length === 0;
            if (!q) {
                resetFilter();
                status.hidden = true;
                noResults.hidden = true;
                return;
            }
            const matchCount = filterItems(q);
            status.hidden = false;
            status.innerHTML = matchCount === 0
                ? `No results for <strong>"${escapeHtml(q)}"</strong>`
                : `${matchCount} result${matchCount === 1 ? '' : 's'} for <strong>"${escapeHtml(q)}"</strong>`;
            noResults.hidden = matchCount !== 0;
        }, 80);

        input.addEventListener('input', apply);

        clearBtn.addEventListener('click', () => {
            input.value = '';
            apply();
            input.focus();
        });

        // Escape clears search when focused
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && input.value) {
                e.preventDefault();
                input.value = '';
                apply();
            }
        });
    }

    function filterItems(query) {
        const needle = query.toLowerCase();
        const tokens = needle.split(/\s+/).filter(Boolean);
        let totalMatched = 0;

        els('[data-section-id]').forEach((section) => {
            let sectionMatched = 0;
            section.querySelectorAll('[data-item]').forEach((item) => {
                const hay = item.dataset.q + ' ' + item.dataset.a;
                const isMatch = tokens.every((t) => hay.includes(t));
                if (isMatch) {
                    item.hidden = false;
                    sectionMatched++;
                    totalMatched++;
                    // Restore + highlight question and answer
                    const qEl = item.querySelector('[data-question-text]');
                    const aEl = item.querySelector('[data-answer-text]');
                    qEl.innerHTML = highlight(qEl.dataset.original, tokens);
                    aEl.innerHTML = highlight(aEl.dataset.original, tokens);
                    // Auto-open so the answer is immediately visible
                    const trigger = item.querySelector('.accordion-trigger');
                    toggleAccordion(trigger, true);
                    // Re-measure panel height (highlighted content may differ slightly)
                    const panel = item.querySelector('.accordion-panel');
                    const inner = panel.querySelector('.accordion-panel-inner');
                    panel.style.maxHeight = inner.scrollHeight + 24 + 'px';
                } else {
                    item.hidden = true;
                    // Collapse hidden items so when shown again they're closed
                    const trigger = item.querySelector('.accordion-trigger');
                    toggleAccordion(trigger, false);
                }
            });
            section.hidden = sectionMatched === 0;
        });

        return totalMatched;
    }

    function resetFilter() {
        els('[data-section-id]').forEach((section) => {
            section.hidden = false;
            section.querySelectorAll('[data-item]').forEach((item) => {
                item.hidden = false;
                const qEl = item.querySelector('[data-question-text]');
                const aEl = item.querySelector('[data-answer-text]');
                qEl.innerHTML = qEl.dataset.original;
                aEl.innerHTML = aEl.dataset.original;
                // Collapse all on clear
                const trigger = item.querySelector('.accordion-trigger');
                toggleAccordion(trigger, false);
            });
        });
    }

    /* --------- Formatting --------- */
    function formatInline(text) {
        let html = escapeHtml(text);
        // Inline `code` blocks
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        // Auto-wrap @nice-devone/* package names
        html = html.replace(/(@nice-devone\/[a-z\-]+)/g, '<code>$1</code>');
        return html;
    }

    function highlight(htmlString, tokens) {
        // Highlight only inside text nodes — never inside tag attributes.
        if (!tokens || tokens.length === 0) return htmlString;
        const wrap = document.createElement('div');
        wrap.innerHTML = htmlString;
        const walker = document.createTreeWalker(wrap, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) textNodes.push(node);
        const escapedTokens = tokens.map(escapeRegExp).filter(Boolean);
        if (escapedTokens.length === 0) return htmlString;
        const re = new RegExp('(' + escapedTokens.join('|') + ')', 'gi');
        textNodes.forEach((n) => {
            if (!re.test(n.nodeValue)) return;
            const span = document.createElement('span');
            span.innerHTML = escapeHtml(n.nodeValue).replace(re, '<mark>$1</mark>');
            n.parentNode.replaceChild(span, n);
            // Unwrap the temporary span so we don't litter the DOM
            while (span.firstChild) span.parentNode.insertBefore(span.firstChild, span);
            span.parentNode.removeChild(span);
        });
        return wrap.innerHTML;
    }

    /* --------- Footer meta --------- */
    function updateFooterMeta(DATA) {
        const year = el('#footer-year');
        if (year) year.textContent = new Date().getFullYear();
        const ver = el('#footer-version');
        if (ver && DATA.meta && DATA.meta.version) ver.textContent = DATA.meta.version;
    }

    /* --------- Utilities --------- */
    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    function escapeAttr(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;');
    }
    function escapeRegExp(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    function debounce(fn, ms) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), ms);
        };
    }
})();
