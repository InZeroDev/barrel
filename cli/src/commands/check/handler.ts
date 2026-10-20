import { glob } from "fast-glob";
import fs from "fs-extra";
import path from "node:path";

type Options = {
	extension: string;
	create: boolean;
};

export function handler(paths: string[], opts: Options) {
	const folders = glob.sync(paths, { onlyFiles: false, onlyDirectories: true });

	if (folders.length === 0) return console.log("No folders found.");

	const barrelName = `index.${opts.extension}`;

	const missingBarrels: string[] = [];
	const createdBarrels: string[] = [];
	const existingBarrels: string[] = [];

	for (const folder of folders) {
		const barrelPath = path.join(folder, barrelName);
		const hasBarrel = glob.sync(barrelPath).length > 0;
		if (hasBarrel) {
			existingBarrels.push(barrelPath);
		} else if (opts.create) {
			fs.writeFileSync(barrelPath, "");
			createdBarrels.push(barrelPath);
		} else {
			missingBarrels.push(barrelPath);
		}
	}

	if (missingBarrels.length) {
		console.log(`Missing barrels:`);
		console.log(missingBarrels.map((barrel) => `- ${barrel}`).join("\n"));
	}
	if (createdBarrels.length) {
		console.log(`Created barrels:`);
		console.log(createdBarrels.map((barrel) => `- ${barrel}`).join("\n"));
	}
	if (existingBarrels.length) {
		console.log(`Existing barrels:`);
		console.log(existingBarrels.map((barrel) => `- ${barrel}`).join("\n"));
	}
}
