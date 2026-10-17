import z from "zod";

const presetSchema = z.object({
	includeFiles: z.array(z.string()).optional(),
	includeFolders: z.array(z.string()).optional(),

	excludeFiles: z.array(z.string()).optional(),
	excludeFolders: z.array(z.string()).optional(),

	fileFormat: z.string(),
	folderFormat: z.string().optional(),

	requiredIndex: z.string().optional(),
});

const presetsSchema = z.record(z.string(), presetSchema);

const defaultsSchema = z.object({
	includeFiles: z.array(z.string()).default(["*$E"]),
	includeFolders: z.array(z.string()).default(["*"]),

	excludeFiles: z.array(z.string()).default(["_*"]),
	excludeFolders: z.array(z.string()).default(["_*"]),

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
