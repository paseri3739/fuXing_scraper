import { Page } from "playwright";

export async function search(query: string, page: Page): Promise<void> {
    await page.click('[data-testid="SearchBox_Search_Input"]');
    await page.keyboard.type(query);
    await page.keyboard.press("Enter");
}
