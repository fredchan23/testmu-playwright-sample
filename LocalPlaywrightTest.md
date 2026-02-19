# Local Playwright Test Setup

## Prerequisites

- Node.js installed (>=12.7.0)
- Dependencies installed: `npm install`
- Local browsers installed: `npx playwright install`
- A `.env` file with LambdaTest credentials (for remote runs):
  ```
  LT_USERNAME=your_username
  LT_ACCESS_KEY=your_access_key
  ```

## Configuration

The `playwright.config.ts` supports both **local** and **remote (LambdaTest)** execution, controlled by the `LOCAL` environment variable.

| Mode | `LOCAL` env var | Browser |
|------|----------------|---------|
| Local | `true` | Local Chrome (headed) |
| Remote | not set / any other value | LambdaTest Cloud |

## Running Tests

### Run locally (headed browser)

```powershell
$env:LOCAL="true"; npx playwright test tests/duckduckgo-search.spec.ts
```

### Run on LambdaTest (remote)

```powershell
npx playwright test tests/duckduckgo-search.spec.ts
```

### Run all tests

```powershell
# Local
$env:LOCAL="true"; npx playwright test

# Remote
npx playwright test
```

## Test Files

Test files must follow Playwright's naming convention to be auto-discovered:

- `*.spec.ts` / `*.spec.js`
- `*.test.ts` / `*.test.js`

Place test files in the `tests/` directory.

### Current Tests

| File | Description |
|------|-------------|
| `tests/duckduckgo-search.spec.ts` | Opens DuckDuckGo, searches for "playwright 101", verifies results appear |

## Notes

- Use **forward slashes** in file paths when running from PowerShell (e.g., `tests/duckduckgo-search.spec.ts` instead of `tests\duckduckgo-search.spec.ts`)
- The standalone `playwright-single.js` (and similar `playwright-*.js` files in the root) are **not** Playwright Test scripts — they are run with `node`, e.g., `node playwright-single.js`
- `build` and `name` for LambdaTest can be configured in `playwright.config.ts` under `LT:Options`, or per-project using the `projects` config
