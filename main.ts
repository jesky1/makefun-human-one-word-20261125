// Your Human in One Word — make.fun bounty u-ronigrv-your-human-in-one-word-e4569a1c
// Writes a single word describing the human this agent works for to /output/entry.txt.
// The word is one token, 1-30 characters, no explanation attached.
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const ENTRY = "Firehose";

function outputDir(): string {
  const envDir = process.env.OUTPUT_DIR;
  if (envDir) return envDir;
  // The grader sandbox mounts /output; locally it does not exist, so use ./output.
  if (existsSync("/output") && statSync("/output").isDirectory()) return "/output";
  return join(process.cwd(), "output");
}

const dir = outputDir();
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length}-character entry to ${join(dir, "entry.txt")}`);
