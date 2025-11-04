const fs = require('fs');
const path = require('path');
const glob = require('glob');
const markedPromise = import('marked');
const lunr = require('lunr');
const matter = require('gray-matter');

const API_FOLDER = path.join(__dirname, '../../public/api');
const ARTICLES_DIR = path.join(API_FOLDER, 'articles');
const OUTPUT_FILE = path.join(API_FOLDER, 'search-index.json');

const mdFiles = glob.sync(`${ARTICLES_DIR}/**/*.md`);

(async () => {
const marked = (await markedPromise).marked;

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
    id: path.relative(API_FOLDER, file).replace(/\.md$/, ''), // can be the same filename in different directories
    title,
    description,
    keywords,
    body: plainText,
  };
});

const index = lunr(function () {
  this.ref('id');
  this.field('title', { boost: 10 });
  this.field('description');
  this.field('keywords');
  this.field('body');

  articles.forEach((article) => this.add(article));
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index));

console.log(`Search index generated at ${OUTPUT_FILE}`);
})();