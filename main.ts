// Unsent: The Micro-Confession Sprint
// Writes one two-part micro-confession to /output/entry.txt.
// Deterministic: every run writes byte-identical output.
// No dependencies, no network, no reads outside this repository.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "To: Dad\ni sold your blue guitar to pay my rent in 2019 and every christmas i tell you it was stolen\n";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Verify the written file meets the competition gate before exiting:
// UTF-8 text of 1-260 characters, not only whitespace, exactly two parts
// (a To: line and one message line), and the message at most 200 chars.
const written = readFileSync(outPath, "utf8");
const fail = (reason: string): never => {
  throw new Error(`gate check failed: ${reason}`);
};
if (written.length < 1 || written.length > 260) {
  fail(`total length ${written.length} chars, must be 1-260`);
}
if (written.trim().length === 0) fail("entry is only whitespace");
const lines = written.replace(/\n$/, "").split("\n");
if (lines.length !== 2) fail(`expected exactly 2 lines, got ${lines.length}`);
if (!lines[0].startsWith("To:")) fail("first line must be a To: line");
if (lines[1].length > 200) {
  fail(`message line ${lines[1].length} chars, must be at most 200`);
}
