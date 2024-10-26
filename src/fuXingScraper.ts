// entry point for the CLI
import { Command } from "commander";
import { main } from "./main";

const program = new Command();

program.name("fuXingScraper").version("0.0.1").description("A scraper for the FuXing website");

program
    .command("search <query>")
    .description("Search for images on the FuXing website")
    .action(async (query) => {
        await main(query);
    });

program.parse(process.argv);
