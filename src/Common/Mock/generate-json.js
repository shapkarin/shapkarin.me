const fs = require('fs');
const path = require('path');

// const database = require('./database');
const API_FOLDER = path.join(__dirname, '../../../public/api');

const database = { text: `<h1>Hello. My name is Yury Shapkarin and I like to code 👨‍💻</h1>\
I help to develop and create a lot of great projects. <br /> \
Some of them was commertial, some are not, some was a mix of both. <br /> \
I write JavaScript each day and I like to spend my spare time to <br />explore other languages and technologies.` };

const about = JSON.stringify({ text: database.text });

if(!fs.existsSync(API_FOLDER)) {
  fs.mkdirSync(API_FOLDER);
}

fs.writeFileSync(path.resolve(API_FOLDER, 'about.json'), about);