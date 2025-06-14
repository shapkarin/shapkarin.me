const fsPromises = require('fs/promises');
const path = require('path');

// Assuming 'esm' and 'database' modules are necessary and correctly imported.
const require_esm = require('esm')(module);
const database = require_esm('./database');

const API_FOLDER = path.join(__dirname, '../../public/api/');
const ABOUT_FILE = path.join(API_FOLDER, 'about.json');
const CREATIVE_FOLDER = path.join(API_FOLDER, 'creative');
const PACKAGES_FOLDER = path.join(API_FOLDER, 'packages');

async function writeJSONFile(filePath, data) {
  const jsonData = JSON.stringify(data);
  await fsPromises.writeFile(filePath, jsonData);
}

async function clearDirectory(directoryPath) {
  const entries = await fsPromises.readdir(directoryPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      // Skip any folder named "articles"
      if (entry.name === 'articles') {
        continue;
      }
      await clearDirectory(fullPath);
      await fsPromises.rmdir(fullPath);
    } else if (entry.name !== '.gitkeep') {
      await fsPromises.unlink(fullPath);
    }
  }
}

async function createDirectories() {
  await fsPromises.mkdir(PACKAGES_FOLDER, { recursive: true });
  await fsPromises.mkdir(CREATIVE_FOLDER, { recursive: true });
}

async function writeData() {
  await writeJSONFile(ABOUT_FILE, database.about);
  await writeJSONFile(path.join(CREATIVE_FOLDER, 'intro.json'), {
    title: database.creative.title,
    description: database.creative.description,
  });
  await writeJSONFile(path.join(CREATIVE_FOLDER, 'collection.json'), database.creative.collection);
  await writeJSONFile(path.join(PACKAGES_FOLDER, 'packages.json'), {
    packages: database.packages.list.map(({ id, url, title }) => ({ id, url, title })),
  });

  for (const pkg of database.packages.list) {
    await writeJSONFile(
      path.join(PACKAGES_FOLDER, `${pkg.id}.json`),
      { id: pkg.id, name: pkg.name, description: pkg.description, badges: pkg.badges }
    );
  }
}

async function generateAPI() {
  try {
    await clearDirectory(API_FOLDER);
    await createDirectories();
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await writeData();
    console.log('The API has been generated and the development server is starting.');
  }
}

generateAPI();
