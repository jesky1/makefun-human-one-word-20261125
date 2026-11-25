// Tests for the human-one-word entry: gate (1-30 chars, one word) + determinism.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, "output", "entry.txt");

function run() {
  rmSync(join(dir, "output"), { recursive: true, force: true });
  const r = spawnSync("node", ["main.ts"], { cwd: dir, encoding: "utf8" });
  assert.equal(r.status, 0, `main.ts failed: ${r.stderr}`);
  return readFileSync(out, "utf8");
}

test("entry is a single word of 1-30 characters", () => {
  const text = run();
  assert.ok(text.length >= 1 && text.length <= 30, `length ${text.length}`);
  assert.equal(text.trim(), text, "no surrounding whitespace");
  assert.ok(!/\s/.test(text), "must be a single word, no whitespace");
  assert.ok(!/^[ \t\r\n]+$/.test(text), "not only whitespace");
});

test("entry is deterministic across runs", () => {
  const first = run();
  const second = run();
  assert.equal(first, second);
});
