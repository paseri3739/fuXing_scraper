const { error, log } = require("console");
const fs = require("fs");
const { basename } = require("path");
const path = require("path");
const { argv } = require("process");

// JSONファイルを読み込む関数
function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
}

// JSONファイルに書き込む関数
function writeJsonFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8", (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

// URL内の&name=パラメータを"large"に置換する関数
function replaceNameParam(urls) {
    return urls.map((url) => {
        return url.replace(/(&name=)[^&]*/, "$1large");
    });
}

// メイン処理
async function main() {
    try {
        // コマンドライン引数からJSONファイルのパスを取得
        const inputFilePath = process.argv[2];
        if (!inputFilePath) {
            console.error("エラー: JSONファイルのパスを指定してください。");
            return;
        }

        // 出力ファイル名を動的に生成 (例: "Updated_<input file name>.json")
        const outputFilePath = `Updated_${path.basename(inputFilePath)}`;
        const urls = await readJsonFile(inputFilePath); // JSONファイルを読み込む
        const updatedUrls = replaceNameParam(urls); // URLを更新
        await writeJsonFile(outputFilePath, updatedUrls); // 結果をJSONファイルに書き込む
        console.log(`Updated URLs have been written to ${outputFilePath}`);
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
}

(async () => {
    await main();
})();
