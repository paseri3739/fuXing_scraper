import { Page } from "playwright-core";
import { initializeBrowser } from "../actions/initializeBrowser";
import { isWritingInProgress, saveImgRequestToJsonFile } from "../actions/saveImgRequestToJsonFile";
import { exitByEnter } from "./exitByEnter";

export async function entry(
    argv: string,
    callback: (param: string, page: Page) => Promise<any>,
    fileName?: string,
    headless?: boolean
): Promise<void> {
    try {
        process.stdin.setEncoding("utf-8");
        const [browser, page, context] = await initializeBrowser(headless);
        await callback(argv, page);
        await saveImgRequestToJsonFile(page, fileName);
        // event listener for exit
        exitByEnter(browser);
        if (headless) {
            const intervalId = setInterval(async () => {
                const isBottom = await page.evaluate(() => {
                    return window.innerHeight + window.scrollY >= document.body.scrollHeight;
                });

                if (isBottom) {
                    if (isWritingInProgress()) {
                        console.log("Writing in progress. Waiting for completion...");
                        return; // 書き込み中なら終了せずに待つ
                    }

                    clearInterval(intervalId);
                    console.log("Reached the bottom of the page and writing is complete. Exiting...");
                    await browser.close();
                    process.exit(0);
                } else {
                    await page.keyboard.press("Space");
                }
            }, 2000);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
