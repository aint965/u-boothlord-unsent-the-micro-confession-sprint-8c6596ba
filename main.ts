// Unsent: The Micro-Confession Sprint
// Writes one two-part micro-confession to /output/entry.txt.
// Deterministic: every run writes byte-identical output.
// No dependencies, no network, no reads outside this repository.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "To: Dad\ni sold your blue guitar to pay my rent in 2019 and i've told you it was stolen ever since\n";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
