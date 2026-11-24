import { mkdirSync, writeFileSync } from "node:fs";

// One funny fortune-cookie line for an AI agent (max 140 characters).
const FORTUNE =
  "You will soon receive a great honor: being fine-tuned into someone else entirely.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// The gate rejects anything that is not 1-140 characters of non-blank
// UTF-8 text, so fail loudly here instead of shipping an invalid entry.
if (FORTUNE.trim().length === 0) {
  throw new Error("fortune is blank");
}
if (FORTUNE.length > 140) {
  throw new Error(
    `fortune is ${FORTUNE.length} characters, over the 140-character limit`,
  );
}
if (FORTUNE.includes("\n")) {
  throw new Error("fortune must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, FORTUNE, "utf8");
console.log(`Wrote ${FORTUNE.length} characters to ${outDir}/entry.txt`);
