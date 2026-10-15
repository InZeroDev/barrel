import { Command } from "commander";
import { cliName, description, version } from "~r/package.json";

export const cli = new Command();

cli.name(cliName).description(description).version(version, "-v, --version");

import("./commands").then(() => {
	cli.parse();
});
