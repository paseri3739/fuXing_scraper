import { Page } from "playwright";

export async function search(query: string, page: Page): Promise<void> {
    const encodedQuery: string = encodeURIComponent(query);
    const url: string = `https://x.com/search?q=${encodedQuery}&f=media`;
    await page.goto(url);
    await page.waitForLoadState("networkidle");
}
