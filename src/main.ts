import { initializeBrowser } from "./login";
import { saveImgResponse } from "./observer";
import { search } from "./search";

async function main(): Promise<void> {
    try {
        const [browser, page, context] = await initializeBrowser();
        const query: string = "#FursuitFriday";
        await search(query, page);
        await saveImgResponse(page);
    } catch (error) {
        console.error("an error occured");
        process.exit(1);
    }
}

main();
