/* eslint-disable no-console */

/**
 * Cloudflare Pages guard, run after `build:static`.
 * Free plan limits (docs updated 2026-09-05): 20,000 files per site, 25 MiB per file.
 * Fails earlier, at 18,000 files or a file over 20 MiB, to leave headroom.
 */
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve(process.argv[2] ?? 'out');
const MAX_FILES = 18_000;
const MAX_FILE_BYTES = 20 * 1024 * 1024;

const MiB = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MiB`;

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (entry.isFile()) files.push({ file: full, size: (await stat(full)).size });
  }
  return files;
}

const files = await walk(OUT_DIR);
const total = files.reduce((sum, { size }) => sum + size, 0);
const largest = [...files].sort((a, b) => b.size - a.size).slice(0, 5);
const oversized = files.filter(({ size }) => size > MAX_FILE_BYTES);

console.log(`[build-limits] ${OUT_DIR}`);
console.log(`[build-limits] files: ${files.length} (limit ${MAX_FILES})`);
console.log(`[build-limits] total size: ${MiB(total)}`);
console.log('[build-limits] largest files:');
for (const { file, size } of largest) console.log(`  ${MiB(size).padStart(11)}  ${path.relative(OUT_DIR, file)}`);

let failed = false;
if (files.length > MAX_FILES) {
  console.error(`[build-limits] FAIL: ${files.length} files is over ${MAX_FILES} (Cloudflare Pages allows 20,000)`);
  failed = true;
}
for (const { file, size } of oversized) {
  console.error(`[build-limits] FAIL: ${path.relative(OUT_DIR, file)} is ${MiB(size)}, over ${MiB(MAX_FILE_BYTES)} (Cloudflare Pages allows 25 MiB)`);
  failed = true;
}
if (failed) process.exit(1);
console.log('[build-limits] OK');
