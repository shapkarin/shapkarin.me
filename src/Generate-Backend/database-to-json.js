const path = require('path');
const fsPromises = require('fs/promises');
// const YAML = require('yaml')

const require_esm = require('esm')(module);
const database = require_esm('./database');

const API_FOLDER = path.join(__dirname, '../../public/api/');
const API_FOLDER_PACKAGES = path.resolve(API_FOLDER, 'packages');
const API_FOLDER_PACKAGE_INFO = path.resolve(API_FOLDER_PACKAGES, 'info');

const about = JSON.stringify(database.about);
const sketches = JSON.stringify(database.sketches);
const packages = JSON.stringify({ packages: database.packages.list });

const infos = database.packages.order.map((pkg) => ({
  packageName: pkg,
  ...database.packages.info(pkg),
}));

const write = function() {
  const tasks = [
    fsPromises.writeFile(path.resolve(API_FOLDER, 'about.json'), about),
    fsPromises.writeFile(path.resolve(API_FOLDER, 'sketches.json'), sketches),
    fsPromises.writeFile(path.resolve(API_FOLDER_PACKAGES, 'packages.json'), packages),
    infos.map(pkg =>
      fsPromises.writeFile(
        path.resolve(API_FOLDER_PACKAGE_INFO, `${pkg.id}.json`),
        JSON.stringify(pkg)
      )
    ),
  ]
  return Promise.all(tasks)
}

const recursive = true;

const generate = async function(){
  try {
    await fsPromises.rm(API_FOLDER, { recursive });
    await fsPromises.mkdir(API_FOLDER_PACKAGE_INFO, { recursive });
  } catch {
    await fsPromises.mkdir(API_FOLDER_PACKAGE_INFO, { recursive });
  } finally {
    await write()
    return 'finally'
  }
}

generate().then(msg => console.log(msg));


