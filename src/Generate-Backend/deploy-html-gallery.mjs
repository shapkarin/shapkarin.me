import path from 'path';
import copyDirectory from './modules/copyDirectory.mjs';

const sourceDir = path.join(__dirname, '../..', 'src/HTML-Gallery');
const destDir = path.join(__dirname, '../..', 'dist/gallery');

copyDirectory(sourceDir, destDir);
