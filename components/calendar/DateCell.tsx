'use client';

import { CalendarDay } from '@/lib/calendar-utils';
import { Badge } from '@/components/ui/badge';

interface Holiday {
  date: string;
  name: string;
  type: 'holiday' | 'event' | 'special';
}

interface DateCellProps {
  day: CalendarDay;
  holiday?: Holiday;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isSelected: boolean;
  hasNote: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function DateCell({
  day,
  holiday,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isSelected,
  hasNote,
  onClick,
}: DateCellProps) {
  const getHolidayColor = (type: string) => {
    switch (type) {
      case 'holiday':
        return 'bg-calendar-holiday text-white';
      case 'event':
        return 'bg-calendar-event text-white';
      default:
        return 'bg-primary text-white';
    }
  };

  const getBackgroundColor = () => {
    if (isRangeStart || isRangeEnd) {
      return 'bg-primary text-white rounded-full shadow-md';
    }
    if (isInRange) {
      return 'bg-primary/20 text-foreground';
    }
    if (isSelected) {
      return 'bg-secondary text-foreground ring-2 ring-secondary ring-offset-2 shadow-md';
    }
    if (!day.isCurrentMonth) {
      return 'text-muted-foreground bg-muted/30';
    }
    if (day.isToday) {
      return 'bg-accent text-white ring-2 ring-accent ring-offset-2';
    }
    return 'hover:bg-muted/50 cursor-pointer';
  };

  return (
    <button
      onClick={onClick}
      className={`relative flex h-24 flex-col items-center justify-center gap-1 rounded-lg border border-border p-2 transition-all duration-150 ${getBackgroundColor()}`}
      aria-label={`${day.date}${hasNote ? ' with note' : ''}${day.isCurrentMonth ? '' : ' not in month'}`}
      title={hasNote ? 'This date has notes' : undefined}
    >
      {/* Date Number */}
      <span className="text-lg font-semibold">{day.date}</span>

      {/* Note Indicator */}
      {hasNote && (
        <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary ring-1 ring-background" title="Notes available" />
      )}

      {/* Holiday Badge */}
      {holiday && (
        <Badge
          variant="secondary"
          className={`text-xs ${getHolidayColor(holiday.type)}`}
        >
          {holiday.name.length > 10 ? holiday.name.substring(0, 8) + '…' : holiday.name}
        </Badge>
      )}

      {/* Today Indicator */}
      {day.isToday && !holiday && (
        <span className="text-xs font-medium text-current opacity-75">Today</span>
      )}
    </button>
  );
}
