import { initializeBrowser } from "../actions/login";
import { saveImgRequestToJsonFile } from "../actions/observer";
import { search } from "../actions/search";

// main() 関数に `query` 引数を追加
export async function queryEntry(query: string): Promise<void> {
    try {
        const [browser, page, context] = await initializeBrowser();
        // 取得した query を使用
        await search(query, page);
        await saveImgRequestToJsonFile(page);
        await browser.close(); // ブラウザをクローズ
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
