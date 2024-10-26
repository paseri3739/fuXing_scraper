import { initializeBrowser } from "./login";
import { saveImgRequest } from "./observer";
import { search } from "./search";

// main() 関数に `query` 引数を追加
export async function main(query: string): Promise<void> {
    try {
        const [browser, page, context] = await initializeBrowser();
        // 取得した query を使用
        await search(query, page);
        await saveImgRequest(page);
        await browser.close(); // ブラウザをクローズ
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
