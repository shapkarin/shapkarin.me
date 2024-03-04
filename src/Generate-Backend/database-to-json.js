const path = require('path');
const fsPromises = require('fs/promises');

const require_esm = require('esm')(module);
const database = require_esm('./database');

const API_FOLDER = path.join(__dirname, '../../public/api/');
const API_FOLDER_PACKAGES = path.resolve(API_FOLDER, 'packages');
const API_FOLDER_PACKAGE_INFO = path.resolve(API_FOLDER_PACKAGES, 'info');
const API_FOLDER_SKETCHES = path.resolve(API_FOLDER, 'sketches');

const about = JSON.stringify(database.about);

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

const write = function() {
  fsPromises.writeFile(path.resolve(API_FOLDER, 'about.json'), about);
  fsPromises.writeFile(path.resolve(API_FOLDER_SKETCHES, 'intro.json'), JSON.stringify({
    title: database.sketches.title,
    description: database.sketches.description
  }));
  fsPromises.writeFile(path.resolve(API_FOLDER_SKETCHES, 'collection.json'), JSON.stringify(database.sketches.collection));
  fsPromises.writeFile(path.resolve(API_FOLDER_PACKAGES, 'packages.json'), JSON.stringify(packages));
  infos.map(pkg =>
    fsPromises.writeFile(
      path.resolve(API_FOLDER_PACKAGE_INFO, `${pkg.id}.json`),
      JSON.stringify(pkg)
    )
  );
}

const recursive = true;

const generate = async function(){
  try {
    // TODO: do not remove public/api/.gitkeep
    await fsPromises.rm(API_FOLDER, { recursive });
    await fsPromises.mkdir(API_FOLDER_PACKAGE_INFO, { recursive });
    await fsPromises.mkdir(API_FOLDER_SKETCHES );
  } catch {
    await fsPromises.mkdir(API_FOLDER_SKETCHES );
  } finally {
    await write()
    return 'finally'
  }
}

generate().then(msg => console.log(msg));


