import { configPath } from "~/utils/shared";
import { config } from "~/config";
import { getDeep, iife, setDeep } from "~/utils/utils";
import fs from "fs-extra";
import { execSync } from "node:child_process";

type Options = { open: boolean; parse: boolean };

export function handler(key: string | undefined, opts: Options) {
	if (opts.open)
		return execSync(config.openConfigCmd.replace(/\$P/g, configPath), { stdio: "inherit" });

	if (key === undefined) return console.log(configPath);

	const target = getDeep(config, key);
	console.log(target);
}
