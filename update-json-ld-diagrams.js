#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const articlesDir = 'public/api/articles';

// Get all markdown files
const mdFiles = fs.readdirSync(articlesDir)
  .filter(file => file.endsWith('.md'))
  .map(file => file.replace('.md', ''));

// Get all existing .aeo.json files
const existingJsonFiles = fs.readdirSync(articlesDir)
  .filter(file => file.endsWith('.aeo.json'))
  .map(file => file.replace('.aeo.json', ''));

// Get all SVG files and group by article name
const svgFiles = fs.readdirSync(articlesDir)
  .filter(file => file.endsWith('.svg'));

const svgByArticle = {};
svgFiles.forEach(svg => {
  const match = svg.match(/^(.+)-(\d+)\.svg$/);
  if (match) {
    const articleName = match[1];
    const index = match[2];
    if (!svgByArticle[articleName]) {
      svgByArticle[articleName] = [];
    }
    svgByArticle[articleName].push(svg);
  }
});

console.log('Articles with diagrams that need JSON-LD files:');
console.log('='.repeat(50));

mdFiles.forEach(article => {
  const hasJsonFile = existingJsonFiles.includes(article);
  const hasDiagrams = svgByArticle[article] && svgByArticle[article].length > 0;
  
  if (hasDiagrams) {
    console.log(`${article}: ${hasJsonFile ? 'HAS' : 'MISSING'} .aeo.json, diagrams: ${svgByArticle[article].join(', ')}`);
  }
});

console.log('\nArticles missing .aeo.json files (with or without diagrams):');
console.log('='.repeat(50));

mdFiles.forEach(article => {
  const hasJsonFile = existingJsonFiles.includes(article);
  if (!hasJsonFile) {
    const diagrams = svgByArticle[article] || [];
    console.log(`${article}: diagrams: ${diagrams.join(', ') || 'none'}`);
  }
});