require("dotenv").config();
import { test, expect } from "@playwright/test";

test("search for playwright 101 on DuckDuckGo", async ({ page }) => {
  await page.goto("https://duckduckgo.com/");

  // Type the search term into the search box
  const searchBox = page.locator('[name="q"]');
  await searchBox.click();
  await searchBox.fill("playwright 101");

  // Submit the search
  await searchBox.press("Enter");

  // Verify results are displayed
  await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
});
