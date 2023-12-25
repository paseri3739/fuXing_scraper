import { Page } from "playwright";

export async function networkObserver(page: Page) {
    page.on("response", async (response) => {
        const url = response.url();
        if (url.includes("&name=") && response.headers()["content-type"] === "image/jpeg") {
            const buffer = await response.body(); // レスポンスのボディをバッファとして取得
            const fileName = url.split("/").pop(); // URLからファイル名を抽出
            require("fs").writeFileSync(fileName, buffer); // ファイルシステムにJPEGとして保存
        }
    });
    return page;
}
