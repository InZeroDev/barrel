import { config, defConfig } from "~/config";
import type { Argument, Option } from "../types";

const args = [
	{
		name: "<paths...>",
		desc: "Barrel paths to generate",
	},
] as const satisfies Argument[];

const opts = [
	{
		flags: "-p, --preset <preset>",
		desc: "Preset to use.",
	},

	{
		flags: "-i, --file-include <fileInclude...>",
		desc: "Glob patterns for files to include.",
	},
	{
		flags: "-I, --folder-include <folderInclude...>",
		desc: "Glob patterns for folders to include.",
	},

	{
		flags: "-e, --file-exclude <fileExclude...>",
		desc: "Glob patterns for files to exclude.",
	},
	{
		flags: "-E, --folder-exclude <folderExclude...>",
		desc: "Glob patterns for folders to exclude.",
	},

	{
		flags: "-f, --file-format <fileFormat>",
		desc: "Format string for files.",
	},
	{
		flags: "-F, --folder-format <folderFormat>",
		desc: "Format string for folders.",
	},

	{
		flags: "-r, --required-index <requiredIndex>",
		desc: "Format string for required index.",
	},

	{
		flags: "-c, --cwd <cwd>",
		desc: "Current working directory.",
	},
] as const satisfies Option[];

export const data = {
	desc: "",
	args,
	opts,
};
