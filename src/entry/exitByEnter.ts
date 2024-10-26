import { Browser } from "playwright";

export function exitByEnter(browser: Browser): void {
    process.stdin.on("data", async (data) => {
        if (data.toString() === "exit\n") {
            await browser.close();
            process.exit(0);
        }
    });
}
