import * as fs from "fs";
import path from "path";
import { Page } from "playwright";

let writing = false; // ファイル書き込み中かどうかのフラグ

export async function saveImgRequestToJsonFile(page: Page, fileName?: string): Promise<void> {
    const filePath = path.resolve(fileName || "./URL.json");

    page.on("request", async (request) => {
        const url: string = request.url();
        if (url.includes("&name=")) {
            writing = true; // 書き込みが始まる前にフラグを立てる

            // JSON ファイルの内容を読み込む
            let urls = [];
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, "utf8");
                urls = data ? JSON.parse(data) : [];
            }

            // 新しい URL を追加
            urls.push(url);

            // ファイルに書き込む
            fs.writeFileSync(filePath, JSON.stringify(urls, null, 4));

            writing = false; // 書き込みが終わったらフラグを解除
        }
    });
}

export function isWritingInProgress(): boolean {
    return writing; // 外部からフラグの状態を確認できる関数
}
