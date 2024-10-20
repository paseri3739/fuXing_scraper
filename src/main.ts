import { initializeBrowser } from "./login";
import { saveImgRequest } from "./observer";
import { search } from "./search";

(async function main(): Promise<void> {
    try {
        const [browser, page, context] = await initializeBrowser();
        const query: string = "#FursuitFriday";
        await search(query, page);
        await saveImgRequest(page);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
