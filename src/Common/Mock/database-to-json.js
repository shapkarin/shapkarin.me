// const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const require_esm = require('esm')(module);
const database = require_esm('./database');

const API_FOLDER = path.join(__dirname, '../../../public/api/');
const API_FOLDER_PACKAGES = path.resolve(API_FOLDER, 'packages');
const API_FOLDER_PACKAGE_INFO = path.resolve(API_FOLDER_PACKAGES, 'info');

const about = JSON.stringify({ text: database.about.trim() });
const sketches = JSON.stringify(database.sketches);
const packages = JSON.stringify({ packages: database.packages.list });

const infos = database.packages.order.map((pkg, id) => ({
  id,
  packageName: pkg,
  description: database.packages.info(pkg).trim(),
}));

fsPromises.mkdir(API_FOLDER_PACKAGE_INFO, { recursive: true }).then(function(){
  fsPromises.writeFile(path.resolve(API_FOLDER, 'about.json'), about);
  fsPromises.writeFile(path.resolve(API_FOLDER, 'sketches.json'), sketches)
  fsPromises.writeFile(path.resolve(API_FOLDER_PACKAGES, 'packages.json'), packages)
  infos.map(pkg => 
    fsPromises.writeFile(
      path.resolve(API_FOLDER_PACKAGE_INFO, `${pkg.id}.json`),
      JSON.stringify(pkg).replace(/\\n/g, '').replace(/\s+/g,' ')
    )
  )
});



