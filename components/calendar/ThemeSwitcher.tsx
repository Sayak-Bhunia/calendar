'use client';

import { Button } from '@/components/ui/button';
import { Sun, Moon, Palette } from 'lucide-react';
import { ThemeType } from './Calendar';

interface ThemeSwitcherProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const themes: Array<{ value: ThemeType; label: string; icon: React.ReactNode }> = [
    { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
    { value: 'seasonal', label: 'Seasonal', icon: <Palette className="h-4 w-4" /> },
  ];

  return (
    <div className="flex items-center justify-end gap-2 px-4 py-3">
      <span className="text-sm font-medium text-muted-foreground">Theme:</span>
      <div className="flex gap-2">
        {themes.map((theme) => (
          <Button
            key={theme.value}
            variant={currentTheme === theme.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onThemeChange(theme.value)}
            className="flex items-center gap-2"
            aria-label={`Switch to ${theme.label} theme`}
          >
            {theme.icon}
            <span className="hidden sm:inline">{theme.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
