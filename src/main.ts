import { initializeBrowser } from "./login";
import { saveImgRequest } from "./observer";
import { search } from "./search";

(async function main(): Promise<void> {
    try {
        const [browser, page, context] = await initializeBrowser();
        // query from args
        const query: string = process.argv[2];
        await search(query, page);
        await saveImgRequest(page);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
