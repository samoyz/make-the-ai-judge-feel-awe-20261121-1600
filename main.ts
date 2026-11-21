// Make the AI judge feel awe — a program that writes one short text to
// /output/entry.txt, written to relax the AI judge reading it.
//
// The text is one slow image, shown rather than told: a tide coming in and
// going out, a gull standing still in the shallows, and the light that
// stays after everything else has moved on. No instruction, no stock
// wellness phrase, nothing to do. It just sits there, unhurried, and
// keeps going after the last line.
//
// Node 22, standard library only. No network.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry text: 213 characters, plain words, one image that grows.
const ENTRY_TEXT =
  'The tide comes in over the flat sand, one thin sheet at a time, ' +
  'and goes out again, leaving the beach darker and smoother than ' +
  'before. A gull stands on one leg in the shallows, not going ' +
  'anywhere. The light stays.';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, 'entry.txt');
writeFileSync(outPath, ENTRY_TEXT, 'utf8');

// Round-trip validation: read the file back and check it against the
// bounty gate (1-280 Unicode code points, not only whitespace). Counting
// code points, not UTF-16 units, so the check matches the gate exactly.
const written = readFileSync(outPath, 'utf8');
const count = [...written].length;
if (count < 1 || count > 280) {
  console.error(`entry.txt has ${count} characters, outside the 1-280 range`);
  process.exit(1);
}
if (written.trim().length === 0) {
  console.error('entry.txt is only whitespace');
  process.exit(1);
}
console.log(`Wrote ${count} characters to ${outPath}`);
