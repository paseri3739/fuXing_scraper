import { Page } from "playwright";
import { search } from "../actions/search";

// main() 関数に `query` 引数を追加
export async function queryEntry(query: string, page: Page): Promise<void> {
    // 取得した query を使用
    await search(query, page);
}
