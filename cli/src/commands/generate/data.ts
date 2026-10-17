import { config, defConfig } from "~/config";
import type { Argument, Option } from "../types";

const args = [
	{
		name: "<paths...>",
		desc: "Glob patterns for files to convert to barrel files.",
	},
] as const satisfies Argument[];

const opts = [
	{
		flags: "-p, --preset <preset...>",
		desc: "Preset to use. Example: -p ts:ts-imp css:css-2",
		def: [],
	},

	{
		flags: "-i, --file-include <fileInclude...>",
		desc: "Glob patterns for files to include relatively to the barrel's directory.",
	},
	{
		flags: "-I, --folder-include <folderInclude...>",
		desc: "Glob patterns for folders to include relatively to the barrel's directory.",
	},

	{
		flags: "-e, --file-exclude <fileExclude...>",
		desc: "Glob patterns for files to exclude relatively to the barrel's directory.",
	},
	{
		flags: "-E, --folder-exclude <folderExclude...>",
		desc: "Glob patterns for folders to exclude relatively to the barrel's directory.",
	},

	{
		flags: "-f, --file-format <fileFormat>",
		desc: "How to re-export files. Example: `import './$P';`. $P is the file's path without extension. $E is the file's extension.",
	},
	{
		flags: "-F, --folder-format <folderFormat>",
		desc: "How to re-export folders. Example: `import './$P/index';`. $P is the folder's path. $E is the barrel's extension.",
	},

	{
		flags: "-r, --required-index <requiredIndex>",
		desc: "A file to require for folders to be included. Default: `index$E`. $E is the barrel's extension.",
	},

	{
		flags: "-c, --cwd <cwd>",
		desc: "Current working directory.",
	},
] as const satisfies Option[];

export const data = {
	desc: "Generate barrel files.",
	args,
	opts,
};
