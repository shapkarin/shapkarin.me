/*
    TODO: 
    1. try to fix cheerio instead:
    webidl.is.ReadableStream = webidl.util.MakeTypeAssertion(ReadableStream)
    ReferenceError: ReadableStream is not defined

    2. Or fix react-snap crawler canvas render issue
*/
const fs = require('fs');
const path = require('path');

const HOME_PATH = path.join(__dirname, '../..', 'dist', 'index.html');
const html = fs.readFileSync(HOME_PATH, 'utf8');

const modifiedHtml = html.replace(/<canvas[^>]*id="background"[^>]*width="480"[^>]*>.*?<\/canvas>/s, '');

fs.writeFileSync(HOME_PATH, modifiedHtml);

console.log('React-snap canvas issue is fixed!');
