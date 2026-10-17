import { config } from "~/config";
import type { Argument, Option } from "../types";

const args = [
	{
		name: "[key]",
		desc: "The key to view. dot-separated path is supported.",
	},
] as const satisfies Argument[];

const opts = [
	{
		flags: "-o, --open",
		desc: `Open the config file using: \`${config.openConfigCmd}\``,
		def: false,
	},
] as const satisfies Option[];

export const data = {
	desc: "Manage/view configuration.",
	args,
	opts,
};
