import { Page } from "playwright";

// main() 関数に `query` 引数を追加
export async function urlEntry(url: string, page: Page): Promise<void> {
    await page.goto(url);
    await page.waitForLoadState("networkidle");
}
