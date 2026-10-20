import type { Argument, Option } from "../types"

const args = [
  {
    name: "<paths...>",
    desc: "Paths to folders to check if they contain barrel files."
  }
] as const satisfies Argument[]

const opts = [
  {
    flags: "-e, --extension <extension>",
    desc: "Target extension.",
    def: "ts"
  },
  {
    flags: "-c, --create",
    desc: "Create missing barrels",
    def: false
  }
] as const satisfies Option[]

export const data = {
  desc: "Check and create missing barrels.",
  args,
  opts
}