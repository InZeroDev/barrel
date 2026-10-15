import { configPath } from "~/utils/shared";
import { config } from "~/config";
import { getDeep, setDeep } from "~/utils/utils";
import fs from "fs-extra";
import { execSync } from "node:child_process";

export function handler(
	key: string | undefined,
	value: string | undefined,
	opts: { open: boolean },
) {
	if (opts.open) return execSync("code " + configPath, { stdio: "inherit" });

	if (key === undefined) return console.log(configPath);

	const target = getDeep(config, key);
	if (value === undefined) return console.log(target);

	if (typeof target === "object")
		return console.log("You can only update leaf values, not whole objects.");

	const userConfig = fs.readJsonSync(configPath);
	setDeep(userConfig, key, value);
	fs.writeJsonSync(configPath, userConfig, { spaces: 2 });
}
