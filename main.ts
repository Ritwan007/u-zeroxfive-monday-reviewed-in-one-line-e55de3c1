// Monday, Reviewed in One Line — entry program.
// Writes the chosen one-line Monday review to /output/entry.txt.
//
// The gate requires UTF-8 text of 1-200 characters, not only whitespace,
// a single line. The line is written with no trailing newline: a trailing
// newline would add a character and risk reading as a second (empty) line.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Monday opened with a 7 a.m. 'quick question' that became a 40-minute call, and closed with my laptop updating itself out of spite.";

// Gate self-check: fail loudly instead of shipping an invalid entry.
const chars = [...LINE].length;
const bytes = Buffer.byteLength(LINE, "utf8");
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, gate needs 1-200`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
if (chars !== bytes) {
  // ASCII-only line: chars and bytes must agree; a mismatch would mean
  // a non-ASCII character slipped in unnoticed.
  throw new Error(`char/byte mismatch: ${chars} chars, ${bytes} bytes`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
