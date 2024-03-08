const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const require_esm = require('esm')(module);
const database = require_esm('./database');

const API_FOLDER = path.join(__dirname, '../../public/api/');
const API_FOLDER_PACKAGES = path.resolve(API_FOLDER, 'packages');
const API_FOLDER_PACKAGE_INFO = path.resolve(API_FOLDER_PACKAGES, 'info');
const API_FOLDER_SKETCHES = path.resolve(API_FOLDER, 'sketches');

const about = JSON.stringify(database.about);
const recursive = true

const packages = {
  packages: database.packages.list.map(({ id, url, title }) =>({
    id,
    url,
    title,
  }))
};
const infos = database.packages.list.map(({ id, name, description, badges }) => ({
  id,
  name,
  description,
  badges
}));

const write = async function() {
  await fsPromises.writeFile(path.resolve(API_FOLDER, 'about.json'), about);
  await fsPromises.writeFile(path.resolve(API_FOLDER_SKETCHES, 'intro.json'), JSON.stringify({
    title: database.sketches.title,
    description: database.sketches.description
  }));
  await fsPromises.writeFile(path.resolve(API_FOLDER_SKETCHES, 'collection.json'), JSON.stringify(database.sketches.collection));
  await fsPromises.writeFile(path.resolve(API_FOLDER_PACKAGES, 'packages.json'), JSON.stringify(packages));
  for (const pkg of infos) {
    await fsPromises.writeFile(
      path.resolve(API_FOLDER_PACKAGE_INFO, `${pkg.id}.json`),
      JSON.stringify(pkg)
    );
  }
}

const clearDirectory = async (directory) => {
  const files = await fsPromises.readdir(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (file !== '.gitkeep') { // Skip the .gitkeep file
      const stat = await fsPromises.stat(fullPath);
      if (stat.isDirectory()) {
        await fsPromises.rm(fullPath, { recursive });
      } else {
        await fsPromises.unlink(fullPath);
      }
    }
  }
}

const generate = async function(){
  try {
    await clearDirectory(API_FOLDER); // Clear the directory but keep .gitkeep
    await fsPromises.mkdir(API_FOLDER_PACKAGE_INFO, { recursive });
    await fsPromises.mkdir(API_FOLDER_SKETCHES, { recursive });
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await write();
    return 'Generation completed';
  }
}

generate().then(msg => console.log(msg));