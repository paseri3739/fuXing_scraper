import { Page } from "playwright-core";
import { initializeBrowser } from "../actions/initializeBrowser";
import { saveImgRequestToJsonFile } from "../actions/saveImgRequestToJsonFile";
import { exitByEnter } from "./exitByEnter";

export async function entry(
    argv: string,
    callback: (param: string, page: Page) => Promise<any>,
    fileName?: string
): Promise<void> {
    try {
        process.stdin.setEncoding("utf-8");
        const [browser, page, context] = await initializeBrowser();
        await callback(argv, page);
        await saveImgRequestToJsonFile(page, fileName);
        // event listener for exit
        exitByEnter(browser);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
