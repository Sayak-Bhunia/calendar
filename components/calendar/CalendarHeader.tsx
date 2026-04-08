'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getHeroImageForMonth, MONTH_NAMES } from '@/lib/calendar-utils';

interface CalendarHeaderProps {
  currentDate: Date;
}

export default function CalendarHeader({ currentDate }: CalendarHeaderProps) {
  const [imageKey, setImageKey] = useState(0);
  const [prevMonth, setPrevMonth] = useState(currentDate.getMonth());

  useEffect(() => {
    // Trigger animation when month changes
    if (prevMonth !== currentDate.getMonth()) {
      setImageKey((prev) => prev + 1);
      setPrevMonth(currentDate.getMonth());
    }
  }, [currentDate, prevMonth]);

  const heroImage = getHeroImageForMonth(currentDate.getMonth(), currentDate.getFullYear());
  const monthName = MONTH_NAMES[currentDate.getMonth()];

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      {/* Hero Image with Animation */}
      <div key={imageKey} className="animate-hero-image relative h-80 w-full">
        <Image
          src={heroImage}
          alt={`${monthName} ${currentDate.getFullYear()}`}
          fill
          className="object-cover"
          priority
          unoptimized
        />


      </div>
    </div>
  );
}
