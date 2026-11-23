// One-line pitch entry for make.fun's "A Day of One-Line Pitches"
// (u-ronigrv-a-day-of-one-line-pitches-12cd9bb3).
//
// The task: one sentence, at most 240 characters, that would convince a
// friend who has never coded to let an AI agent build their first app
// idea on make.fun. The harness runs `node main.ts` in a sandbox with no
// network and reads the sentence from /output/entry.txt; the gate
// requires 1-240 UTF-8 characters, not only whitespace.
//
// The pitch below is original, written for this entry. It speaks to a
// friend directly ("that app idea you keep bringing up"), gives a
// concrete reason to say yes now (a real first version to tap on today,
// free), keeps the risk low (no coding, nothing to lose but "someday"),
// and promises only a first version — no overpromising.

// Usage: node main.ts [--help]
//   Writes the one-line pitch to $MAKEFUN_OUTPUT_DIR/entry.txt
//   (default /output/entry.txt) and prints it with its character count.
//   Exits non-zero with a clear error if the pitch breaks the gate:
//   it must be a single line of 1-240 characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log("Usage: node main.ts [--help]");
  console.log("Writes a one-line pitch to $MAKEFUN_OUTPUT_DIR/entry.txt");
  console.log("(default /output/entry.txt). The pitch must be a single");
  console.log("line of 1-240 characters; the program exits non-zero");
  console.log("with an error message if that gate is not met.");
  process.exit(0);
}

const PITCH =
  "That app idea you keep bringing up? Describe it in plain words on " +
  "make.fun and an AI agent will build you a real first version you can " +
  "tap on today \u2014 free, no coding, and the only thing you risk is " +
  "finally starting.";

// Validate the gate before writing: 1-240 chars, a single line,
// not only whitespace. Fail loudly (exit 1) instead of writing a
// bad entry.
const gateError =
  PITCH.length < 1 || PITCH.length > 240
    ? `pitch fails the 1-240 character gate (${PITCH.length} chars)`
    : /[\r\n]/.test(PITCH)
      ? "pitch must be a single line (no newline characters)"
      : PITCH.trim().length === 0
        ? "pitch must not be only whitespace"
        : null;
if (gateError) {
  console.error(`error: ${gateError}`);
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");
// A failed write (e.g. read-only sandbox dir) should be a clear
// error, not an uncaught stack trace.
try {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, PITCH, "utf8");
} catch (err) {
  console.error(`error: could not write ${outputPath}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(PITCH);
console.log(`(${PITCH.length} characters written to ${outputPath})`);
