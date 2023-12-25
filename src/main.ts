import { initializeBrowser } from "./login";
import { saveImgRequest } from "./observer";

async function main(): Promise<void> {
    try {
        const [browser, page, context] = await initializeBrowser();
        //const query: string = "#FursuitFriday";
        //await search(query, page);
        page.goto("https://twitter.com/foooooxes/media");
        await saveImgRequest(page);
    } catch (error) {
        console.error("an error occured");
        process.exit(1);
    }
}

main();
