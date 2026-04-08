'use client';

import { useState } from 'react';
import DateCell from './DateCell';
import { getCalendarDays, DAY_NAMES_SHORT, DateRange, getHolidaysForMonth } from '@/lib/calendar-utils';
import { Card } from '@/components/ui/card';

interface CalendarGridProps {
  currentDate: Date;
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  hasNoteForDate: (date: Date) => boolean;
}

export default function CalendarGrid({
  currentDate,
  selectedRange,
  onRangeChange,
  selectedDate,
  onDateSelect,
  hasNoteForDate,
}: CalendarGridProps) {
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getCalendarDays(year, month);
  const holidays = getHolidaysForMonth(year, month);

  const handleDateClick = (date: Date, isShiftKey: boolean) => {
    if (isShiftKey) {
      // End range
      onRangeChange({
        ...selectedRange,
        end: date,
      });
      setIsSelectingRange(false);
    } else {
      // Start new range or select single date
      onRangeChange({
        start: date,
        end: null,
      });
      onDateSelect(date);
      setIsSelectingRange(true);
    }
  };

  return (
    <Card className="p-6 shadow-md">
      {/* Day Headers */}
      <div className="mb-4 grid grid-cols-7 gap-2">
        {DAY_NAMES_SHORT.map((day) => (
          <div
            key={day}
            className="py-3 text-center font-semibold text-primary"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const holiday = holidays.find(
            (h) =>
              h.date ===
              `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`
          );

          const isSelected = selectedDate ? day.fullDate.getTime() === selectedDate.getTime() : false;
          const hasNote = hasNoteForDate(day.fullDate);

          return (
            <DateCell
              key={`${day.year}-${day.month}-${day.date}`}
              day={day}
              holiday={holiday}
              isInRange={selectedRange.start && selectedRange.end ? 
                day.fullDate.getTime() >= selectedRange.start.getTime() && 
                day.fullDate.getTime() <= selectedRange.end.getTime()
                : false
              }
              isRangeStart={
                selectedRange.start
                  ? day.fullDate.getTime() === selectedRange.start.getTime()
                  : false
              }
              isRangeEnd={
                selectedRange.end
                  ? day.fullDate.getTime() === selectedRange.end.getTime()
                  : false
              }
              isSelected={isSelected}
              hasNote={hasNote}
              onClick={(e) => handleDateClick(day.fullDate, e.shiftKey)}
            />
          );
        })}
      </div>

      {/* Selected Range Info */}
      {selectedRange.start && (
        <div className="mt-6 rounded-lg bg-muted p-4 text-sm">
          <p className="font-semibold text-foreground">Selected Range:</p>
          <p className="mt-1 text-muted-foreground">
            {selectedRange.start.toLocaleDateString()}{' '}
            {selectedRange.end ? ` - ${selectedRange.end.toLocaleDateString()}` : ' (Shift+Click to complete)'}
          </p>
        </div>
      )}
    </Card>
  );
}
