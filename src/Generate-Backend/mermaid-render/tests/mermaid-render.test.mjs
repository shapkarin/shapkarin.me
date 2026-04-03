import test from 'node:test';
import assert from 'node:assert';
import { MermaidProcessor } from '../mermaid-render.mjs';

test('generateDiagramId returns sha256 hash', () => {
  const processor = new MermaidProcessor();
  const code = 'graph TD\nA-->B;';
  const theme = 'dark';
  const outputPath = 'out.svg';
  const hash = processor.generateDiagramId(code, theme, outputPath);

  // SHA-256 hash length in hex is 64 characters
  assert.strictEqual(hash.length, 64);
});

test('generateAltText creates correct alt texts', () => {
  const processor = new MermaidProcessor();

  // with title
  const codeWithTitle = `graph TD
    title: My Diagram
    A-->B;`;
  assert.strictEqual(processor.generateAltText(codeWithTitle), 'Graph: My Diagram');

  // without title
  const codeWithoutTitle = `sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?`;
  assert.strictEqual(processor.generateAltText(codeWithoutTitle), 'SequenceDiagram diagram');

  // pie chart with title
  const pieCode = `pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85`;
  assert.strictEqual(processor.generateAltText(pieCode), 'Pie: Pets adopted by volunteers');
});

test('checkCachedSVG handles non-existent file correctly', async () => {
  const processor = new MermaidProcessor();
  await processor.initDatabase();

  // Empty db should return null
  const result = await processor.checkCachedSVG('non_existent_hash');
  assert.strictEqual(result, null);
  await processor.closeDatabase();
});

test('analyzeFileProcessingStatus detects mermaid blocks', () => {
  const processor = new MermaidProcessor();

  const contentWithBlocks = 'some text\n```mermaid\ngraph TD;\n```\nmore text';
  const statusWithBlocks = processor.analyzeFileProcessingStatus(contentWithBlocks, 'file.md');
  assert.strictEqual(statusWithBlocks.hasUnprocessedBlocks, true);
  assert.strictEqual(statusWithBlocks.totalMermaidBlocks, 1);

  const contentWithoutBlocks = 'some text\n```js\nconst x = 1;\n```\nmore text';
  const statusWithoutBlocks = processor.analyzeFileProcessingStatus(contentWithoutBlocks, 'file.md');
  assert.strictEqual(statusWithoutBlocks.hasUnprocessedBlocks, false);
  assert.strictEqual(statusWithoutBlocks.totalMermaidBlocks, 0);
});
