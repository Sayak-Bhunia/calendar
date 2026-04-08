# 📅 Interactive Calendar

A feature-rich, beautiful calendar app built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Navigate months and years, select date ranges, attach per-date notes, and switch between light, dark, and seasonal themes — all persisted automatically to browser storage.

---

## Features

- **Month & year navigation** — step forward or backward by month or full year, or jump to today with one click.
- **Date range selection** — click a start date, then Shift+Click an end date to highlight a range across the grid.
- **Per-date notes** — select any date and write notes in the side panel; notes are auto-saved and indicated by a subtle marker on the calendar cell.
- **Holiday & event markers** — US public holidays and common observances are pre-loaded and shown on each cell.
- **Theme switcher** — choose Light, Dark, or Seasonal mode. The selected theme persists across sessions.
- **Monthly hero images** — a unique landscape banner image is displayed for every month of the year.
- **Fully responsive** — single-column on mobile, two-thirds/one-third split on desktop.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Icons | Lucide React |
| Date utilities | date-fns 4, react-day-picker 9 |
| Analytics | Vercel Analytics |
| Package manager | pnpm |

---

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout with font and analytics setup
│   ├── page.tsx            # Entry point — renders <Calendar />
│   └── globals.css         # Global styles
│
├── components/
│   ├── calendar/
│   │   ├── Calendar.tsx        # Root calendar component — state, navigation, theme logic
│   │   ├── CalendarGrid.tsx    # 7×6 day grid with range selection
│   │   ├── CalendarHeader.tsx  # Hero image banner for the current month
│   │   ├── DateCell.tsx        # Individual day cell (holiday, note, range, today highlights)
│   │   ├── NotesPanel.tsx      # Side panel textarea for per-date notes
│   │   └── ThemeSwitcher.tsx   # Light / Dark / Seasonal toggle buttons
│   ├── theme-provider.tsx      # next-themes provider
│   └── ui/                     # shadcn/ui component library
│
├── hooks/
│   ├── use-mobile.ts       # Responsive breakpoint hook
│   └── use-toast.ts        # Toast notification hook
│
├── lib/
│   ├── calendar-utils.ts   # Date helpers, holidays list, season logic, hero image map
│   └── utils.ts            # Tailwind class merging utility (cn)
│
└── public/                 # Static assets and icons
```

---

## Getting Started

**Prerequisites:** Node.js 18+ and pnpm.

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
pnpm build
pnpm start

# Lint
pnpm lint
```

---

## How It Works

### State management

All state lives in the top-level `Calendar` component and is passed down via props. On mount, saved values are read from `localStorage` (theme preference and all date notes). Any changes to theme or notes are written back automatically via `useEffect`.

### Date range selection

Click any date to start a range (sets `selectedRange.start`). Shift+Click a second date to complete it (sets `selectedRange.end`). The range is visually highlighted across the grid. Clicking without Shift resets to a new range.

### Notes

Notes are stored in a `Record<string, string>` keyed by `YYYY-MM-DD` strings. A dot indicator is rendered on any `DateCell` that has a non-empty note. The Notes Panel shows a character count and confirms auto-save.

### Themes

Three themes are supported: `light`, `dark`, and `seasonal`. Light and dark toggle the `dark` class on `<html>`. Seasonal mode applies season-aware colour tokens based on the current month (spring / summer / fall / winter).

### Holidays

A static list of US public holidays and common events is defined in `lib/calendar-utils.ts` keyed to 2024 dates. The grid filters this list by the displayed month/year prefix and passes matching entries to each `DateCell`.

---

## Customisation

**Add or edit holidays:** Update the `HOLIDAYS_AND_EVENTS` array in `lib/calendar-utils.ts`. Each entry needs a `date` (`YYYY-MM-DD`), a `name`, and a `type` of `'holiday'`, `'event'`, or `'special'`.

**Change monthly hero images:** Update the `monthImages` map inside `getHeroImageForMonth()` in `lib/calendar-utils.ts`.

**Extend the UI component set:** This project uses shadcn/ui. Add new components with:

```bash
npx shadcn@latest add <component-name>
```

---

## Deployment

The app is ready to deploy to [Vercel](https://vercel.com) out of the box. Vercel Analytics is already wired up and activates automatically in production via the `NODE_ENV` guard in `app/layout.tsx`.

```bash
vercel deploy
```

---

## License

Private project — all rights reserved.
