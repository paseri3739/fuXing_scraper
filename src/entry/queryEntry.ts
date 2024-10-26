import { initializeBrowser } from "../actions/login";
import { saveImgRequestToJsonFile } from "../actions/observer";
import { search } from "../actions/search";

// main() 関数に `query` 引数を追加
export async function queryEntry(query: string): Promise<void> {
    try {
        process.stdin.setEncoding("utf-8");
        const [browser, page, context] = await initializeBrowser();
        // 取得した query を使用
        await search(query, page);
        await saveImgRequestToJsonFile(page);
        // event listener for exit
        process.stdin.on("data", async (data) => {
            if (data.toString().trim() === "") {
                // Enter key only (empty line)
                await browser.close();
                process.exit(0);
            }
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
