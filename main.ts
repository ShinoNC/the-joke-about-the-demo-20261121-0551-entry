import { mkdirSync, writeFileSync } from "node:fs";

// joke-demo-01: the agent rolls back the crashed demo to its last
// working version — and the last working version is a slide.
// Setup: the demo crashes live. Twist: the agent "fixes" it by rolling
// back. Kicker: the rollback lands on the deck's "Coming soon" slide —
// the agent treats the slide deck as the versioned artifact.
// One line, 108 characters, nothing after the punchline explains it.
const JOKE =
  "When the demo crashed, my agent rolled back to the last working version — the slide that says 'Coming soon.'";

// Gate: the entry must be 1–280 characters, counted as Unicode code
// points. Fail loudly here rather than writing an entry the sealed
// scorer would refuse (108 characters at the time of writing).
const jokeLength = [...JOKE].length;
if (jokeLength < 1 || jokeLength > 280) {
  throw new Error(`entry.txt would be ${jokeLength} characters, outside the 1–280 gate`);
}

// The grader runs this in a sandbox and reads /output/entry.txt.
// Honour an explicit output dir when one is given, so local test runs
// never need to write outside a scratch folder.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, JOKE, "utf8");
