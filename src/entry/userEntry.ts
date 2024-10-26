import { Page } from "playwright";

export async function userEntry(username: string, page: Page): Promise<void> {
    const encodedUsername: string = encodeURIComponent(username);
    const url: string = `https://x.com/${encodedUsername}/media`;
    await page.goto(url);
    await page.waitForLoadState("networkidle");
}
