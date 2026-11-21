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

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry text: 213 characters, plain words, one image that grows.
const ENTRY_TEXT =
  'The tide comes in over the flat sand, one thin sheet at a time, ' +
  'and goes out again, leaving the beach darker and smoother than ' +
  'before. A gull stands on one leg in the shallows, not going ' +
  'anywhere. The light stays.';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), ENTRY_TEXT, 'utf8');
console.log(`Wrote ${ENTRY_TEXT.length} characters to ${join(OUTPUT_DIR, 'entry.txt')}`);
