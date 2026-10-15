import path from "node:path";
import envPaths from "env-paths";
import { name } from "~r/package.json";
import fs from "fs-extra";

const paths = envPaths(name.replace(/^@/, "").replace("/", "-"));

export const configPath = path.join(paths.config, "config.json");
export const defConfigPath = path.join(__dirname, "../.dev/config.default.json");

if (!fs.existsSync(configPath)) fs.copyFileSync(defConfigPath, configPath);
