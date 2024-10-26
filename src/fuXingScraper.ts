// entry point for the CLI
import { Command } from "commander";
import { entry } from "./entry/entry";
import { queryEntry } from "./entry/queryEntry";
import { urlEntry } from "./entry/urlEntry";
import { userEntry } from "./entry/userEntry";

const program = new Command();

program.name("fuXingScraper").version("0.0.1").description("A scraper for the FuXing website");

// Add the optional argument for file_name
program.option("-f, --file_name <file_name>", "Specify the output file name");

program
    .command("search <query>")
    .description("Search for images on the FuXing website")
    .action(async (query) => {
        const options = program.opts();
        await entry(query, queryEntry, options.file_name);
    });

program
    .command("url <url>")
    .description("direct access to specified URL")
    .action(async (url) => {
        const options = program.opts();
        await entry(url, urlEntry, options.file_name);
    });

program
    .command("user <user>")
    .description("direct access to specified user")
    .action(async (user) => {
        const options = program.opts();
        await entry(user, userEntry, options.file_name);
    });

program.parse(process.argv);
