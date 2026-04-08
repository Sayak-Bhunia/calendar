/**
 * Calendar utility functions for date calculations and formatting
 */

export interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  fullDate: Date;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/**
 * Get all days to display in a calendar month view (including prev/next month padding)
 */
export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);

    days.push({
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentMonth: date.getMonth() === month,
      isToday: date.getTime() === today.getTime(),
      fullDate: new Date(date),
    });
  }

  return days;
}

/**
 * Format date as YYYY-MM-DD string
 */
export function formatDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse date string in YYYY-MM-DD format
 */
export function parseDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Check if a date is within a range
 */
export function isDateInRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;

  const dateTime = date.getTime();
  const startTime = range.start.getTime();
  const endTime = range.end.getTime();

  return dateTime >= Math.min(startTime, endTime) && dateTime <= Math.max(startTime, endTime);
}

/**
 * Check if a date is the start or end of a range
 */
export function isRangeEdge(date: Date, range: DateRange): 'start' | 'end' | null {
  if (range.start && date.getTime() === range.start.getTime()) return 'start';
  if (range.end && date.getTime() === range.end.getTime()) return 'end';
  return null;
}

/**
 * Get the season for a given month
 */
export function getSeasonForMonth(month: number): 'spring' | 'summer' | 'fall' | 'winter' {
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

/**
 * Month names
 */
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Day names
 */
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Holidays and special events by month
 */
export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  type: 'holiday' | 'event' | 'special';
}

export const HOLIDAYS_AND_EVENTS: Holiday[] = [
  // January
  { date: '2024-01-01', name: 'New Year', type: 'holiday' },
  { date: '2024-01-15', name: 'MLK Jr. Day', type: 'holiday' },

  // February
  { date: '2024-02-14', name: 'Valentine\'s Day', type: 'event' },
  { date: '2024-02-19', name: 'Presidents\' Day', type: 'holiday' },

  // March
  { date: '2024-03-17', name: 'St. Patrick\'s Day', type: 'event' },

  // April
  { date: '2024-04-01', name: 'April Fools', type: 'event' },
  { date: '2024-04-22', name: 'Earth Day', type: 'event' },

  // May
  { date: '2024-05-12', name: 'Mother\'s Day', type: 'event' },
  { date: '2024-05-27', name: 'Memorial Day', type: 'holiday' },

  // June
  { date: '2024-06-16', name: 'Father\'s Day', type: 'event' },
  { date: '2024-06-19', name: 'Juneteenth', type: 'holiday' },

  // July
  { date: '2024-07-04', name: 'Independence Day', type: 'holiday' },

  // September
  { date: '2024-09-02', name: 'Labor Day', type: 'holiday' },

  // October
  { date: '2024-10-31', name: 'Halloween', type: 'event' },

  // November
  { date: '2024-11-11', name: 'Veterans Day', type: 'holiday' },
  { date: '2024-11-28', name: 'Thanksgiving', type: 'holiday' },

  // December
  { date: '2024-12-25', name: 'Christmas', type: 'holiday' },
  { date: '2024-12-31', name: 'New Year\'s Eve', type: 'event' },
];

/**
 * Get holidays for a specific month
 */
export function getHolidaysForMonth(year: number, month: number): Holiday[] {
  const monthStr = String(month + 1).padStart(2, '0');
  const prefix = `${year}-${monthStr}`;
  return HOLIDAYS_AND_EVENTS.filter((h) => h.date.startsWith(prefix));
}

/**
 * Get hero image URL for a month
 */
export function getHeroImageForMonth(month: number, year: number): string {
  // Custom landscape images for each month
  const monthImages: Record<number, string> = {
    0: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.png-tYcOHaDXlfzDRkaQHgiYnuseAWGRug.jpeg', // January
    1: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-YcUOyZptQbCofCPNsA5KsgaX9EA4it.png', // February
    2: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-IDsRhN8c9LJXYL1oSl2FsEKgvNFvOj.png', // March
    3: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-MPIlDrKjVlAFqGftdKChtCkzSIQ0fz.png', // April
    4: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-jAl7qFIR6voewEVjoh6czylc7EE7uu.png', // May
    5: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-mUL3NYU0FFS5NgVcXlbOe8U9KY3bnl.png', // June
    6: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-dD1InJWul8HZSFGqhJLZxVw6WXkNtj.png', // July
    7: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-lVqbizbdrVf2dhKnsFbOixOTLb3grc.png', // August
    8: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-eGTP0D178p9GoaZd6FwEQofOiaOm2o.png', // September
    9: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-F3VbBz0pQPEfi38VapdgkfquNExLyq.png', // October
    10: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-WsY0NMCsrl1NzYCs6IfsgWM19copfz.png', // November
    11: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-7Q5tAbQoOfsYpVKrPVC9ATOoj3WqDK.png', // December
  };

  return monthImages[month] || monthImages[0];
}
