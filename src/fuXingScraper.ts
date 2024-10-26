// entry point for the CLI
import { Command } from "commander";
import { queryEntry } from "./entry/queryEntry";

const program = new Command();

program.name("fuXingScraper").version("0.0.1").description("A scraper for the FuXing website");

program
    .command("search <query>")
    .description("Search for images on the FuXing website")
    .action(async (query) => {
        await queryEntry(query);
    });

program
    .command("url <url>")
    .description("direct access to specified URL")
    .action(async (url) => {
        await queryEntry(url);
    });

program.parse(process.argv);
