import type { Argument, Option } from "../types";

const args = [
	{
		name: "[key]",
		desc: "The key to get or set. dot-separated path is supported.",
	},
	{
		name: "[value]",
		desc: "The value to set. Should be used only when key is a leaf key.",
	},
] as const satisfies Argument[];

const opts = [
	{
		flags: "-o, --open",
		desc: "Open the config file using VSCode.",
		def: false,
	},
] as const satisfies Option[];

export const data = {
	desc: "Manage/view configuration.",
	args,
	opts,
};
