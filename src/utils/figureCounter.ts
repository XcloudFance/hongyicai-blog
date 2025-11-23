// Per-page figure counter for blog posts
const pageCounters = new Map<string, number>();

export function getNextFigureNumber(pageId: string): number {
    const current = pageCounters.get(pageId) || 0;
    const next = current + 1;
    pageCounters.set(pageId, next);
    return next;
}

export function resetFigureCounter(pageId: string) {
    pageCounters.set(pageId, 0);
}

export function getCurrentFigureNumber(pageId: string): number {
    return pageCounters.get(pageId) || 0;
}
