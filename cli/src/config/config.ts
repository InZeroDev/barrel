import path from "node:path";
import fs from "fs-extra";
import { configSchema, type Config } from "./schema";
import z, { ZodError } from "zod";
import { configPath, defConfigPath } from "~/utils/shared";

const getConfig = () => {
	const userConfig = fs.readJsonSync(configPath);

	try {
		const config = configSchema.parse(userConfig);
		return config;
	} catch (error) {
		console.log("Failed to parse config file.\n");

		if (error instanceof ZodError)
			console.log(
				error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n"),
			);
		else if (error instanceof Error) console.log(error.message);
		else console.log(error);

		process.exit(1);
	}
};

export const config = getConfig();
export const defConfig = fs.readJsonSync(defConfigPath) as Required<Config>;
