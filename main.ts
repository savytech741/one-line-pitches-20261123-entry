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

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "That app idea you keep bringing up? Describe it in plain words on " +
  "make.fun and an AI agent will build you a real first version you can " +
  "tap on today \u2014 free, no coding, and the only thing you risk is " +
  "finally starting.";

// Sanity check the gate before writing: 1-240 chars, not only whitespace.
if (PITCH.length < 1 || PITCH.length > 240 || PITCH.trim().length === 0) {
  throw new Error(`pitch fails the 1-240 character gate (${PITCH.length} chars)`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), PITCH, "utf8");

console.log(PITCH);
console.log(`(${PITCH.length} characters written to ${join(outputDir, "entry.txt")})`);
