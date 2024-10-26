import { Page } from "playwright";

export async function gotoUserProfileMediaPage(page: Page, username: string): Promise<void> {
    const url: string = `https://x.com/${username}/media`;
    await page.goto(url);
    await page.waitForLoadState("networkidle");
}
