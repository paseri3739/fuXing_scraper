// entry point for the CLI
import { Command } from "commander";
import { entry } from "./entry/entry";
import { queryEntry } from "./entry/queryEntry";
import { urlEntry } from "./entry/urlEntry";

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

program.parse(process.argv);
