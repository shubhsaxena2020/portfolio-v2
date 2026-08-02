import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [globals, showcase, header] = await Promise.all([
  readFile(new URL('../src/app/globals.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/project-showcase.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/projects-header.tsx', import.meta.url), 'utf8'),
]);

const projectKeys = [
  'cortex',
  'furniture-3d',
  'ai-tools-monitor',
  'multi-ai-framework',
  'fbc-arena',
];

test('defines every project color in the light, dark, and jungle theme blocks', () => {
  for (const key of projectKeys) {
    const declarations = globals.match(new RegExp(`--project-${key}:`, 'g')) ?? [];
    assert.equal(declarations.length, 3, `${key} must have one color per theme`);
  }
});

test('project cards expose a visible accent edge and an 8% hover tint', () => {
  assert.match(showcase, /data-project-accent=/);
  assert.match(showcase, /data-project-accent-edge/);
  assert.match(showcase, /data-project-hover-tint/);
  assert.match(showcase, /group-hover\/card:opacity-\[0\.08\]/);
});

test('the Projects heading renders staggered animated characters', () => {
  assert.match(header, /staggerChildren/);
  assert.match(header, /data-projects-heading-char/);
  assert.match(header, /["']Projects["']\.split\(["']["']\)/);
});

test('the Projects outro includes a reduced-motion-aware sticky handoff', () => {
  assert.match(showcase, /data-projects-handoff/);
  assert.match(showcase, /useScroll\(/);
  assert.match(showcase, /shouldReduceMotion \? 0 : handoff/);
});
