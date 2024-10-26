import "dotenv/config";
import * as fs from "fs";

import { Browser, BrowserContext, Page, chromium } from "playwright";

const USER_NAME: string = process.env.USER_NAME || "";
const PASSWORD: string = process.env.PASSWORD || "";
const loginPage: string = "https://x.com/i/flow/login";
const homePage: string = "https://x.com/home";

export async function initializeBrowser(): Promise<[Browser, Page, BrowserContext]> {
    const statePath = "./loginAuth.json";
    const browser: Browser = await chromium.launch({ headless: false });

    let context: BrowserContext;
    let page: Page;

    if (fs.existsSync(statePath)) {
        // ストレージ状態が存在する場合、それを使用して新しいコンテキストを作成
        context = await browser.newContext({ storageState: statePath });
        page = await context.newPage();
        await page.goto(homePage);
    } else {
        // ストレージ状態が存在しない場合、新しいコンテキストを作成してログイン処理を実行
        context = await browser.newContext();
        page = await context.newPage();
        await login(page);
    }

    return [browser, page, context];
}

async function login(page: Page): Promise<Page> {
    await page.goto(loginPage);
    await page.click("input");
    await page.fill("input", USER_NAME);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);
    await page.keyboard.type(PASSWORD);
    await page.keyboard.press("Enter");
    await page.waitForURL(homePage);
    await page.context().storageState({ path: "./loginAuth.json" });
    return page;
}
