import * as fs from "fs";
import * as path from "path";
import { Page } from "playwright";

export async function saveImgResponse(page: Page) {
    page.on("response", async (response) => {
        const url: string = response.url();
        if (url.includes("&name=") && response.headers()["content-type"] === "image/jpeg") {
            const buffer: Buffer = await response.body();
            let fileName: string = url.split("/").pop() || "";

            // ファイル名に.jpg拡張子を追加
            if (!fileName.endsWith(".jpg")) {
                fileName += ".jpg";
            }

            const dirPath: string = path.join(__dirname, "./img"); // 保存ディレクトリのパスを指定

            if (!fs.existsSync(dirPath)) {
                // ディレクトリが存在しない場合は作成
                fs.mkdirSync(dirPath, { recursive: true });
            }

            const filePath: string = path.join(dirPath, fileName); // ファイルのフルパスを生成
            fs.writeFileSync(filePath, buffer); // JPEGとして保存
        }
    });
}

export async function saveImgRequest(page: Page): Promise<void> {
    const filePath: string = "./URL.json";

    page.on("request", async (request) => {
        const url: string = request.url();
        if (url.includes("&name=")) {
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
        }
    });
}
