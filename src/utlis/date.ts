
export const formatDateString = (dateStr: string): string => {
  if (!dateStr) return '';

  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get current date as ISO string (YYYY-MM-DD)
 */
export const getCurrentDateISO = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

/**
 * Check if a date is in the past week
 */
export const isInPastWeek = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);
  return date >= oneWeekAgo && date <= now;
};

/**
 * Check if a date is in the past month
 */
export const isInPastMonth = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(now.getDate() - 30);
  return date >= oneMonthAgo && date <= now;
};

/**
 * Check if a date is in the past year
 */
export const isInPastYear = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  return date >= oneYearAgo && date <= now;
};

/**
 * Get the start and end date of a week for a given date
 */
export const getWeekRange = (date: Date): { start: Date; end: Date } => {
  const start = new Date(date);
  start.setDate(date.getDate() - 6); // Start 6 days before

  return {
    start,
    end: new Date(date) // End is the given date
  };
};

/**
 * Format a date range as a string
 */
export const formatDateRange = (start: Date, end: Date): string => {
  return `${formatDateString(start.toISOString().split('T')[0])} - ${formatDateString(end.toISOString().split('T')[0])}`;
};