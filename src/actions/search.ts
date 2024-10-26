import { Page } from "playwright";

export async function search(query: string, page: Page): Promise<void> {
    await page.goto(`https://x.com/search?q=${query}&f=media`);
}
