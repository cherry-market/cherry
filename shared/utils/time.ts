const KST_OFFSET = '+09:00';

function hasTimezoneDesignator(value: string): boolean {
  return /([zZ]|[+-]\d{2}:\d{2})$/.test(value);
}

export function parseKstDate(value: string): Date | null {
  if (!value) return null;
  const trimmed = value.trim();
  const normalized = hasTimezoneDesignator(trimmed) ? trimmed : `${trimmed}${KST_OFFSET}`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatRelativeTimeKorean(isoLike: string, nowMs = Date.now()): string {
  const date = parseKstDate(isoLike);
  if (!date) return '';

  const diffMs = Math.max(0, nowMs - date.getTime());
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diffMs < minute) return '방금 전';
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}분 전`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}시간 전`;
  if (diffMs < month) return `${Math.floor(diffMs / day)}일 전`;
  if (diffMs < year) return `${Math.floor(diffMs / month)}개월 전`;
  return `${Math.floor(diffMs / year)}년 전`;
}

