'use client';

import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MONTH_NAMES } from '@/lib/calendar-utils';
import { Button } from '@/components/ui/button';

interface NotesPanelProps {
  selectedDate: Date | null;
  dateNote: string;
  onDateNoteChange: (content: string) => void;
  currentDate: Date;
}

export default function NotesPanel({
  selectedDate,
  dateNote,
  onDateNoteChange,
  currentDate,
}: NotesPanelProps) {
  const monthName = MONTH_NAMES[currentDate.getMonth()];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('default', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="flex h-full flex-col gap-4 p-6 shadow-md">
      {/* Header */}
      <div>
        {selectedDate ? (
          <>
            <h3 className="text-lg font-semibold text-foreground">
              Date Notes
            </h3>
            <p className="mt-1 text-sm font-medium text-secondary">
              {formatDate(selectedDate)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Add or edit notes for this specific date
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-foreground">
              Select a Date
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Click on any date in the calendar to add notes
            </p>
          </>
        )}
      </div>

      {/* Notes Textarea */}
      <Textarea
        value={dateNote}
        onChange={(e) => onDateNoteChange(e.target.value)}
        placeholder={selectedDate ? "Write your notes for this date..." : "Select a date to add notes..."}
        disabled={!selectedDate}
        className="flex-1 resize-none"
        rows={8}
      />

      {/* Info Text */}
      <div className="flex flex-col gap-2">
        {selectedDate && dateNote && (
          <p className="text-xs text-secondary font-medium">
            📝 {dateNote.length} character{dateNote.length !== 1 ? 's' : ''}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          💾 Auto-saved to browser storage
        </p>
      </div>
    </Card>
  );
}
