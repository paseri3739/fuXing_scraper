// entry point for the CLI
import { Command } from "commander";
import { entry } from "./entry/entry";
import { queryEntry } from "./entry/queryEntry";
import { urlEntry } from "./entry/urlEntry";
import { userEntry } from "./entry/userEntry";

const program = new Command();

program.name("fuXingScraper").version("0.0.1").description("A scraper for the FuXing website");

program
    .command("search <query>")
    .description("Search for images on the FuXing website")
    .action(async (query) => {
        await entry(query, queryEntry);
    });

program
    .command("url <url>")
    .description("direct access to specified URL")
    .action(async (url) => {
        await entry(url, urlEntry);
    });

program
    .command("user <user>")
    .description("direct access to specified user")
    .action(async (user) => {
        await entry(user, userEntry);
    });

program.parse(process.argv);
