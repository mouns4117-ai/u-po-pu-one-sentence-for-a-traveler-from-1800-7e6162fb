// One Sentence for a Traveler from 1800 — make.fun entry.
// Writes a single sentence explaining the modern internet to a time
// traveler from 1800, using only things they would already know:
// a road, a post office, a library, a market stall, a letter, ink.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Imagine one road joining every library, post office and market stall in the world, so a letter you write reaches anyone before the ink dries.";

// The gate: 1 to 200 characters, not whitespace-only, one sentence.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function emptyDir(dir: string): void {
  // Empty only the directory's contents. The grader's /output is a
  // mounted empty directory: removing the directory itself fails.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  if (ENTRY.length < MIN_CHARS || ENTRY.length > MAX_CHARS) {
    throw new Error(
      `entry is ${ENTRY.length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`,
    );
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if ((ENTRY.match(/\./g) ?? []).length !== 1 || !ENTRY.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
  emptyDir(outDir);
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");
  // Re-read and assert the file holds exactly the entry, byte for byte.
  const back = readFileSync(target, "utf8");
  if (back !== ENTRY) {
    throw new Error("entry.txt does not match the entry exactly");
  }
}

main();
