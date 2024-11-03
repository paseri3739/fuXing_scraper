import * as fs from "fs";
import { Browser, BrowserContext, chromium, Page } from "playwright-core";
import { login } from "./login";

export async function initializeBrowser(headless?: boolean): Promise<[Browser, Page, BrowserContext]> {
    const statePath = "./loginAuth.json";
    const browser: Browser = await chromium.launch({ headless: headless || false });

    const context = fs.existsSync(statePath) ? await browser.newContext({ storageState: statePath }) : await browser.newContext();

    const page = await context.newPage();

    if (!fs.existsSync(statePath)) {
        await login(page);
    }

    return [browser, page, context];
}
