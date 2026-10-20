import { cli } from "~/cli";
import { data } from "./data";
import { handler } from "./handler";

const cmd = cli.command("check")

cmd.description(data.desc);

for (const arg of data.args) cmd.argument(arg.name, arg.desc);
for (const opt of data.reqOpts) cmd.requiredOption(opt.flags, opt.desc)
for (const opt of data.opts) cmd.option(opt.flags, opt.desc, "def" in opt ? opt.def : undefined);

cmd.action(handler)