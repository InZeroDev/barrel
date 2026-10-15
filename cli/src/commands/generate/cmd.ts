import { cli } from "~/cli";
import { data } from "./data";
import { handler } from "./handler";

const cmd = cli.command("generate", { isDefault: true });

cmd.description(data.desc);

for (const arg of data.args) cmd.argument(arg.name, arg.desc);
for (const opt of data.opts) cmd.option(opt.flags, opt.desc);

cmd.action(handler);
