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
            fs.writeFileSync(filePath, new Uint8Array(buffer)); // JPEGとして保存
        }
    });
}
