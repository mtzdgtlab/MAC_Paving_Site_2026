#!/usr/bin/env node
/**
 * Script to copy Font Awesome font files from node_modules to public/assets
 * This ensures the fonts referenced in CSSbase.astro are available at build time
 */

import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const fontsToCopy = [
  'fa-solid-900.woff2',
  'fa-brands-400.woff2',
  'fa-regular-400.woff2'
];

const sourceDir = join(projectRoot, 'node_modules', '@fortawesome', 'fontawesome-free', 'webfonts');
const targetDir = join(projectRoot, 'public', 'assets');

// Ensure target directory exists
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

// Copy each font file
let copiedCount = 0;
for (const font of fontsToCopy) {
  const sourcePath = join(sourceDir, font);
  const targetPath = join(targetDir, font);
  
  if (existsSync(sourcePath)) {
    try {
      copyFileSync(sourcePath, targetPath);
      console.log(`✓ Copied ${font}`);
      copiedCount++;
    } catch (error) {
      console.error(`✗ Failed to copy ${font}:`, error.message);
      process.exit(1);
    }
  } else {
    console.warn(`⚠ Source file not found: ${sourcePath}`);
  }
}

if (copiedCount === fontsToCopy.length) {
  console.log(`\n✓ Successfully copied ${copiedCount} font file(s) to ${targetDir}`);
} else {
  console.warn(`\n⚠ Only copied ${copiedCount} of ${fontsToCopy.length} font file(s)`);
  process.exit(1);
}

