import { initializeBrowser } from "../actions/login";
import { saveImgRequestToJsonFile } from "../actions/observer";

// main() 関数に `query` 引数を追加
export async function urlEntry(url: string): Promise<void> {
    try {
        process.stdin.setEncoding("utf-8");
        const [browser, page, context] = await initializeBrowser();
        // 取得した query を使用
        await page.goto(url);
        await saveImgRequestToJsonFile(page);
        // event listener for exit
        process.stdin.on("data", async (data) => {
            if (data.toString() === "exit\n") {
                await browser.close();
                process.exit(0);
            }
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}