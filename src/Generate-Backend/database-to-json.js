const fsPromises = require('fs/promises');
const path = require('path');

// Assuming 'esm' and 'database' modules are necessary and correctly imported.
const require_esm = require('esm')(module);
const database = require_esm('./database');

const API_FOLDER = path.join(__dirname, '../../public/api/');
const ABOUT_FILE = path.join(API_FOLDER, 'about.json');
const SKETCHES_FOLDER = path.join(API_FOLDER, 'sketches');
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
      await clearDirectory(fullPath);
      await fsPromises.rmdir(fullPath);
    } else if (entry.name !== '.gitkeep') {
      await fsPromises.unlink(fullPath);
    }
  }
}

async function createDirectories() {
  await fsPromises.mkdir(PACKAGES_FOLDER, { recursive: true });
  await fsPromises.mkdir(SKETCHES_FOLDER, { recursive: true });
}

async function writeData() {
  await writeJSONFile(ABOUT_FILE, database.about);
  await writeJSONFile(path.join(SKETCHES_FOLDER, 'intro.json'), {
    title: database.sketches.title,
    description: database.sketches.description,
  });
  await writeJSONFile(path.join(SKETCHES_FOLDER, 'collection.json'), database.sketches.collection);
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
