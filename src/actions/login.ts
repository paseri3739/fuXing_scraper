import "dotenv/config";

import { Page } from "playwright";

export const USER_NAME: string = process.env.USER_NAME || "";
export const PASSWORD: string = process.env.PASSWORD || "";
export const loginPage: string = "https://x.com/i/flow/login";
export const homePage: string = "https://x.com/home";

export async function login(page: Page): Promise<Page> {
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
