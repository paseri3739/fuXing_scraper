const fs = require("fs");
const path = require("path");
const axios = require("axios");
const process = require("process");

// ダウンロード先のディレクトリを作成する関数
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// 画像をダウンロードして指定されたパスに保存する関数
async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(filepath);
        response.data.pipe(writer);
        let error = null;
        writer.on("error", (err) => {
            error = err;
            writer.close();
            reject(err);
        });
        writer.on("close", () => {
            if (!error) {
                resolve(filepath);
            }
        });
    });
}

// 指定された時間（ミリ秒）だけ処理を遅延する関数
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// メイン処理
async function main() {
    try {
        const jsonFilePath = process.argv[2]; // コマンドライン引数からJSONファイルのパスを取得
        const urls = require(path.resolve(jsonFilePath)); // JSONファイルを読み込む

        // JSONファイル名から拡張子を除いたフォルダ名を取得
        const folderName = path.basename(jsonFilePath, path.extname(jsonFilePath));
        const imgDir = path.join("./img", folderName); // 画像保存用のディレクトリ
        ensureDir(imgDir); // ディレクトリがなければ作成

        for (const [index, url] of urls.entries()) {
            const filepath = path.join(imgDir, `image${index}.jpg`);
            await downloadImage(url, filepath);
            console.log(`Downloaded: ${filepath}`);
            await delay(2000); // 2秒待機
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
}

(async () => {
    await main();
})();
