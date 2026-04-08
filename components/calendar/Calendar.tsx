'use client';

import { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import ThemeSwitcher from './ThemeSwitcher';
import { DateRange } from '@/lib/calendar-utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type ThemeType = 'light' | 'dark' | 'seasonal';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [theme, setTheme] = useState<ThemeType>('light');
  const [dateNotes, setDateNotes] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('calendar-theme') as ThemeType | null;
    const savedDateNotes = localStorage.getItem('calendar-date-notes');

    if (savedTheme) setTheme(savedTheme);
    if (savedDateNotes) setDateNotes(JSON.parse(savedDateNotes));

    // Apply theme to document
    applyTheme(savedTheme || 'light');
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('calendar-theme', theme);
    applyTheme(theme);
  }, [theme, mounted]);

  // Save date notes to localStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('calendar-date-notes', JSON.stringify(dateNotes));
  }, [dateNotes, mounted]);

  const applyTheme = (themeValue: ThemeType) => {
    const html = document.documentElement;
    if (themeValue === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()));
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const updateDateNote = (date: Date, content: string) => {
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setDateNotes((prev) => ({
      ...prev,
      [dateKey]: content,
    }));
  };

  const getDateNote = (date: Date): string => {
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return dateNotes[dateKey] || '';
  };

  const hasNoteForDate = (date: Date): boolean => {
    return getDateNote(date).length > 0;
  };

  if (!mounted) return null;

  const monthYear = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      {/* Theme Switcher */}
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />

      {/* Main Container */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero Image Section */}
        <CalendarHeader currentDate={currentDate} />

        {/* Controls Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-card p-4 shadow-sm">
          {/* Month Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevMonth}
              className="h-8 w-8 p-0"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-48 text-center text-lg font-semibold">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
              className="h-8 w-8 p-0"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Year Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevYear}
              className="h-8 w-8 p-0"
              aria-label="Previous year"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-16 text-center font-semibold">{currentDate.getFullYear()}</div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextYear}
              className="h-8 w-8 p-0"
              aria-label="Next year"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Today Button */}
          <Button variant="default" size="sm" onClick={handleTodayClick}>
            Today
          </Button>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <CalendarGrid
              currentDate={currentDate}
              selectedRange={selectedRange}
              onRangeChange={setSelectedRange}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              hasNoteForDate={hasNoteForDate}
            />
          </div>

          {/* Notes Panel */}
          <div>
            <NotesPanel
              selectedDate={selectedDate}
              dateNote={selectedDate ? getDateNote(selectedDate) : ''}
              onDateNoteChange={(content) => selectedDate && updateDateNote(selectedDate, content)}
              currentDate={currentDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
