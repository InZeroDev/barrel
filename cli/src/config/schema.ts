import z from "zod";

const presetSchema = z.object({
	fileInclude: z.array(z.string()).optional(),
	folderInclude: z.array(z.string()).optional(),

	fileExclude: z.array(z.string()).optional(),
	folderExclude: z.array(z.string()).optional(),

	fileFormat: z.string(),
	folderFormat: z.string().optional(),

	requiredIndex: z.string().optional(),
});

const presetsSchema = z.record(z.string(), presetSchema);

const defaultsSchema = z.object({
	fileInclude: z.array(z.string()).default(["*$E"]),
	folderInclude: z.array(z.string()).default(["*"]),

	fileExclude: z.array(z.string()).default(["_*"]),
	folderExclude: z.array(z.string()).default(["_*"]),

	requiredIndex: z.string().default("index$E"),
});

export const configSchema = z.object({
	presets: presetsSchema.default({}),
	defaults: defaultsSchema.prefault({}),
	openConfigCmd: z.string().default("code $P"),
});

export type Config = z.infer<typeof configSchema>;
export type Preset = z.infer<typeof presetSchema>;
export type Defaults = z.infer<typeof defaultsSchema>;
