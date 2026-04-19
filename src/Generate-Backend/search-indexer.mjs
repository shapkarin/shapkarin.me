import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { marked } from 'marked';
import lunr from 'lunr';
import matter from 'gray-matter';

const API_FOLDER = path.join(import.meta.dirname, '../../public');
const ARTICLES_DIR = path.join(API_FOLDER, 'articles');
const OUTPUT_FILE = path.join(API_FOLDER, 'search-index.json');

const mdFiles = globSync(`${ARTICLES_DIR}/**/*.md`);

const articles = mdFiles.map((file) => {
  const rawContent = fs.readFileSync(file, 'utf8');
  const { data: metadata, content } = matter(rawContent);

  const html = marked.parse(content);
  const plainText = html.replace(/<[^>]+>/g, '');

  let title = metadata.title || '';
  if (!title) {
    const firstLine = content.split('\n')[0].trim();
    if (firstLine.startsWith('#')) {
      title = firstLine.replace(/^#+\s*/, '');
    }
  }

  const description = metadata.description || '';
  const keywords = metadata.keywords || '';

  return {
    id: path.relative(API_FOLDER, file).replace(/\.md$/, ''),
    title,
    description,
    keywords,
    body: plainText,
  };
});

const index = lunr(function () {
  this.ref('id');
  this.field('title', { boost: 10 });
  this.field('description', { boost: 5 });
  this.field('keywords', { boost: 3 });
  this.field('body');

  articles.forEach((article) => this.add(article));
});

// Store metadata for displaying search results (title, description, slug)
const store = {};
articles.forEach((article) => {
  const slug = article.id.replace(/^articles\//, '');
  store[article.id] = {
    title: article.title,
    description: article.description,
    slug,
  };
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ index, store }));

console.log(`Search index generated at ${OUTPUT_FILE}`);
