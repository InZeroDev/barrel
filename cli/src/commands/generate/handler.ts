import type { AreEqual, Assert, Keyof } from "@inzero/ts-ut";
import type { data } from "./data";
import { glob, type Options as GlobOptions } from "fast-glob";
import path from "node:path";
import { config, type Preset } from "~/config";
import { cliName } from "~r/package.json";
import { hasKey, iife, override, removeExtension } from "~/utils/utils";
import fs from "fs-extra";

type Options = {
	preset: string[];

	fileInclude?: string[];
	folderInclude?: string[];

	fileExclude?: string[];
	folderExclude?: string[];

	fileFormat?: string;
	folderFormat?: string;

	requiredIndex?: string;

	cwd?: string;
};

{
	type ExpectedKeys =
		(typeof data.opts)[number]["flags"] extends `${string}<${infer T extends string}>`
			? T extends `${infer T extends string}...`
				? T
				: T
			: never;
	type Check = Assert<AreEqual<Keyof<Options>, ExpectedKeys>>;
}

export function handler(paths: string[], opts: Options) {
	const files = getFiles(paths, opts.cwd ?? process.cwd());
	for (const file of files) handleFile(file, opts);
}

function getFiles(paths: string[], cwd: string) {
	return glob.sync(paths, { cwd, onlyFiles: true });
}

function handleFile(barrel: string, opts: Options) {
	const preset = getPreset(barrel, opts);

	const items = getItems(barrel, preset);
	const output = generateOutput(barrel, {
		...items,
		...preset,
	});

	fs.writeFileSync(barrel, output);
}

function getPreset(barrel: string, opts: Options) {
	const targetPreset = iife(() => {
		const presetsObj = Object.fromEntries(
			opts.preset
				.filter((p) => p.includes(":"))
				.map<[string, string]>((p) => p.split(":") as [string, string]),
		);

		const barrelExt = path.extname(barrel).slice(1);
		return presetsObj[barrelExt] ?? presetsObj["*"] ?? barrelExt;
	});

	const preset = config.presets?.[targetPreset];
	if (!preset) {
		console.log(`Preset "${targetPreset}" not found.`);
		console.log("Available presets: " + Object.keys(config.presets).join(", "));
		console.log(`You can add/edit presets in the config file. Run: ${cliName} config`);
		process.exit(1);
	}

	const defaults = override(override(config.defaults, preset), opts);
	const fileFormat = opts.fileFormat ?? preset.fileFormat;
	const folderFormat = opts.folderFormat ?? preset.folderFormat ?? fileFormat;
	const validPreset = { ...defaults, fileFormat, folderFormat } satisfies Required<Preset>;

	return validPreset;
}

function getItems(barrel: string, preset: Required<Preset>) {
	preset.fileExclude.push(path.basename(barrel));
	const barrelFolder = path.dirname(barrel);

	const replacePlaceholders = (value: string) => value.replace(/\$E/g, path.extname(barrel));

	const fileItems = iife(() => {
		const source = preset.fileInclude.map(replacePlaceholders);
		const options: GlobOptions = {
			cwd: barrelFolder,
			ignore: preset.fileExclude,
			onlyFiles: true,
		};
		return glob.sync(source, options);
	});

	const folderItems = iife(() => {
		const source = preset.folderInclude.map(replacePlaceholders);
		const options: GlobOptions = {
			cwd: barrelFolder,
			ignore: preset.folderExclude.map(replacePlaceholders),
			onlyFiles: false,
			onlyDirectories: true,
		};

		const filterItems = (item: string) => {
			const source = replacePlaceholders(preset.requiredIndex);
			const options: GlobOptions = { cwd: path.join(barrelFolder, item), onlyFiles: true };
			const hasIndex = glob.sync(source, options).length > 0;

			return hasIndex;
		};

		return glob.sync(source, options).filter(filterItems);
	});

	return { fileItems, folderItems };
}

function generateOutput(
	barrel: string,
	{
		fileItems,
		folderItems,
		fileFormat,
		folderFormat,
	}: { fileItems: string[]; folderItems: string[]; fileFormat: string; folderFormat: string },
) {
	const barrelFolder = path.dirname(barrel);

	let output = "";

	for (const item of fileItems) {
		const noExtItem = removeExtension(item);

		const placeholders = {
			F: barrelFolder,
			P: noExtItem,
			E: path.extname(item),
		};

		const regex = new RegExp(`\\$([${Object.keys(placeholders).join("")}])`, "g");
		const itemText = fileFormat.replace(regex, (match, key: string) =>
			hasKey(placeholders, key) ? placeholders[key] : match,
		);

		output += itemText + "\n";
	}

	for (const item of folderItems) {
		const placeholders = {
			F: barrelFolder,
			P: item,
			E: path.extname(barrel),
		};

		const regex = new RegExp(`\\$([${Object.keys(placeholders).join("")}])`, "g");
		const itemText = folderFormat.replace(regex, (match, key: string) =>
			hasKey(placeholders, key) ? placeholders[key] : match,
		);

		output += itemText + "\n";
	}

	return output;
}
