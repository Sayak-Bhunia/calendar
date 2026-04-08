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

## Running Locally

### 1. Prerequisites

Make sure the following are installed on your machine:

- **Node.js 18+** — [Download](https://nodejs.org/en/download) or use a version manager like [nvm](https://github.com/nvm-sh/nvm):
  ```bash
  nvm install 18
  nvm use 18
  ```
- **pnpm** — if not already installed:
  ```bash
  npm install -g pnpm
  ```

Verify your versions:
```bash
node -v   # should be v18.x or higher
pnpm -v   # should be v8.x or higher
```

### 2. Clone or extract the project

If cloning from a Git repository:
```bash
git clone <your-repo-url>
cd <repo-folder>
```

Or if you have the project as a zip, extract it and navigate into the folder:
```bash
unzip project.zip
cd project
```

### 3. Install dependencies

```bash
pnpm install
```

This installs all packages defined in `package.json` using the exact versions locked in `pnpm-lock.yaml`.

### 4. Start the development server

```bash
pnpm dev
```

The app will start at [http://localhost:3000](http://localhost:3000). The dev server supports hot reloading — changes to any file are reflected in the browser instantly without a full restart.

### 5. Build for production (optional)

To test a production build locally:

```bash
pnpm build   # compiles and optimises the app
pnpm start   # serves the production build at http://localhost:3000
```

### Troubleshooting

**`pnpm: command not found`** — install pnpm globally first: `npm install -g pnpm`

**Port 3000 already in use** — run on a different port: `pnpm dev -- -p 3001`

**Module not found errors** — delete `node_modules` and reinstall:
```bash
rm -rf node_modules
pnpm install
```

**Type errors on start** — ensure you're on TypeScript 5.7+ (already pinned in `package.json`) and that `pnpm install` completed without errors.

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
