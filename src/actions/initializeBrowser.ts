import * as fs from "fs";
import { Browser, BrowserContext, chromium, Page } from "playwright-core";
import { login } from "./login";

export async function initializeBrowser(headless?: boolean): Promise<[Browser, Page, BrowserContext]> {
    const statePath = "./loginAuth.json";
    const browser: Browser = await chromium.launch({ headless: headless || false });

    let context: BrowserContext;
    let page: Page;

    if (fs.existsSync(statePath)) {
        // ストレージ状態が存在する場合、それを使用して新しいコンテキストを作成
        context = await browser.newContext({ storageState: statePath });
        page = await context.newPage();
    } else {
        // ストレージ状態が存在しない場合、新しいコンテキストを作成してログイン処理を実行
        context = await browser.newContext();
        page = await context.newPage();
        await login(page);
    }

    return [browser, page, context];
}
